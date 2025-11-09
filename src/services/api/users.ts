import type { Plans } from "@/types/plans";

const USER_ENDPOINT = 'https://rimac-front-end-challenge.netlify.app/api/user.json'

export const getUsers = async (): Promise<Plans[]> => {
    return fetch(USER_ENDPOINT)
        .then(res => res.json())
        .then(data => {
            const { user } = data;
            return user;
        })
}