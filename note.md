```
query viewer {
  viewer {
    id
    name
    pickupLocation {
      name
    }
  }
}
```
pickupLocatiuonは中身を指定する

資料が違ってて `[PickupLocationType]` だったhands-on 2

hands-on 3の理解がまだ。リゾルバを定義します、から
hands-on 3終わり
```
module Types
  class CategoryType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :products, [ProductType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
```

```
"message": "          Failed to implement Category.products, tried:\n\n          - `Types::CategoryType#products`, which did not exist\n          - `Product#products`, which did not exist\n          - Looking up hash key `:products` or `\"products\"` on `#<Product:0x00007fab680a1d90>`, but it wasn't a Hash\n\n          To implement this field, define one of the methods above (and check for typos)\n",
```