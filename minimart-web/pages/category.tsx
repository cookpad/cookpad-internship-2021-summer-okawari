import { ChangeEvent, FC } from "react";
import { useCartItemCount } from "../lib/cart";
import { Layout } from "../components/Layout";
import { ProductList } from "../components/ProductList";
import { useCategories } from "../lib/category";
import styles from "./category.module.css";

const CategoryPage: FC = () => {
  const { products, setCategory, categories } = useCategories();
  const { cartItemCount } = useCartItemCount();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      setCategory(event.target.value);
    }
  };

  return (
    <Layout cartItemCount={cartItemCount}>
      <select className={styles.select} onChange={handleChange}>
        <option>カテゴリから探す</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ProductList products={products} />
    </Layout>
  );
};

export default CategoryPage;
