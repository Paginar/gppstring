import { UspcaSection, GPPString } from "../dist/esm/index.mjs";

let uspca = new UspcaSection.Builder()
  .setSaleOptOutNotice(0)
  .setSharingOptOutNotice(1)
  .setSensitiveDataLimitUseNotice(1)
  .setSaleOptOut(1)
  .setSharingOptOut(1)
  .setSensitiveDataProcessing([0, 0, 0, 0, 0, 0, 0, 0, 0])
  .setKnownChildSensitiveDataConsents([0, 0])
  .setPersonalDataConsents(0)
  .setMspaCoveredTransaction(0)
  .setMspaOptOutOptionMode(0)
  .setMspaServiceProviderMode(0)
  .build();

let gppString = new GPPString.Builder().addSection(uspca).build();
console.log(gppString.encode2Base64Websafe());
