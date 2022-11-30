interface Segment {
  encode(): string;
  encode2BitStr(): string;
}
interface Section extends Segment {
  getGPPSectionID(): number;
  getClientSideAPIPrefix(): string;
}

export type { Section, Segment };
