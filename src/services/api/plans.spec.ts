import { getPlans } from "@/services/api/plans";

const mockPlansResponse = {
    list: [
        {
            name: "Plan en Casa",
            price: 39,
            description: ["Consulta médica", "Medicinas cubiertas"],
            age: 60,
        },
    ],
}

describe("PlanService", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })

    test('should be defined', () => {
        expect(getPlans).toBeDefined();
    })

    test('should return plans', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockPlansResponse),
            })
        ) as jest.Mock;

        const result = await getPlans();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockPlansResponse.list);
    })

})