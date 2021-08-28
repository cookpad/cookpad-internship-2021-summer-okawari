import { FC, ChangeEvent } from "react";
import { useCartItemCount } from "../lib/cart";
import { Layout } from "../components/Layout";
import { useCurrentUser } from "../lib/user";
import { usePickupLocations } from "../lib/pickupLocation";
import styles from "./user.module.css";

const UserPage: FC = () => {
  const { pickupLocations } = usePickupLocations();
  const { currentUser, updatePickupLocation } = useCurrentUser();
  const { cartItemCount } = useCartItemCount();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    updatePickupLocation(value);
  };

  if (currentUser === null) return null;

  return (
    <Layout cartItemCount={cartItemCount}>
      <h2 className={styles.head}>ユーザー名</h2>
      <div className={styles.content}>{currentUser.name}</div>

      <h2 className={styles.head}>受け取り場所の設定</h2>
      <div className={styles.content}>
        <select className={styles.select} value={currentUser.pickupLocation.id} onChange={handleChange}>
          {pickupLocations.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </Layout>
  );
};

export default UserPage;
