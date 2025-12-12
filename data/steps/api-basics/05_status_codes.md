---
id: "step-05"
course_id: "api-basics-agent"
order: 5
title: "ステータスコード"
learning_goal: "結果の成否を判断できる"
quiz:
  question: "APIが「401 Unauthorized」を返してきました。原因として最も可能性が高いのは？"
  type: "choice"
  options:
    - "サーバーが故障している"
    - "APIキーが間違っている、または無効"
    - "リクエストしたデータが見つからない"
  correct_answer: "APIキーが間違っている、または無効"
  explanation: "401は「認証失敗」です。身分証（APIキー）の提示を忘れたり、有効期限が切れている場合に出ます。"
references:
  - title: "MDN: HTTP ステータスコード"
    url: "https://developer.mozilla.org/ja/docs/Web/HTTP/Status"
---

# サーバーからの「返事」

リクエストを送ると、サーバーは必ず **3桁の数字（ステータスコード）** で結果を報告してくれます。これをチェックしないと、AIがエラーを吐いているのに気づけません。

## 覚えておくべき3つのグループ

### 2xx : 成功 (Success)
*   **200 OK**: 「バッチリ！正常に完了したよ」
*   一番見たい数字です。

### 4xx : あなたのミス (Client Error)
*   **400 Bad Request**: 「リクエスト形式がおかしいよ（JSONの書き間違いなど）」
*   **401 Unauthorized**: 「会員証（APIキー）を見せて。誰かわからないよ」
*   **404 Not Found**: 「そんなエンドポイント（窓口）はないよ」

### 5xx : サーバーのミス (Server Error)
*   **500 Internal Server Error**: 「ごめん、サーバー内部でエラーが起きた。あなたは悪くない」
*   これが出たら、しばらく待ってからリトライするのが一般的です。
