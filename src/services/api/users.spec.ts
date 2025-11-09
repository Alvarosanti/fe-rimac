import { getUsers } from "@/services/api/users";

const mockUserResponse = {
    name: "Rocío",
    lastName: "Miranda Díaz",
    birthDay: "02-04-1990",
}

describe("UserService", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })

    test('should be defined', () => {
        expect(getUsers).toBeDefined();
    })

    test('should return users', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUserResponse),
            })
        ) as jest.Mock;

        const result = await getUsers();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUserResponse);

    })
})