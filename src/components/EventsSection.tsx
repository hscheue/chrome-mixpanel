import { useMemo, useState } from "react";
import styles from "./EventsSection.module.scss";
import { AttributeSection, parseAside } from "./AttributeSection";
import EventNameSection from "./EventNameSection";
import { MixpanelEventData } from "../hooks/mixpanel-store";
import Text from "../ui/Text";

export default function EventsSection() {
  const [mixpanelData, setMixpanelData] = useState<MixpanelEventData | null>(
    null
  );

  const parsedAside = useMemo(() => {
    if (!mixpanelData || !mixpanelData.properties) return [];
    return parseAside(mixpanelData.properties);
  }, [mixpanelData]);

  const selectedID = useMemo(() => {
    return mixpanelData?.id;
  }, [mixpanelData]);

  return (
    <section className={styles.eventsSection}>
      <EventNameSection
        selectedID={selectedID}
        onClick={(data) => setMixpanelData(data)}
      />
      <aside className={styles.aside}>
        {parsedAside.map((asideEntry) => {
          return (
            <AttributeSection
              key={asideEntry[0]}
              title={asideEntry[0]}
              entries={asideEntry[1]}
              defaultClosed={["super", "mixpanel"].some(
                (k) => k === asideEntry[0]
              )}
            />
          );
        })}
      </aside>
    </section>
  );
}