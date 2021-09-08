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
  const { cartItemCount } = useCartItemCount();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchKeyword(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchProducts(searchKeyword).then((products) => setProducts(products));
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
        <div className={styles.searchBtnWrapper} >
          <Button type="submit">
            検索
          </Button>
        </div>
      </form>
      <ProductList products={products} />
    </Layout>
  );
};

export default SearchPage;
