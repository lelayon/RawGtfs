import { RawGtfs } from "../RawGtfs";
import { GtfsAgency, GtfsAgencyField, GtfsCalendar, GtfsCalendarDate, GtfsCalendarDateExceptionType, GtfsCalendarDateField, GtfsCalendarField, GtfsFeedInfo, GtfsFeedInfoField, GtfsRoute, GtfsRouteField, GtfsRouteType, GtfsServiceAvailability, GtfsShape, GtfsShapeField, GtfsStop, GtfsStopField, GtfsStopTime, GtfsStopTimeDropOffType, GtfsStopTimeField, GtfsStopTimePickupType, GtfsTrip, GtfsTripField } from "../RawGtfsTypes";

export class TestFactory {
  public static readonly defaultStartDate = "20250101"
  public static readonly defaultEndDate = "21251231"
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

  public static createAndSetAgency(gtfs: RawGtfs, partialAgency?: Partial<GtfsAgency>): GtfsAgency {
    const agency = this.createAgency(partialAgency);
    gtfs.setAgency(agency);
    return agency;
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

  public static createAndSetStop(gtfs: RawGtfs, partialStop?: Partial<GtfsStop>): GtfsStop {
    const stop = this.createStop(partialStop);
    gtfs.setStop(stop);
    return stop;
  }

  /*
   * routes.txt related factory constants & methods
   */

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

  public static createAndSetRoute(gtfs: RawGtfs, partialRoute?: Partial<GtfsRoute>): GtfsRoute {
    const route = this.createRoute(partialRoute);
    gtfs.setRoute(route);
    return route;
  }

  /*
   * trips.txt related factory constants & methods
   */
  public static readonly defaultTripId = "trip_id_1"
  public static readonly defaultTripHeadsign = "Trip Headsign 1"
  public static readonly defaultTripShortName = "Trip Short Name 1"
  public static readonly defaultDirectionId = "1"
  public static readonly defaultBlockId = "block_id_1"
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

  public static createAndSetTrip(gtfs: RawGtfs, partialTrip?: Partial<GtfsTrip>): GtfsTrip {
    const trip = this.createTrip(partialTrip);
    gtfs.setTrip(trip);
    return trip;
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

  public static createAndSetStopTime(gtfs: RawGtfs, partialStopTime?: Partial<GtfsStopTime>): GtfsStopTime {
    const stopTime = this.createStopTime(partialStopTime);
    gtfs.setStopTime(stopTime);
    return stopTime;
  }

  /*
   * calendar.txt related factory constants & methods
   */
  public static readonly defaultServiceId = "service_id_1"
  public static readonly defaultCalendarMonday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarTuesday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarWednesday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarThursday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarFriday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarSaturday = GtfsServiceAvailability.Available
  public static readonly defaultCalendarSunday = GtfsServiceAvailability.Available

  public static createCalendar(partialCalendar?: Partial<GtfsCalendar>): GtfsCalendar {
    return {
      [GtfsCalendarField.ServiceId]: this.defaultServiceId,
      [GtfsCalendarField.Monday]: this.defaultCalendarMonday,
      [GtfsCalendarField.Tuesday]: this.defaultCalendarTuesday,
      [GtfsCalendarField.Wednesday]: this.defaultCalendarWednesday,
      [GtfsCalendarField.Thursday]: this.defaultCalendarThursday,
      [GtfsCalendarField.Friday]: this.defaultCalendarFriday,
      [GtfsCalendarField.Saturday]: this.defaultCalendarSaturday,
      [GtfsCalendarField.Sunday]: this.defaultCalendarSunday,
      [GtfsCalendarField.StartDate]: this.defaultStartDate,
      [GtfsCalendarField.EndDate]: this.defaultEndDate,
      ...partialCalendar,
    };
  }

  public static createAndSetCalendar(gtfs: RawGtfs, partialCalendar?: Partial<GtfsCalendar>): GtfsCalendar {
    const calendar = this.createCalendar(partialCalendar);
    gtfs.setCalendar(calendar);
    return calendar;
  }

  /*
   * calendar_dates.txt related factory constants & methods
   */
  public static readonly defaultCalendarDateDate = "20250101"
  public static readonly defaultCalendarDateExceptionType = GtfsCalendarDateExceptionType.Added

  public static createCalendarDate(partialCalendarDate?: Partial<GtfsCalendarDate>): GtfsCalendarDate {
    return {
      [GtfsCalendarDateField.ServiceId]: this.defaultServiceId,
      [GtfsCalendarDateField.Date]: this.defaultCalendarDateDate,
      [GtfsCalendarDateField.ExceptionType]: this.defaultCalendarDateExceptionType,
      ...partialCalendarDate,
    };
  }

  public static createAndSetCalendarDate(gtfs: RawGtfs, partialCalendarDate?: Partial<GtfsCalendarDate>): GtfsCalendarDate {
    const calendarDate = this.createCalendarDate(partialCalendarDate);
    gtfs.setCalendarDate(calendarDate);
    return calendarDate;
  }

  /*
   * shapes.txt related factory constants & methods
   */
  public static readonly defaultShapeId = "shape_id_1"
  public static readonly defaultShapePtLat = "1.0"
  public static readonly defaultShapePtLon = "1.0"
  public static readonly defaultShapePtSequence = "1"
  public static readonly defaultShapeDistTraveled = "1.0"

  public static createShapePoint(partialShapePoint?: Partial<GtfsShape>): GtfsShape {
    return {
      [GtfsShapeField.ShapeId]: this.defaultShapeId,
      [GtfsShapeField.ShapePtLat]: this.defaultShapePtLat,
      [GtfsShapeField.ShapePtLon]: this.defaultShapePtLon,
      [GtfsShapeField.ShapePtSequence]: this.defaultShapePtSequence,
      [GtfsShapeField.ShapeDistTraveled]: this.defaultShapeDistTraveled,
      ...partialShapePoint,
    };
  }

  public static createAndSetShapePoint(gtfs: RawGtfs, partialShapePoint?: Partial<GtfsShape>): GtfsShape {
    const shapePoint = this.createShapePoint(partialShapePoint);
    gtfs.setShapePoint(shapePoint);
    return shapePoint;
  }

  /*
   * feed_info.txt related factory constants & methods
   */
  public static readonly defaultFeedInfoFeedPublisherName = "Feed Publisher Name 1"
  public static readonly defaultFeedInfoFeedPublisherUrl = "http://feed-publisher-url.com"
  public static readonly defaultFeedInfoFeedLang = "en"

  public static createFeedInfo(partialFeedInfo?: Partial<GtfsFeedInfo>): GtfsFeedInfo {
    return {
      [GtfsFeedInfoField.FeedPublisherName]: this.defaultFeedInfoFeedPublisherName,
      [GtfsFeedInfoField.FeedPublisherUrl]: this.defaultFeedInfoFeedPublisherUrl,
      [GtfsFeedInfoField.FeedLang]: this.defaultFeedInfoFeedLang,
      ...partialFeedInfo,
    };
  }
}