require "date"

module Mutations
  class CreateOrder < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    field :order, Types::OrderType, null: false
    argument :items, [OrderItemType], required: true

    def resolve(items:)
      current_user = context[:current_user]
      total_amount = 0
      items.each do |item|
        price = Product.find_by(id: item.product_id)
        total_amount += price * item.quantity
      end
      order = Order.create(user: current_user, items: items, pickup_location: current_user.pickup_location, total_amount: total_amount, ordered_at: DateTime.now, delivery_date: DateTime.now)
    end
  end
end
