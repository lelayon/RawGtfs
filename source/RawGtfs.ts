import { ExportationHelper } from "./Helpers/ExportationHelper";
import { 
  GtfsAgency, 
  GtfsAgencyCardinality, 
  GtfsAgencyField, 
  GtfsCalendar, 
  GtfsCalendarDate, 
  GtfsCalendarDateField, 
  GtfsCalendarField, 
  GtfsFeedInfo, 
  GtfsFeedInfoField,  
  PreGtfs, 
  GtfsRoute, 
  GtfsRouteField, 
  GtfsServiceAvailability, 
  GtfsStop, 
  GtfsStopField, 
  GtfsStopTime, 
  GtfsStopTimeField, 
  GtfsTrip, 
  GtfsTripField,
  GtfsShape,
  GtfsShapeField,
} from "./RawGtfsTypes";

export class RawGtfs {
  protected agencyCardinality: GtfsAgencyCardinality;
  protected readonly defaultFeedPublisherName: string = "Placeholder publisher name";
  protected readonly defaultFeedPublisherUrl: string = "http://placeholder-publisher-url.com";
  protected readonly defaultFeedLang: string = "en";

  private agency?: GtfsAgency;
  private agencyByAgencyId?: Map<string, GtfsAgency>;
  private readonly stopByStopId: Map<string, GtfsStop>;
  private readonly routeByRouteId: Map<string, GtfsRoute>;
  private readonly tripByTripId: Map<string, GtfsTrip>;
  private readonly stopTimeByStopSequenceByTripId: Map<string, Map<string, GtfsStopTime>>;
  private readonly calendarByServiceId: Map<string, GtfsCalendar>;
  private readonly calendarDateByDateByServiceId: Map<string, Map<string, GtfsCalendarDate>>;
  private readonly shapePointByShapeId: Map<string, GtfsShape>;
  private readonly feedInfo: GtfsFeedInfo;

  constructor(preGtfs?: PreGtfs) {
    const {
      agencies,
      stops,
      routes,
      trips,
      stopTimes,
      calendars,
      calendarDates,
      shapes,
      feedInfo
    } = preGtfs || {};

    if (!agencies || agencies.length === 0) {
      this.agencyCardinality = GtfsAgencyCardinality.Absent;
    } else if (agencies.length === 1) {
      this.agencyCardinality = GtfsAgencyCardinality.Singleton;
      this.agency = agencies[0];
    } else {
      this.agencyCardinality = GtfsAgencyCardinality.Multiple;
      this.agencyByAgencyId = this.indexByOneKey(agencies, GtfsAgencyField.AgencyId);
    } 

    this.stopByStopId = this.indexByOneKey(stops, GtfsStopField.StopId);
    this.routeByRouteId = this.indexByOneKey(routes, GtfsRouteField.RouteId);
    this.tripByTripId = this.indexByOneKey(trips, GtfsTripField.TripId);
    this.stopTimeByStopSequenceByTripId = this.indexByTwoKeys(stopTimes, GtfsStopTimeField.TripId, GtfsStopTimeField.StopSequence);
    this.calendarByServiceId = this.indexByOneKey(calendars, GtfsCalendarField.ServiceId);
    this.calendarDateByDateByServiceId = this.indexByTwoKeys(calendarDates, GtfsCalendarDateField.ServiceId, GtfsCalendarDateField.Date);
    this.shapePointByShapeId = this.indexByOneKey(shapes, GtfsShapeField.ShapeId);
    this.feedInfo = this.ensureFeedInfo(feedInfo);
  }

  /**
   * agencies.txt related functions
   */

  public setAgency(agency: GtfsAgency) {
    switch (this.agencyCardinality) {
      case GtfsAgencyCardinality.Absent:
        this.agencyCardinality = GtfsAgencyCardinality.Singleton;
        this.agency = agency;
        break;
      case GtfsAgencyCardinality.Singleton:
        if (!this.agency) {
          throw new Error("Agency cardinality is singleton, agency should be set");
        }
        if (this.agency[GtfsAgencyField.AgencyId] === agency[GtfsAgencyField.AgencyId]) {
          this.agency = agency;
        } else if (this.agency[GtfsAgencyField.AgencyId] !== undefined && agency[GtfsAgencyField.AgencyId] !== undefined) {
          this.agencyCardinality = GtfsAgencyCardinality.Multiple;
          this.agencyByAgencyId = this.indexByOneKey([this.agency, agency], GtfsAgencyField.AgencyId);
          this.agency = undefined;
        } else {
          throw new Error("If they are more than one agency, their agencyId must be set.");
        }
        break;
      case GtfsAgencyCardinality.Multiple:
        const agencyId = agency[GtfsAgencyField.AgencyId];

        if (!agencyId) {
          throw new Error("Agency cardinality is multiple, must provide agencyId");
        }
        if (!this.agencyByAgencyId) {
          throw new Error("Agency cardinality is multiple, agencyByAgencyId should be set");
        }
        this.agencyByAgencyId.set(agencyId, agency);
    }
  }

  public setAgencies(agencies: GtfsAgency[]) {
    for (const agency of agencies) {
      this.setAgency(agency);
    }
  }

  public getAgency(agencyId?: string): GtfsAgency | undefined {
    switch (this.agencyCardinality) {
      case GtfsAgencyCardinality.Absent:
        return undefined;
      case GtfsAgencyCardinality.Singleton:
        return this.agency;
      case GtfsAgencyCardinality.Multiple:
        if (!agencyId) {
          throw new Error("Agency cardinality is multiple, must provide agencyId");
        }
        if (!this.agencyByAgencyId) {
          throw new Error("Agency cardinality is multiple, agencyByAgencyId should be set");
        }
        return this.agencyByAgencyId.get(agencyId);
    }
  }

  public getNumberOfAgencies() {
    switch (this.agencyCardinality) {
      case GtfsAgencyCardinality.Absent:
        return 0;
      case GtfsAgencyCardinality.Singleton:
        return 1;
      case GtfsAgencyCardinality.Multiple:
        if (!this.agencyByAgencyId) {
          throw new Error("Agency cardinality is multiple, agencyByAgencyId should be set");
        }
        return this.agencyByAgencyId.size;
    }
  }

  public buildArrayOfAgencies() {
    switch (this.agencyCardinality) {
      case GtfsAgencyCardinality.Absent:
        return [];
      case GtfsAgencyCardinality.Singleton:
        return [this.agency];
      case GtfsAgencyCardinality.Multiple:
        if (!this.agencyByAgencyId) {
          throw new Error("Agency cardinality is multiple, agencyByAgencyId should be set");
        }
        return Array.from(this.agencyByAgencyId.values());
    }
  }

  public updateAgency(agency: GtfsAgency) {
    switch (this.agencyCardinality) {
      case GtfsAgencyCardinality.Absent:
        this.agencyCardinality = GtfsAgencyCardinality.Singleton;
        this.agency = agency;
        break;
      case GtfsAgencyCardinality.Singleton:
        this.agency = agency;
        break;
      case GtfsAgencyCardinality.Multiple:
        const agencyId = agency[GtfsAgencyField.AgencyId];
        if (!agencyId) {
          throw new Error("Agency cardinality is multiple, must provide agencyId");
        }
        if (!this.agencyByAgencyId) {
          throw new Error("Agency cardinality is multiple, agencyByAgencyId should be set");
        }
        this.agencyByAgencyId.set(agencyId, agency);
        break;
    }
  }

  /**
   * stops.txt related functions
   */

  public setStop(stop: GtfsStop) {
    this.stopByStopId.set(stop[GtfsStopField.StopId], stop);
  }

  public getStop(stopId: string) {
    return this.stopByStopId.get(stopId);
  }

  public getNumberOfStops() {
    return this.stopByStopId.size;
  }

  public buildArrayOfStops() {
    return Array.from(this.stopByStopId.values());
  }

  public updateStopIdOnStopWithoutUpdatingReferences(oldStopId: string, newStopId: string) {
    const stop = this.stopByStopId.get(oldStopId);
    if (stop) {
      this.stopByStopId.delete(oldStopId);

      stop[GtfsStopField.StopId] = newStopId;
      this.stopByStopId.set(newStopId, stop);
    }
  }

  public deleteStopWithoutDeletingReferences(stop: GtfsStop) {
    this.stopByStopId.delete(stop[GtfsStopField.StopId]);
  }

  /**
   * routes.txt related functions
   */

  public setRoute(route: GtfsRoute) {
    this.routeByRouteId.set(route[GtfsRouteField.RouteId], route);
  }

  public getRoute(routeId: string) {
    return this.routeByRouteId.get(routeId);
  }

  public getNumberOfRoutes() {
    return this.routeByRouteId.size;
  }

  public buildArrayOfRoutes() {
    return Array.from(this.routeByRouteId.values());
  }

  public updateRouteIdOnRouteWithoutUpdatingReferences(oldRouteId: string, newRouteId: string) {
    const route = this.routeByRouteId.get(oldRouteId);
    if (route) {
      this.routeByRouteId.delete(oldRouteId);

      route[GtfsRouteField.RouteId] = newRouteId;
      this.routeByRouteId.set(newRouteId, route);
    }
  }

  public deleteRouteWithoutDeletingReferences(partialRoute: GtfsRoute | {[GtfsRouteField.RouteId]: string}) {
    this.routeByRouteId.delete(partialRoute[GtfsRouteField.RouteId]);
  }

  /**
   * trips.txt related functions
   */ 

  public setTrip(trip: GtfsTrip) {
    this.tripByTripId.set(trip[GtfsTripField.TripId], trip);
  }

  public getTrip(tripId: string) {
    return this.tripByTripId.get(tripId);
  }  

  public getNumberOfTrips() {
    return this.tripByTripId.size;
  }

  public buildArrayOfTrips() {
    return Array.from(this.tripByTripId.values());
  }

  public updateTripIdWithoutUpdatingReferences(oldTripId: string, newTripId: string) {
    const trip = this.tripByTripId.get(oldTripId);
    if (trip) {
      this.tripByTripId.delete(oldTripId);
      this.tripByTripId.set(newTripId, trip);
    }
  }

  public deleteTripWithoutDeletingReferences(partialTrip: GtfsTrip | {[GtfsTripField.TripId]: string}) {
    this.tripByTripId.delete(partialTrip[GtfsTripField.TripId]);
  }

  /**
   * stop_times.txt related functions
   */ 

  public setStopTime(stopTime: GtfsStopTime) {
    const tripId = stopTime[GtfsStopTimeField.TripId];
    const stopSequence = stopTime[GtfsStopTimeField.StopSequence];

    if (!this.stopTimeByStopSequenceByTripId.has(tripId)) {
      this.stopTimeByStopSequenceByTripId.set(tripId, new Map<string, GtfsStopTime>());
    }

    this.stopTimeByStopSequenceByTripId.get(tripId)?.set(stopSequence, stopTime);
  }  

  public setStopTimes(stopTimes: GtfsStopTime[]) {
    for (const stopTime of stopTimes) {
      this.setStopTime(stopTime);
    }
  }

  public getStopTime(tripId: string, stopSequence: string) {
    return this.stopTimeByStopSequenceByTripId.get(tripId)?.get(stopSequence);
  }

  public buildArrayOfStopTimesOfTripId(tripId: string) {
    return Array.from(this.stopTimeByStopSequenceByTripId.get(tripId)?.values() || []);
  }

  public buildArrayOfStopTimesOfTrip(partialTrip: GtfsTrip | {[GtfsTripField.TripId]: string}) {
    return this.buildArrayOfStopTimesOfTripId(partialTrip[GtfsTripField.TripId]);
  }

  public buildOrderedStopTimesOfTripId(tripId: string) {
    const stopTimes = this.buildArrayOfStopTimesOfTripId(tripId);
    if (stopTimes) {
      return Array.from(stopTimes.values()).sort((a, b) => Number(a[GtfsStopTimeField.StopSequence]) - Number(b[GtfsStopTimeField.StopSequence]));
    }
    return [];
  }

  public buildOrderedStopTimesOfTrip(partialTrip: GtfsTrip | {[GtfsTripField.TripId]: string}) {
    return this.buildOrderedStopTimesOfTripId(partialTrip[GtfsTripField.TripId]);
  }

  public getNumberOfStopTimes() {
    let numberOfStopTimes = 0;

    for (const tripId of this.stopTimeByStopSequenceByTripId.keys()) {
      numberOfStopTimes += this.stopTimeByStopSequenceByTripId.get(tripId)?.size || 0;
    }

    return numberOfStopTimes;
  }

  public buildArrayOfStopTimes() {
    const stopTimes: GtfsStopTime[] = [];

    for (const tripId of this.stopTimeByStopSequenceByTripId.keys()) {
      const stopTimeByStopSequence = this.stopTimeByStopSequenceByTripId.get(tripId);
      if (stopTimeByStopSequence) {
        for (const stopSequence of stopTimeByStopSequence.keys()) {
          const stopTime = stopTimeByStopSequence.get(stopSequence);
          if (stopTime) {
            stopTimes.push(stopTime);
          }
        }
      }
    }

    return stopTimes;
  }

  public updateStopTimesTripIdWithoutUpdatingReferences(oldTripId: string, newTripId: string) {
    const stopTimeByStopSequence = this.stopTimeByStopSequenceByTripId.get(oldTripId);

    if (stopTimeByStopSequence) {
      this.stopTimeByStopSequenceByTripId.delete(oldTripId);

      for (const stopSequence of stopTimeByStopSequence.keys()) {
        const stopTime = stopTimeByStopSequence.get(stopSequence);
        if (stopTime) {
          stopTime[GtfsStopTimeField.TripId] = newTripId;
          this.setStopTime(stopTime);
        }
      }
    }
  }

  public updateStopTimeStopSequenceWithoutUpdatingReferences(tripId: string, oldStopSequence: string, newStopSequence: string) {
    const stopTimeByStopSequence = this.stopTimeByStopSequenceByTripId.get(tripId);

    if (stopTimeByStopSequence) {
      const stopTime = stopTimeByStopSequence.get(oldStopSequence);
      if (stopTime) {
        stopTimeByStopSequence.delete(oldStopSequence);
        stopTime[GtfsStopTimeField.StopSequence] = newStopSequence;
        this.setStopTime(stopTime);
      }
    }
  }

  public deleteStopTimeWithoutDeletingReferences(stopTime: GtfsStopTime) {
    const tripId = stopTime[GtfsStopTimeField.TripId];
    const stopSequence = stopTime[GtfsStopTimeField.StopSequence];

    this.stopTimeByStopSequenceByTripId.get(tripId)?.delete(stopSequence);

    if (this.stopTimeByStopSequenceByTripId.get(tripId)?.size === 0) {
      this.stopTimeByStopSequenceByTripId.delete(tripId);
    }
  }

  public deleteStopTimesOfTripIdWithoutDeletingReferences(tripId: string) {
    this.stopTimeByStopSequenceByTripId.delete(tripId);
  }

  public reindexStopTimesOfTripId(tripId: string) {
    const stopTimes = this.buildOrderedStopTimesOfTripId(tripId);

    if (stopTimes && stopTimes.length > 0) {
      this.deleteStopTimesOfTripIdWithoutDeletingReferences(tripId);

      for (const [index, stopTime] of stopTimes.entries()) {
        stopTime[GtfsStopTimeField.StopSequence] = String(index + 1);
        this.setStopTime(stopTime);
      }
    }
  }
  /**
   * calendar.txt related functions
   */

  public setCalendar(calendar: GtfsCalendar) {
    this.calendarByServiceId.set(calendar[GtfsCalendarField.ServiceId], calendar);
  }

  public setCalendars(calendars: GtfsCalendar[]) {
    for (const calendar of calendars) {
      this.setCalendar(calendar);
    }
  }

  public setAndGetEverydayCalendar(partialCalendar: Partial<GtfsCalendar>) {
    const everydayCalendar = {
      [GtfsCalendarField.ServiceId]: "everyday",
      [GtfsCalendarField.Monday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Tuesday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Wednesday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Thursday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Friday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Saturday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.Sunday]: GtfsServiceAvailability.Available,
      [GtfsCalendarField.StartDate]: "20250101",
      [GtfsCalendarField.EndDate]: "21241231",
      ...partialCalendar,
    };

    this.setCalendar(everydayCalendar);

    return everydayCalendar;
  }

  public setEverydayCalendar(partialCalendar: Partial<GtfsCalendar>) {
    this.setAndGetEverydayCalendar(partialCalendar);
  }

  public getCalendar(serviceId: string) {
    return this.calendarByServiceId.get(serviceId);
  }

  public getNumberOfCalendars() {
    return this.calendarByServiceId.size;
  }

  public buildArrayOfCalendars() {
    return Array.from(this.calendarByServiceId.values());
  }

  public updateCalendarServiceIdWithoutUpdatingReferences(oldServiceId: string, newServiceId: string) {
    const calendar = this.calendarByServiceId.get(oldServiceId);
    if (calendar) {
      this.calendarByServiceId.delete(oldServiceId);
      calendar[GtfsCalendarField.ServiceId] = newServiceId;
      this.setCalendar(calendar);
    }
  }

  public deleteCalendarWithoutDeletingReferences(calendar: GtfsCalendar) {
    this.deleteCalendarServiceIdWithoutDeletingReferences(calendar[GtfsCalendarField.ServiceId]);
  }

  public deleteCalendarServiceIdWithoutDeletingReferences(serviceId: string) {
    this.calendarByServiceId.delete(serviceId);
  }

  /**
   * calendar_dates.txt related functions
   */

  public setCalendarDate(calendarDate: GtfsCalendarDate) {
    const serviceId = calendarDate[GtfsCalendarDateField.ServiceId];
    const date = calendarDate[GtfsCalendarDateField.Date];

    if (!this.calendarDateByDateByServiceId.has(serviceId)) {
      this.calendarDateByDateByServiceId.set(serviceId, new Map<string, GtfsCalendarDate>());
    }

    this.calendarDateByDateByServiceId.get(serviceId)?.set(date, calendarDate);
  }

  public setCalendarDates(calendarDates: GtfsCalendarDate[]) {
    for (const calendarDate of calendarDates) {
      this.setCalendarDate(calendarDate);
    }
  }

  public getCalendarDate(serviceId: string, date: string) {
    return this.calendarDateByDateByServiceId.get(serviceId)?.get(date);
  }

  public getNumberOfCalendarDates() {
    return this.calendarDateByDateByServiceId.size;
  }

  public buildArrayOfCalendarDates() {
    const calendarDates: GtfsCalendarDate[] = [];

    for (const serviceId of this.calendarDateByDateByServiceId.keys()) {
      const calendarDateByDate = this.calendarDateByDateByServiceId.get(serviceId);
      if (calendarDateByDate) {
        for (const date of calendarDateByDate.keys()) {
          const calendarDate = calendarDateByDate.get(date);
          if (calendarDate) {
            calendarDates.push(calendarDate);
          }
        }
      }
    }

    return calendarDates;
  }

  public updateCalendarDateServiceIdWithoutUpdatingReferences(oldServiceId: string, newServiceId: string) {
    const calendarDateByDate = this.calendarDateByDateByServiceId.get(oldServiceId);

    if (calendarDateByDate) {
      this.calendarDateByDateByServiceId.delete(oldServiceId);

      for (const date of calendarDateByDate.keys()) {
        const calendarDate = calendarDateByDate.get(date);

        if (calendarDate) {
          calendarDate[GtfsCalendarDateField.ServiceId] = newServiceId;
          this.setCalendarDate(calendarDate);
        }
      }
    }
  }

  public deleteCalendarDateWithoutDeletingReferences(calendarDate: GtfsCalendarDate) {
    const serviceId = calendarDate[GtfsCalendarDateField.ServiceId];
    const date = calendarDate[GtfsCalendarDateField.Date];

    this.calendarDateByDateByServiceId.get(serviceId)?.delete(date);

    if (this.calendarDateByDateByServiceId.get(serviceId)?.size === 0) {
      this.calendarDateByDateByServiceId.delete(serviceId);  
    }
  }

  /**
   * shapes.txt related functions
   */

  public setShapePoint(shapePoint: GtfsShape) {
    this.shapePointByShapeId.set(shapePoint[GtfsShapeField.ShapeId], shapePoint);
  }

  public setShapePoints(shapePoints: GtfsShape[]) {
    for (const shapePoint of shapePoints) {
      this.setShapePoint(shapePoint);
    }
  }

  public getShapePoint(shapeId: string) {
    return this.shapePointByShapeId.get(shapeId);
  }

  public getNumberOfShapePoints() {
    return this.shapePointByShapeId.size;
  }

  public buildArrayOfShapePoints() {
    return Array.from(this.shapePointByShapeId.values());
  }

  /**
   * feed_info.txt related functions
   */

  private ensureFeedInfo(feedInfo?: GtfsFeedInfo) {
    if (feedInfo) {
      return feedInfo;
    }
    return {
      [GtfsFeedInfoField.FeedPublisherName]: "Placeholder publisher name",    
      [GtfsFeedInfoField.FeedPublisherUrl]: "http://placeholder-publisher-url.com",
      [GtfsFeedInfoField.FeedLang]: "en",
    }
  }

  public getFeedInfo() {
    return this.feedInfo;
  }

  public setFeedStartDate(feedStartDate: string) {
    this.feedInfo[GtfsFeedInfoField.FeedStartDate] = feedStartDate;
  }

  public getFeedStartDate() {
    return this.feedInfo[GtfsFeedInfoField.FeedStartDate];
  }

  public setFeedEndDate(feedEndDate: string) {
    this.feedInfo[GtfsFeedInfoField.FeedEndDate] = feedEndDate;
  }

  public getFeedEndDate() {
    return this.feedInfo[GtfsFeedInfoField.FeedEndDate];
  }

  public setFeedVersion(feedVersion: string) {
    this.feedInfo[GtfsFeedInfoField.FeedVersion] = feedVersion;
  }

  public getFeedVersion() {
    return this.feedInfo[GtfsFeedInfoField.FeedVersion];
  }

  public setFeedContactUrl(feedContactUrl: string) {
    this.feedInfo[GtfsFeedInfoField.FeedContactUrl] = feedContactUrl;
  }

  public getFeedContactUrl() {
    return this.feedInfo[GtfsFeedInfoField.FeedContactUrl];
  }
  
  /**
   * Export functions
   */

  public exportToFolderAsFiles(folderPath: string) {
    ExportationHelper.exportToFolderAsFiles(this, folderPath);
  }

  /**
   * Private helper functions
   */

  private indexByOneKey<Item>(items: Item[] | undefined, key: string) {
    if (!items) {
      return new Map<string, Item>();
    }
    return items.reduce((acc, item) => {
      acc.set(item[key], item);
      return acc;
    }, new Map<string, Item>());
  }

  private indexByTwoKeys<Item>(items: Item[] | undefined, key1: string, key2: string) {
    if (!items) {
      return new Map<string, Map<string, Item>>();
    }
    return items.reduce((acc, item) => {
      const key1Value = item[key1];
      if (!acc.has(key1Value)) {
        acc.set(key1Value, new Map<string, Item>());
      }  
      const key2Value = item[key2];
      acc.get(key1Value)?.set(key2Value, item);
      return acc;
    }, new Map<string, Map<string, Item>>());
  }  
}