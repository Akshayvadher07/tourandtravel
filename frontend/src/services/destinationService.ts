import { fetchDestinations } from "@/lib/api";

export async function getDestinations() {
  return fetchDestinations();
}
