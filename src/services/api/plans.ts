import type { Plans } from "@/types/plans";
import type { PlansResponse } from "@/types/plans-response";

const PLANS_ENDPOINT = 'https://rimac-front-end-challenge.netlify.app/api/plans.json'

export const getPlans = async (): Promise<Plans[]> => {
    const res = await fetch(PLANS_ENDPOINT)
    const data: PlansResponse = await res.json();
    return data.list;
}