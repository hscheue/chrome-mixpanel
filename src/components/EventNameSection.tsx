import clsx from "clsx";
import { MixpanelEventData, useMixpanelData } from "../hooks/mixpanel-store";
import Text from "../ui/Text";
import styles from "./EventNameSection.module.scss";

export default function EventNameSection({
  selectedID,
  onClick,
}: {
  selectedID: string | undefined;
  onClick: (data: MixpanelEventData) => void;
}) {
  const mixpanelEvents = useMixpanelData();

  return (
    <ul className={styles.eventNameSection}>
      {mixpanelEvents.map((data, index) => (
        <li key={index}>
          <button
            className={clsx(selectedID == data.id && styles.active)}
            onClick={() => {
              onClick(data);
            }}
          >
            <Text clamp={1}>{data.event}</Text>
          </button>
        </li>
      ))}
    </ul>
  );
}
