module Mutations
  class UpdatePickupLocation < BaseMutation
    # 返り値のフィールドの設定
    field :pickup_location, Types::PickupLocationType, null: true

    # 引数の設定
    argument :pickup_location_id, ID, required: true

    # リゾルバの設定(このエンドポイントがよばれたときに動く部分?)
    def resolve(pickup_location_id:)
      pickup_location = PickupLocation.find_by(id: pickup_location_id)
      if pickup_location.nil? || context[:current_user].nil?
        raise GraphQL::ExecutionError, pickup_location.errors.full_messages.join(", ")
      end
      context[:current_user].update(pickup_location: pickup_location)
      { pickup_location: pickup_location }
    end
  end
end
