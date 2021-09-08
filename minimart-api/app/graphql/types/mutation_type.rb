module Types
  class MutationType < Types::BaseObject
    field :update_pickup_location, mutation: Mutations::UpdatePickupLocation
  end
end
