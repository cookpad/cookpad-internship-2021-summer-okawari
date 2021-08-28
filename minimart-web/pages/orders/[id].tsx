import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { getOrder, Order } from "../../lib/order";
import { Layout } from "../../components/Layout";
import styles from "./[id].module.css";
import { useCartItemCount } from "../../lib/cart";

const OrderPage: FC = () => {
  const { cartItemCount } = useCartItemCount();
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const id = router.query.id ? String(router.query.id) : null;

  useEffect(() => {
    if (id === null) return;
    getOrder(id).then((order) => setOrder(order));
  }, [id]);

  if (order === null) return null;

  return (
    <Layout cartItemCount={cartItemCount}>
      <h2 className={styles.head}>注文の詳細</h2>
      <ul>
        <li>注文日時: {order.orderedAt}</li>
        <li>配達日時: {order.deliveryDate}</li>
        <li>受け取り場所: {order.pickupLocation.name}</li>
      </ul>
      <h2 className={styles.head}>注文した商品</h2>
      <ul className={styles.list}>
        {order.items.map((item) => (
          <li className={styles.listItem} key={item.product.id}>
            <img src={item.product.imageUrl} className={styles.image} alt="" />
            <div className={styles.itemContent}>
              <div>
                {item.product.name} {item.product.price}円
              </div>
              <div className={styles.quantity}>{item.quantity}個</div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.amount}>合計: {order.totalAmount}円</div>
    </Layout>
  );
};

export default OrderPage;
