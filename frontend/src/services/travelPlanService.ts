import { submitTravelPlan, type TravelPlanPayload } from "@/lib/api";

export async function createTravelPlan(payload: TravelPlanPayload) {
  return submitTravelPlan(payload);
}
