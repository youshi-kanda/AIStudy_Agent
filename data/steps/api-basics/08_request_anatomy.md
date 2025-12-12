---
id: "step-08"
course_id: "api-basics-agent"
order: 8
title: "リクエストの解剖"
learning_goal: "リクエストBodyの役割を理解する"
quiz:
  question: "AIに「こんにちは」と話しかけるとき、そのテキストはリクエストのどこに入れる？"
  type: "choice"
  options:
    - "Header（ヘッダー）"
    - "Body（ボディ）"
    - "URL"
  correct_answer: "Body（ボディ）"
  explanation: "送りたいデータの中身（メッセージや画像など）は、一番容量の大きい「Body」に入れます。"
references:
  - title: "MDN: HTTP メッセージ"
    url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Messages"
---

# 手紙の「中身」を書く

POSTリクエストでは、**Body（ボディ）** に実際のデータを入れます。
API基礎コースの仕上げとして、OpenAIのChat APIへのリクエストを作ってみましょう。

## 完成形（JSON Body）

```json
{
  "model": "gpt-4o",
  "messages": [
    { "role": "user", "content": "Pythonの勉強法を教えて" }
  ],
  "temperature": 0.5
}
```

## 各パーツの意味
1.  **model**: 誰に頼むか（gpt-4o, gpt-3.5-turbo など）。
2.  **messages**: 会話の中身。`user`（あなた）と`assistant`（AI）の対話履歴。
3.  **temperature**: 創造性の度合い。0に近いと真面目に、1に近いと自由に答えます。

これらをJSON形式で整え、Bodyに入れて送信することで、初めてAIが応答してくれます。
