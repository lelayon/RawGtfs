import { RawGtfs } from "../RawGtfs";
import {
  GtfsAgencyFileName,
  GtfsFieldsByFileName,
  GtfsFileName,
  GtfsStopFileName,
  GtfsRouteFileName,
  GtfsTripFileName,
  GtfsStopTimeFileName,
  GtfsCalendarFileName,
  GtfsCalendarDateFileName,
  GtfsFeedInfoFileName,
} from "../RawGtfsTypes";
import * as fs from "fs";
import * as path from "path";

export class ExportationHelper {
    public static exportToFolderAsFiles(gtfs: RawGtfs, folderPath: string) {
      const fileByFileName = this.buildFilesByFileName(gtfs);
      fs.mkdirSync(folderPath, { recursive: true });

      for (const fileName in fileByFileName) {
        const fullPath = path.join(folderPath, fileName);

        fs.writeFileSync(fullPath, fileByFileName[fileName]);
      }
    }
    

    private static buildFilesByFileName(gtfs: RawGtfs) {
      return {
        [GtfsAgencyFileName]: this.convertArrayToCsv(gtfs.buildArrayOfAgencies(), GtfsFileName.Agency),
        [GtfsStopFileName]: this.convertArrayToCsv(gtfs.buildArrayOfStops(), GtfsFileName.Stop),
        [GtfsRouteFileName]: this.convertArrayToCsv(gtfs.buildArrayOfRoutes(), GtfsFileName.Route),
        [GtfsTripFileName]: this.convertArrayToCsv(gtfs.buildArrayOfTrips(), GtfsFileName.Trip),
        [GtfsStopTimeFileName]: this.convertArrayToCsv(gtfs.buildArrayOfStopTimes(), GtfsFileName.StopTime),
        [GtfsCalendarFileName]: this.convertArrayToCsv(gtfs.buildArrayOfCalendars(), GtfsFileName.Calendar),
        [GtfsCalendarDateFileName]: this.convertArrayToCsv(gtfs.buildArrayOfCalendarDates(), GtfsFileName.CalendarDate),
        [GtfsFeedInfoFileName]: this.convertArrayToCsv([gtfs.getFeedInfo()], GtfsFileName.FeedInfo),
      }
    }

    private static convertArrayToCsv(array: any[], fileName: GtfsFileName) {
      const headers = GtfsFieldsByFileName[fileName];
      const rows = array.map(item => headers.map(header => this.escapeValue(item[header], item)).join(",")).join("\n");

      return headers.join(",") + "\n" + rows;
    }

    private static escapeValue(value: string | undefined, item: any) {
      if (value === null || value === undefined || value === "") {
        return "";
      }

      if (value.includes(",") || value.includes("\n") || value.includes("\"") || value.includes("'")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }
}