import type { User } from "@/types/user";

const PLANS_ENDPOINT = 'https://rimac-front-end-challenge.netlify.app/api/plans.json'

export const getPlans = async (): Promise<User> => {
    // return fetch(PLANS_ENDPOINT)
    // .then(res => res.json())
    // .then(data => {
    //     const { plans } = data
    //     return plans;
    // })
    const res = await fetch(PLANS_ENDPOINT)
    const data: User = await res.json();
    return data;
}