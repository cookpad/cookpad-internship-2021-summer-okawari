import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct, Product } from "../../lib/product";
import { addToCart, useCartItemCount } from "../../lib/cart";
import { Layout } from "../../components/Layout";
import styles from "./[id].module.css";

const ProductPage: FC = () => {
  const router = useRouter();
  const id = router.query.id ? String(router.query.id) : null;
  const [product, setProduct] = useState<Product | null>(null);
  const { cartItemCount, updateCartItemCount } = useCartItemCount();

  const handleAddToCart = (product: Product): void => {
    addToCart(product);
    updateCartItemCount();
  };

  useEffect(() => {
    if (id === null) return;
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  if (product === null) return null;

  return (
    <Layout cartItemCount={cartItemCount}>
      <img src={product.imageUrl} alt={`${product.name}の写真`} className={styles.image} />
      <div className={styles.product}>
        <h2>{product.name}</h2>
        <p>{product.price}円</p>
        <p>{product.description}</p>
        <button className={styles.addCartBtn} onClick={() => handleAddToCart(product)}>
          カートに追加する
        </button>
      </div>
    </Layout>
  );
};

export default ProductPage;
