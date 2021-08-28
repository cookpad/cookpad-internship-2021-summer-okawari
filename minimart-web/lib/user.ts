import { useCallback, useEffect, useState } from "react";
import { graphqlRequest } from "./graphqlClient";
import { PickupLocation, updatePickupLocation } from "./pickupLocation";

type User = {
  id: string;
  name: string;
  pickupLocation: PickupLocation;
};

const getUserQuery = `#graphql
  query getUser {
    viewer {
      id
      name
      pickupLocation {
        id
        name
      }
    }
  }
`;

async function getCurrentUser(): Promise<User> {
  const data = await graphqlRequest({ query: getUserQuery });
  return data.viewer;
}

export function useCurrentUser(): {
  currentUser: User | null;
  updatePickupLocation: (pickupLocationId: string) => void;
} {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const updatePickupLocation_ = useCallback(
    async (pickupLocationId: string) => {
      if (currentUser === null) return;
      const pickupLocation = await updatePickupLocation(pickupLocationId);
      setCurrentUser({ ...currentUser, pickupLocation });
    },
    [currentUser]
  );

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);

  return { currentUser, updatePickupLocation: updatePickupLocation_ };
}
