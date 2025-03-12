import { RawGtfs } from "../RawGtfs";


export class TestRawGtfs extends RawGtfs {
  public test_getAgencyCardinality() {
    return this.agencyCardinality;
  }

  public test_getDefaultFeedPublisherName() {
    return this.defaultFeedPublisherName;
  }

  public test_getDefaultFeedPublisherUrl() {
    return this.defaultFeedPublisherUrl;
  }

  public test_getDefaultFeedLang() {
    return this.defaultFeedLang;
  }
}