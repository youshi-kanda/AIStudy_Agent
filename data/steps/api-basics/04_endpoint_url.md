---
id: "step-04"
course_id: "api-basics-agent"
order: 4
title: "エンドポイントとURL"
learning_goal: "リクエスト先の特定ができる"
quiz:
  question: "OpenAIのエンドポイント `https://api.openai.com/v1/chat/completions` において、`https://api.openai.com` の部分はなんと呼ばれる？"
  type: "choice"
  options:
    - "パス (Path)"
    - "ベースURL (Base URL)"
    - "クエリ (Query)"
  correct_answer: "ベースURL (Base URL)"
  explanation: "前半の `https://api.openai.com` はサーバーの場所（住所）を示す「ベースURL」、後半の `/v1/...` が具体的な窓口を示す「パス」です。"
references:
  - title: "IBM: API エンドポイントとは"
    url: "https://www.ibm.com/jp-ja/topics/api-endpoint"
---

# APIの「住所」と「窓口」

手紙を送るには「住所」が必要なように、APIを使うには **URL** が必要です。

## 構造の分解
`https://api.openai.com/v1/images/generations`
というURLを見てみましょう。

1.  **Base URL (住所)**: `https://api.openai.com`
    *   「OpenAI社のサーバー」という場所を指します。
2.  **Path (窓口)**: `/v1/images/generations`
    *   その建物の中にある「画像生成課」という部署を指します。

## エンドポイント（Endpoint）
この「住所 + 窓口」のセットを **エンドポイント** と呼びます。

*   チャットしたいなら → `/v1/chat/completions`
*   音声を文字にしたいなら → `/v1/audio/transcriptions`

AI開発では、ドキュメントを見て「どのエンドポイントに送ればいいか」を探すのが最初のステップです。
