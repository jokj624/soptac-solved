import db from "..";
const COLLECTION_NAME = "users";

export type User = {
    id?: string;
    name: string;
    rating: number;
    solvedCount: number;
    tier: string;
};

export const all = async (): Promise<Array<User>> => {
    const snapshot = await db.collection(COLLECTION_NAME).orderBy('rating', 'desc').get();
    const data: Array<any> = [];

    snapshot.docs.map((item: any) => {
        data.push({
            id: item.id, // because id field in separate function in firestore
            ...item.data(), // the remaining fields
        });
    });

    // return and convert back it array of todo
    return data as Array<User>;
};

export const create = async (user: User): Promise<User> => {
    const docRef = await db.collection(COLLECTION_NAME).add(user);

    return {
        id: docRef.id,
        ...user,
    } as User;
};