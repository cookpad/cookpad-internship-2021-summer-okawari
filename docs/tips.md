# Tips

## 困ったときのドキュメント

- Ruby 関連
  - [Ruby 3.0.0 リファレンスマニュアル](https://docs.ruby-lang.org/ja/3.0.0/doc/index.html)
    - 日本語版の API リファレンス
  - [Ruby API](https://rubyapi.org/)
    - 検索しやすくて便利な API リファレンス
- Rails 関連
  - [Rails Guides](https://railsguides.jp/)
    - 今回のインターンでは [Active Record の基礎](https://railsguides.jp/active_record_basics.html) が特に役立つと思います
  - [Ruby on Rails API](https://api.rubyonrails.org/)
- GraphQL 関連
  - [GraphQL](https://graphql.org/learn/)
    - GraphQL 自体の文法やクエリについて
  - [GraphQL Ruby](https://graphql-ruby.org/)
    - Rails に組み込んで使っている Gem のドキュメント
- React 関連
  - https://ja.reactjs.org/

## Rails でのデバッグ (Console 編)

新しいターミナルを開き、 `bundle exec rails console` コマンドを実行すると Rails のコンソールを開くことができます。
このコンソール内では、任意の Ruby の式を評価することができます。
例えば「どんなユーザーがデータベースに入っているか」を調べたいとき、以下のように `User.all` を実行できます（ `User.all` はすべての User を返すメソッドです）。

```
$ bundle exec rails console
Loading development environment (Rails 6.1.4)
irb(main):001:0> User.all
  User Load (15.8ms)  SELECT `users`.* FROM `users`
=> []
irb(main):002:0>
```

`exit` を実行することで終了することができます。

## Rails でのデバッグ (binding.irb 編)

アプリケーションコード中に `binding.irb` という式を挿入すると、当該箇所で実行を一時停止し、デバッグ用のコンソールを開くことができます。
変数の中身が意図通りになっていない気がするときなどに有用です。
ブラウザの JavaScript における `debugger;` 文と似ていると考えると分かりやすいかもしれません。

```rb
def pickup_locations
  pl = PickupLocation.all
  binding.irb  # ここでデバッガを起動
  pl  # return
end
```

このようにすると、pickup_locations メソッドが実行されたとき、 `rails server` の出力の中にコンソールが出現します。
使いかたは上述の Rails console と同様です。終了するときは `exit` である点も同様です。
