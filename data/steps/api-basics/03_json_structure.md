---
id: "step-03"
course_id: "api-basics-agent"
order: 3
title: "JSONの構造"
learning_goal: "JSONが読める・書ける"
quiz:
  question: "次のJSONのうち、文法的に正しいものはどれ？"
  type: "choice"
  options:
    - "{ name: 'GPT' }"
    - "{ \"name\": \"GPT\" }"
    - "{ \"name\" = \"GPT\" }"
  correct_answer: "{ \"name\": \"GPT\" }"
  explanation: "JSONのキーと文字列の値は、必ずダブルクォート `\"` で囲む必要があります。シングルクォート `'` は使えません。"
references:
  - title: "MDN: JSON の操作"
    url: "https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON"
---

# AIとの共通言語 "JSON"

APIを通してAIと会話するためには、**JSON（ジェイソン）** という形式を使います。
人間にとっての「日本語」や「英語」のようなものです。

## 基本文法：KeyとValue
JSONは「ラベル（Key）」と「中身（Value）」のペアで書きます。

```json
{
  "model": "gpt-4o",
  "temperature": 0.7
}
```

*   必ず全体を `{ }` で囲みます。
*   文字は `"` （ダブルクォート）で囲みます。

## リスト（配列）
「複数のデータ」を表すときは `[ ]` を使います。

```json
{
  "messages": [
    { "role": "user", "content": "こんにちは" },
    { "role": "assistant", "content": "どうも" }
  ]
}
```

Chat APIでは、このように「会話の履歴」をリストにしてAIに渡します。カッコの閉じ忘れに注意しましょう。
