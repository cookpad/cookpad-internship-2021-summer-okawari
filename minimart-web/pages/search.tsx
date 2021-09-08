import { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./search.module.css";
import { Product } from "../lib/product";
import { searchProducts } from "../lib/productSearch";
import { useCartItemCount } from "../lib/cart";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import { ProductList } from "../components/ProductList";

const SearchPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const { cartItemCount } = useCartItemCount();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchKeyword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchProducts(searchKeyword).then((products) => setProducts(products));
    setSubmitCount((prev) => prev + 1);
  };

  return (
    <Layout cartItemCount={cartItemCount}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          placeholder="商品検索"
          className={styles.searchInput}
          type="search"
          value={searchKeyword}
          onChange={handleInputChange}
        />
        <div className={styles.searchBtnWrapper}>
          <Button type="submit">検索</Button>
        </div>
      </form>
      <div className={styles.resultContainer}>
        {products.length || submitCount === 0 ? <ProductList products={products} /> : <p>該当商品がありません😢</p>}
      </div>
    </Layout>
  );
};

export default SearchPage;
