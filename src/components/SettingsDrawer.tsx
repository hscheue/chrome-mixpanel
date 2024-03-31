import { useState } from "react";
import Drawer from "../ui/Drawer";
import { useSettings, useSettingsDispatch } from "../hooks/settings";
import styles from "./SettingsDrawer.module.scss";
import Text from "../ui/Text";

export default function SettingsDrawer() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const { api_host } = useSettings();
  const dispatch = useSettingsDispatch();

  return (
    <>
      <div className={styles.header}>
        <Text as="h1">Mixpanel</Text>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <fieldset>
          <label>
            <Text as="h3">API Host</Text>
            <textarea
              placeholder={api_host}
              value={value}
              onChange={(ev) => setValue(ev.currentTarget.value)}
              defaultValue={api_host}
            />
          </label>
        </fieldset>

        <Text
          as="button"
          onClick={() => {
            dispatch({ type: "set api_host", textvalue: value });
          }}
        >
          Save
        </Text>
      </Drawer>
    </>
  );
}
