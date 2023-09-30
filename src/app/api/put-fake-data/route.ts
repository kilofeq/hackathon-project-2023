import Report from 'schemas/Report.schema';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectMongoose from '../helpers/connectMongoose';
import { Animal, animalValues, dangerOfAnimal } from '../enums/animalEnum';

interface createReportRequest{
    name: string,
    photos?: Array<string>,
    latitude: number,
    longitude: number,
    danger?: boolean,
    animal: Animal
}
export function POST(request: NextRequest) {
    return handle(request);
}

async function handle(request: NextRequest) {
    let reportData = (await request.json() as createReportRequest);
    try {
        await connectMongoose();
        let animalNumber: number;
        for(let i = 0; i < 199; i++){
            animalNumber = Math.floor(Math.random() * 3)
            const report = new Report({
                ...reportData,
                latitude: 49.7 + Math.random()*0.6,
                longitude: 19.8 + Math.random()*0.4,
                animal: animalValues[animalNumber],
                danger: reportData.danger ?? dangerOfAnimal(animalValues[animalNumber] as Animal)
            })
            await report.save();
        }
        return NextResponse.json(
            {
                description: "Jest w pyte"
            },
            {
                status: 200
            }
        );
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