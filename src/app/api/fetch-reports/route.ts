import { NextResponse } from 'next/server';
import Report from '../schemas/Report.schema';
import connectMongoose from '../helpers/connectMongoose';
import { Animal, animalValues } from '../enums/animalEnum';
import { NumberExpression, Schema } from 'mongoose';

const RANGE = 150000;

type Report = {
  _id: string
  name: string,
  photos: string[],
  latitude: number,
  longitude: number,
  userIds: Schema.Types.ObjectId[],
  danger: Boolean,
  animal: Animal,
  description: string
  timeOfReport: string
}

export const GET = async () => {
  await connectMongoose();
  const reports = await Report.find().select('-photos');
  return NextResponse.json(
    groupReportsV2(reports),
    {
      status: 200,
    },
  );
};


const groupReportsV2 = (reports: Report[]) => {
  let groupedReports: Report[][] = [];
  const animals = [...new Set(reports.map(e => e.animal))]
  for (const animal of animals) {
    const reportsByAnimal = reports.filter(e => e.animal === animal)
    const sortedReports = reportsByAnimal.sort((a, b) => new Date(a.timeOfReport).getTime() - new Date(b.timeOfReport).getTime())
    let tempGroupedReports: Report[][] = [];
    let ignoredReports: number[] = [];
    sortedReports.forEach((report, index) => {
      if (ignoredReports.includes(index)) {
        return
      }
      const similarReports = sortedReports
        .slice(index, sortedReports.length)
        .filter(e => {
          return isInRange(report.longitude, report.latitude, e.longitude, e.latitude)
        })
      tempGroupedReports.push([report, ...similarReports])
      ignoredReports = [
        ...ignoredReports,
        ...similarReports.map(e => sortedReports.findIndex(s => s._id === e._id))
      ]
    })
    groupedReports = [
      ...groupedReports,
      ...tempGroupedReports
    ]
  }
  return groupedReports
}

function isInRange(
  centerLongtitude: number,
  centerLatitude: number,
  pointLongtitude: number,
  pointLatitude: number) {
  console.log(`${Math.pow(Math.abs(pointLatitude - centerLatitude), 2) + Math.pow(Math.abs(pointLongtitude - centerLongtitude), 2) < RANGE}`)  
  return Math.pow(Math.abs(pointLatitude - centerLatitude), 2) + Math.pow(Math.abs(pointLongtitude - centerLongtitude), 2) < RANGE;
}