import { NextRequest, NextResponse } from 'next/server';
import Report from '../schemas/Report.schema';
import connectMongoose from '../helpers/connectMongoose';

export const GET = async (request: NextRequest) => {
  await connectMongoose();
  const { id } = await request.json();
  const report = await Report.findById(id);
  return NextResponse.json(
    report,
    {
      status: 200,
    },
  );
};
