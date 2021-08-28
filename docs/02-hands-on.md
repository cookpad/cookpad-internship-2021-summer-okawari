# ハンズオン

さっそく minimart-api に機能を足していきましょう！
minimart-api は GraphQL を使う準備が済んでいる状態になっています。

## [Hands-on 1] 商品 (Product) へのフィールド追加

この節で完成する Schema の差分は以下の通りです。

```diff
 type Product {
  createdAt: ISO8601DateTime!
+ description: String!
  id: ID!
  imageUrl: String!
  name: String!
+ price: Int!
  updatedAt: ISO8601DateTime!
}
```

商品一覧を見たとき、それぞれの価格が表示されていそうな場所に「円」しか表示されていないことにお気づきでしょうか。
それもそのはず、実は初期実装には商品の価格を返す実装はないのです。
さらにさらに、商品詳細ページに出るはずの商品の説明文も出ていません。惜しい。

実際、 http://localhost:3001/ から以下のようにクエリを実行しても、エラーになってしまいます。

```graphql
query listProducts {
  products {
    id
    name
    description
    price
    imageUrl
  }
}
```

このクエリから description と price を除外するとクエリは成功します。
除外しなくてもクエリが成功するように、実装を進めましょう。

minimart-web 内で `[Hands-on]` で検索してみると、GraphQL API 側の実装を待ち望んでいるコメントがあります。
このコメントアウト部分を戻しても動作するようにするのがこの節の目標です。

実は minimart-api の初期実装では、MySQL の products テーブルにすでに description カラムと price カラムが入っている状態になっています。
Rails console を使って確認してみましょう（使いかたは [tips.md](tips.md) 参照）。

```
% bundle exec rails console
Loading development environment (Rails 6.1.4)
irb(main):001:0> Product.first  # データベース上にある、id が最小の Product を取得
  Product Load (6.0ms)  SELECT `products`.* FROM `products` ORDER BY `products`.`id` ASC LIMIT 1
=>
#<Product:0x0000000109eb7b98
 id: 1,
 name: "にんじん1",
 description: "すごくおいしいにんじん",
 price: 50,
 image_path: "/images/products/1.jpg",
 created_at: Mon, 06 Sep 2021 15:13:21.000000000 JST +09:00,
 updated_at: Mon, 06 Sep 2021 15:13:21.000000000 JST +09:00>
```

せっかくデータがすでにあるのですから、このデータを GraphQL からそのまま参照できるようにしてみます。

### GraphQL クエリのフィールドとして description, price を指定できるようにする

GraphQL スキーマ内の `type Product` は、 [minimart-api/app/graphql/product_type.rb](../minimart-api/app/graphql/product_type.rb) で定義されています。

`field` で 1 つのフィールドを定義することができます。もう雰囲気はわかりましたか？

```diff
 module Types
   class ProductType < Types::BaseObject
     field :id, ID, null: false
     field :name, String, null: false
+    field :description, String, null: false
+    field :price, Int, null: false
     field :image_url, String, null: false
     def image_url
       "http://localhost:3001#{object.image_path}"
     end
     field :created_at, GraphQL::Types::ISO8601DateTime, null: false
     field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
   end
 end
```

これだけです。これだけで `type Product` へのフィールドの追加が完了しました。

フィールドの追加が完了したら、 http://localhost:3001/ をリロードした上で右側の Schema タブを開き、意図通りフィールドが追加されたことを確認しましょう。冒頭のようなスキーマになっていたら正解です。

https://localhost:3001/ から、実際にクエリを実行して、期待しているデータが返ってきているか確認してみましょう。

```graphql
query listProducts {
  products {
    id
    name
    description
    price
    imageUrl
  }
}
```

### minimart-web から呼び出す

ここまできたら minimart-web から呼び出すだけです。
`[Hands-on]` というコメントがついている付近のコードのコメントアウトを Ctrl-/ (Cmd-/) で解除し、ブラウザをリロードしてみます。
商品に価格が表示されていたら大成功です！

このタイミングで、一度 git commit しておきましょう。

## [Hands-on 2] 商品の受け取り場所設定を作る（Query 編）

この節で完成する Schema の差分は以下の通りです。

```diff
+type PickupLocation {
+  id: ID!
+  name: String!
+}
```

クックパッドマートは、注文した商品が駅やコンビニなどの街中に点在する「マートステーション」に配送されるサービスなので、ユーザーに「受け取り場所」を設定してもらう必要があります。

PickupLocation に関する実装は minimart-api のどこにもありません。
MySQL テーブルを作り、対応する Rails モデルを定義するところから始める必要があります。やっていきましょう。

### データベースにカラムを追加する

[minimart-api/db/Schemafile](../minimart-api/db/schemata/Schemafile) ファイルを開いてください。

このファイルはクックパッドでも使われている [Ridgepole](https://github.com/ridgepole/ridgepole) というツールのためのファイルです。
クックパッドでは Rails 標準の migration 機能は使わず、データベースのスキーマの変更履歴を Git で管理する形をとっています。詳しくは [クックパッドにおける最近の ActiveRecord 運用事情](https://techlife.cookpad.com/entry/2014/08/28/194147) という記事をお読みください。

とはいえ、形式としては migration と同一ですから、migration の知識が無駄になることはありません。
string 型 (MySQL 的には varchar(255)) の name カラムをもつ pickup_locations テーブルを作成しましょう。

```diff
+create_table :pickup_locations do |t|
+  t.string :name, null: false
+  t.timestamps
+end
```

同時に users テーブルの定義に「User が指定している PickupLocation」を記録するカラムを足しましょう。

```diff
 create_table :users do |t|
   t.string :name, null: false
+  t.integer :pickup_location_id, null: false, default: 1
   t.timestamps

   t.index :name, unique: true
+  t.index :pickup_location_id
 end
```

`ridgepole:apply` コマンドで、この変更を MySQL に実際に適用します。

```
$ bundle exec rails ridgepole:apply
```

### Active Record モデルの作成

`bundle exec rails ridgepole:apply` で MySQL への適用が完了したら、次は Rails 上にモデルを作成しましょう。

minimart-api/app/models/pickup_location.rb を次のような内容で作成します。

```rb
class PickupLocation < ApplicationRecord
end
```

実装がからっぽのように見えますが、これで正解です。このクラスは ApplicationRecord クラスを継承しており、ApplicationRecord クラスは ActiveRecord::Base クラスを継承しています。
ActiveRecord::Base クラスには、クラスが Active Record として振る舞うための便利なメソッド（たとえば `#find` や `#create` など）が含まれています。
Rails を使う上で、Active Record を使って MySQL からデータを自在に引き出せるようになるのは必須の技術なので、不安な方は [Rails Guides の "CRUD: データの読み書き"](https://railsguides.jp/active_record_basics.html#crud-%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E8%AA%AD%E3%81%BF%E6%9B%B8%E3%81%8D) を参照してください！

実はここで User クラスもを編集しなければならないのでした。

```diff
 class User
+   belongs_to :pickup_location
 end
```

この行を追加することで、 `User.find(1).pickup_location` のような式で User が設定している PickupLocation を引けるようになります。
Active Record のモデルの関連の機能 (belongs_to, has_many, has_one) はこのインターンでも何度か使う必要がありますので、不安な方は [Rails Guides: Active Record の関連付け](https://railsguides.jp/association_basics.html) を開いておくと良いでしょう。

### おまけ: seeds.rb の更新

今回のインターンでは（残念ながら）実際のデータを使うわけにいかないですから、テストデータを生成するスクリプトを db/seeds.rb に用意しています。
PickupLocation に対応したコードも実は用意してあるので、コメントアウトを解除しましょう。

以下のコマンドで初期データを再生成することができます。

```
$ bundle exec rails db:seed
```

このタイミングで、作ってきたテーブル・クラス・データを Rails が認識できているかを Rails console で確認すると、開発がスムーズに進みます。

```
$ bundle exec rails console
```

### GraphQL スキーマへの反映

さて、MySQL や Rails モデルの設定がすんだので、いよいよ GraphQL のスキーマを設定する時です。

……実はこれは GraphQL Ruby の機能で、コマンド一発でできてしまいます。

```
$ bundle exec rails generate graphql:object PickupLocation
```

minimart-api/app/graphql/pickup_location_type.rb が作成されたことが分かるかと思います。
必要な field の定義もありますね。

```rb
module Types
  class PickupLocationType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
```

minimart-api/app/graphql/user_type は手で編集します。

```diff
 module Types
   class UserType < Types::BaseObject
     field :id, ID, null: false
     field :name, String, null: false
+    field :pickup_location, PickupLocationType, null: false
     field :created_at, GraphQL::Types::ISO8601DateTime, null: false
     field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
   end
 end
```

ただし、これだけでは http://localhost:3001/ から確認できる Schema に反映されていないことでしょう。
それもそのはず、ここまでは PickupLocationType を定義しただけで、それを利用するクエリを定義していないからです。

### GraphQL クエリの定義

GraphQL Ruby において、クエリは [app/graphql/query_type.rb](../minimart-api/app/graphql/query_type.rb) ファイルをルートとして定義されます。

以下の部分が、 `products()` クエリと `products(id: ID!)` クエリを定義しているコードです。
前者は ProductType のコレクションを返し、後者は ProductType 1 つ（もしくは null）を返すように定義されています。

```rb
# すべての商品を返すクエリ Products の定義
field :products, [ProductType], 'すべての商品を返す', null: false
def products
  Product.all
end

# 指定されたIDの商品を返すクエリ Product(id: ID!) の定義
field :product, ProductType, '指定されたIDの商品を返す', null: true do
  argument :id, ID, required: true
end
def product(id:)
  Product.find_by(id: id)
end
```

`field :products` と定義したとき、GraphQL Ruby が自動的に `def products` で定義されているメソッドを呼び出す (`products()`) という仕組みになっています。
また `products` メソッドから `Product` の配列を return することで、GraphQL Ruby が自動的に ProductType に定義した fields のルールを適用してくれます。

これを踏まえ、すべての PickupLocation を定義するクエリ (field) を記述しましょう。

```diff
+field :pickup_locations, PickupLocationType, 'すべての受け取り場所を返す', null: false
+def pickup_locations
+  PickupLocation.all
+end
```

これで完成です。 http://localhost:3001/ に戻り、Schema に `pickupLocations()` が出現したことを確認しましょう。クエリができれば完璧です。

勘の鋭いみなさんは `pickup_locations` と snake_case で定義したのにも関わらず、スキーマには `pickupLocations` と camelCase になっていることにお気づきかもしれません。
これは、識別子を camel_case で定義する Ruby の慣習に合わせ、GraphQL Ruby ライブラリが自動変換してくれているからです。

このタイミングでも、一度 git commit しておきましょう。

## [Hands-on 3] 商品の受け取り場所設定を作る（Mutation 編）

最後に、受け取り場所の編集機能をつくります。この節で追加する GraphQL スキーマは以下の通りです。

```graphql
type Mutation {
  updatePickupLocation(
    input: UpdatePickupLocationInput!
  ): UpdatePickupLocationPayload
}

input UpdatePickupLocationInput {
  clientMutationId: String
  pickupLocationId: ID!
}

type UpdatePickupLocationPayload {
  clientMutationId: String
  pickupLocation: PickupLocation
}

type PickupLocation {
  id: ID!
  name: String!
}
```

これも大枠は GraphQL Ruby のジェネレーター機能で生成できます。

```
$ bundle exec rails generate graphql:mutation updatePickupLocation
```

`app/graphql/types/mutation_type.rb` を見ると、以下の 1 行が追加されているはずです。

```ruby
field :update_pickup_location, mutation: Mutations::UpdatePickupLocation
```

先ほど作った Query `pickup_locations` フィールドなどと違い、返り値の型等がなく、代わりに `mutation` オプションに `Mutations::UpdatePickupLocation` が渡されています。

Mutation では副作用を伴う操作を行うため、Query に比べて複雑度が上がります。
そのため、`Types::MutationType` のメソッドにするのではなく、`Mutations::UpdatePickupLocation` のクラスにリゾルバを委譲しています（Query でも同様のことは可能です）。

委譲先の `app/graphql/mutations/update_pickup_location.rb` は次のようになっています。

```ruby
module Mutations
  class UpdatePickupLocation < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
  end
end
```

`Mutations::UpdatePickupLocation` は `Mutations::BaseMutation` を継承しており、これはさらに `GraphQL::Schema::RelayClassicMutation` を継承しています。
GraphQL Ruby には Mutation のクラスとして `GraphQL::Schema::Mutation` と `GraphQL::Schema::RelayClassicMutation` の 2 つがあり、後者は [Relay](https://relay.dev/) の規約をサポートします。
先述のスキーマにある `clientMutationId` などは、`GraphQL::Schema::RelayClassicMutation` により自動的に追加・処理されます。

引数と返り値のフィールドを定義していきましょう。
引数は `argument` で定義します。
`field` と似ていますが、non-null の場合は `required: true` のオプションを渡します。

```diff
 module Mutations
   class UpdatePickupLocation < BaseMutation
+    field :pickup_location, Types::PickupLocationType, null: true
+
+    argument :pickup_location_id, ID, required: true
   end
 end
```

続いて、リゾルバを定義します。
メソッド `#resolve` がリゾルバになり、必要な操作を行なったうえでフィールドと一致する Hash を返すようにします。
GraphQL の引数はリゾルバにキーワード引数として渡されます。

```diff
 module Mutations
   class UpdatePickupLocation < BaseMutation
+    field :pickup_location, Types::PickupLocationType, null: true
+
+    argument :pickup_location_id, ID, required: true
+
+    def resolve(pickup_location_id:)
+      pickup_location = PickupLocation.find_by(id: pickup_location_id)
+      context[:current_user].update(pickup_location: pickup_location)
+      { pickup_location: pickup_location }
+    end
   end
 end
```

## context と current_user について

`context[:current_user]` という見慣れないオブジェクトが登場しましたね。

minimart API では、擬似的な認証としてリクエストヘッダー `X-User-Name` の値をリクエストしたユーザーの名前とみなすようになっています（もちろん、容易に他人に成りすませてしまうので、本番環境で稼働するアプリケーションで同様の手段を用いてはいけません）。

こうした GraphQL クエリ外のアプリケーション特有の値は、`context` としてクエリの実行時に渡すと、リゾルバからアクセスできるようになります。
minimart-api では、 `GraphqlController#execute` で `context` ハッシュ（JavaScript でいうところのオブジェクト）の `:current_user` にユーザーオブジェクトを入れて `MinimartSchema.execute` に渡すようになっています。

```rb
query = params[:query]
operation_name = params[:operationName]
context = {
  current_user: current_user,
}
result = MinimartSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
render json: result

```

実は、`#current_user` は継承元の `ApplicationController` で事前に実装済みのため、`GraphqlController#execute` の当該部分をコメントを外すだけで構いません。
`#current_user` の実装が気になる方は [`app/controllers/application_controller.rb`](../minimart/app/controllers/application_controller.rb) を見てください。

さて、ここまでの変更で、 `current_user` のデフォルトの受け取り場所を変更し、`pickup_location` を返すことができるはずです 🎉
http://localhost:3001/ で動作確認してみましょう。

---

[基本課題へ](03-basic.md)

```

```
