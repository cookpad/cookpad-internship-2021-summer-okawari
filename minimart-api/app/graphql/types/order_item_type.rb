module Types
  class OrderItemType < Types::BaseObject
    field :id, ID, null: false
    field :product, ProductType, null: false
    field :quantity, Integer, null: false
    field :order, OrderType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
