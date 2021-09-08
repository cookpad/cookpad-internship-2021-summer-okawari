module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: false
    field :canceled_at, GraphQL::Types::ISO8601DateTime, null: true
    field :delivery_date, GraphQL::Types::ISO8601DateTime, null: false
    field :ordered_at, GraphQL::Types::ISO8601DateTime, null: false
    field :total_amount, Integer, null: false
    field :pickup_location_id, Integer, null: false
    field :user_id, Integer, null: false
    field :items, [Types::OrderItem], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
