import Report from "../schemas/Report.schema";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectMongoose from "../helpers/connectMongoose";
import { Animal, dangerOfAnimal } from "../enums/animalEnum";
import {auth} from "../helpers/firebaseAdmin"

interface createReportRequest{
    description?: string,
    user_id: string,
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
  const authorizationHeader = request.headers.get('Authorization')
  if (!authorizationHeader) {
    return NextResponse.json(
      {
        description: "Authorization header is missing",
      },
      {
        status: 401,
      }
    );
  }
  const token = authorizationHeader.split(' ')[1]
  if (!token) {
    return NextResponse.json(
      {
        description: "Authorization header is missing",
      },
      {
        status: 401,
      }
    );
  }
  try {
    await auth.verifyIdToken(token)
  } catch {
    return NextResponse.json(
      {
        description: "Authorization header is invalid",
      },
      {
        status: 401,
      }
    );
  }
  let reportData = (await request.json()) as createReportRequest;
  try {
    await connectMongoose();
    const reportRecord = new Report({
      ...reportData,
      danger: reportData.danger ?? dangerOfAnimal(reportData.animal),
    });
    console.log(reportRecord);
    await reportRecord.save();
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    let message = "An error has occured";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      {
        description: message,
      },
      {
        status: 500,
      }
    );
  }
}
