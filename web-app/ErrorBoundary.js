import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // エラー発生時に状態を更新
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーの詳細をコンソールに記録
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>何か問題が発生しました。後でもう一度試してください。</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
