import { graphqlRequest } from "./graphqlClient";
import { Product } from "./product";

const searchProductsQuery = `#graphql
  query searchProducts($keyword: String!) {
    searchProducts(query: $keyword) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function searchProducts(keyword: string): Promise<Product[]> {
  if (keyword === "") return [];
  const data = await graphqlRequest({ query: searchProductsQuery, variables: { keyword } });
  return data.searchProducts;
}
