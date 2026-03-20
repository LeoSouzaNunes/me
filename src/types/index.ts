export interface Passion {
  readonly id: string;
  readonly label: string;
}

export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly locked: boolean;
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly arcticLeafUrl: string;
  readonly licenseUrl: string;
}
