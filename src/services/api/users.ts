import type { User } from "@/types/user";

const USER_ENDPOINT = 'https://rimac-front-end-challenge.netlify.app/api/user.json'

export const getUsers = async (documentNumber: string): Promise<User | null> => {
    const res = await fetch(USER_ENDPOINT)
    const data: User = await res.json();

    if (documentNumber === "12345678") {
        return data;
    } else {
        return null
    }
}