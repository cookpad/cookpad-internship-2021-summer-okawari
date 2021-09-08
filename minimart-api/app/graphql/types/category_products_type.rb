module Types
  class CategoryProductsType < Types::BaseObject
    field :products, [ProductType], null: false
  end
end
