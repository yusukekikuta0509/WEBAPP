import subprocess

def deploy_to_vercel(output_dir: str) -> str:
    """
    指定されたディレクトリをVercelにデプロイし、デプロイされたURLを返す。
    """
    try:
        result = subprocess.run(
            ["vercel", output_dir, "--prod", "--yes"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            # デプロイ成功時の出力からURLを抽出
            deployed_url = result.stdout.splitlines()[-1].strip()
            return deployed_url
        else:
            raise Exception(f"Vercelデプロイエラー: {result.stderr}")
    except Exception as e:
        print(f"Vercelデプロイエラー: {str(e)}")
        raise
