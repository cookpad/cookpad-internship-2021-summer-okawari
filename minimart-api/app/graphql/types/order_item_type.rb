module Types
  class OrderItemType < Types::BaseObject
    field :product, ProductType, null: false
    field :quantity, Int, null: false
  end
end
