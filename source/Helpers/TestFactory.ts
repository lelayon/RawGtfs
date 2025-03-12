import { RawGtfs } from "../RawGtfs";
import { GtfsAgency, GtfsAgencyField, GtfsRoute, GtfsRouteField, GtfsRouteType, GtfsStop, GtfsStopField, GtfsStopTime, GtfsStopTimeDropOffType, GtfsStopTimeField, GtfsStopTimePickupType, GtfsTrip, GtfsTripField } from "../RawGtfsTypes";

export class TestFactory {
  /*
   * agency.txt related factory constants & methods
   */
  public static readonly defaultAgencyId = "agency_id_1"
  public static readonly defaultAgencyName = "Agency Name 1"
  public static readonly defaultAgencyUrl = "http://agency-url.com"
  public static readonly defaultAgencyTimezone = "America/New_York"
  public static readonly defaultAgencyLang = "en"
  public static readonly defaultAgencyPhone = "1234567890"
  public static readonly defaultAgencyFareUrl = "http://agency-fare-url.com"
  public static readonly defaultAgencyEmail = "agency@example.com"
  
  public static createAgency(partialAgency?: Partial<GtfsAgency>): GtfsAgency {
    return {
      [GtfsAgencyField.AgencyId]: this.defaultAgencyId,
      [GtfsAgencyField.AgencyName]: this.defaultAgencyName,
      [GtfsAgencyField.AgencyUrl]: this.defaultAgencyUrl,
      [GtfsAgencyField.AgencyTimezone]: this.defaultAgencyTimezone,
      [GtfsAgencyField.AgencyLang]: this.defaultAgencyLang,
      [GtfsAgencyField.AgencyPhone]: this.defaultAgencyPhone,
      [GtfsAgencyField.AgencyFareUrl]: this.defaultAgencyFareUrl,
      [GtfsAgencyField.AgencyEmail]: this.defaultAgencyEmail,
      ...partialAgency,
    };
  }

  /*
   * stops.txt related factory constants & methods
   */
  public static readonly defaultStopId = "stop_id_1"
  public static readonly defaultStopName = "Stop Name 1"
  public static readonly defaultStopLat = "1.0"
  public static readonly defaultStopLon = "1.0"

  public static createStop(partialStop?: Partial<GtfsStop>): GtfsStop {
    return {
      [GtfsStopField.StopId]: this.defaultStopId,
      [GtfsStopField.StopName]: this.defaultStopName,
      [GtfsStopField.StopLat]: this.defaultStopLat,
      [GtfsStopField.StopLon]: this.defaultStopLon,
      ...partialStop,
    };
  }

  public static readonly defaultRouteId = "route_id_1"
  public static readonly defaultRouteShortName = "Route Short Name 1"
  public static readonly defaultRouteType = GtfsRouteType.Bus

  public static createRoute(partialRoute?: Partial<GtfsRoute>): GtfsRoute {
    return {
      [GtfsRouteField.RouteId]: this.defaultRouteId,
      [GtfsRouteField.RouteShortName]: this.defaultRouteShortName,
      [GtfsRouteField.RouteType]: this.defaultRouteType,
      ...partialRoute,
    };
  }
  
  /*
   * trips.txt related factory constants & methods
   */
  public static readonly defaultTripId = "trip_id_1"
  public static readonly defaultServiceId = "service_id_1"
  public static readonly defaultTripHeadsign = "Trip Headsign 1"
  public static readonly defaultTripShortName = "Trip Short Name 1"
  public static readonly defaultDirectionId = "1"
  public static readonly defaultBlockId = "block_id_1"
  public static readonly defaultShapeId = "shape_id_1"
  public static readonly defaultWheelchairAccessible = "1"

  public static createTrip(partialTrip?: Partial<GtfsTrip>): GtfsTrip {
    return {
      [GtfsTripField.RouteId]: this.defaultRouteId,
      [GtfsTripField.ServiceId]: this.defaultServiceId,
      [GtfsTripField.TripId]: this.defaultTripId,
      [GtfsTripField.TripHeadsign]: this.defaultTripHeadsign,
      [GtfsTripField.TripShortName]: this.defaultTripShortName,
      [GtfsTripField.DirectionId]: this.defaultDirectionId,
      [GtfsTripField.BlockId]: this.defaultBlockId,
      [GtfsTripField.ShapeId]: this.defaultShapeId,
      [GtfsTripField.WheelchairAccessible]: this.defaultWheelchairAccessible,
      ...partialTrip,
    };
  }

  /*
   * stop_times.txt related factory constants & methods
   */
  public static readonly defaultStopTimeArrivalTime = "10:00:00"
  public static readonly defaultStopTimeDepartureTime = "10:00:00"
  public static readonly defaultStopTimeStopSequence = "1"
  public static readonly defaultStopTimePickupType = GtfsStopTimePickupType.RegularlyScheduled
  public static readonly defaultStopTimeDropOffType = GtfsStopTimeDropOffType.RegularlyScheduled

  public static createStopTime(partialStopTime?: Partial<GtfsStopTime>): GtfsStopTime {
    return {
      [GtfsStopTimeField.StopId]: this.defaultStopId,
      [GtfsStopTimeField.TripId]: this.defaultTripId,
      [GtfsStopTimeField.ArrivalTime]: this.defaultStopTimeArrivalTime,
      [GtfsStopTimeField.DepartureTime]: this.defaultStopTimeDepartureTime,
      [GtfsStopTimeField.StopSequence]: this.defaultStopTimeStopSequence,
      [GtfsStopTimeField.PickupType]: this.defaultStopTimePickupType,
      [GtfsStopTimeField.DropOffType]: this.defaultStopTimeDropOffType,
      ...partialStopTime,
    };
  }
    
}

export class TestRawGtfs extends RawGtfs {
  public getAgencyCardinality() {
    return this.agencyCardinality;
  }
}