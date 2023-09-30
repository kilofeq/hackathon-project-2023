import { NextResponse } from 'next/server';
import Report from '../schemas/Report.schema';
import connectMongoose from '../helpers/connectMongoose';

export const GET = async () => {
  await connectMongoose();
  const reports = await Report.find();
  return NextResponse.json(
    reports,
    {
      status: 200,
    },
  );
};
