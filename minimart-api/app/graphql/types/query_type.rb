module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :viewer, Types::UserType, 'リクエストしたユーザー自身を返す', null: true
    def viewer
      # context は GraphqlController で定義されている
      context[:current_user]
    end

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

    # すべてのPickupLocationを定義するクエリ pickup locationsの定義
    field :pickup_locations, [PickupLocationType], 'すべての受け取り場所を返す', null: false
    def pickup_locations
      PickupLocation.all
    end

    # categoriesの定義
    field :categories, [CategoryType], 'すべての商品カテゴリを返す', null: false
    def categories
      Category.all
    end

    # category(id)の定義
    field :category, CategoryType, 'idで商品カテゴリを返す', null: false do
      argument :id, ID, required: true
    end
    def category(id:)
      Category.find_by(id: id)
    end

    field :search_products, [ProductType], 'name, descriptionでproductを検索', null: false do
      argument :query, String, required: true
    end
    def search_products(query:)
      Product.where('name like ?', "%#{query}%").or(Product.where('description like ?', "%#{query}%"))
    end

    field :order, OrderType, 'idに応じて注文を表示', null: false do
      argument :id, ID, required: true
    end
    def order(id:)
      Order.find_by(id: id)
    end
    
  end
end
