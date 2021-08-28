import { FC } from "react";
import Link from "next/link";
import { Product } from "../lib/product";
import styles from "./ProductList.module.css";

type Props = {
  products: Product[];
};

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.listItem}>
          <Link href={`/products/${product.id}`}>
            <a className={styles.link}>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
                <div className={styles.price}>{product.price}円</div>
              </div>
              <div className={styles.productName}>{product.name}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
