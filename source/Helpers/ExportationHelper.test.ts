import { ExportationHelper } from "./ExportationHelper";
import { RawGtfs4Testing } from "../RawGtfs4Testing";
import { TestFactory } from "../TestHelpers/TestFactory";
import { ExportationHelper4Testing } from "./ExportationHelper4Testing";
import { GtfsAgencyFileName, GtfsAgencyFields, GtfsCalendarDate, GtfsCalendarDateFields, GtfsFeedInfoFileName, GtfsFileName, GtfsRouteFields, GtfsStopFields, GtfsStopFileName, GtfsStopTimeFields, GtfsTripFields, GtfsCalendarFileName, GtfsStopTimeFileName, GtfsTripFileName, GtfsRouteFileName, GtfsCalendarDateFileName, GtfsCalendarFields, GtfsFeedInfoFields } from "../RawGtfsTypes";
import * as fs from "fs";
import * as path from "path";

describe("ExportationHelper", () => {
  describe("Test exportToFolderAsFiles", () => {
    it("With minimal GTFS", () => {
      const gtfs = new RawGtfs4Testing();
      const folderPath = "./temp-test-output/";
      ExportationHelper4Testing.exportToFolderAsFiles(gtfs, folderPath);

      const expectedFileByFileName = ExportationHelper4Testing.protected_buildFilesByFileName(gtfs);
      for (const fileName in expectedFileByFileName) {
        const fullPath = path.join(folderPath, fileName);
        expect(fs.existsSync(fullPath)).toBe(true);
        expect(fs.readFileSync(fullPath, "utf8")).toEqual(expectedFileByFileName[fileName]);
      }

      fs.rmSync(folderPath, { recursive: true, force: true });
    });
  });

  describe("Test escapeValue", () => {
    it("Simple value", () => {
      const value = "test";
      const expectedEscapedValue = "test";
      const escapedValue = ExportationHelper4Testing.protected_escapeValue(value);
      expect(escapedValue).toEqual(expectedEscapedValue);
    });

    it("Value with comma", () => {
      const value = "test,test";
      const expectedEscapedValue = "\"test,test\"";
      const escapedValue = ExportationHelper4Testing.protected_escapeValue(value);
      expect(escapedValue).toEqual(expectedEscapedValue);
    });

    it("Value with newline", () => {
      const value = "test\ntest";
      const expectedEscapedValue = "\"test\ntest\"";
      const escapedValue = ExportationHelper4Testing.protected_escapeValue(value);
      expect(escapedValue).toEqual(expectedEscapedValue);
    });

    it("Value with double quotes", () => {
      const value = "test\"test";
      const expectedEscapedValue = "\"test\"\"test\"";
      const escapedValue = ExportationHelper4Testing.protected_escapeValue(value);
      expect(escapedValue).toEqual(expectedEscapedValue);
    });   
  });

  describe("Test convertArrayOfItemsToCsv", () => {
    it("Simple array", () => {
      const calendarDates = [{service_id: "1", date: "20250101", exception_type: "1"} as GtfsCalendarDate];
      const expectedCsv = "service_id,date,exception_type\n1,20250101,1";
      const csv = ExportationHelper4Testing.protected_convertArrayOfItemsToCsv(calendarDates, GtfsFileName.CalendarDate);
      expect(csv).toEqual(expectedCsv);
    });
  });

  describe("Test buildFilesByFileName", () => {
    it("With minimal GTFS", () => {
      const gtfs = new RawGtfs4Testing();
      const defaultFeedPublisherName = gtfs.test_getDefaultFeedPublisherName();
      const defaultFeedPublisherUrl = gtfs.test_getDefaultFeedPublisherUrl();
      const defaultFeedLang = gtfs.test_getDefaultFeedLang();
      const fileByFileName = ExportationHelper4Testing.protected_buildFilesByFileName(gtfs);
      const expectedFileByFileName = {
        [GtfsAgencyFileName]: GtfsAgencyFields.join(",") + "\n",
        [GtfsStopFileName]: GtfsStopFields.join(",") + "\n",
        [GtfsRouteFileName]: GtfsRouteFields.join(",") + "\n",
        [GtfsTripFileName]: GtfsTripFields.join(",") + "\n",
        [GtfsStopTimeFileName]: GtfsStopTimeFields.join(",") + "\n",
        [GtfsCalendarFileName]: GtfsCalendarFields.join(",") + "\n",
        [GtfsCalendarDateFileName]: GtfsCalendarDateFields.join(",") + "\n",
        [GtfsFeedInfoFileName]: GtfsFeedInfoFields.join(",") + "\n" + `${defaultFeedPublisherName},${defaultFeedPublisherUrl},${defaultFeedLang}` + GtfsFeedInfoFields.slice(3).map(_ => ",").join(""),
      };
      
      expect(fileByFileName).toEqual(expectedFileByFileName);
    });
  });
});