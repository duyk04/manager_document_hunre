import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = await getAuth(req);
    if (!userId) {
        return null;
    }

    const profile = await db.users.
    findUnique({
        where: {
            userId
        }
    });

    return profile;
}