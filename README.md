# Purpose

A client library to construct [IAB's Global Privacy Platform](https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform) (GPP) strings

This library includes support for:

| Section ID | Client-side API Prefix | Description                               | Supported |
| ---------- | ---------------------- | ----------------------------------------- | --------- |
| 1          | tcfeuv1                | EU TCF v1 section (deprecated)            | N/A       |
| 2          | tcfeuv2                | EU TCF v2 section (see note below)        | Not yet   |
| 3          | GPP                    | Header section (REQUIRED, see note below) | Not yet   |
| 4          | --                     | GPP signal integrity section              | Not yet   |
| 5          | tcfca                  | Canadian TCF section                      | Not yet   |
| 6          | uspv1                  | USPrivacy String (Unencoded Format)       | Not yet   |
| 7          | usnat                  | US - national section (coming soon)       | Not yet   |
| 8          | usca                   | US - California section (coming soon)     | Yes       |
| 9          | usva                   | US - Virginia section (coming soon)       | Not yet   |
| 10         | usco                   | US - Colorado section (coming soon)       | Not yet   |
| 11         | usut                   | US - Utah section (coming soon)           | Not yet   |
| 12         | usct                   | US - Connecticut section (coming soon)    | Not yet   |

# To do

- Update README with usage examples
- Add all other sections
- Add console logging (with different log levels)
- Use Parcel to package to UMD/CJS/ESM
- Convert to Typescript / add types
- Publish to npm
- GPP String decoder function to assist in debugging? (:thumbsdown:)

# Caveats

- The base64-websafe encoding does not match 100% the examples given in the spec. This may be due to an improper padding (we are splicing the bit string into 6 bit chars, and padding the remainder with "0").
  - 0000110000010000000000010011 > DBABM (not DBABMA)
  - 000011000001000000000010001101011 > DBACNY (not DBACNYA)
  - 000011000001000000000001100011110000 > DBABdq (not DBABjw)

# Contributors

- Juan de Tomaso https://github.com/juandeto
