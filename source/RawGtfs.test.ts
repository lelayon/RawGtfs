import { TestFactory, TestRawGtfs } from "./Helpers/TestFactory";
import { RawGtfs } from "./RawGtfs";
import { GtfsAgencyCardinality, GtfsStopField } from "./RawGtfsTypes";
import {describe, expect, test} from '@jest/globals';

describe("Test RawGtfs Class", () => {
  it("should create a new RawGtfs instance", () => {
    const gtfs = new RawGtfs();
    expect(gtfs).toBeDefined();
    gtfs.exportToFolderAsFiles('./test/')
  });

  describe("Test agency.txt related functions", () => {
    describe("Test setAgency", () => {
      it("Set an agency when cardinality is Absent", () => {
        const gtfs = new TestRawGtfs();
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Absent);
        expect(gtfs.getNumberOfAgencies()).toBe(0);

        gtfs.setAgency(TestFactory.createAgency());
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);
      });

      it("Set an agency when cardinality is Singleton", () => {
        const gtfs = new TestRawGtfs();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
      
        
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        expect(gtfs.getNumberOfAgencies()).toBe(1);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);

        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
      });

      it("Set an agency when cardinality is Multiple", () => {
        const gtfs = new TestRawGtfs();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        const agencyId3 = "agency_id_3";
        
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);

        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId3 }));
        expect(gtfs.getNumberOfAgencies()).toBe(3);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
      });
    });

    describe("Test getAgency", () => {
      it("Get an agency when cardinality is Singleton", () => {
        const gtfs = new TestRawGtfs();
        const agencyId = "agency_id_1";
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId }));
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);

        const agency = gtfs.getAgency();
        expect(agency).toBeDefined();
        if (!agency) {
          throw new Error("Agency is undefined");
        }
        expect(agency.agency_id).toBe(agencyId);
      });

      it("Get an agency when cardinality is Multiple", () => {
        const gtfs = new TestRawGtfs();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);

        const agency = gtfs.getAgency(agencyId1);
        expect(agency).toBeDefined();
        if (!agency) {
          throw new Error("Agency is undefined");
        }
        expect(agency.agency_id).toBe(agencyId1);
      });
    });

    describe("Test getNumberOfAgencies", () => {
      it("Get the number of agencies when cardinality is Absent", () => {
        const gtfs = new TestRawGtfs();
        expect(gtfs.getNumberOfAgencies()).toBe(0);
      });
    });

    describe("Test buildArrayOfAgencies", () => {
      it("Build an array of agencies when cardinality is Singleton", () => {
        const gtfs = new TestRawGtfs();
        const agencyId = "agency_id_1";
        const agency = TestFactory.createAgency({ agency_id: agencyId });
        gtfs.setAgency(agency);
        expect(gtfs.buildArrayOfAgencies()).toEqual([agency]);
      });

      it("Build an array of agencies when cardinality is Multiple", () => {
        const gtfs = new TestRawGtfs();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        const agency1 = TestFactory.createAgency({ agency_id: agencyId1 });
        const agency2 = TestFactory.createAgency({ agency_id: agencyId2 });
        gtfs.setAgencies([agency1, agency2]);
        expect(gtfs.buildArrayOfAgencies()).toEqual([agency1, agency2]);
      });
    });

    describe("Test updateAgency", () => {
      it("Update an agency when cardinality is Singleton", () => {
        const gtfs = new TestRawGtfs();
        const agencyId = "agency_id_1";
        const originalAgencyName = "Original Agency Name";
        const originalAgency = TestFactory.createAgency({ agency_id: agencyId, agency_name: originalAgencyName });
        gtfs.setAgency(originalAgency);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);

        const updatedAgencyName = "Updated Agency Name";
        const updatedAgency = TestFactory.createAgency({ agency_id: agencyId, agency_name: updatedAgencyName });
        gtfs.updateAgency(updatedAgency);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);

        const agency = gtfs.getAgency();
        expect(agency).toBeDefined();
        if (!agency) {
          throw new Error("Agency is undefined");
        }
        expect(agency.agency_name).toBe(updatedAgencyName);
      });

      it("Update an agency when cardinality is Multiple", () => {
        const gtfs = new TestRawGtfs();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        const originalAgencyName1 = "Original Agency Name 1";
        const originalAgencyName2 = "Original Agency Name 2";
        const originalAgency1 = TestFactory.createAgency({ agency_id: agencyId1, agency_name: originalAgencyName1 });
        const originalAgency2 = TestFactory.createAgency({ agency_id: agencyId2, agency_name: originalAgencyName2 });
        gtfs.setAgencies([originalAgency1, originalAgency2]);
        expect(gtfs.getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
        expect(gtfs.getNumberOfAgencies()).toBe(2);

        const updatedAgencyName1 = "Updated Agency Name 1";
        const updatedAgency1 = TestFactory.createAgency({ agency_id: agencyId1, agency_name: updatedAgencyName1 });
        gtfs.updateAgency(updatedAgency1);

        const agency1 = gtfs.getAgency(agencyId1);
        expect(agency1).toBeDefined();
        if (!agency1) {
          throw new Error("Agency is undefined");
        }
        expect(agency1.agency_name).toBe(updatedAgencyName1);
      });
    });
  });

  describe("Test stops.txt related functions", () => {
    describe("Test setStop", () => {
      it("Set a stop where there are no stops", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfStops()).toBe(0);

        gtfs.setStop(TestFactory.createStop());

        expect(gtfs.getNumberOfStops()).toBe(1);
      });

      it("Set a stop where there is already a stop with the same id", () => {
        const gtfs = new RawGtfs();
        const stopId = "stop_id_1";
        gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));
        expect(gtfs.getNumberOfStops()).toBe(1);

        gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));
        expect(gtfs.getNumberOfStops()).toBe(1);
      });

      it("Set a stop where there is no stop with the same id", () => {
        const gtfs = new RawGtfs();
        const stopId = "stop_id_1";
        gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));
        expect(gtfs.getNumberOfStops()).toBe(1);

        const stopId2 = "stop_id_2";
        gtfs.setStop(TestFactory.createStop({ stop_id: stopId2 }));
        expect(gtfs.getNumberOfStops()).toBe(2);
      });
    });

    describe("Test getStop", () => {
      it("Get a stop when there is a stop with the id", () => {
        const gtfs = new RawGtfs();
        const stopId = "stop_id_1";
        gtfs.setStop(TestFactory.createStop({ stop_id: stopId }));

        const stop = gtfs.getStop(stopId);
        expect(stop).toBeDefined();
        if (!stop) {
          throw new Error("Stop is undefined");
        }
        expect(stop.stop_id).toBe(stopId);
      });

      it("Get a stop when there is no stop with the id", () => {
        const gtfs = new RawGtfs();
        const stopId = "stop_id_1";
        const stop = gtfs.getStop(stopId);
        expect(stop).toBeUndefined();
      });
    });

    describe("Test getNumberOfStops", () => {
      it("Get the number of stops when there are no stops", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfStops()).toBe(0);
      });

      it("Get the number of stops when there are stops", () => {
        const gtfs = new RawGtfs();
        gtfs.setStop(TestFactory.createStop());
        expect(gtfs.getNumberOfStops()).toBe(1);
      });
    });

    describe("Test buildArrayOfStops", () => {
      it("Build an array of stops when there are stops", () => {
        const gtfs = new RawGtfs();
        const stopId1 = "stop_id_1";
        const stopId2 = "stop_id_2";
        const stop1 = TestFactory.createStop({ stop_id: stopId1 });
        const stop2 = TestFactory.createStop({ stop_id: stopId2 });
        gtfs.setStop(stop1);
        gtfs.setStop(stop2);
        expect(gtfs.buildArrayOfStops()).toEqual([stop1, stop2]);
      });

      it("Build an array of stops when there are no stops", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfStops()).toEqual([]);
      });
    });

    describe("Test updateStopIdOnStopWithoutUpdatingReferences", () => {
      it("Update a stop id on a stop that exists", () => {
        const gtfs = new RawGtfs();
        const stopId1 = "stop_id_1";
        const stopId2 = "stop_id_2";
        const stop1 = TestFactory.createStop({ stop_id: stopId1 });
        gtfs.setStop(stop1);
        gtfs.updateStopIdOnStopWithoutUpdatingReferences(stopId1, stopId2);
        expect(gtfs.getStop(stopId1)).toBeUndefined();
        expect(gtfs.getStop(stopId2)).toEqual(stop1);
      });

      it("Update a stop id on a stop that does not exist", () => {
        const gtfs = new RawGtfs();
        const stopId1 = "stop_id_1";
        const stopId2 = "stop_id_2";
        gtfs.updateStopIdOnStopWithoutUpdatingReferences(stopId1, stopId2);
        expect(gtfs.getStop(stopId1)).toBeUndefined();
      });
    });

    describe("Test deleteStopWithoutDeletingReferences", () => {
      it("Delete a stop that exists", () => {
        const gtfs = new RawGtfs();
        const stopId = "stop_id_1";
        const stop = TestFactory.createStop({ stop_id: stopId });
        gtfs.setStop(stop);
        expect(gtfs.getNumberOfStops()).toBe(1);
        gtfs.deleteStopWithoutDeletingReferences(stop);
        expect(gtfs.getNumberOfStops()).toBe(0);
      });

      it("Delete a stop that does not exist", () => {
        const gtfs = new RawGtfs();
        const stopId1 = "stop_id_1";
        const stopId2 = "stop_id_2";
        const stop1 = TestFactory.createStop({ stop_id: stopId1 });
        const stop2 = TestFactory.createStop({ stop_id: stopId2 });
        gtfs.setStop(stop2);
        expect(gtfs.getNumberOfStops()).toBe(1);
        gtfs.deleteStopWithoutDeletingReferences(stop1);
        expect(gtfs.getNumberOfStops()).toBe(1);
        expect(gtfs.getStop(stopId1)).toBeUndefined();
        expect(gtfs.getStop(stopId2)).toEqual(stop2);
      });
    });
  });

  describe("Test routes.txt related functions", () => {
    describe("Test setRoute", () => {
      it("Set a route where there are no routes", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfRoutes()).toBe(0);
        gtfs.setRoute(TestFactory.createRoute());
        expect(gtfs.getNumberOfRoutes()).toBe(1);
      });

      it("Set a route where there is already a route with the same id", () => {
        const gtfs = new RawGtfs();
        const routeId = "route_id_1";
        const route1 = TestFactory.createRoute({ route_id: routeId });
        gtfs.setRoute(route1);
        expect(gtfs.getNumberOfRoutes()).toBe(1);
        
        const route2 = TestFactory.createRoute({ route_id: routeId });
        gtfs.setRoute(route2);
        expect(gtfs.getNumberOfRoutes()).toBe(1);
      });

      it("Set a route where there is no route with the same id", () => {
        const gtfs = new RawGtfs();
        const routeId1 = "route_id_1";
        const route1 = TestFactory.createRoute({ route_id: routeId1 });
        gtfs.setRoute(route1);
        expect(gtfs.getNumberOfRoutes()).toBe(1);

        const routeId2 = "route_id_2";
        const route2 = TestFactory.createRoute({ route_id: routeId2 });
        gtfs.setRoute(route2);
        expect(gtfs.getNumberOfRoutes()).toBe(2);
      });
    });

    describe("Test getRoute", () => {
      it("Get a route when there is a route with the id", () => {
        const gtfs = new RawGtfs();
        const routeId = "route_id_1";
        gtfs.setRoute(TestFactory.createRoute({ route_id: routeId }));
        const route = gtfs.getRoute(routeId);
        expect(route).toBeDefined();
        if (!route) {
          throw new Error("Route is undefined");
        }
        expect(route.route_id).toBe(routeId);
      });

      it("Get a route when there is no route with the id", () => {
        const gtfs = new RawGtfs();
        const routeId = "route_id_1";
        const route = gtfs.getRoute(routeId);
        expect(route).toBeUndefined();
      });
    });

    describe("Test getNumberOfRoutes", () => {
      it("Get the number of routes when there are no routes", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfRoutes()).toBe(0);
      });

      it("Get the number of routes when there are routes", () => {
        const gtfs = new RawGtfs();
        gtfs.setRoute(TestFactory.createRoute());
        expect(gtfs.getNumberOfRoutes()).toBe(1);
      });
    });

    describe("Test buildArrayOfRoutes", () => {
      it("Build an array of routes when there are no routes", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfRoutes()).toEqual([]);
      });

      it("Build an array of routes when there are routes", () => {
        const gtfs = new RawGtfs();
        const routeId1 = "route_id_1";
        const routeId2 = "route_id_2";
        const route1 = TestFactory.createRoute({ route_id: routeId1 });
        const route2 = TestFactory.createRoute({ route_id: routeId2 });
        gtfs.setRoute(route1);
        gtfs.setRoute(route2);
        expect(gtfs.buildArrayOfRoutes()).toEqual([route1, route2]);
      });
    });

    describe("Test updateRouteIdOnRouteWithoutUpdatingReferences", () => {
      it("Update a route id on a route that exists", () => {
        const gtfs = new RawGtfs();
        const routeId1 = "route_id_1";
        const route1 = TestFactory.createRoute({ route_id: routeId1 });
        gtfs.setRoute(route1);
        expect(gtfs.getNumberOfRoutes()).toBe(1);
        
        const routeId2 = "route_id_2";
        gtfs.updateRouteIdOnRouteWithoutUpdatingReferences(routeId1, routeId2);
        expect(gtfs.getNumberOfRoutes()).toBe(1);
        expect(gtfs.getRoute(routeId1)).toBeUndefined();
        expect(gtfs.getRoute(routeId2)).toEqual(route1);
      });

      it("Update a route id on a route that does not exist", () => {
        const gtfs = new RawGtfs();
        const routeId1 = "route_id_1";
        const route1 = TestFactory.createRoute({ route_id: routeId1 });
        gtfs.setRoute(route1);
        expect(gtfs.getNumberOfRoutes()).toBe(1);

        const routeId2 = "route_id_2";
        const routeId3 = "route_id_3";
        gtfs.updateRouteIdOnRouteWithoutUpdatingReferences(routeId2, routeId3);
        expect(gtfs.getRoute(routeId2)).toBeUndefined();
        expect(gtfs.getRoute(routeId3)).toBeUndefined();
      });
    });

    describe("Test deleteRouteWithoutDeletingReferences", () => {
      it("Delete a route that exists", () => {
        const gtfs = new RawGtfs();
        const routeId = "route_id_1";
        const route = TestFactory.createRoute({ route_id: routeId });
        gtfs.setRoute(route);
        expect(gtfs.getNumberOfRoutes()).toBe(1);
        gtfs.deleteRouteWithoutDeletingReferences(route);
        expect(gtfs.getNumberOfRoutes()).toBe(0);
      });

      it("Delete a route that does not exist", () => {
        const gtfs = new RawGtfs();
        const routeId1 = "route_id_1";
        const route1 = TestFactory.createRoute({ route_id: routeId1 });
        gtfs.setRoute(route1);
        expect(gtfs.getNumberOfRoutes()).toBe(1);

        const routeId2 = "route_id_2";
        gtfs.deleteRouteWithoutDeletingReferences({ route_id: routeId2 });
        expect(gtfs.getNumberOfRoutes()).toBe(1);
        expect(gtfs.getRoute(routeId1)).toEqual(route1);
        expect(gtfs.getRoute(routeId2)).toBeUndefined();
      }); 
    });
  });

  describe("Test trips.txt related functions", () => {
    describe("Test setTrip", () => {
      it("Set a trip where there are no trips", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfTrips()).toBe(0);
        gtfs.setTrip(TestFactory.createTrip());
        expect(gtfs.getNumberOfTrips()).toBe(1);
      });

      it("Set a trip where there is already a trip with the same id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        gtfs.setTrip(TestFactory.createTrip({ trip_id: tripId }));
        expect(gtfs.getNumberOfTrips()).toBe(1);
        
        const trip2 = TestFactory.createTrip({ trip_id: tripId });
        gtfs.setTrip(trip2);
        expect(gtfs.getNumberOfTrips()).toBe(1);
      });

      it("Set a trip where there is no trip with the same id", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const trip1 = TestFactory.createTrip({ trip_id: tripId1 });
        gtfs.setTrip(trip1);
        expect(gtfs.getNumberOfTrips()).toBe(1);
        
        const tripId2 = "trip_id_2";
        const trip2 = TestFactory.createTrip({ trip_id: tripId2 });
        gtfs.setTrip(trip2);
        expect(gtfs.getNumberOfTrips()).toBe(2);
      });
    });

    describe("Test getTrip", () => {
      it("Get a trip when there is a trip with the id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        gtfs.setTrip(TestFactory.createTrip({ trip_id: tripId }));
        const trip = gtfs.getTrip(tripId);
        expect(trip).toBeDefined();
        if (!trip) {
          throw new Error("Trip is undefined");
        }
        expect(trip.trip_id).toBe(tripId);
      });

      it("Get a trip when there is no trip with the id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const trip = gtfs.getTrip(tripId);
        expect(trip).toBeUndefined();
      });
    });

    describe("Test getNumberOfTrips", () => {
      it("Get the number of trips when there are no trips", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfTrips()).toBe(0);
      });

      it("Get the number of trips when there are trips", () => {
        const gtfs = new RawGtfs();
        gtfs.setTrip(TestFactory.createTrip());
        expect(gtfs.getNumberOfTrips()).toBe(1);
      });
    });

    describe("Test buildArrayOfTrips", () => {
      it("Build an array of trips when there are no trips", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfTrips()).toEqual([]);
      });

      it("Build an array of trips when there are trips", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const tripId2 = "trip_id_2";
        const trip1 = TestFactory.createTrip({ trip_id: tripId1 });
        const trip2 = TestFactory.createTrip({ trip_id: tripId2 });
        gtfs.setTrip(trip1);
        gtfs.setTrip(trip2);
        expect(gtfs.buildArrayOfTrips()).toEqual([trip1, trip2]);
      });
    });

    describe("Test updateTripIdWithoutUpdatingReferences", () => {
      it("Update a trip id on a trip that exists", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const trip1 = TestFactory.createTrip({ trip_id: tripId1 });
        gtfs.setTrip(trip1);
        expect(gtfs.getNumberOfTrips()).toBe(1);

        const tripId2 = "trip_id_2";
        gtfs.updateTripIdWithoutUpdatingReferences(tripId1, tripId2);
        expect(gtfs.getNumberOfTrips()).toBe(1);
        expect(gtfs.getTrip(tripId1)).toBeUndefined();
        expect(gtfs.getTrip(tripId2)).toEqual(trip1);
      });

      it("Update a trip id on a trip that does not exist", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const tripId2 = "trip_id_2";
        gtfs.updateTripIdWithoutUpdatingReferences(tripId1, tripId2);
        expect(gtfs.getTrip(tripId1)).toBeUndefined();
        expect(gtfs.getTrip(tripId2)).toBeUndefined();
      });
    });

    describe("Test deleteTripWithoutDeletingReferences", () => {
      it("Delete a trip that exists", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const trip = TestFactory.createTrip({ trip_id: tripId });
        gtfs.setTrip(trip); 
        expect(gtfs.getNumberOfTrips()).toBe(1);
        gtfs.deleteTripWithoutDeletingReferences(trip);
        expect(gtfs.getNumberOfTrips()).toBe(0);
      });

      it("Delete a trip that does not exist", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const trip1 = TestFactory.createTrip({ trip_id: tripId1 });
        gtfs.setTrip(trip1);
        expect(gtfs.getNumberOfTrips()).toBe(1);

        const tripId2 = "trip_id_2";
        gtfs.deleteTripWithoutDeletingReferences({ trip_id: tripId2 });
        expect(gtfs.getNumberOfTrips()).toBe(1);
        expect(gtfs.getTrip(tripId1)).toEqual(trip1);
        expect(gtfs.getTrip(tripId2)).toBeUndefined();
      });
    });
  });

  describe("Test stop_times.txt related functions", () => {
    describe("Test setStopTime", () => {
      it("Set a stop time where there are no stop times", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfStopTimes()).toBe(0);

        const stopTime = TestFactory.createStopTime();
        gtfs.setStopTime(stopTime);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
      });

      it("Set a stop time where there is already a stop time with the same id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopId = "stop_id_1";
        const stopTime = TestFactory.createStopTime({ trip_id: tripId, stop_id: stopId });
        gtfs.setStopTime(stopTime);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);

        const stopTime2 = TestFactory.createStopTime({ trip_id: tripId, stop_id: stopId });
        gtfs.setStopTime(stopTime2);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
      });

      it("Set a stop time where there is no stop time with the same id", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const stopId1 = "stop_id_1";
        const stopTime1 = TestFactory.createStopTime({ trip_id: tripId1, stop_id: stopId1 });
        gtfs.setStopTime(stopTime1);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);

        const tripId2 = "trip_id_2";
        const stopId2 = "stop_id_2";
        const stopTime2 = TestFactory.createStopTime({ trip_id: tripId2, stop_id: stopId2 });
        gtfs.setStopTime(stopTime2);
        expect(gtfs.getNumberOfStopTimes()).toBe(2);
      });
    });

    describe("Test getStopTime", () => {
      it("Get a stop time when there is a stop time with the ids", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        const stopTimeToSet = TestFactory.createStopTime({ trip_id: tripId, stop_sequence: stopSequence });
        gtfs.setStopTime(stopTimeToSet);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);

        const stopTime = gtfs.getStopTime(tripId, stopSequence);
        expect(stopTime).toBeDefined();
        if (!stopTime) {
          throw new Error("Stop time is undefined");
        }
        expect(stopTime).toEqual(stopTimeToSet);
      });

      it("Get a stop time when there is no stop time with the id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        const stopTime = gtfs.getStopTime(tripId, stopSequence);
        expect(stopTime).toBeUndefined();
      }); 
    });

    describe("Test buildArrayOfStopTimesOfTripId", () => {
      it("Get the stop times of a trip when there are stop times", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const stopSequence11 = "1";
        const stopSequence12 = "2";
        const stopTime11 = TestFactory.createStopTime({ trip_id: tripId1, stop_sequence: stopSequence11 });
        const stopTime12 = TestFactory.createStopTime({ trip_id: tripId1, stop_sequence: stopSequence12 });
        gtfs.setStopTime(stopTime11);
        gtfs.setStopTime(stopTime12);
        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId1)).toEqual([stopTime11, stopTime12]);

        const tripId2 = "trip_id_2";
        const stopSequence21 = "1";
        const stopSequence22 = "2";
        const stopTime21 = TestFactory.createStopTime({ trip_id: tripId2, stop_sequence: stopSequence21 });
        const stopTime22 = TestFactory.createStopTime({ trip_id: tripId2, stop_sequence: stopSequence22 });
        gtfs.setStopTime(stopTime21);
        gtfs.setStopTime(stopTime22);

        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId1)).toEqual([stopTime11, stopTime12]);
        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId2)).toEqual([stopTime21, stopTime22]);
      });

      it("Get the stop times of a trip when there are no stop times", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId)).toEqual([]);
      });

      it("Get the stop times of a trip when there are no stop times of this trip", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const tripId2 = "trip_id_2";
        const stopSequence11 = "1";
        const stopSequence12 = "2";
        const stopTime11 = TestFactory.createStopTime({ trip_id: tripId1, stop_sequence: stopSequence11 });
        const stopTime12 = TestFactory.createStopTime({ trip_id: tripId1, stop_sequence: stopSequence12 });
        gtfs.setStopTime(stopTime11);
        gtfs.setStopTime(stopTime12);

        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId2)).toEqual([]);
      });
    });

    describe("Test buildArrayOfStopTimesOfTrip", () => {
      it("Build an array of stop times of a trip", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopTime12 = TestFactory.createStopTime({ trip_id: tripId });
        gtfs.setStopTime(stopTime12);

        expect(gtfs.buildArrayOfStopTimesOfTrip({trip_id: tripId})).toEqual([stopTime12]);
      });
    });

    describe("Test buildOrderedStopTimesOfTrip", () => {
      it("Build an ordered array of stop times of a trip", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence12 = "2";
        const stopTime12 = TestFactory.createStopTime({ trip_id: tripId, stop_sequence: stopSequence12 });
        gtfs.setStopTime(stopTime12);

        const stopSequence11 = "1";
        const stopTime11 = TestFactory.createStopTime({ trip_id: tripId, stop_sequence: stopSequence11 });
        gtfs.setStopTime(stopTime11);

        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId)).toEqual([stopTime12, stopTime11]);
        expect(gtfs.buildOrderedStopTimesOfTrip(tripId)).toEqual([stopTime11, stopTime12]);
      });
    });
  });



});
