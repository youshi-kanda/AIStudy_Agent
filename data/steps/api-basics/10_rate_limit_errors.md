---
id: "step-10"
course_id: "api-basics-agent"
order: 10
title: "Rate Limitとエラー"
learning_goal: "429エラーの対処"
quiz:
  question: "APIを叩きすぎて「429 To Many Requests」エラーが出ました。AIエージェントはどう振る舞うべき？"
  type: "choice"
  options:
    - "エラーをユーザーにそのまま表示して終了する"
    - "気にせず即座にリトライし続ける"
    - "少し待機（スリープ）してから再試行する"
  correct_answer: "少し待機（スリープ）してから再試行する"
  explanation: "これを「Exponential Backoff（指数バックオフ）」と呼びます。1秒待つ→2秒待つ→4秒待つ…と間隔を空けることで、サーバーの負荷が下がるのを待ちます。"
references:
  - title: "OpenAI: Rate limits"
    url: "https://platform.openai.com/docs/guides/rate-limits"
---

# 道路が渋滞しているとき

APIは無限に使える魔法の杖ではありません。
一度に大量のリクエストを送ると、**Rate Limit（利用制限）** に引っかかり、入場規制されます。

## 429 Too Many Requests
「リクエスト多すぎ！少し落ち着いて」というエラーです。
人気のあるAIサービスでは頻繁に遭遇します。

## 正しい対処法：Exponential Backoff
429エラーが出たら、**「少し待ってからやり直す」** プログラムを書くのが鉄則です。

1.  エラーが出た！
2.  1秒待って再送 → ダメなら
3.  2秒待って再送 → ダメなら
4.  4秒待って再送...

この仕組みを実装していないと、あなたのAIアプリはリリース直後に「エラーで使えない」と言われてしまうでしょう。

---
## コース完了おめでとうございます！🎉
これでAPIの基礎知識はバッチリです。
次は実際にコードを書いて、この知識を動くプログラムに変えていきましょう。
