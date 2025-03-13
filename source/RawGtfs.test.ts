import { RawGtfs } from "./RawGtfs";
import { GtfsAgencyCardinality, GtfsCalendarField, GtfsFeedInfoField, GtfsStopField } from "./RawGtfsTypes";
import { describe, expect } from '@jest/globals';
import { TestFactory } from "./TestHelpers/TestFactory";
import { RawGtfs4Testing } from "./RawGtfs4Testing";

describe("Test RawGtfs Class", () => {
  describe("Test agency.txt related functions", () => {
    describe("Test setAgency", () => {
      it("Set an agency when cardinality is Absent", () => {
        const gtfs = new RawGtfs4Testing();
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Absent);
        expect(gtfs.getNumberOfAgencies()).toBe(0);

        gtfs.setAgency(TestFactory.createAgency());
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);
      });

      it("Set an agency when cardinality is Singleton", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
      
        
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        expect(gtfs.getNumberOfAgencies()).toBe(1);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);

        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
      });

      it("Set an agency when cardinality is Multiple", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        const agencyId3 = "agency_id_3";
        
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);

        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId3 }));
        expect(gtfs.getNumberOfAgencies()).toBe(3);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
      });
    });

    describe("Test getAgency", () => {
      it("Get an agency when cardinality is Singleton", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId = "agency_id_1";
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId }));
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);

        const agency = gtfs.getAgency();
        expect(agency).toBeDefined();
        if (!agency) {
          throw new Error("Agency is undefined");
        }
        expect(agency.agency_id).toBe(agencyId);
      });

      it("Get an agency when cardinality is Multiple", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId1 }));
        gtfs.setAgency(TestFactory.createAgency({ agency_id: agencyId2 }));
        expect(gtfs.getNumberOfAgencies()).toBe(2);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);

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
        const gtfs = new RawGtfs4Testing();
        expect(gtfs.getNumberOfAgencies()).toBe(0);
      });
    });

    describe("Test buildArrayOfAgencies", () => {
      it("Build an array of agencies when cardinality is Singleton", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId = "agency_id_1";
        const agency = TestFactory.createAgency({ agency_id: agencyId });
        gtfs.setAgency(agency);
        expect(gtfs.buildArrayOfAgencies()).toEqual([agency]);
      });

      it("Build an array of agencies when cardinality is Multiple", () => {
        const gtfs = new RawGtfs4Testing();
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
        const gtfs = new RawGtfs4Testing();
        const agencyId = "agency_id_1";
        const originalAgencyName = "Original Agency Name";
        const originalAgency = TestFactory.createAgency({ agency_id: agencyId, agency_name: originalAgencyName });
        gtfs.setAgency(originalAgency);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);

        const updatedAgencyName = "Updated Agency Name";
        const updatedAgency = TestFactory.createAgency({ agency_id: agencyId, agency_name: updatedAgencyName });
        gtfs.updateAgency(updatedAgency);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Singleton);
        expect(gtfs.getNumberOfAgencies()).toBe(1);

        const agency = gtfs.getAgency();
        expect(agency).toBeDefined();
        if (!agency) {
          throw new Error("Agency is undefined");
        }
        expect(agency.agency_name).toBe(updatedAgencyName);
      });

      it("Update an agency when cardinality is Multiple", () => {
        const gtfs = new RawGtfs4Testing();
        const agencyId1 = "agency_id_1";
        const agencyId2 = "agency_id_2";
        const originalAgencyName1 = "Original Agency Name 1";
        const originalAgencyName2 = "Original Agency Name 2";
        const originalAgency1 = TestFactory.createAgency({ agency_id: agencyId1, agency_name: originalAgencyName1 });
        const originalAgency2 = TestFactory.createAgency({ agency_id: agencyId2, agency_name: originalAgencyName2 });
        gtfs.setAgencies([originalAgency1, originalAgency2]);
        expect(gtfs.test_getAgencyCardinality()).toBe(GtfsAgencyCardinality.Multiple);
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
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_id: stopId1 });
        expect(gtfs.getNumberOfStopTimes()).toBe(1);

        const tripId2 = "trip_id_2";
        const stopId2 = "stop_id_2";
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId2, stop_id: stopId2 });
        expect(gtfs.getNumberOfStopTimes()).toBe(2);
      });
    });

    describe("Test setStopTimes", () => {
      it("Set stop times where there are no stop times", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfStopTimes()).toBe(0);

        const stopSequence1 = "1";
        const stopTime1 = TestFactory.createStopTime({ stop_sequence: stopSequence1 });
        const stopSequence2 = "2";
        const stopTime2 = TestFactory.createStopTime({ stop_sequence: stopSequence2 });
        gtfs.setStopTimes([stopTime1, stopTime2]);
        expect(gtfs.getNumberOfStopTimes()).toBe(2);
      });
    });

    describe("Test getStopTime", () => {
      it("Get a stop time when there is a stop time with the ids", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        const stopTimeToSet = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence });
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
        const stopTime11 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence11 });
        const stopTime12 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence12 });
        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId1)).toEqual([stopTime11, stopTime12]);

        const tripId2 = "trip_id_2";
        const stopSequence21 = "1";
        const stopSequence22 = "2";
        const stopTime21 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId2, stop_sequence: stopSequence21 });
        const stopTime22 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId2, stop_sequence: stopSequence22 });

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
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence11 });
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence12 });

        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId2)).toEqual([]);
      });
    });

    describe("Test buildArrayOfStopTimesOfTrip", () => {
      it("Build an array of stop times of a trip", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopTime12 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId });

        expect(gtfs.buildArrayOfStopTimesOfTrip({trip_id: tripId})).toEqual([stopTime12]);
      });
    });

    describe("Test buildOrderedStopTimesOfTripId", () => {
      it("Build an ordered array of stop times of a trip", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence12 = "2";
        const stopTime12 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence12 });

        const stopSequence11 = "1";
        const stopTime11 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence11 });

        expect(gtfs.buildArrayOfStopTimesOfTripId(tripId)).toEqual([stopTime12, stopTime11]);
        expect(gtfs.buildOrderedStopTimesOfTripId(tripId)).toEqual([stopTime11, stopTime12]);
      });
    });

    describe("Test buildOrderedStopTimesOfTrip", () => {
      it("Build an ordered array of stop times of a trip", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence12 = "2";
        const stopTime12 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence12 });

        const stopSequence11 = "1";
        const stopTime11 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence11 });

        expect(gtfs.buildArrayOfStopTimesOfTrip({trip_id: tripId})).toEqual([stopTime12, stopTime11]);
        expect(gtfs.buildOrderedStopTimesOfTrip({trip_id: tripId})).toEqual([stopTime11, stopTime12]);
      });
    });

    describe("Test getNumberOfStopTimes", () => {
      it("Get the number of stop times when there are stop times", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
      });

      it("Get the number of stop times when there are stop times", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence });
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
      });
    });

    describe("Test buildArrayOfStopTimes", () => {
      it("When there are no stop times", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfStopTimes()).toEqual([]);
      });

      it("When there are stop times", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence1 = "1";
        const stopSequence2 = "2";
        const stopTime1 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence1 });
        const stopTime2 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence2 });
       
        expect(gtfs.buildArrayOfStopTimes()).toEqual([stopTime1, stopTime2]);
      });
    });

    describe("Test updateStopTimesTripIdWithoutUpdatingReferences", () => {
      it("Update a stop time trip id without updating references", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const stopSequence = "1";
        const stopTime = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence });
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
        expect(gtfs.getStopTime(tripId1, stopSequence)?.trip_id).toEqual(tripId1);

        const tripId2 = "trip_id_2";
        gtfs.updateStopTimesTripIdWithoutUpdatingReferences(tripId1, tripId2);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
        expect(gtfs.getStopTime(tripId1, stopSequence)).toBeUndefined();
        expect(gtfs.getStopTime(tripId2, stopSequence)?.trip_id).toEqual(tripId2);
      });
    });

    describe("Test updateStopTimeStopSequenceWithoutUpdatingReferences", () => {
      it("Update a stop time stop sequence without updating references", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence1 = "1";
        const stopTime1 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence1 });
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
        expect(gtfs.getStopTime(tripId, stopSequence1)?.stop_sequence).toEqual(stopSequence1);

        const stopSequence2 = "2";
        gtfs.updateStopTimeStopSequenceWithoutUpdatingReferences(tripId, stopSequence1, stopSequence2);
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
        expect(gtfs.getStopTime(tripId, stopSequence1)).toBeUndefined();
        expect(gtfs.getStopTime(tripId, stopSequence2)?.stop_sequence).toEqual(stopSequence2);
      });
    });

    describe("Test deleteStopTimeWithoutDeletingReferences", () => {
      it("Delete a stop time without deleting references", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        const stopTime = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence });
        expect(gtfs.getNumberOfStopTimes()).toBe(1);
        expect(gtfs.getStopTime(tripId, stopSequence)?.trip_id).toEqual(tripId);

        gtfs.deleteStopTimeWithoutDeletingReferences(stopTime);
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
        expect(gtfs.getStopTime(tripId, stopSequence)).toBeUndefined();
      });

      it("Delete a stop time without deleting references when the stop time does not exist", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence = "1";
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
        const stopTime = TestFactory.createStopTime({ trip_id: tripId, stop_sequence: stopSequence });
        gtfs.deleteStopTimeWithoutDeletingReferences(stopTime);
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
      });
    });

    describe("Test deleteStopTimesOfTripIdWithoutDeletingReferences", () => {
      it("When there are a few stop times with that trip id", () => {
        const gtfs = new RawGtfs();
        const tripId1 = "trip_id_1";
        const stopSequence11 = "1";
        const stopSequence12 = "2";
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence11 });
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId1, stop_sequence: stopSequence12 });
        expect(gtfs.getNumberOfStopTimes()).toBe(2);

        const tripId2 = "trip_id_2";
        const stopSequence21 = "1";
        const stopSequence22 = "2";
        const stopTime21 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId2, stop_sequence: stopSequence21 });
        const stopTime22 = TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId2, stop_sequence: stopSequence22 });
        expect(gtfs.getNumberOfStopTimes()).toBe(4);

        gtfs.deleteStopTimesOfTripIdWithoutDeletingReferences(tripId1);
        expect(gtfs.getNumberOfStopTimes()).toBe(2);
        expect(gtfs.getStopTime(tripId1, stopSequence11)).toBeUndefined();
        expect(gtfs.getStopTime(tripId1, stopSequence12)).toBeUndefined();
        expect(gtfs.getStopTime(tripId2, stopSequence21)).toEqual(stopTime21);
        expect(gtfs.getStopTime(tripId2, stopSequence22)).toEqual(stopTime22);  
      });

      it("When there are no stop times with that trip id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
        gtfs.deleteStopTimesOfTripIdWithoutDeletingReferences(tripId);
        expect(gtfs.getNumberOfStopTimes()).toBe(0);
      });
    });

    describe("Test reindexStopTimesOfTripId", () => {
      it("Reindex the stop times of a trip id", () => {
        const gtfs = new RawGtfs();
        const tripId = "trip_id_1";
        const stopSequence11 = "11";
        const stopSequence22 = "22";
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence11 });
        TestFactory.createAndSetStopTime(gtfs, { trip_id: tripId, stop_sequence: stopSequence22 });
        expect(gtfs.getNumberOfStopTimes()).toBe(2);
        const [stopTime11, stopTime22] = gtfs.buildOrderedStopTimesOfTripId(tripId);
        expect(stopTime11.stop_sequence).toEqual(stopSequence11);
        expect(stopTime22.stop_sequence).toEqual(stopSequence22);

        gtfs.reindexStopTimesOfTripId(tripId);

        const [stopTime1, stopTime2] = gtfs.buildOrderedStopTimesOfTripId(tripId);
        expect(stopTime1.stop_sequence).toEqual("1");
        expect(stopTime2.stop_sequence).toEqual("2");
      });
    });
  });

  describe("Test calendar.txt related functions", () => {
    describe("Test setCalendar", () => {
      it("Set a calendar where there are no calendars", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const calendar = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId });
        expect(gtfs.getCalendar(serviceId)).toEqual(calendar);
      });

      it("Set a calendar where there is already a calendar with the same service id", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const endOf2025 = "20251231";
        TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId, end_date: endOf2025 });
        expect(gtfs.getNumberOfCalendars()).toBe(1);
        expect(gtfs.getCalendar(serviceId)?.[GtfsCalendarField.EndDate]).toEqual(endOf2025);

        const endOf2026 = "20261231";
        TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId, end_date: endOf2026 });
        expect(gtfs.getNumberOfCalendars()).toBe(1);
        expect(gtfs.getCalendar(serviceId)?.[GtfsCalendarField.EndDate]).toEqual(endOf2026);
      });
    });

    describe("Test setCalendars", () => {
      it("Set a calendar where there are no calendars", () => {
        const gtfs = new RawGtfs();
        const calendars = [
          TestFactory.createCalendar({ service_id: "service_id_1" }),
          TestFactory.createCalendar({ service_id: "service_id_2" })
        ];
        gtfs.setCalendars(calendars);
        expect(gtfs.getNumberOfCalendars()).toBe(2);
        expect(gtfs.getCalendar("service_id_1")).toEqual(calendars[0]);
        expect(gtfs.getCalendar("service_id_2")).toEqual(calendars[1]);
      });
    });

    describe("Test setEverydayCalendar", () => {
      it("Set an everyday calendar", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const everydayCalendar = gtfs.setAndGetEverydayCalendar({ service_id: serviceId });
        expect(everydayCalendar).toEqual(gtfs.getCalendar(serviceId));
      });
    });

    describe("Test getCalendar", () => {
      it("Get a calendar when there is a calendar with the service id", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const calendar = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId });
        expect(gtfs.getCalendar(serviceId)).toEqual(calendar);
      });
    });

    describe("Test getNumberOfCalendars", () => {
      it("Get the number of calendars when there are no calendars", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfCalendars()).toBe(0);
      });

      it("Get the number of calendars when there are calendars", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId });
        expect(gtfs.getNumberOfCalendars()).toBe(1);
      });
    });
    
    describe("Test buildArrayOfCalendars", () => {
      it("Build an array of calendars when there are no calendars", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfCalendars()).toEqual([]);
      });

      it("Build an array of calendars when there are calendars", () => {
        const gtfs = new RawGtfs();
        const serviceId1 = "service_id_1";
        const serviceId2 = "service_id_2";
        const calendar1 = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId1 });
        const calendar2 = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId2 });
        expect(gtfs.buildArrayOfCalendars()).toEqual([calendar1, calendar2]);
      });
    });

    describe("Test updateCalendarServiceIdWithoutUpdatingReferences", () => {
      it("Update a calendar service id without updating references", () => {
        const gtfs = new RawGtfs();
        const serviceId1 = "service_id_1";
        const serviceId2 = "service_id_2";
        const calendar1 = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId1 });
        const calendar2 = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId2 });
        expect(gtfs.buildArrayOfCalendars()).toEqual([calendar1, calendar2]);

        const newServiceId1 = "new_service_id_1";
        const newCalendar1 = {...calendar1, [GtfsCalendarField.ServiceId]: newServiceId1};
        gtfs.updateCalendarServiceIdWithoutUpdatingReferences(serviceId1, newServiceId1);

        expect(gtfs.buildArrayOfCalendars()).toEqual([calendar2, newCalendar1]);
        expect(gtfs.getCalendar(serviceId1)).toBeUndefined();
        expect(gtfs.getCalendar(newServiceId1)).toEqual(calendar1);
      });
    });

    describe("Test deleteCalendarWithoutDeletingReferences", () => {
      it("Delete a calendar without deleting references", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const calendar = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId });
        expect(gtfs.getNumberOfCalendars()).toBe(1);

        gtfs.deleteCalendarWithoutDeletingReferences(calendar);
        expect(gtfs.getNumberOfCalendars()).toBe(0);
        expect(gtfs.getCalendar(serviceId)).toBeUndefined();
      });
    });

    describe("Test deleteCalendarServiceIdWithoutDeletingReferences", () => {
      it("Delete a calendar service id without deleting references", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const calendar = TestFactory.createAndSetCalendar(gtfs, { service_id: serviceId });
        expect(gtfs.getNumberOfCalendars()).toBe(1);

        gtfs.deleteCalendarServiceIdWithoutDeletingReferences(serviceId);
        expect(gtfs.getNumberOfCalendars()).toBe(0);
        expect(gtfs.getCalendar(serviceId)).toBeUndefined();
      });
    });
  });

  describe("Test calendar_dates.txt related functions", () => {
    describe("Test setCalendarDate", () => {
      it("Set a calendar date", () => {
        const gtfs = new RawGtfs();

        const serviceId = "service_id_1";
        const date = "20250101";
        const calendarDate = TestFactory.createCalendarDate({ service_id: serviceId, date: date });
        gtfs.setCalendarDate(calendarDate);
        expect(gtfs.getCalendarDate(serviceId, date)).toEqual(calendarDate);
      });
    });

    describe("Test setCalendarDates", () => {
      it("Set calendar dates", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfCalendarDates()).toBe(0);

        const serviceId1 = "service_id_1";
        const serviceId2 = "service_id_2";
        const date1 = "20250101";
        const date2 = "20250102";
        const calendarDate1 = TestFactory.createCalendarDate({ service_id: serviceId1, date: date1 });
        const calendarDate2 = TestFactory.createCalendarDate({ service_id: serviceId2, date: date2 });
        const calendarDates = [calendarDate1, calendarDate2];
        gtfs.setCalendarDates(calendarDates);
        expect(gtfs.getNumberOfCalendarDates()).toBe(2);
        expect(gtfs.getCalendarDate(serviceId1, date1)).toEqual(calendarDate1);
        expect(gtfs.getCalendarDate(serviceId2, date2)).toEqual(calendarDate2);
      });
    });

    describe("Test getCalendarDate", () => {
      it("Get a calendar date", () => {
        const gtfs = new RawGtfs();

        const serviceId = "service_id_1";
        const date = "20250101";
        const calendarDate = TestFactory.createAndSetCalendarDate(gtfs, { service_id: serviceId, date: date });
        expect(gtfs.getCalendarDate(serviceId, date)).toEqual(calendarDate);
      });
    });

    describe("Test getNumberOfCalendarDates", () => {
      it("Get the number of calendar dates", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfCalendarDates()).toBe(0);

        const serviceId = "service_id_1";
        const date = "20250101";
        TestFactory.createAndSetCalendarDate(gtfs, { service_id: serviceId, date: date });
        expect(gtfs.getNumberOfCalendarDates()).toBe(1);
      });
    });

    describe("Test buildArrayOfCalendarDates", () => {
      it("Build an array of calendar dates", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfCalendarDates()).toEqual([]);
      });

      it("Build an array of calendar dates", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const date = "20250101";
        const calendarDate = TestFactory.createAndSetCalendarDate(gtfs, { service_id: serviceId, date: date });
        expect(gtfs.buildArrayOfCalendarDates()).toEqual([calendarDate]);
      });
    });

    describe("Test updateCalendarDateServiceIdWithoutUpdatingReferences", () => {
      it("Update a calendar date service id without updating references", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const date = "20250101";
        const calendarDate = TestFactory.createAndSetCalendarDate(gtfs, { service_id: serviceId, date: date });
        const newServiceId = "new_service_id_1";
        gtfs.updateCalendarDateServiceIdWithoutUpdatingReferences(serviceId, newServiceId);
        expect(gtfs.getCalendarDate(serviceId, date)).toBeUndefined();
        expect(gtfs.getCalendarDate(newServiceId, date)).toEqual(calendarDate);
      });
    });

    describe("Test deleteCalendarDateWithoutDeletingReferences", () => {
      it("Delete a calendar date without deleting references", () => {
        const gtfs = new RawGtfs();
        const serviceId = "service_id_1";
        const date = "20250101";
        const calendarDate = TestFactory.createAndSetCalendarDate(gtfs, { service_id: serviceId, date: date });
        gtfs.deleteCalendarDateWithoutDeletingReferences(calendarDate);
        expect(gtfs.getCalendarDate(serviceId, date)).toBeUndefined();  
      });
    });
  });

  describe("Test shapes.txt related functions", () => {
    describe("Test setShapePoint", () => {
      it("Set a shape point", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfShapePoints()).toBe(0);

        const shapeId = "shape_id_1";
        const shapePoint = TestFactory.createShapePoint({ shape_id: shapeId });
        gtfs.setShapePoint(shapePoint);
        expect(gtfs.getNumberOfShapePoints()).toBe(1);
        expect(gtfs.getShapePoint(shapeId)).toEqual(shapePoint);
      });
    });

    describe("Test setShapePoints", () => {
      it("Set shape points", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfShapePoints()).toBe(0);

        const shapeId = "shape_id_1";
        const shapePoint = TestFactory.createAndSetShapePoint(gtfs, { shape_id: shapeId });
        expect(gtfs.getShapePoint(shapeId)).toEqual(shapePoint);
      });
    });

    describe("Test getNumberOfShapePoints", () => {
      it("Get the number of shape points", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.getNumberOfShapePoints()).toBe(0);

        const shapeId = "shape_id_1";
        const shapePoint = TestFactory.createAndSetShapePoint(gtfs, { shape_id: shapeId });
        expect(gtfs.getShapePoint(shapeId)).toEqual(shapePoint);
        expect(gtfs.getNumberOfShapePoints()).toBe(1);
      });
    });

    describe("Test buildArrayOfShapePoints", () => {
      it("Build an array of shape points", () => {
        const gtfs = new RawGtfs();
        expect(gtfs.buildArrayOfShapePoints()).toEqual([]);

        const shapeId = "shape_id_1";
        const shapePoint = TestFactory.createAndSetShapePoint(gtfs, { shape_id: shapeId });
        expect(gtfs.buildArrayOfShapePoints()).toEqual([shapePoint]);
      });
    });
  });

  describe("Test feed_info.txt related functions", () => {
    describe("Test getFeedInfo", () => {
      it("Get the feed info", () => {
        const gtfs = new RawGtfs4Testing();
        const feedInfo = gtfs.getFeedInfo();
        expect(feedInfo?.[GtfsFeedInfoField.FeedPublisherName]).toEqual(gtfs.test_getDefaultFeedPublisherName());
        expect(feedInfo?.[GtfsFeedInfoField.FeedPublisherUrl]).toEqual(gtfs.test_getDefaultFeedPublisherUrl());
        expect(feedInfo?.[GtfsFeedInfoField.FeedLang]).toEqual(gtfs.test_getDefaultFeedLang());
      });
    });

    describe("Test setFeedStartDate", () => {
      it("Set the feed start date", () => {
        const gtfs = new RawGtfs4Testing();
        const feedStartDate = "20250101";
        gtfs.setFeedStartDate(feedStartDate);
        expect(gtfs.getFeedStartDate()).toEqual(feedStartDate);
      });
    });

    describe("Test getFeedStartDate", () => {
      it("Get the feed start date", () => {
        const gtfs = new RawGtfs4Testing();
        const feedStartDate = "20250101";
        gtfs.setFeedStartDate(feedStartDate);
        expect(gtfs.getFeedStartDate()).toEqual(feedStartDate);
      });
    });

    describe("Test setFeedEndDate", () => {
      it("Set the feed end date", () => {
        const gtfs = new RawGtfs4Testing();
        const feedEndDate = "20251231";
        gtfs.setFeedEndDate(feedEndDate);
        expect(gtfs.getFeedEndDate()).toEqual(feedEndDate);
      });
    });

    describe("Test getFeedEndDate", () => {
      it("Get the feed end date", () => {
        const gtfs = new RawGtfs4Testing();
        const feedEndDate = "20251231";
        gtfs.setFeedEndDate(feedEndDate);
        expect(gtfs.getFeedEndDate()).toEqual(feedEndDate);
      });
    });

    describe("Test setFeedVersion", () => {
      it("Set the feed version", () => {
        const gtfs = new RawGtfs4Testing();
        const feedVersion = "1.0";
        gtfs.setFeedVersion(feedVersion);
        expect(gtfs.getFeedVersion()).toEqual(feedVersion);
      });
    });

    describe("Test getFeedVersion", () => {
      it("Get the feed version", () => {
        const gtfs = new RawGtfs4Testing();
        const feedVersion = "1.0";
        gtfs.setFeedVersion(feedVersion);
        expect(gtfs.getFeedVersion()).toEqual(feedVersion);
      });
    });

    describe("Test setFeedContactUrl", () => {
      it("Set the feed contact url", () => {
        const gtfs = new RawGtfs4Testing();
        const feedContactUrl = "http://test.com";
        gtfs.setFeedContactUrl(feedContactUrl);
        expect(gtfs.getFeedContactUrl()).toEqual(feedContactUrl);
      });
    });

    describe("Test getFeedContactUrl", () => {
      it("Get the feed contact url", () => {
        const gtfs = new RawGtfs4Testing();
        const feedContactUrl = "http://test.com";
        gtfs.setFeedContactUrl(feedContactUrl);
        expect(gtfs.getFeedContactUrl()).toEqual(feedContactUrl);
      });
    });    
  });
});
