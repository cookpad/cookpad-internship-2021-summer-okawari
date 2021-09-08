module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :viewer, Types::UserType, "リクエストしたユーザー自身を返す", null: true

    def viewer
      # context は GraphqlController で定義されている
      context[:current_user]
    end

    # すべての商品を返すクエリ Products の定義
    field :products, [ProductType], "すべての商品を返す", null: false

    def products
      Product.all
    end

    # 指定されたIDの商品を返すクエリ Product(id: ID!) の定義
    field :product, ProductType, "指定されたIDの商品を返す", null: true do
      argument :id, ID, required: true
    end

    def product(id:)
      Product.find_by(id: id)
    end

    field :pickup_locations, [PickupLocationType], "すべての受け取り場所を返す", null: false

    def pickup_locations
      PickupLocation.all
    end
  end
end
