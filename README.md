# Purpose

A client library to construct [IAB's Global Privacy Platform](https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform) (GPP) strings

This library includes support for:

| Section ID | Client-side API Prefix | Description                               | Supported |
| ---------- | ---------------------- | ----------------------------------------- | --------- |
| 1          | tcfeuv1                | EU TCF v1 section (deprecated)            | N/A       |
| 2          | tcfeuv2                | EU TCF v2 section                         | Not yet   |
| 3          | GPP                    | Header section (REQUIRED, see note below) | Not yet   |
| 4          | --                     | GPP signal integrity section              | Not yet   |
| 5          | tcfca                  | Canadian TCF section                      | Not yet   |
| 6          | uspv1                  | USPrivacy String (Unencoded Format)       | Yes       |
| 7          | usnat                  | US - national section                     | Not yet   |
| 8          | usca                   | US - California section                   | Yes       |
| 9          | usva                   | US - Virginia section                     | Not yet   |
| 10         | usco                   | US - Colorado section                     | Not yet   |
| 11         | usut                   | US - Utah section                         | Not yet   |
| 12         | usct                   | US - Connecticut section                  | Not yet   |

# Getting started

## Installation

Before we get started, you'll need to install Node and Yarn or npm, and create a directory for your project. Then, install the library using Yarn:

```
yarn add @paginar/gppstring
```

Or when using npm run:

```
npm install @paginar/gppstring
```

The library can be used in CommonJS & ES6/ESM environments.
To use the CJS version:

```
let {
  UspcaSection,
  GPPString,
} = require("@paginar/gppstring/dist/cjs/index.cjs");
```

To use the ESM version:

```
import { UspcaSection, GPPString } from "@paginar/gppstring/dist/esm/index.mjs";
```

## Creating a GPP string

In order to create a GPP string, you first need to create & configure each of the Sections you want to support.

For example if your application needs to support CPRA (for details see the [California's privacy rights act spec](https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-States/CA/GPP%20Extension:%20IAB%20Privacy%E2%80%99s%20California%20Privacy%20Technical%20Specification.md)) you would build a uspca section object, assigning the appropiate values to each user consent

```
import { UspcaSection, GPPString } from "@paginar/gppstring/dist/esm/index.mjs";

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
console.log(gppString.encode2Base64Websafe())

```

In the console you should see the output as a base64-websafe string: `"DBABBa~BAAAAAAA"`

# Examples

See the `/examples` folder for CommonJS & ESM examples.
Also most source files have Jest tests (/src/\*\*/\*.test.js) files which should prove useful.

# Caveats

- The base64-websafe encoding does not match 100% the examples given in the spec. This may be due to an improper padding (we are splicing the bit string into 6 bit chars, and padding the remainder with "0").
  - 0000110000010000000000010011 > DBABM (not DBABMA)
  - 000011000001000000000010001101011 > DBACNY (not DBACNYA)
  - 000011000001000000000001100011110000 > DBABdq (not DBABjw)

# To do

- Add all other sections
- Add console logging (with different log levels)
- Create the localStorage key names (ie IABGPP_8_String)
- GPP String decoder function to assist in debugging? (:thumbsdown:)

# Contributors

- Juan de Tomaso https://github.com/juandeto
