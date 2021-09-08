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

    field :pickup_locations, [PickupLocationType], 'すべての受け取り場所を返す', null: false
    def pickup_locations
      PickupLocation.all
    end

    field :categories, [CategoryType], 'すべての商品カテゴリを返す', null: false
    def categories
      Category.all
    end
    
    # 指定されたIDの商品を返すクエリ Product(id: ID!) の定義
    field :category, CategoryType, 'ID で商品カテゴリを引く', null: true do
      argument :id, ID, required: true
    end
    def category(id:)
      Category.find_by(id: id)
    end

    # productをkeywordで曖昧検索する
    field :search_products, [ProductType], '指定されたIDの商品を返す', null: true do
      argument :keyword, String, required: true
    end
    def search_products(keyword:)
      Product.where("name LIKE ? OR description LIKE ?", "%#{keyword}%",  "%#{keyword}%")
    end

    # 指定されたIDの商品を返すクエリ Product(id: ID!) の定義
    field :order, OrderType, '指定されたIDのOrderを返す', null: true do
      argument :id, ID, required: true
    end
    def order(id:)
      # ゴリ押しになってしまったところ
      order = Order.find_by(id: id)
      order_records = order.order_records
      items = []
      order_records.each do |record|
        product = record.product
        quantity = record.quantity
        items.push({product:product, quantity: quantity})
      end
      order.items = items
      order
    end

  end
end
