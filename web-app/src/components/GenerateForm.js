import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function GenerateForm() {
  const [step, setStep] = useState(1); // 現在のステップ（1: URL入力, 2: テキスト入力）
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpreadsheetSubmit = (e) => {
    e.preventDefault();
    setStep(2); // 次のステップへ
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          spreadsheet_url: spreadsheetUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: `サイトが作成されました: ${data.url}` });
      } else {
        setMessage({ type: "error", text: `エラー: ${data.detail}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "通信エラーが発生しました。" });
    } finally {
      setLoading(false);
    }
  };

  // アニメーションの設定
  const slideVariants = {
    hidden: (custom) => ({
      x: custom > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (custom) => ({
      x: custom > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };
  

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden bg-animated">
        
    <AnimatePresence mode="wait">
  {step === 1 && (
    <motion.div
      key="step1"
      className="absolute w-full flex justify-center"
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={1}
    >
      {/* スプレッドシート入力画面 */}
      <form
  onSubmit={handleSpreadsheetSubmit}
  className="bg-black/50 backdrop-blur-lg p-10 rounded-lg shadow-lg max-w-[800px] mx-auto text-gray-200 transform scale-110"
>
    
  <div className="mb-6">
    <label className="block font-bold text-lg mb-4">スプレッドシートのURL　
        <br />
        <br />※下記のメールアドレスを編集者に設定してください
        <br />
    <br />"yusukekikuta-05-gmail-com@web-auto-445312.iam.gserviceaccount.com"</label>
    <input
      type="text"
      value={spreadsheetUrl}
      onChange={(e) => setSpreadsheetUrl(e.target.value)}
      className="w-full px-60 py-3 border-none rounded focus:outline-none bg-gray-700 text-gray-200 text-lg"
      placeholder="スプレッドシートのURLを入力してください"
      required
    />
  </div>
  <button
    type="submit"
    className="w-full py-3 px-6 rounded font-bold bg-gradient-to-r from-[#FB0074] to-[#5E0B4D] text-white hover:opacity-90 text-lg"
  >
    次へ
  </button>
</form>

    </motion.div>
  )}

  {step === 2 && (
    <motion.div
      key="step2"
      className="absolute w-full flex justify-center"
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={-1}
    >
      {/* テキスト入力画面 */}
      <form
  onSubmit={handleSubmit}
  className="bg-black/50 backdrop-blur-lg p-6 rounded-lg shadow-lg max-w-[900px] mx-auto text-gray-200"
>
  <div className="mb-4">
    <label className="block font-bold mb-2 flex flex-col items-center">タイトル</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-4 py-2 border-none rounded focus:outline-none bg-gray-700 text-gray-200"
      placeholder="ウェブサイトのタイトル"
      required
    />
  </div>
  <div className="mb-6">
    <label className="block font-bold text-lg mb-3 flex flex-col items-center">コンテンツ</label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-[850px] px-6 py-4 border-none rounded-lg focus:outline-none bg-gray-700 text-gray-200 placeholder-gray-400 text-lg shadow-sm focus:ring-2 focus:ring-[#FB0074]"
      placeholder="ウェブサイトのコンテンツを入力してください..."
      rows="6"
      required
    />
  </div>
  <div className="flex justify-center">
  <button
    type="submit"
    className="w-[300px] py-4 px-6 rounded-lg font-bold bg-gradient-to-r from-[#FB0074] to-[#5E0B4D] text-white hover:opacity-90"
  >
    サイト生成
  </button>
  </div>
</form>

    </motion.div>
  )}
</AnimatePresence>



      {/* メッセージ表示 */}
      {message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

export default GenerateForm;
