module Types
  class MutationType < Types::BaseObject
    field :update_pickup_location, mutation: Mutations::UpdatePickupLocation
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
