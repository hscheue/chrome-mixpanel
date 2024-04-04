import Text from "../ui/Text";
import styles from "./AttributeSection.module.scss";
import Stack from "../ui/Stack";
import { MixpanelEventData } from "../hooks/mixpanel-store";
import clsx from "clsx";
import {
  Config,
  defaultPropertySettings,
} from "../dev/default-property-settings";

const entryKeyAndSortMap = getAllSortMaps(defaultPropertySettings);

function getEntryKeyByMxKey(
  mxKey: string
): [string, Record<string, number>] | undefined {
  return entryKeyAndSortMap.find(([key, sortMap]) => {
    if (sortMap[mxKey]) return true;
    return false;
  });
}

export function AttributeSection({
  title,
  entries,
  defaultClosed,
}: {
  title: string;
  entries: Entry[];
  defaultClosed?: boolean;
}) {
  if (!entries.length) return null;

  return (
    <details
      className={styles.entrySection}
      open={defaultClosed ? false : true}
    >
      <summary>
        <Text as="h3" variant={"h5"}>
          {title}
        </Text>
      </summary>
      <ul>
        {entries.map((entry) => {
          const { value, accent } = renderValue(entry.value);
          return (
            <Stack as="li" gap={4} key={entry.key}>
              <Text variant={"note"}>{entry.key}:</Text>
              <Text className={clsx(accent && styles.accent)}>{value}</Text>
            </Stack>
          );
        })}
      </ul>
    </details>
  );
}

function renderValue(value: MixpanelEventData["properties"][string]): {
  value: string;
  accent?: true;
} {
  if (typeof value === "string") return { value };
  if (typeof value === "object") return { value: `${JSON.stringify(value)}` };
  return { value: `${value?.toString()}`, accent: true };
}

type Entry = {
  key: string;
  value: MixpanelEventData["properties"][string];
  order: number;
};

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
