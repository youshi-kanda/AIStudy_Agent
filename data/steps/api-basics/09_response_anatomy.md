---
id: "step-09"
course_id: "api-basics-agent"
order: 9
title: "レスポンスの解剖"
learning_goal: "必要な情報の抽出"
quiz:
  question: "以下のJSONから、AIの返事「元気です」を取り出す正しいパスは？\n `{\"choices\": [ {\"message\": {\"content\": \"元気です\"}} ]}`"
  type: "choice"
  options:
    - "choices.message.content"
    - "choices[0].message.content"
    - "message.content"
  correct_answer: "choices[0].message.content"
  explanation: "`choices` は配列（リスト）なので、最初の要素である `[0]` を指定してから中身にアクセスする必要があります。"
references:
  - title: "JSON Pathfinder"
    url: "https://jsonpathfinder.com/"
---

# 宝探し：必要なデータはどこ？

AIからの返事は、巨大なJSONで返ってきます。
その中から**「本当に欲しいテキスト」**だけをピンセットで取り出す必要があります。

## OpenAIのレスポンス例（簡略版）

```json
{
  "id": "chatcmpl-123",
  "created": 1677652288,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Pythonは実際に書いて動かすのが一番です！"
      },
      "finish_reason": "stop"
    }
  ]
}
```

## 読み解き方
1.  一番外側の `{}` を見る。
2.  `choices` というリストを探す。
3.  その `0` 番目の要素を見る。
4.  その中の `message` の中の `content` を見る。

プログラムで書くと `response.choices[0].message.content` となります。
この「パスの指定」を間違えると、AIエージェントは何も喋ってくれません。
