module Types
  class MutationType < Types::BaseObject
    field :create_order, mutation: Mutations::CreateOrder
    field :update_pickup_location, mutation: Mutations::UpdatePickupLocation
  end
end
