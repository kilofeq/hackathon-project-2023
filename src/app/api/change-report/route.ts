import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Report from "./../schemas/Report.schema";
import connectMongoose from '../helpers/connectMongoose';

interface changeReportRequest{
    id: string,
    photo: string
}

export async function POST(request: NextRequest) {
    try{
        await connectMongoose();
        const {id, photo} = (await request.json() as changeReportRequest);

        await Report.findOneAndUpdate(
            {_id: id},
            {$push: {photos: photo}}
        );

        return NextResponse.json(
        {
            body: {
                message: "Update succesfull"
            },
        },
        {
            status: 200,
        },
        );
    }catch{
        return NextResponse.json(
            {
                body: {
                    message: "Oops! Something went wrong!"
                },
            },
            {
                status: 500,
            },
            );
    }
    
}