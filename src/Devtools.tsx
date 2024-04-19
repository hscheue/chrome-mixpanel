import { createRoot } from "react-dom/client";
import styles from "./Devtools.module.scss";
import { SettingsProvider } from "./hooks/settings";
import SettingsDrawer from "./components/SettingsDrawer";
import EventsSection from "./components/EventsSection";
import { ConfigProvider } from "./components/PropertySettings/ConfigContext";
createRoot(document.getElementById("root")!).render(<App />);

function App() {
  return (
    <SettingsProvider>
      <ConfigProvider>
        <main className={styles.devtools}>
          <SettingsDrawer />
          <EventsSection />
        </main>
      </ConfigProvider>
    </SettingsProvider>
  );
}
