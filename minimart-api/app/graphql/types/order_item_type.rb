module Types
  class OrderItemType < Types::BaseObject
    field :id, ID, null: false
    field :product_id, Integer, null: false
    field :quantity, Integer, null: false
  end
end
