import { graphqlRequest } from "./graphqlClient";
import type { Product } from "./product";

export type Order = {
  id: string;
  items: OrderItem[];
  canceledAt: string;
  deliveryDate: string;
  orderedAt: string;
  pickupLocation: {
    name: string;
  };
  totalAmount: number;
  user: {
    name: string;
  };
};

export type OrderItem = {
  product: Product;
  quantity: number;
};

const getOrderQuery = `#graphql
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      items {
        product {
          id
          name
          description
          price
          imageUrl
        }
        quantity
      }
      canceledAt
      deliveryDate
      orderedAt
      pickupLocation {
        name
      }
      totalAmount
      user {
        name
      }
    }
  }
`;

export async function getOrder(id: string): Promise<Order> {
  const data = await graphqlRequest({ query: getOrderQuery, variables: { id } });
  return data.order;
}

const createOrderQuery = `#graphql
  mutation postOrder($items: [OrderItemInput!]!) {
    createOrder(
      input: {
        items: $items
      }
    ) {
      order {
        id
      }
    }
  }
`;

export async function createOrder(orderItems: OrderItem[]): Promise<Pick<Order, "id">> {
  const items = orderItems.map((item) => ({ productId: item.product.id, quantity: item.quantity }));
  const data = await graphqlRequest({ query: createOrderQuery, variables: { items } });
  return data.createOrder.order;
}
