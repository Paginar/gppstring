interface Section {
  getGPPSectionID(): number;
  encode2BitStr(): string;
  getClientSideAPIPrefix(): string;
}

export type { Section };
