
INSERT INTO courses (id, title, description, level, tags)
VALUES ('api-basics', 'API基礎（AIエージェント開発向け）', 'AIエージェント開発に必須となるREST APIの基礎を、実践的なクイズを通して学びます。', 'beginner', '{"API","HTTP","JSON","AI Agent"}')
ON CONFLICT (id) DO UPDATE SET 
title = EXCLUDED.title, description = EXCLUDED.description, level = EXCLUDED.level, tags = EXCLUDED.tags;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('01_what_is_api', 'api-basics', 1, 'APIとは何か？', 'APIの役割をイメージできる', '
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
', '{"question":"AIエージェントが「明日の天気」を知るために行う正しい行動は？","type":"choice","options":["天気予報サイト（HTML）を目で見て読む","天気予報サービスのAPIにデータをリクエストする","勘で答える"],"correct_answer":"天気予報サービスのAPIにデータをリクエストする","explanation":"AI（プログラム）にとって、人間用のウェブサイト（HTML）はノイズが多く読み取りにくいものです。APIを使えば、整理されたデータを直接やり取りできます。"}', '[{"title":"MDN: APIとは何か","url":"https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Introduction"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('02_http_methods', 'api-basics', 2, 'HTTPメソッド', 'GETとPOSTの使い分けができる', '
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
', '{"question":"AIエージェントに「新しい画像を生成して」と指示する場合、適切なHTTPメソッドは？","type":"choice","options":["GET","POST","DELETE"],"correct_answer":"POST","explanation":"「新しいデータを作る（生成する）」操作にはPOSTを使います。GETは「既にあるデータを見る」場合に使います。"}', '[{"title":"MDN: HTTP リクエストメソッド","url":"https://developer.mozilla.org/ja/docs/Web/HTTP/Methods"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('03_json_structure', 'api-basics', 3, 'JSONの構造', 'JSONが読める・書ける', '
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
', '{"question":"次のJSONのうち、文法的に正しいものはどれ？","type":"choice","options":["{ name: ''GPT'' }","{ \"name\": \"GPT\" }","{ \"name\" = \"GPT\" }"],"correct_answer":"{ \"name\": \"GPT\" }","explanation":"JSONのキーと文字列の値は、必ずダブルクォート `\"` で囲む必要があります。シングルクォート `''` は使えません。"}', '[{"title":"MDN: JSON の操作","url":"https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('04_endpoint_url', 'api-basics', 4, 'エンドポイントとURL', 'リクエスト先の特定ができる', '
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
', '{"question":"OpenAIのエンドポイント `https://api.openai.com/v1/chat/completions` において、`https://api.openai.com` の部分はなんと呼ばれる？","type":"choice","options":["パス (Path)","ベースURL (Base URL)","クエリ (Query)"],"correct_answer":"ベースURL (Base URL)","explanation":"前半の `https://api.openai.com` はサーバーの場所（住所）を示す「ベースURL」、後半の `/v1/...` が具体的な窓口を示す「パス」です。"}', '[{"title":"IBM: API エンドポイントとは","url":"https://www.ibm.com/jp-ja/topics/api-endpoint"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('05_status_codes', 'api-basics', 5, 'ステータスコード', '結果の成否を判断できる', '
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
', '{"question":"APIが「401 Unauthorized」を返してきました。原因として最も可能性が高いのは？","type":"choice","options":["サーバーが故障している","APIキーが間違っている、または無効","リクエストしたデータが見つからない"],"correct_answer":"APIキーが間違っている、または無効","explanation":"401は「認証失敗」です。身分証（APIキー）の提示を忘れたり、有効期限が切れている場合に出ます。"}', '[{"title":"MDN: HTTP ステータスコード","url":"https://developer.mozilla.org/ja/docs/Web/HTTP/Status"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('06_request_parameters', 'api-basics', 6, 'リクエストパラメータ', '欲しいデータを絞り込む', '
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
', '{"question":"APIで「検索結果を最大3件だけ欲しい」と伝える正しい書き方は？","type":"choice","options":["/search?limit=3","/search/limit/3","/search#limit=3"],"correct_answer":"/search?limit=3","explanation":"「？」の後に続く `key=value` の形式を「クエリパラメータ」と呼び、条件を指定するのによく使われます。"}', '[{"title":"MDN: クエリー文字列","url":"https://developer.mozilla.org/ja/docs/Web/API/URL_API/Resolving_relative_references"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('07_headers_auth', 'api-basics', 7, 'ヘッダーと認証', 'APIキーの役割と扱いを理解する', '
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
', '{"question":"APIキーの取り扱いとして**間違っている**ものは？","type":"choice","options":["環境変数に保存してコードから読み込む","GitHubの公開リポジトリにそのままコミットする","HTTPヘッダーにセットして送信する"],"correct_answer":"GitHubの公開リポジトリにそのままコミットする","explanation":"APIキーはクレジットカード番号と同じです。公開されると他人に勝手に使われ、高額な請求が発生する危険があります。絶対にしてはいけません。"}', '[{"title":"Google Cloud: API キーを使用する理由とタイミング","url":"https://cloud.google.com/docs/authentication/api-keys?hl=ja"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('08_request_anatomy', 'api-basics', 8, 'リクエストの解剖', 'リクエストBodyの役割を理解する', '
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
', '{"question":"AIに「こんにちは」と話しかけるとき、そのテキストはリクエストのどこに入れる？","type":"choice","options":["Header（ヘッダー）","Body（ボディ）","URL"],"correct_answer":"Body（ボディ）","explanation":"送りたいデータの中身（メッセージや画像など）は、一番容量の大きい「Body」に入れます。"}', '[{"title":"MDN: HTTP メッセージ","url":"https://developer.mozilla.org/ja/docs/Web/HTTP/Messages"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('09_response_anatomy', 'api-basics', 9, 'レスポンスの解剖', '必要な情報の抽出', '
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
', '{"question":"以下のJSONから、AIの返事「元気です」を取り出す正しいパスは？\n `{\"choices\": [ {\"message\": {\"content\": \"元気です\"}} ]}`","type":"choice","options":["choices.message.content","choices[0].message.content","message.content"],"correct_answer":"choices[0].message.content","explanation":"`choices` は配列（リスト）なので、最初の要素である `[0]` を指定してから中身にアクセスする必要があります。"}', '[{"title":"JSON Pathfinder","url":"https://jsonpathfinder.com/"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;

INSERT INTO steps (id, course_id, "order", title, learning_goal, content_md, quiz, "references")
VALUES ('10_rate_limit_errors', 'api-basics', 10, 'Rate Limitとエラー', '429エラーの対処', '
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
', '{"question":"APIを叩きすぎて「429 To Many Requests」エラーが出ました。AIエージェントはどう振る舞うべき？","type":"choice","options":["エラーをユーザーにそのまま表示して終了する","気にせず即座にリトライし続ける","少し待機（スリープ）してから再試行する"],"correct_answer":"少し待機（スリープ）してから再試行する","explanation":"これを「Exponential Backoff（指数バックオフ）」と呼びます。1秒待つ→2秒待つ→4秒待つ…と間隔を空けることで、サーバーの負荷が下がるのを待ちます。"}', '[{"title":"OpenAI: Rate limits","url":"https://platform.openai.com/docs/guides/rate-limits"}]')
ON CONFLICT (id) DO UPDATE SET
course_id = EXCLUDED.course_id, "order" = EXCLUDED."order", title = EXCLUDED.title, learning_goal = EXCLUDED.learning_goal, content_md = EXCLUDED.content_md, quiz = EXCLUDED.quiz, "references" = EXCLUDED.references;
