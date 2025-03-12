import { TestFactory } from "./Helpers/TestFactory";
import { RawGtfs } from "./RawGtfs";
import { GtfsStopField } from "./RawGtfsTypes";

describe("Test RawGtfs Class", () => {
  it("should create a new RawGtfs instance", () => {
    const gtfs = new RawGtfs();
    expect(gtfs).toBeDefined();
    gtfs.exportToFolderAsFiles('./test/')
  });

  describe("Test Stop related functions", () => {
    it("Set a stop", () => {
      const gtfs = new RawGtfs();
      expect(gtfs.getNumberOfStops()).toBe(0);

      gtfs.setStop(TestFactory.createStop());

      expect(gtfs.getNumberOfStops()).toBe(1);
    });

    it("Set a stop with the same stop_id", () => {
      const gtfs = new RawGtfs();
      const stopId = "stop_id_1";
      gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));

      expect(gtfs.getNumberOfStops()).toBe(1);

      gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));

      expect(gtfs.getNumberOfStops()).toBe(1);
    });

    it("Get a stop", () => {
      const gtfs = new RawGtfs();
      const stopId = "stop_id_1";
      const stopName = "Stop Name 1";

      gtfs.setStop(TestFactory.createStop({ stop_id: stopId, stop_name: stopName }));

      const stop = gtfs.getStop(stopId);
      expect(stop).toBeDefined();
      if (!stop) {
        throw new Error("Stop is undefined");
      }
      expect(stop[GtfsStopField.StopName]).toBe(stopName);
    });

    it("Get a stop that does not exist", () => {
      const gtfs = new RawGtfs();
      const stopId = "stop_id_1";
      const stop = gtfs.getStop(stopId);
      expect(stop).toBeUndefined();
    });

    it("Get all stops", () => {
      const gtfs = new RawGtfs();
      gtfs.setStop(TestFactory.createStop({ stop_id: "stop_id_1", stop_name: "Stop Name 1" }));
      gtfs.setStop(TestFactory.createStop({ stop_id: "stop_id_2", stop_name: "Stop Name 2" }));

      expect(gtfs.getNumberOfStops()).toBe(2);

      const stops = gtfs.buildArrayOfStops();
      expect(stops.length).toBe(2);
      expect(stops[0].stop_id).toBe("stop_id_1");
      expect(stops[1].stop_id).toBe("stop_id_2");
    });
  });
});