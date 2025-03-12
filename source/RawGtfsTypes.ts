/**
 * agency.txt
 */

export const GtfsAgencyFileName = "agency.txt";

export enum GtfsAgencyField {
  AgencyId = "agency_id",
  AgencyName = "agency_name",
  AgencyUrl = "agency_url",
  AgencyTimezone = "agency_timezone",
  AgencyLang = "agency_lang",
  AgencyPhone = "agency_phone",
  AgencyFareUrl = "agency_fare_url",
  AgencyEmail = "agency_email",
}

export const GtfsAgencyFields = Object.values(GtfsAgencyField);

export interface GtfsAgency {
  [GtfsAgencyField.AgencyId]?: string;
  [GtfsAgencyField.AgencyName]: string;
  [GtfsAgencyField.AgencyUrl]: string;
  [GtfsAgencyField.AgencyTimezone]: string;
  [GtfsAgencyField.AgencyLang]?: string;
  [GtfsAgencyField.AgencyPhone]?: string;
  [GtfsAgencyField.AgencyFareUrl]?: string;
  [GtfsAgencyField.AgencyEmail]?: string;
}

export enum GtfsAgencyCardinality {
  Absent = '0',
  Singleton = '1',
  Multiple = '2',
}

/**
 * stops.txt
 */

export const GtfsStopFileName = "stops.txt";

export enum GtfsStopField {
  StopId = "stop_id",
  StopCode = "stop_code",
  StopName = "stop_name",
  StopDesc = "stop_desc",
  StopLat = "stop_lat",
  StopLon = "stop_lon",
  ZoneId = "zone_id",
  StopUrl = "stop_url",
  LocationType = "location_type",
  ParentStation = "parent_station",
  StopTimezone = "stop_timezone",
  WheelchairBoarding = "wheelchair_boarding",
  LevelId = "level_id",
  PlatformCode = "platform_code",
}

export const GtfsStopFields = Object.values(GtfsStopField);

export interface GtfsStop {
  [GtfsStopField.StopId]: string;
  [GtfsStopField.StopCode]?: string;
  [GtfsStopField.StopName]?: string;
  [GtfsStopField.StopDesc]?: string;
  [GtfsStopField.StopLat]: string;
  [GtfsStopField.StopLon]: string;
  [GtfsStopField.ZoneId]?: string;
  [GtfsStopField.StopUrl]?: string;
  [GtfsStopField.LocationType]?: string;
  [GtfsStopField.ParentStation]?: string;
  [GtfsStopField.StopTimezone]?: string;
  [GtfsStopField.WheelchairBoarding]?: string;
  [GtfsStopField.LevelId]?: string;
  [GtfsStopField.PlatformCode]?: string;
}

/**
 * routes.txt
 */

export const GtfsRouteFileName = "routes.txt";

export enum GtfsRouteField {
  RouteId = "route_id",
  AgencyId = "agency_id",
  RouteShortName = "route_short_name",
  RouteLongName = "route_long_name",
  RouteDesc = "route_desc",
  RouteType = "route_type",
  RouteUrl = "route_url",
  RouteColor = "route_color",
  RouteTextColor = "route_text_color",
  RouteSortOrder = "route_sort_order",
  ContinuousPickup = "continuous_pickup",
  ContinuousDropOff = "continuous_drop_off",
  NetworkId = "network_id",
}

export const GtfsRouteFields = Object.values(GtfsRouteField);

export enum GtfsRouteType {
  Tram = '0',
  Subway = '1',
  Rail = '2',
  Bus = '3',
  Ferry = '4',
  CableCar = '5',
  AerialLift = '6',
  Funicular = '7',
  Trolleybus = '11',
  Monorail = '12',  
}

export interface GtfsRoute {
  [GtfsRouteField.RouteId]: string;
  [GtfsRouteField.AgencyId]?: string;
  [GtfsRouteField.RouteShortName]?: string;
  [GtfsRouteField.RouteLongName]?: string;
  [GtfsRouteField.RouteDesc]?: string;
  [GtfsRouteField.RouteType]: GtfsRouteType | string;
  [GtfsRouteField.RouteUrl]?: string;
  [GtfsRouteField.RouteColor]?: string;
  [GtfsRouteField.RouteTextColor]?: string;
  [GtfsRouteField.RouteSortOrder]?: string;
  [GtfsRouteField.ContinuousPickup]?: string;
  [GtfsRouteField.ContinuousDropOff]?: string;
  [GtfsRouteField.NetworkId]?: string;
}

/**
 * trips.txt
 */

export const GtfsTripFileName = "trips.txt";

export enum GtfsTripField {
  RouteId = "route_id",
  ServiceId = "service_id",
  TripId = "trip_id",
  TripHeadsign = "trip_headsign",
  TripShortName = "trip_short_name",
  DirectionId = "direction_id",
  BlockId = "block_id",
  ShapeId = "shape_id",
  WheelchairAccessible = "wheelchair_accessible",
  BikesAllowed = "bikes_allowed",
}

export const GtfsTripFields = Object.values(GtfsTripField);

export interface GtfsTrip {
  [GtfsTripField.RouteId]: string;
  [GtfsTripField.ServiceId]: string;
  [GtfsTripField.TripId]: string;
  [GtfsTripField.TripHeadsign]?: string;
  [GtfsTripField.TripShortName]?: string;
  [GtfsTripField.DirectionId]?: string;
  [GtfsTripField.BlockId]?: string;
  [GtfsTripField.ShapeId]?: string;
  [GtfsTripField.WheelchairAccessible]?: string;
  [GtfsTripField.BikesAllowed]?: string; 
}

/**
 * stop_times.txt
 */

export const GtfsStopTimeFileName = "stop_times.txt";  

export enum GtfsStopTimeField {
  TripId = "trip_id",
  ArrivalTime = "arrival_time",
  DepartureTime = "departure_time",
  StopId = "stop_id",
  LocationGroupId = "location_group_id",
  LocationId = "location_id",
  StopSequence = "stop_sequence",
  StopHeadsign = "stop_headsign",
  StartPickupDropOffWindow = "start_pickup_drop_off_window",
  EndPickupDropOffWindow = "end_pickup_drop_off_window",
  PickupType = "pickup_type",
  DropOffType = "drop_off_type",
  ContinuousPickup = "continuous_pickup",
  ContinuousDropOff = "continuous_drop_off",
  ShapeDistTraveled = "shape_dist_traveled",
  Timepoint = "timepoint",
  PickupBookingRuleId = "pickup_booking_rule_id",
  DropOffBookingRuleId = "drop_off_booking_rule_id",
}

export const GtfsStopTimeFields = Object.values(GtfsStopTimeField);

export enum GtfsStopTimePickupType {
  RegularlyScheduled = '0',
  NotAvailable = '1',
  Phone = '2',
  Coordinate = '3',
}

export enum GtfsStopTimeDropOffType {
  RegularlyScheduled = '0',
  NotAvailable = '1',
  Phone = '2',
  Coordinate = '3',
}

export interface GtfsStopTime {
  [GtfsStopTimeField.TripId]: string;
  [GtfsStopTimeField.ArrivalTime]: string;
  [GtfsStopTimeField.DepartureTime]: string;
  [GtfsStopTimeField.StopId]: string;
  [GtfsStopTimeField.LocationGroupId]?: string;
  [GtfsStopTimeField.LocationId]?: string;
  [GtfsStopTimeField.StopSequence]: string;
  [GtfsStopTimeField.StopHeadsign]?: string;
  [GtfsStopTimeField.StartPickupDropOffWindow]?: string;
  [GtfsStopTimeField.EndPickupDropOffWindow]?: string;
  [GtfsStopTimeField.PickupType]?: GtfsStopTimePickupType;
  [GtfsStopTimeField.DropOffType]?: GtfsStopTimeDropOffType;
  [GtfsStopTimeField.ContinuousPickup]?: string;
  [GtfsStopTimeField.ContinuousDropOff]?: string;
  [GtfsStopTimeField.ShapeDistTraveled]?: string;
  [GtfsStopTimeField.Timepoint]?: string;
  [GtfsStopTimeField.PickupBookingRuleId]?: string;
  [GtfsStopTimeField.DropOffBookingRuleId]?: string;
}

/**
 * calendar.txt
 */

export const GtfsCalendarFileName = "calendar.txt";

export enum GtfsCalendarField {
  ServiceId = "service_id",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday",
  StartDate = "start_date",
  EndDate = "end_date",
}

export const GtfsCalendarFields = Object.values(GtfsCalendarField);

export enum GtfsServiceAvailability {
  Available = '1',
  Unavailable = '0',
}

export interface GtfsCalendar {
  [GtfsCalendarField.ServiceId]: string;
  [GtfsCalendarField.Monday]: GtfsServiceAvailability;
  [GtfsCalendarField.Tuesday]: GtfsServiceAvailability;
  [GtfsCalendarField.Wednesday]: GtfsServiceAvailability;
  [GtfsCalendarField.Thursday]: GtfsServiceAvailability;
  [GtfsCalendarField.Friday]: GtfsServiceAvailability;
  [GtfsCalendarField.Saturday]: GtfsServiceAvailability;
  [GtfsCalendarField.Sunday]: GtfsServiceAvailability;
  [GtfsCalendarField.StartDate]: string;
  [GtfsCalendarField.EndDate]: string;
}

/**
 * calendar_dates.txt
 */

export const GtfsCalendarDateFileName = "calendar_dates.txt";

export enum GtfsCalendarDateExceptionType {
  Added = '1',
  Removed = '2',
}

export enum GtfsCalendarDateField {
  ServiceId = "service_id",
  Date = "date",
  ExceptionType = "exception_type",
}

export const GtfsCalendarDateFields = Object.values(GtfsCalendarDateField);

export interface GtfsCalendarDate {
  [GtfsCalendarDateField.ServiceId]: string;
  [GtfsCalendarDateField.Date]: string;
  [GtfsCalendarDateField.ExceptionType]: GtfsCalendarDateExceptionType;
}

/**
 * shapes.txt
 */

export const GtfsShapeFileName = "shapes.txt";

export enum GtfsShapeField {
  ShapeId = "shape_id",
  ShapePtLat = "shape_pt_lat",
  ShapePtLon = "shape_pt_lon",
  ShapePtSequence = "shape_pt_sequence",
  ShapeDistTraveled = "shape_dist_traveled",
}

export const GtfsShapeFields = Object.values(GtfsShapeField);

export interface GtfsShape {
  [GtfsShapeField.ShapeId]: string;
  [GtfsShapeField.ShapePtLat]: string;
  [GtfsShapeField.ShapePtLon]: string;
  [GtfsShapeField.ShapePtSequence]: string;
  [GtfsShapeField.ShapeDistTraveled]?: string;
}

/**
 * feed_info.txt
 */

export const GtfsFeedInfoFileName = "feed_info.txt";

export enum GtfsFeedInfoField {
  FeedPublisherName = "feed_publisher_name",
  FeedPublisherUrl = "feed_publisher_url",
  FeedLang = "feed_lang",
  FeedDefaultLang = "default_lang",
  FeedStartDate = "feed_start_date",
  FeedEndDate = "feed_end_date",
  FeedVersion = "feed_version",
  FeedContactEmail = "feed_contact_email",
  FeedContactUrl = "feed_contact_url",
  }

export const GtfsFeedInfoFields = Object.values(GtfsFeedInfoField);

export interface GtfsFeedInfo {
  [GtfsFeedInfoField.FeedPublisherName]: string;
  [GtfsFeedInfoField.FeedPublisherUrl]: string;
  [GtfsFeedInfoField.FeedLang]: string;
  [GtfsFeedInfoField.FeedDefaultLang]?: string;
  [GtfsFeedInfoField.FeedStartDate]?: string;
  [GtfsFeedInfoField.FeedEndDate]?: string;
  [GtfsFeedInfoField.FeedVersion]?: string;
  [GtfsFeedInfoField.FeedContactEmail]?: string;
  [GtfsFeedInfoField.FeedContactUrl]?: string;
}

/**
 * GTFS
 */

export interface PreGtfs {
  agencies?: GtfsAgency[];
  stops?: GtfsStop[];
  routes?: GtfsRoute[];
  trips?: GtfsTrip[];
  stopTimes?: GtfsStopTime[];
  calendars?: GtfsCalendar[];
  calendarDates?: GtfsCalendarDate[];
  // fareAttributes: FareAttribute[];
  // fareRules: FareRule[];
  // timeframes: Timeframe[];
  // riderCategories: RiderCategory[];
  // fareMedia: FareMedia[];
  // fareProducts: FareProduct[];
  // fareLegRules: FareLegRule[];
  // fareLegJoinRules: FareLegJoinRule[];
  // fareTransferRules: FareTransferRule[];
  // areas: Area[];
  // stopAreas: StopArea[];
  // networks: Network[];
  // routeNetworks: RouteNetwork[];
  shapes: GtfsShape[];
  // frequencies: Frequency[];
  // transfers: Transfer[];
  // pathways: Pathway[];
  // levels: Level[];
  // locationGroups: LocationGroup[];
  // locationGroupStops: LocationGroupStop[];
  // bookingRules: BookingRule[];
  // translations: Translation[];
  feedInfo?: GtfsFeedInfo;
  // attributions: Attribution[];
}

export enum GtfsFileName {
  Agency = GtfsAgencyFileName,
  Stop = GtfsStopFileName,
  Route = GtfsRouteFileName,
  Trip = GtfsTripFileName,
  StopTime = GtfsStopTimeFileName,
  Calendar = GtfsCalendarFileName,
  CalendarDate = GtfsCalendarDateFileName,
  Shape = GtfsShapeFileName,
  FeedInfo = GtfsFeedInfoFileName,
}

export const GtfsFileNames = Object.values(GtfsFileName);

export const GtfsFieldsByFileName = {
  [GtfsAgencyFileName]: GtfsAgencyFields,
  [GtfsStopFileName]: GtfsStopFields,
  [GtfsRouteFileName]: GtfsRouteFields,
  [GtfsTripFileName]: GtfsTripFields,
  [GtfsStopTimeFileName]: GtfsStopTimeFields,
  [GtfsCalendarFileName]: GtfsCalendarFields,
  [GtfsCalendarDateFileName]: GtfsCalendarDateFields,
  [GtfsShapeFileName]: GtfsShapeFields,
  [GtfsFeedInfoFileName]: GtfsFeedInfoFields,
}

export type GtfsItem =
  GtfsAgency | 
  GtfsStop | 
  GtfsRoute | 
  GtfsTrip | 
  GtfsStopTime | 
  GtfsCalendar | 
  GtfsCalendarDate | 
  GtfsShape | 
  GtfsFeedInfo;