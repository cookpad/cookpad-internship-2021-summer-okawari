module Mutations
  class CreateOrder < BaseMutation
    # 返り値のフィールドの設定
    field :order, Types::OrderType, null: true

    # 引数の設定
    argument :product_id, ID, required: true
    argument :quantity, Integer, required: true

    # リゾルバの設定(このエンドポイントがよばれたときに動く部分?)
    def resolve(product_id:, quantity:)
      # TODO: トランザクションをはる
      # TODO: Orderを作成する
      order = Order.new()
      order.order_at = Time.current

      # userの存在確認 & user_idの取得
      user = context[:current_user]
      if user.nil?
        raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
      end
      order.user_id = user.id

      # TODO: 必要なItemを作成する
      item = OrderItem.new()

      # TODO: Orderをsaveする
    end
  end
end
