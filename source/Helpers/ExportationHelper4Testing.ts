import { RawGtfs4Testing } from "../RawGtfs4Testing";
import { GtfsFileName, GtfsItem } from "../RawGtfsTypes";
import { ExportationHelper } from "./ExportationHelper";

export class ExportationHelper4Testing extends ExportationHelper {
  public static protected_buildFilesByFileName(gtfs: RawGtfs4Testing) {
    return super.buildFilesByFileName(gtfs);
  }

  public static protected_convertArrayOfItemsToCsv(arrayOfItems: GtfsItem[], fileName: GtfsFileName) {
    return super.convertArrayOfItemsToCsv(arrayOfItems, fileName);
  }

  public static protected_escapeValue(value: string | undefined) {
    return super.escapeValue(value);
  }
}