import { useEffect, useState } from "react";
import { graphqlRequest } from "./graphqlClient";

export type PickupLocation = {
  id: string;
  name: string;
};

const getPickupLocationsQuery = `#graphql
  query getPickupLocations {
    pickupLocations {
      id
      name
    }
  }
`;

async function getPickupLocations(): Promise<PickupLocation[]> {
  const data = await graphqlRequest({ query: getPickupLocationsQuery });
  return data.pickupLocations;
}

const updatePickupLocationQuery = `
  mutation updatePickupLocation($pickupLocationId: ID!) {
    updatePickupLocation(input: { pickupLocationId: $pickupLocationId }) {
      pickupLocation {
        id
        name
      }
    }
  }
`;

export async function updatePickupLocation(pickupLocationId: string): Promise<PickupLocation> {
  const data = await graphqlRequest({ query: updatePickupLocationQuery, variables: { pickupLocationId } });
  return data.updatePickupLocation.pickupLocation;
}

export function usePickupLocations(): { pickupLocations: PickupLocation[] } {
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>([]);

  useEffect(() => {
    getPickupLocations().then((pickupLocations) => setPickupLocations(pickupLocations));
  }, []);

  return { pickupLocations };
}
