---
id: "step-06"
course_id: "api-basics-agent"
order: 6
title: "リクエストパラメータ"
learning_goal: "欲しいデータを絞り込む"
quiz:
  question: "APIで「検索結果を最大3件だけ欲しい」と伝える正しい書き方は？"
  type: "choice"
  options:
    - "/search?limit=3"
    - "/search/limit/3"
    - "/search#limit=3"
  correct_answer: "/search?limit=3"
  explanation: "「？」の後に続く `key=value` の形式を「クエリパラメータ」と呼び、条件を指定するのによく使われます。"
references:
  - title: "MDN: クエリー文字列"
    url: "https://developer.mozilla.org/ja/docs/Web/API/URL_API/Resolving_relative_references"
---

# 注文の「オプション」指定

「コーヒーをください（GET /coffee）」と言うだけだと、店員さんは困ります。
「ホットで」「ミルク入りで」といった**オプション**を指定する必要があります。これがパラメータです。

## 1. パスパラメータ (Path Parameter)
URLの一部として埋め込む、**必須の情報**です。
*   `/users/123`: IDが123のユーザー
*   `/products/iphone`: iPhoneの商品詳細

スラッシュ `/` で区切られているのが特徴です。

## 2. クエリパラメータ (Query Parameter)
URLの末尾に `?` を付けて指定する、**追加のオプション**です。
*   `/search?keyword=cat`: 「cat」で検索
*   `/history?limit=10&sort=desc`: 履歴を「最新順」に「10件」取得

複数のオプションをつけるときは `&` でつなぎます。
APIドキュメントを読むときは、「必須なのか、任意なのか」に注目しましょう。
