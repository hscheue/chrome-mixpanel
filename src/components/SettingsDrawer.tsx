import { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";
import { useSettings, useSettingsDispatch } from "../hooks/settings";
import styles from "./SettingsDrawer.module.scss";
import Text from "../ui/Text";
import { mixpanelStore } from "../hooks/mixpanel-store";
import PropertySettings from "./PropertySettings/PropertySettings";
import { ConfigProvider } from "./PropertySettings/ConfigContext";

export default function SettingsDrawer() {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [open, setOpen] = useState(false);
  const { api_host, config } = useSettings();
  const dispatch = useSettingsDispatch();

  useEffect(() => {
    if (api_host) {
      setValue(api_host);
    }
  }, [api_host]);

  useEffect(() => {
    if (config) {
      setValue2(config);
    }
  }, [config]);

  return (
    <>
      <div className={styles.header}>
        <Text as="h1">Mixpanel</Text>
        <button onClick={() => mixpanelStore.deleteEvents()}>Clear</button>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <fieldset>
          <label>
            <Text as="h3">API Host</Text>
            <textarea
              placeholder={"API Host"}
              value={value ?? api_host}
              onChange={(ev) => setValue(ev.currentTarget.value)}
              defaultValue={api_host}
            />
          </label>
        </fieldset>

        <fieldset>
          <label>
            <Text as="h3">Properies Configuration</Text>
            <textarea
              placeholder={"Property Configuration"}
              value={value2}
              onChange={(ev) => setValue2(ev.currentTarget.value)}
              defaultValue={config}
            />
          </label>
        </fieldset>

        <Text
          as="button"
          onClick={() => {
            dispatch({ type: "set api_host", textvalue: value });
            dispatch({ type: "set priority properties", textvalue: value2 });
          }}
        >
          Save
        </Text>

        <ConfigProvider>
          <PropertySettings />
        </ConfigProvider>
      </Drawer>
    </>
  );
}
