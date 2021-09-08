module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: false
    field :canceled_at, GraphQL::Types::ISO8601DateTime, null: true
    field :delivery_date, GraphQL::Types::ISO8601DateTime, null: true
    field :ordered_at, GraphQL::Types::ISO8601DateTime, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :items, [OrderItemType], null: false
    field :total_amount, Integer, null: false
    field :pickup_location, PickupLocationType, null: true
    field :user, UserType, null: true
    def items
      Loaders::RecordLoader.for(OrderItem).load(object.items) # WIP
    end
  end
end
