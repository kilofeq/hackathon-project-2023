import { NextResponse } from 'next/server';
import { Schema } from 'mongoose';
import Report from '../schemas/Report.schema';
import connectMongoose from '../helpers/connectMongoose';
import { Animal } from '../enums/animalEnum';

const RANGE = 100;

type ReportType = {
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

const convertToMeters = (degrees: number) => degrees * 100000;

function isInRange(
  centerLongitude: number,
  centerLatitude: number,
  pointLongitude: number,
  pointLatitude: number,
) {
  const centerLatitudeInMeters = convertToMeters(centerLatitude);
  const pointLatitudeInMeters = convertToMeters(pointLatitude);
  const centerLongitudeInMeters = convertToMeters(centerLongitude);
  const pointLongitudeInMeters = convertToMeters(pointLongitude);
  return Math.abs(pointLatitudeInMeters - centerLatitudeInMeters) ** 2
  + Math.abs(pointLongitudeInMeters - centerLongitudeInMeters) ** 2 < RANGE * RANGE;
}

const groupReports = (reports: ReportType[]) => {
  let groupedReports: ReportType[][] = [];
  const animals = [...new Set(reports.map((e) => e.animal))];
  for (const animal of animals) {
    const reportsByAnimal = reports.filter((e) => e.animal === animal);
    const sortedReports = reportsByAnimal.sort(
      (a, b) => new Date(a.timeOfReport).getTime() - new Date(b.timeOfReport).getTime(),
    );
    const tempGroupedReports: ReportType[][] = [];
    let ignoredReports: number[] = [];
    sortedReports.forEach((report, index) => {
      if (ignoredReports.includes(index)) {
        return;
      }
      const similarReports = sortedReports
        .slice(index + 1, sortedReports.length)
        .filter((e) => isInRange(report.longitude, report.latitude, e.longitude, e.latitude));
      tempGroupedReports.push([report, ...similarReports]);
      ignoredReports = [
        ...ignoredReports,
        ...similarReports.map((e) => sortedReports.findIndex((s) => s._id === e._id)),
      ];
    });
    groupedReports = [
      ...groupedReports,
      ...tempGroupedReports,
    ];
  }
  return groupedReports;
};

export const GET = async () => {
  await connectMongoose();
  const reports = await Report.find().select('-photos');
  return NextResponse.json(
    groupReports(reports),
    {
      status: 200,
    },
  );
};
