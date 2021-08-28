import { FC } from "react";
import { clearCart, useCartItemCount, useCartItems } from "../lib/cart";
import styles from "./cart.module.css";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import { createOrder } from "../lib/order";

const CartPage: FC = () => {
  const router = useRouter();
  const { cartItemCount, updateCartItemCount } = useCartItemCount();
  const { cartItems, updateQuantity, amount } = useCartItems();

  const handleIncrementItem = (item: typeof cartItems[number]) => {
    updateQuantity(item, (q) => q + 1);
    updateCartItemCount();
  };

  const handleDecrementItem = (item: typeof cartItems[number]) => {
    updateQuantity(item, (q) => (q > 0 ? q - 1 : q));
    updateCartItemCount();
  };

  const handleSubmitOrder = async () => {
    const order = await createOrder(cartItems);
    router.push(`/orders/${order.id}`);
    clearCart();
  };

  return (
    <Layout cartItemCount={cartItemCount}>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li className={styles.listItem} key={item.product.id}>
            <img src={item.product.imageUrl} className={styles.image} alt="" />
            <div className={styles.itemContent}>
              <div>
                {item.product.name} {item.product.price}円
              </div>
              <div className={styles.quantity}>
                <span>{item.quantity}個</span>
                <button onClick={() => handleIncrementItem(item)} className={styles.quantityBtn}>
                  +
                </button>
                <button onClick={() => handleDecrementItem(item)} className={styles.quantityBtn}>
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.amount}>合計: {amount}円</div>
      <div className={styles.orderButtonWrapper}>
        <button className={styles.orderButton} onClick={handleSubmitOrder}>
          注文する
        </button>
      </div>
    </Layout>
  );
};

export default CartPage;
