import { dbCreateApp } from "@/server/db/apps";
import { logger } from "../../../../../logger";
import { createApiResponse } from "@/utils/api";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const { name, description, logoUrl, docsLink } = await req.json();

        // validation
        if (!name || !description || !logoUrl || !docsLink) {
            return NextResponse.json(createApiResponse({ success: false, error: 'Missing name, description, docsLink, or logo URL' }), { status: 400 });
        }

        await dbCreateApp({ name, description, logoUrl, docsLink });

        return NextResponse.json(createApiResponse({ success: true, message: 'App created successfully' }), { status: 201 });

    } catch (error) {
        logger('❌ Error creating app:', error, { module: "/apps/create API", level: 'error' });
        return NextResponse.json(createApiResponse({ success: false, error: 'Error creating the app' }), { status: 500 });
    }
}


