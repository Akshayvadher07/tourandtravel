import { fetchTourById, fetchTours } from "@/lib/api";

export async function getTours() {
  return fetchTours();
}

export async function getFeaturedTours() {
  const tours = await fetchTours();
  return [...tours].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getTourById(id: string) {
  return fetchTourById(id);
}
