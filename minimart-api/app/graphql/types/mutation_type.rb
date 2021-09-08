module Types
  class MutationType < Types::BaseObject
    # TODO: create_orderの実装
    # field :create_order, mutation: Mutations::CreateOrder
    field :update_pickup_location, mutation: Mutations::UpdatePickupLocation
  end
end
