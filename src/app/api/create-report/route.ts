import Report from 'schemas/Report.schema';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectMongoose from '../helpers/connectMongoose';

interface createReportRequest{
    name: string,
    photos?: Array<string>,
    latitude: number,
    longtitude: number,
    danger?: boolean
}
export function POST(request: NextRequest) {
    return handle(request);
}

async function handle(request: NextRequest) {
    let reportData = (await request.json() as createReportRequest);
    try {
        await connectMongoose();
        await Report.create(reportData);
        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        let message = "An error has occured";
        if (error instanceof Error) {
            message = error.message;
        }
        return NextResponse.json(
            {
                description: message
            },
            {
                status: 500
            }
        );
    }
}