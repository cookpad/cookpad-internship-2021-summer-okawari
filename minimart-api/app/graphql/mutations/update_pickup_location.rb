module Mutations
  class UpdatePickupLocation < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false
    field :pickup_location, Types::PickupLocationType, null: true

    # TODO: define arguments
    # argument :name, String, required: true
    argument :pickup_location_id, ID, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    def resolve(pickup_location_id:)
      pickup_location = PickupLocation.find_by(id: pickup_location_id)
      context[:current_user].update(pickup_location: pickup_location)
      { pickup_location: pickup_location }
    end
  end
end
