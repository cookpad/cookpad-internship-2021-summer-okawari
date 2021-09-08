import { FC, useEffect, useState } from "react";
import { listProducts, Product, ProductOrderBy } from "../lib/product";
import { useCartItemCount } from "../lib/cart";
import { Layout } from "../components/Layout";
import { ProductList } from "../components/ProductList";
import styles from './index.module.css'
import { classes } from "../lib/classes";

const TopPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderBy, setOrderBy] = useState<ProductOrderBy>('id')
  const { cartItemCount } = useCartItemCount();

  useEffect(() => {
    listProducts(orderBy).then((products) => setProducts(products));
  }, [orderBy]);

  return (
    <Layout cartItemCount={cartItemCount}>
      <div className={styles.sortSelector}>
        <button
          className={classes(styles.sortButton, orderBy === 'id' ? styles.disabledSortButton : undefined)}
          onClick={() => setOrderBy('id')}
          disabled={orderBy === 'id'}>
          新着順
        </button>
        <button
          className={classes(styles.sortButton, orderBy === 'price' ? styles.disabledSortButton : undefined)}
          onClick={() => setOrderBy('price')}
          disabled={orderBy === 'price'}>
          価格の安い順
        </button>
      </div>
      <ProductList products={products} />
    </Layout>
  );
};

export default TopPage;
