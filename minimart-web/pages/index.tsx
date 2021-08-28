import { FC, useEffect, useState } from "react";
import { listProducts, Product } from "../lib/product";
import { useCartItemCount } from "../lib/cart";
import { Layout } from "../components/Layout";
import { ProductList } from "../components/ProductList";

const TopPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItemCount } = useCartItemCount();

  useEffect(() => {
    listProducts().then((products) => setProducts(products));
  }, []);

  return (
    <Layout cartItemCount={cartItemCount}>
      <ProductList products={products} />
    </Layout>
  );
};

export default TopPage;
