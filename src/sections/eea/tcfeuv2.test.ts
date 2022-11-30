/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  TCFEUSectionEncoder,
  TCFEUDisclosedVendorsSegmentEncoder,
  TCFEUPublisherPurposesSegmentEncoder,
} from "./tcfeuv2";

//
// Disclosed Vendors Segment
//

test("Create a default Disclosed Vendors segment", () => {
  const vendorSegment =
    new TCFEUDisclosedVendorsSegmentEncoder.Builder().build();
  expect(vendorSegment.encode2BitStr()).toBe("001");
});

test("Create a Disclosed Vendors segment with 3 vendors [1,1,1]", () => {
  const vendorSegment = new TCFEUDisclosedVendorsSegmentEncoder.Builder()
    .setDisclosedVendorsAsBitfield([1, 1, 1])
    .build();
  expect(vendorSegment.encode2BitStr()).toBe("00100000000000000110111");
});

test("Create a Disclosed Vendors segment with 3 vendors [0,1,0]", () => {
  const vendorSegment = new TCFEUDisclosedVendorsSegmentEncoder.Builder()
    .setDisclosedVendorsAsBitfield([0, 1, 0])
    .build();
  expect(vendorSegment.encode2BitStr()).toBe("00100000000000000110010");
});

test("Create a Disclosed Vendors segment with vendors 2-11", () => {
  const vendorSegment = new TCFEUDisclosedVendorsSegmentEncoder.Builder()
    .setDisclosedVendorsAsRange(2, 11)
    .build();
  expect(vendorSegment.encode2BitStr()).toBe(
    "00100000000000010111000000000001100000000000000100000000000001001"
  );
});

//
// TCF EU Publisher Purposes Segment
//

test("Create a default Publisher Purposes segment, missing numCustomPurposes, should throw", () => {
  expect(() => {
    const vendorSegment =
      new TCFEUPublisherPurposesSegmentEncoder.Builder().build();
    vendorSegment.encode2BitStr();
  }).toThrow();
});

test("Create a default Publisher Purposes segment, wrong number of custom purposes, should throw", () => {
  expect(() => {
    const vendorSegment = new TCFEUPublisherPurposesSegmentEncoder.Builder()
      .setNumCustomPurposes(1)
      .setCustomPurposesConsent([1, 1])
      .setCustomPurposesLITransparency([1])
      .build();
    vendorSegment.encode2BitStr();
  }).toThrow();
});

test("Create a Publisher Purposes segment with 2 custom purposes", () => {
  const vendorSegment = new TCFEUPublisherPurposesSegmentEncoder.Builder()
    .setNumCustomPurposes(2)
    .setCustomPurposesConsent([1, 1])
    .setCustomPurposesLITransparency([0, 0])
    .build();
  expect(vendorSegment.encode2BitStr()).toBe(
    "0110000000000000000000000000000000000000000000000000000101100"
  );
});

//
// Core Section
//

test("Create a default tcfeuv2 section", () => {
  const tcfeuv2 = new TCFEUSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .setCmpID(12)
    .setCmpVersion(1)
    .build();
  expect(tcfeuv2.encode2BitStr()).toBe(
    "000010001000110101110111111000100011011000001000110101110111111000100011011000000000001100000000000001000000--000000000000000000100000000000000000000000000000000000000000000000000000000000000--00000000000000010000000000000000010000000000000000000000000000000000000100"
  );
});

test("Create a default tcfeuv2 section", () => {
  const tcfeuv2 = new TCFEUSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .setCmpID(12)
    .setCmpVersion(1)
    .build();
  expect(tcfeuv2.encode()).toBe(
    "CI134jYI134jYAMABAundefinedAAIAAAAAAAAAAAACAACAAAAAAg"
  );
});

test("Create a default tcfeuv2 section with a default Disclosed Vendors segment", () => {
  const vendorSegment =
    new TCFEUDisclosedVendorsSegmentEncoder.Builder().build();
  const tcfeuv2 = new TCFEUSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .setDisclosedVendorsSegmentEncoder(vendorSegment)
    .build();
  expect(tcfeuv2.encode2BitStr()).toBe(
    "000010001000110101110111111000100011011000001000110101110111111000100011011000000000000000000000000000000000--000000000000000000100000000000000000000000000000000000000000000000000000000000000--00000000000000010000000000000000010000000000000000000000000000000000000100.001"
  );
});

test("Create a default tcfeuv2 section with a default Disclosed Vendors segment & Publisher Purposes segment", () => {
  const vendorSegment =
    new TCFEUDisclosedVendorsSegmentEncoder.Builder().build();
  const pubPurposesSegment = new TCFEUPublisherPurposesSegmentEncoder.Builder()
    .setNumCustomPurposes(1)
    .setCustomPurposesConsent([1])
    .setCustomPurposesLITransparency([0])
    .build();
  const tcfeuv2 = new TCFEUSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .setDisclosedVendorsSegmentEncoder(vendorSegment)
    .setPubPurposesSegmentEncoder(pubPurposesSegment)
    .build();
  expect(tcfeuv2.encode2BitStr()).toBe(
    "000010001000110101110111111000100011011000001000110101110111111000100011011000000000000000000000000000000000--000000000000000000100000000000000000000000000000000000000000000000000000000000000--00000000000000010000000000000000010000000000000000000000000000000000000100.001.01100000000000000000000000000000000000000000000000000000110"
  );
});

test("Create a default tcfeuv2 section with a default Disclosed Vendors segment & Publisher Purposes segment", () => {
  const vendorSegment =
    new TCFEUDisclosedVendorsSegmentEncoder.Builder().build();
  const pubPurposesSegment = new TCFEUPublisherPurposesSegmentEncoder.Builder()
    .setNumCustomPurposes(1)
    .setCustomPurposesConsent([1])
    .setCustomPurposesLITransparency([0])
    .build();
  const tcfeuv2 = new TCFEUSectionEncoder.Builder()
    .setCreated(new Date(2000, 1, 1, 1, 1))
    .setLastUpdated(new Date(2000, 1, 1, 1, 1))
    .setDisclosedVendorsSegmentEncoder(vendorSegment)
    .setPubPurposesSegmentEncoder(pubPurposesSegment)
    .build();
  expect(tcfeuv2.encode()).toBe(
    "CI134jYI134jYAAAAAundefinedAAIAAAAAAAAAAAACAACAAAAAAEBAAAAAAAADA"
  );
});
