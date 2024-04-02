import clsx from "clsx";
import { MixpanelEventData, useMixpanelData } from "../hooks/mixpanel-store";
import Text from "../ui/Text";
import styles from "./EventNameSection.module.scss";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

type EventNameSectionProps = {
  selectedID: string | undefined;
  onClick: (data: MixpanelEventData) => void;
};

type EventItemProps = EventNameSectionProps & {
  data: MixpanelEventData;
};

export default function EventNameSection({
  selectedID,
  onClick,
}: EventNameSectionProps) {
  const mixpanelEvents = useMixpanelData();

  return (
    <ul className={styles.eventNameSection}>
      {mixpanelEvents.map((data) => (
        <EventItem
          key={data.id}
          data={data}
          onClick={onClick}
          selectedID={selectedID}
        />
      ))}
    </ul>
  );
}

function EventItem({ selectedID, onClick, data }: EventItemProps) {
  const ref = useRef<HTMLLIElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <CSSTransition
      nodeRef={ref}
      in={visible}
      timeout={400}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
      }}
    >
      <li ref={ref} className={clsx(styles.li)}>
        <button
          className={clsx(selectedID == data.id && styles.active)}
          onClick={() => {
            onClick(data);
          }}
        >
          <Text clamp={1}>{data.event}</Text>
        </button>
      </li>
    </CSSTransition>
  );
}
