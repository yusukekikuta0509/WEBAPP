import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv
import re
import uuid
import shutil
from jinja2 import Template
import subprocess

# 環境変数のロード
load_dotenv()

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = os.getenv("SERVICE_ACCOUNT_FILE")

# Google APIクライアントの初期化
try:
    credentials = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build('sheets', 'v4', credentials=credentials)
except Exception as e:
    raise RuntimeError(f"Google API初期化エラー: {e}")

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# リクエストモデル
class SiteData(BaseModel):
    title: str
    content: str
    spreadsheet_url: str

# スプレッドシートIDを抽出する関数
def extract_spreadsheet_id(url: str) -> str:
    match = re.search(r"/spreadsheets/d/([a-zA-Z0-9-_]+)", url)
    if not match:
        raise ValueError("無効なスプレッドシートURLです。")
    return match.group(1)

# HTML生成関数
def generate_html(data):
    template = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ title }}</title>
    </head>
    <body>
        <h1>{{ title }}</h1>
        <p>{{ content }}</p>
    </body>
    </html>
    """
    return Template(template).render(title=data['title'], content=data['content'])

# Vercelデプロイ関数
def deploy_to_vercel(output_dir: str) -> str:
    try:
        result = subprocess.run(
            ["vercel", output_dir, "--prod", "--yes"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return result.stdout.splitlines()[-1].strip()
        else:
            raise Exception(result.stderr)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vercelデプロイエラー: {e}")

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is running!"}

@app.post("/generate")
def generate_site(data: SiteData):
    try:
        spreadsheet_id = extract_spreadsheet_id(data.spreadsheet_url)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    unique_id = str(uuid.uuid4())[:8]
    new_row = [unique_id, data.title, data.content]

    # スプレッドシートにデータを追加
    try:
        service.spreadsheets().values().append(
            spreadsheetId=spreadsheet_id,
            range="Sheet1!A:C",  # 範囲を明確に指定
            valueInputOption="RAW",
            body={"values": [new_row]}
        ).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"スプレッドシートへの書き込みエラー: {e}")

    # HTMLファイルを生成
    try:
        output_dir = f"./output/{unique_id}"
        os.makedirs(output_dir, exist_ok=True)

        html_content = generate_html({"title": data.title, "content": data.content})
        html_file_path = os.path.join(output_dir, "index.html")
        with open(html_file_path, "w") as html_file:
            html_file.write(html_content)

        # Vercelにデプロイ
        deployed_url = deploy_to_vercel(output_dir)

        # 一時ディレクトリを削除
        shutil.rmtree(output_dir)

        return {"status": "success", "url": deployed_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"HTML生成またはデプロイエラー: {e}")
