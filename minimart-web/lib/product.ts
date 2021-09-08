import { graphqlRequest } from "./graphqlClient";

export type ProductOrderBy = 'id' | 'price'

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `#graphql
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const listCheapestOrderedProductsQuery = `#graphql
  query listCheapestOrderedProducts {
    cheapestOrderedProducts {
      id
      name
      description
      price
      imageUrl
    }
  }
`

export async function listProducts(orderBy: ProductOrderBy): Promise<Product[]> {
  if (orderBy === 'price') {
    const data = await graphqlRequest({ query: listCheapestOrderedProductsQuery });
    return data.cheapestOrderedProducts
  } else {
    const data = await graphqlRequest({ query: listProductsQuery });
    return data.products
  }
}

const getProductQuery = `#graphql
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export async function getProduct(id: string): Promise<Product | null> {
  const data = await graphqlRequest({ query: getProductQuery, variables: { id: id } });
  return data.product;
}
