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
  GtfsItem,
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
    
    protected static buildFilesByFileName(gtfs: RawGtfs) {
      return {
        [GtfsAgencyFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfAgencies(), GtfsFileName.Agency),
        [GtfsStopFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfStops(), GtfsFileName.Stop),
        [GtfsRouteFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfRoutes(), GtfsFileName.Route),
        [GtfsTripFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfTrips(), GtfsFileName.Trip),
        [GtfsStopTimeFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfStopTimes(), GtfsFileName.StopTime),
        [GtfsCalendarFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfCalendars(), GtfsFileName.Calendar),
        [GtfsCalendarDateFileName]: this.convertArrayOfItemsToCsv(gtfs.buildArrayOfCalendarDates(), GtfsFileName.CalendarDate),
        [GtfsFeedInfoFileName]: this.convertArrayOfItemsToCsv([gtfs.getFeedInfo()], GtfsFileName.FeedInfo),
      }
    }

    protected static convertArrayOfItemsToCsv(arrayOfItems: GtfsItem[], fileName: GtfsFileName) {
      const headers = GtfsFieldsByFileName[fileName];
      const rows = arrayOfItems.map(item => headers.map(header => this.escapeValue(item[header])).join(",")).join("\n");

      return headers.join(",") + "\n" + rows;
    }

    protected static escapeValue(value: string | undefined) {
      if (value === null || value === undefined || value === "") {
        return "";
      }

      if (value.includes(",") || value.includes("\n") || value.includes("\"") || value.includes("'")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }
}