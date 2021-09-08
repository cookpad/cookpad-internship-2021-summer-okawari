module Mutations
  class CreateOrder < BaseMutation
    field :order, Types::OrderType, null: true

    argument :items, [Types::OrderItemInputType], required: true
    argument :pickup_location_id, ID, required: true
    
    def resolve(items:, pickup_location_id:)
      total_amount = items.map(&:quantity).sum

      # 自分でInputType作ったらRubyのオブジェクトに戻さないといけなくなった
      items_ruby_hashed = items.map{ |item|
        {'product_id': item.product_id, 'quantity': item.quantity}
      }

      # orderを作成
      order = context[:current_user].orders.build(pickup_location_id: pickup_location_id, total_amount: total_amount)
      
      # orderを保存し、itemsをorder_recordsに記録する
      if order.save && order.order_records.create(items_ruby_hashed)
        # order.itemsを作る
        order.create_items
        { order: order }
      else
        raise "orderの登録に失敗"
      end
    end
  end
end
