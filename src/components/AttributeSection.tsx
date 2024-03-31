import Text from "../ui/Text";
import styles from "./AttributeSection.module.scss";
import {
  facetableAttr,
  linkableAttr,
  mixpanelAttr,
  structuralAttr,
  superAttr,
  toggleableAttr,
  universalAttr,
} from "../types/property-types";
import Stack from "../ui/Stack";

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
          return (
            <Stack as="li" gap={4} key={entry.key}>
              <Text variant={"note"}>{entry.key}:</Text>
              <Text>{entry.value === null ? "null" : entry.value}</Text>
            </Stack>
          );
        })}
      </ul>
    </details>
  );
}

const structuralMap = getSortMap(structuralAttr);
const linkableMap = getSortMap(linkableAttr);
const toggleableMap = getSortMap(toggleableAttr);
const facetableMap = getSortMap(facetableAttr);
const mixpanelMap = getSortMap(mixpanelAttr);
const superMap = getSortMap(superAttr);
const universalMap = getSortMap(universalAttr);

type Entry = { key: string; value: string | number | null; order: number };

export function parseAside(
  aside: Record<string, string | number | null>
): [string, Entry[]][] {
  const structural: Entry[] = [];
  const linkable: Entry[] = [];
  const toggleable: Entry[] = [];
  const facetable: Entry[] = [];
  const mixpanel: Entry[] = [];
  const superProps: Entry[] = [];
  const universal: Entry[] = [];
  const other: Entry[] = [];

  for (const entry of Object.entries(aside)) {
    addEntry(structural, structuralAttr, structuralMap, entry) ||
      addEntry(linkable, linkableAttr, linkableMap, entry) ||
      addEntry(toggleable, toggleableAttr, toggleableMap, entry) ||
      addEntry(facetable, facetableAttr, facetableMap, entry) ||
      addEntry(mixpanel, mixpanelAttr, mixpanelMap, entry) ||
      addEntry(superProps, superAttr, superMap, entry) ||
      addEntry(universal, universalAttr, universalMap, entry) ||
      other.push({ key: entry[0], value: entry[1], order: 1 });
  }

  return [
    ["structural", sortEntries(structural)],
    ["linkable", sortEntries(linkable)],
    ["toggleable", sortEntries(toggleable)],
    ["facetable", sortEntries(facetable)],
    ["other", other],
    ["universal", sortEntries(universal)],
    ["super", sortEntries(superProps)],
    ["mixpanel", sortEntries(mixpanel)],
  ];
}

function addEntry(
  target: Entry[],
  attributeList: string[],
  attributeSortMap: Record<string, number>,
  [key, value]: [string, string | number | null]
) {
  if (attributeList.some((arg) => arg === key)) {
    target.push({ key: key, value, order: attributeSortMap[key] });
    return true;
  }
  return false;
}

function sortEntries(entries: Entry[]) {
  return entries.sort((recordA, recordB) => {
    return (recordA.order || 10000) - (recordB.order || 10000);
  });
}

function getSortMap(sortOrder: string[]) {
  const sortMap = sortOrder.reduce((data, next, index) => {
    data[next] = index + 1;
    return data;
  }, {} as Record<string, number>);
  return sortMap;
}
