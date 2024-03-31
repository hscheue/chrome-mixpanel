export type StructuralAttr = {
  label: string;
  component: string;
  parentlabel?: string;
  parentcomponent?: string;
  region: string;
  position?: number;
};

export const structuralAttr = [
  "label",
  "component",
  "parentlabel",
  "parentcomponent",
  "region",
  "position",
] satisfies (keyof StructuralAttr)[];

export type ToggleableAttr = { checked: boolean };

export const toggleableAttr = ["checked"] satisfies (keyof ToggleableAttr)[];

export type LinkableAttr = { href: string };

export const linkableAttr = ["href"] satisfies (keyof LinkableAttr)[];

export type DocumentAttr = Record<
  "document_id" | "document_title" | "document_type",
  string
>;

export const documentAttr = [
  "document_id",
  "document_title",
  "document_type",
] satisfies (keyof DocumentAttr)[];

export type FacetableAttr = { facet: string };
export const facetableAttr = ["facet"] satisfies (keyof FacetableAttr)[];

// export type SearchableAttr = Partial<
//   Pick<SearchState, "indexName" | "page" | "query" | "refinements">
// >;

export type SuperAttr = {
  email: string | null;
  id: number;
  external_id: number;
  package: string;
  user_segment: string;
  role: string;
  site_key: string;
  extcode: string;
};

export const superAttr = [
  "email",
  "user_segment",
  "role",
  "package",
  "site_key",
  "id",
  "external_id",
  "extcode",
] satisfies (keyof SuperAttr)[];

export type UniversalAttr = {
  project: string;
  name: string;
  pathname: string;
  environment: string;
};

export const universalAttr = [
  "pathname",
  "environment",
  "project",
  "name",
] satisfies (keyof UniversalAttr)[];

export type MixpanelAttr = {
  $os: string;
  $browser: string;
  $current_url: string;
  $browser_version: number;
  $screen_height: number;
  $screen_width: number;
  $search_engine: string;
  $referrer: string;
  $referring_domain: string;
  $device: string;
  $device_id: string;
  mp_lib: string;
  $lib_version: string;
  $insert_id: string;
  time: number;
  distinct_id: string;
  $user_id: string;
  first_visited_at: string;
  $initial_referrer: string;
  $initial_referring_domain: string;
  token: string;
  mp_sent_by_lib_version: string;
};

export const mixpanelAttr: (keyof MixpanelAttr)[] = [
  "$browser",
  "$browser_version",
  "$current_url",
  "$device",
  "$device_id",
  "$initial_referrer",
  "$initial_referring_domain",
  "$insert_id",
  "$insert_id",
  "$lib_version",
  "$os",
  "$referrer",
  "$referring_domain",
  "$screen_height",
  "$screen_width",
  "$search_engine",
  "$user_id",
  "distinct_id",
  "first_visited_at",
  "mp_lib",
  "mp_sent_by_lib_version",
  "time",
  "token",
];
