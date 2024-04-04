export type Config = [string, string[]][];

/**
 * Convert existing property ui to be read through this json structure.
 * Then read configs through text field,
 * then build UI to create a config without using json
 */
export const defaultPropertySettings: Config = [
  [
    "structural",
    [
      "label",
      "component",
      "parentlabel",
      "parentcomponent",
      "region",
      "position",
    ],
  ],
  ["document", ["document_id", "document_title", "document_type"]],
  ["linkable", []],

  ["toggleable", ["checked"]],
  ["facetable", ["facet"]],
  ["universal", ["pathname", "environment", "project", "name"]],
  [
    "super",
    [
      "email",
      "user_segment",
      "role",
      "package",
      "site_key",
      "id",
      "external_id",
      "extcode",
    ],
  ],
  [
    "mixpanel",
    [
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
    ],
  ],
];
