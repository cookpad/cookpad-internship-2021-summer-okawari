import { useCallback, useEffect, useState } from "react";
import { graphqlRequest } from "./graphqlClient";
import { Product } from "./product";

type Category = {
  id: string;
  name: string;
};

const getCategoriesQuery = `#graphql
  query getCategories {
    categories {
      id
      name
    }
  }
`;

async function getCategories(): Promise<Category[]> {
  const data = await graphqlRequest({ query: getCategoriesQuery });
  return data.categories;
}

const getCategoryProductsQuery = `#graphql
  query getCategoryProducts($categoryId: ID!) {
    category(id: $categoryId) {
      products {
        id
        name
        description
        price
        imageUrl
      }
    }
  }
`;

async function getCategoryProducts(categoryId: string): Promise<Product[]> {
  const data = await graphqlRequest({ query: getCategoryProductsQuery, variables: { categoryId } });
  return data.category.products;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const setCategory = useCallback((categoryId: string) => {
    getCategoryProducts(categoryId).then((products) => setProducts(products));
  }, []);

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return { products, setCategory, categories };
}
