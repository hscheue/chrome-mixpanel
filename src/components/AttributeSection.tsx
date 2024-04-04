import Text from "../ui/Text";
import styles from "./AttributeSection.module.scss";
import Stack from "../ui/Stack";
import { MixpanelEventData } from "../hooks/mixpanel-store";
import clsx from "clsx";
import { Entry } from "./parseAside";

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
