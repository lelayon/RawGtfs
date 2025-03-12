import { GtfsStop } from "../RawGtfsTypes";

export class TestFactory {
  public static createStop(partialStop?: Partial<GtfsStop>): GtfsStop {
    return {
      stop_id: "stop_id_1",
      stop_name: "Stop Name 1",
      stop_lat: "1.0",
      stop_lon: "1.0",
      ...partialStop,
    };
  }
}