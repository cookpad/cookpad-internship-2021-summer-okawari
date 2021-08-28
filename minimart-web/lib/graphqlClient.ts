/**
 * GraphQL のサーバーにリクエストして結果を返す。
 *
 * @param query GraphQLのクエリ文字列
 * @param variables GraphQLのクエリに渡す変数
 *
 * @example
 *
 * ```
 * const query = `
 *   query getProduct($id: ID!) {
 *     product(id: $id) {
 *       id
 *       name
 *     }
 *   }
 * `;
 * const variables = { id: "xxx" };
 * const data = await graphqlRequest({ query, variables });
 * console.log(data.product); //=> product
 * ```
 */
export async function graphqlRequest({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<any> {
  const { endpoint, userName } = getConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Name": userName,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Request failed.");
  }

  const json = await response.json();
  if (json.errors) {
    console.error("GraphQL Response:", JSON.stringify(json, null, 2));
    throw new Error("GraphQL Error: " + json.errors.map((error: any) => error.message).join("\n"));
  }

  return json.data;
}

function getConfig() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!endpoint) {
    throw new Error("Set NEXT_PUBLIC_API_ENDPOINT in .env");
  }

  const userName = process.env.NEXT_PUBLIC_USER_NAME;
  if (!userName) {
    throw new Error("Set NEXT_PUBLIC_USER_NAME in .env");
  }

  return { endpoint, userName };
}
