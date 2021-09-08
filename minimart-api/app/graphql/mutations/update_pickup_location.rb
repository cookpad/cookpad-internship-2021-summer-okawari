module Mutations
  class UpdatePickupLocation < BaseMutation
    field :pickup_location, Types::PickupLocationType, null: true

    argument :pickup_location_id, ID, required: true

    def resolve(pickup_location_id:)
      pickup_location = PickupLocation.find_by(id: pickup_location_id)
      raise GraphQL::ExecutionError.new("pickup location is not exist.") if pickup_location.nil?

      current_user = context[:current_user]
      raise GraphQL::ExecutionError.new("current user is invalid.") if current_user.nil?
      current_user.update(pickup_location: pickup_location)

      { pickup_location: pickup_location }
    end
  end
end
