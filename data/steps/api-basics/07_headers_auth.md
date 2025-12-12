---
id: "step-07"
course_id: "api-basics-agent"
order: 7
title: "ヘッダーと認証"
learning_goal: "APIキーの役割と扱いを理解する"
quiz:
  question: "APIキーの取り扱いとして**間違っている**ものは？"
  type: "choice"
  options:
    - "環境変数に保存してコードから読み込む"
    - "GitHubの公開リポジトリにそのままコミットする"
    - "HTTPヘッダーにセットして送信する"
  correct_answer: "GitHubの公開リポジトリにそのままコミットする"
  explanation: "APIキーはクレジットカード番号と同じです。公開されると他人に勝手に使われ、高額な請求が発生する危険があります。絶対にしてはいけません。"
references:
  - title: "Google Cloud: API キーを使用する理由とタイミング"
    url: "https://cloud.google.com/docs/authentication/api-keys?hl=ja"
---

# 封筒の「宛名」と「会員証」

APIリクエストには、データ本体（Body）とは別に、**Header（ヘッダー）** という宛名書きエリアがあります。
ここで最も重要なのが **認証情報** です。

## Authorization ヘッダー
有料のAPI（OpenAIなど）を使うには、必ず「これは私です」という証明書（APIキー）を添える必要があります。

```http
Authorization: Bearer sk-abc12345...
```

*   **Bearer**: 「このキーを持っている人（Bearer）に従え」という意味の合言葉。
*   **API Key**: あなた専用の秘密のパスワード。

## Content-Type ヘッダー
サーバーに対して「今から送るデータはJSONですよ」と宣言します。

```http
Content-Type: application/json
```

これを忘れると、サーバーは「変なデータが来た」と思ってエラー（400 Bad Request）を返すことがあります。
