---
id: "step-01"
course_id: "api-basics-agent"
order: 1
title: "APIとは何か？"
learning_goal: "APIの役割をイメージできる"
quiz:
  question: "AIエージェントが「明日の天気」を知るために行う正しい行動は？"
  type: "choice"
  options:
    - "天気予報サイト（HTML）を目で見て読む"
    - "天気予報サービスのAPIにデータをリクエストする"
    - "勘で答える"
  correct_answer: "天気予報サービスのAPIにデータをリクエストする"
  explanation: "AI（プログラム）にとって、人間用のウェブサイト（HTML）はノイズが多く読み取りにくいものです。APIを使えば、整理されたデータを直接やり取りできます。"
references:
  - title: "MDN: APIとは何か"
    url: "https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Introduction"
---

# API = AIの「目」であり「手」である

## 1. レストランのウェイター
API（Application Programming Interface）は、よく**レストランのウェイター**に例えられます。

*   **あなた（AI）**: お客さん。「何か食べたい（データが欲しい）」
*   **厨房（サーバー）**: 料理（データ）を作るところ。
*   **API（ウェイター）**: あなたの注文を厨房に伝え、出来上がった料理をあなたに運ぶ仲介役。

もしウェイターがいなかったら、あなたは厨房勝手口に入り込んで、シェフに直接交渉しなければなりません。それは大変ですし、厨房も困ります。
APIという「決まった窓口」があるおかげで、スムーズに注文（リクエスト）ができるのです。

## 2. なぜAI開発にAPIが必要？
ChatGPTなどのAIは非常に賢いですが、**「今現在の世界」**を知りません。
学習データは過去のものだからです。

しかし、AIが「検索API」や「天気API」という道具（ツール）を使えるようになったらどうでしょう？
AIはAPIを通じて「今のニュース」や「明日の天気」を知り、ユーザーに教えることができます。

**AIエージェント開発とは、AIに適切なAPI（道具）を持たせること**と言っても過言ではありません。
