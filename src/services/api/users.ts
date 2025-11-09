import type { User } from "@/types/user";

const USER_ENDPOINT = 'https://rimac-front-end-challenge.netlify.app/api/user.json'

export const getUsers = async (): Promise<User> => {
    const res = await fetch(USER_ENDPOINT)
    const data: User = await res.json();
    return data;
}