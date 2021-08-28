# 基本課題

## カテゴリによる絞り込み機能

minimart-web には商品をカテゴリで探す機能（右上のにんじんアイコン）がありますが、minimart-api にはこれに対応する API がまだ実装されていません。

以下の 2 つの Query を実行できるよう、minimart-api に実装を加えてください。

```graphql
# すべての商品カテゴリを返す
query getCategories {
  categories {
    id
    name
  }
}

# ID で商品カテゴリを引く
query getCategoryProducts($categoryId: ID!) {
  category(id: $categoryId) {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
}
```

### Hint

- MySQL に categories テーブルを作成し
  - 作成の仕方は Hands-on 2 参照
- Rails で Category モデルを作り、Product モデルとの関連を設定し
- GraphQL で Category をクエリできるよう、CategoryType を作成し
  - これも Hands-on 2 (`rails generate graphql:object`) 参照
- すべてのカテゴリを取得できる GraphQL クエリ (`categories()`) を実装し
- カテゴリの ID を引数にとり、そのカテゴリに属する Product の一覧を得る GraphQL クエリ (`category(id: ID!)`) を実装する

という手順が進めやすいかと思います。適宜 rails console や GraphQL Playground (https://localhost:3001/) を活用してください。

Category のスキーマは以下のようなものになります。

```graphql
# 商品カテゴリ
type Category implements Node {
  id: ID!

  # カテゴリ名
  name: String!

  # カテゴリに属するすべての商品
  products: [Product!]!
}
```

---

[発展課題へ](04-advanced.md)
