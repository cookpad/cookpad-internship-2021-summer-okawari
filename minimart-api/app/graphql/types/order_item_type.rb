module Types
  class OrderItemType < Types::BaseObject
    field :id, ID, null: false
    field :quantity, Integer, null: false
    field :product_id, Integer, null: false
    field :order_id, Integer, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
