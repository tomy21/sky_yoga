export const RESPONSE_CODES = {
    USER: 21,
    ROLE: 22,
    MENU: 23,
    CUSTOMER: 24,
    CLASSMASTER: 25,
    COACH: 26,
    SCHEDULE: 27,
    BOOKING: 28,
    TYPEMEMBER: 29,
    MEMBERSHIP: 30,
    HISTORYPAYMENT:31,
};

export type ResponseType = "CREATE" | "READ" | "UPDATE" | "DELETE" | "ERROR";

export const RESPONSE_ACTIONS = {
    CREATE: "01",
    READ: "02",
    UPDATE: "03",
    DELETE: "04",
    ERROR: "99",
};

/**
 * Membuat response standar berdasarkan kategori dan jenis operasi.
 * @param category Kategori (USER, ROLE, MENU, dll.)
 * @param action Jenis operasi (CREATE, READ, UPDATE, DELETE, ERROR)
 * @param message Pesan response
 * @param data Data yang ingin dikembalikan
 * @returns JSON response dengan format standar
 */
export function createResponse<T>(
    category: keyof typeof RESPONSE_CODES,
    action: ResponseType,
    message: string,
    data?: T // ✅ Gunakan Generic Type
) {
    const code = `${RESPONSE_CODES[category]}00${RESPONSE_ACTIONS[action]}`;
    return {
        code: parseInt(code),
        message,
        data,
    };
}

export function createPaginatedResponse<T>(
    category: keyof typeof RESPONSE_CODES,
    action: ResponseType,
    message: string,
    data: T[],
    page: number,
    limit: number,
    totalItems: number
) {
    const totalPages = Math.ceil(totalItems / limit);
    const code = `${RESPONSE_CODES[category]}00${RESPONSE_ACTIONS[action]}`;

    return {
        code: parseInt(code),
        message,
        data,
        meta: {
            page,
            limit,
            totalPages,
            totalItems,
        },
    };
}
