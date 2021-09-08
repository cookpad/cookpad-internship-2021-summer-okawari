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
    field :products, [ProductType], 'すべての商品を返す（新着順）', null: false
    def products
      Product.order(id: :desc)
    end

    field :cheapestOrderedProducts, [ProductType], 'すべての商品を返す（価格の安い順）', null: false
    def cheapestOrderedProducts
      Product.order(price: :asc)
    end

    # 指定されたIDの商品を返すクエリ Product(id: ID!) の定義
    field :product, ProductType, '指定されたIDの商品を返す', null: true do
      argument :id, ID, required: true
    end
    def product(id:)
      Product.find_by(id: id)
    end

    field :pickupLocations, [PickupLocationType], 'すべての受け取り場所を返す', null: false
    def pickupLocations
      PickupLocation.all
    end

    field :categories, [CategoryType], 'すべてのカテゴリを返す', null: false
    def categories
      Category.all
    end

    field :category, CategoryProductsType, '指定されたIDのカテゴリに属する商品を返す', null: true do
      argument :id, ID, required: true
    end
    def category(id:)
      { products: Product.where(category_id: id) }
    end

    field :searchProducts, [ProductType], '入力された検索ワードに関連のある商品を返す', null: true do
      argument :query, String, required: true
    end
    def searchProducts(query:)
      Product
        .where('description like ?', "%#{query}%")
        .or(Product.where('name like ?', "%#{query}%"))
    end
  end
end
