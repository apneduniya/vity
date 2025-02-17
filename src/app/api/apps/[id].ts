import { dbGetSingleApp } from "@/server/db/apps";
import { logger } from "../../../../logger";
import { NextApiRequest } from "next";
import { createApiResponse } from "@/utils/api";
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest) {
    try {
        const { id } = req.query;

        // validation
        if (!id) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Missing app ID' }), { status: 400 });
        }

        const app = await dbGetSingleApp(id as string);
        if (!app) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Error getting the app' }), { status: 500 });
        }

        return NextResponse.json(createApiResponse({ success: true, data: app }), { status: 200 });

    } catch (error) {
        logger('❌ Error getting the app:', error, { module: "/apps/[id] API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error getting the app' }), { status: 500 });
    }
}


