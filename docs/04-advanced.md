# 発展課題

順番通りに取り組む必要はありません。
興味のあるものから手をつけてみてください！
このリストの中にないものでも、興味深いものであれば自由に取り組んでいただいて OK です。

## [発展課題 S] 商品の検索機能（難易度 ★★☆）

商品を検索できる GraphQL クエリを実装してください。
商品の name と description を対象とした検索機能であると良いです。

フロントエンド側については、minimart-web に参考実装を用意しています。
`[発展課題S]` というコメントがついている部分のコメントアウトを解除することで、この実装を利用することができます。
部分的に、あるいは全体を改変したり、まったく独自の実装を作ってもかまいません。

### Hint

- Order 同様、引数を受け取る GraphQL クエリを実装することになります
- where や like を含む SQL を実行することになります
  - Active Record でこれを記述しつつ、意図通りの SQL になっているか Rails のログを確認すると確実です
  - 試行錯誤には Rails console ([Tips](./tips.md)) が便利です

## [発展課題 O] 商品の注文機能（難易度 ★★★）

商品を注文できる機能を実装してください。
minimart-web には参考実装がありますが（`[発展課題O]`）、minimart-api にはこれに対応する API がまだ実装されていません。

- minimart-web/pages/order/[id].tsx
- minimart-web/lib/order.ts

以下のスキーマを実現し、minimart-web/lib/order.ts にある getQuery と postOrder を実行できるようにしてください。

```graphql
type Mutation {
  # Input Object の定義については https://graphql-ruby.org/type_definitions/input_objects.html を参照
  createOrder(input: CreateOrderInput!): CreateOrderPayload
}

input CreateOrderInput {
  clientMutationId: String
  items: [OrderItemInput!]!
  pickupLocationId: ID
}

input OrderItemInput {
  # 注文商品の id
  productId: ID!

  # 注文個数
  quantity: Int!
}

type CreateOrderPayload {
  # A unique identifier for the client performing the mutation.
  clientMutationId: String

  # 確定した注文
  order: Order
}

# 注文
type Order implements Node {
  # 注文キャンセル日時
  canceledAt: ISO8601DateTime

  # 受け取り場所への配達日時
  deliveryDate: ISO8601DateTime!
  id: ID!

  # 注文した商品とその個数のリスト
  items: [OrderItem!]!

  # 注文確定日時
  orderedAt: ISO8601DateTime!

  # 商品の受け取り場所
  pickupLocation: PickupLocation!

  # 合計金額
  totalAmount: Int!

  # 注文したユーザー
  user: User!
}
```

### Hint

- minimart-web を正常に動作させるためには、これらの実装が完了している必要があります
  - 一発でこの状態に持っていくのはなかなか難しいので、まずはクエリの一部分を成功させられるかどうか http://localhost:3001/ を活用して試しながら進めると楽です
- 作る順序としては query が先のほうが楽です
  - テスト用のデータを Rails console で作ると楽かもしれません

## [発展課題 E] エラーハンドリングの強化（難易度 ★★☆）

Hands-on 3 で作成した、受け取り場所を変更する Mutation には以下の問題があります。

- 存在しない `pickup_location_id` が渡された場合に受け取り場所が null になる
- `context[:current_user]` が nil の場合にエラーになる

これらの問題に適切に対応してください。
https://graphql-ruby.org/mutations/mutation_errors.html#raising-errors などを参照しながら自分で実装してみてください。

## [発展課題 X] 自由課題

Minimart にあると良さそうな機能や、技術的に興味深い機能など、自由に実装してください。
