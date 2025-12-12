---
id: "step-02"
course_id: "api-basics-agent"
order: 2
title: "HTTPメソッド"
learning_goal: "GETとPOSTの使い分けができる"
quiz:
  question: "AIエージェントに「新しい画像を生成して」と指示する場合、適切なHTTPメソッドは？"
  type: "choice"
  options:
    - "GET"
    - "POST"
    - "DELETE"
  correct_answer: "POST"
  explanation: "「新しいデータを作る（生成する）」操作にはPOSTを使います。GETは「既にあるデータを見る」場合に使います。"
references:
  - title: "MDN: HTTP リクエストメソッド"
    url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Methods"
---

# 「ください」と「やって」の違い

APIへの頼み方（メソッド）にはいくつか種類がありますが、AI開発で使うのは主に2つだけです。

## 1. GET（ゲット）：情報を「ください」
「今の天気は？」「私のユーザーIDは？」など、**データを取得する**ときに使います。
サーバー上のデータは変化しません（読み取り専用）。

*   **例**: `GET /weather` （天気を教えて）

## 2. POST（ポスト）：仕事を「やって」
「このテキストを要約して」「画像を生成して」など、**データを送信して処理を依頼する**ときに使います。
データが新しく作られたり、状態が変化したりします。

*   **例**: `POST /chat/completions` （このプロンプトで返信を作って）

## 重要なルール
AI（LLM）へのリクエストは、ほとんどが **POST** です。
なぜなら、「プロンプトという長い文章を送って、AIに回答を作らせる」という作業だからです。
