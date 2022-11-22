interface Section {
  getGPPSectionID(): number;
  getClientSideAPIPrefix(): string;
  encode(): string;
  encode2BitStr(): string;
}

export type { Section };
