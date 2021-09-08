module Types
  class OrderItemInputType < Types::BaseObject
    field :id, ID, null: false
    field :product_id, ID, null: false
    field :quantity, Int, null: false
  end
end
