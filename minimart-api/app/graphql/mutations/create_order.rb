module Mutations
  class CreateOrder < BaseMutation
    field :create_order, Types::OrderType, null: true

    argument :pickup_location_id, ID
    argument :items, [OrderItemInput]

    def resolve(**args)
      # TODO: argument以外のカラムは計算で登録
      # current_user = context[:current_user]
    end
  end
end
