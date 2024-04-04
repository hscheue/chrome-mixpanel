import {
  Config,
  defaultPropertySettings,
} from "../dev/default-property-settings";
import { MixpanelEventData } from "../hooks/mixpanel-store";

export type Entry = {
  key: string;
  value: MixpanelEventData["properties"][string];
  order: number;
};

const entryKeyAndSortMap = getAllSortMaps(defaultPropertySettings);

export function parseAside(
  aside: MixpanelEventData["properties"]
): [string, Entry[]][] {
  const other: Entry[] = [];
  const entries = getEntryValues(defaultPropertySettings);

  for (const [mxKey, mxValue] of Object.entries(aside)) {
    const entryKeyAndSort = getEntryKeyByMxKey(mxKey);
    if (entryKeyAndSort) {
      const [entryKey, sortMap] = entryKeyAndSort;
      if (Array.isArray(entries[entryKey])) {
        entries[entryKey].push({
          key: mxKey,
          value: mxValue,
          order: sortMap[mxKey],
        });
      } else {
        other.push({ key: mxKey, value: mxValue, order: 1 });
      }
    } else {
      other.push({ key: mxKey, value: mxValue, order: 1 });
    }
  }

  return [["other", other], ...Object.entries(entries)];
}

function getSortMap(sortOrder: string[]) {
  const sortMap = sortOrder.reduce((data, next, index) => {
    data[next] = index + 1;
    return data;
  }, {} as Record<string, number>);
  return sortMap;
}

function getAllSortMaps(config: Config): [string, Record<string, number>][] {
  return config.map((row) => [row[0], getSortMap(row[1])]);
}

function getEntryValues(config: Config) {
  const cc: Record<string, Entry[]> = {};
  config.forEach((c) => (cc[c[0]] = []));
  return cc;
}

function getEntryKeyByMxKey(
  mxKey: string
): [string, Record<string, number>] | undefined {
  return entryKeyAndSortMap.find(([key, sortMap]) => {
    if (sortMap[mxKey]) return true;
    return false;
  });
}
