import { useSyncExternalStore } from "react";
import { seedData } from "../dev/seedData";

export type MixpanelEventData = {
  id: string;
  event: string;
  properties: Record<string, string | number | null>;
};

let events: (MixpanelEventData & { id: string })[] = [];

if (process.env.NODE_ENV === "development") {
  events = seedData.map((evt, index) => ({ ...evt, id: `${index}` }));
}

let listeners: (() => void)[] = [];

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export const mixpanelStore = {
  addEvents(mixpanelData: MixpanelEventData[]) {
    events = [
      ...events,
      ...mixpanelData.map((entry) => {
        const uuid = window.crypto.randomUUID();
        return { ...entry, id: uuid };
      }),
    ];
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return events;
  },
};

export function useMixpanelData(): MixpanelEventData[] {
  const mixpanelEvents = useSyncExternalStore(
    mixpanelStore.subscribe,
    mixpanelStore.getSnapshot
  );

  return mixpanelEvents;
}

const base64regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

const settingLocal = await chrome.storage.local.get("api_host");

const settings: { userHost: string } = {
  userHost: String(settingLocal?.api_host ?? ""),
};

chrome.storage.onChanged.addListener((changes) => {
  if ("api_host" in changes && typeof changes.api_host.newValue === "string") {
    settings.userHost = changes.api_host.newValue;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (
      (settings.userHost && details.url.includes(settings.userHost)) ||
      details.url.includes("https://api-js.mixpanel.com")
    ) {
      let data = details.requestBody?.formData?.data?.[0];
      if (!data) return {};

      // some library version are base64 encoded
      if (base64regex.test(data)) {
        data = atob(data);
      }

      const events = JSON.parse(data);
      mixpanelStore.addEvents(events);
    }
    return {};
  },
  {
    urls: ["<all_urls>"],
  },
  ["requestBody"]
);
