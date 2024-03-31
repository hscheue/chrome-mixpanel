import { createRoot } from "react-dom/client";
import styles from "./Devtools.module.scss";
import Text from "./ui/Text";
import { SettingsProvider } from "./hooks/settings";
import SettingsDrawer from "./components/SettingsDrawer";
import EventsSection from "./components/EventsSection";
createRoot(document.getElementById("root")!).render(<App />);

function App() {
  return (
    <SettingsProvider>
      <main className={styles.devtools}>
        <SettingsDrawer />
        <EventsSection />
      </main>
    </SettingsProvider>
  );
}
