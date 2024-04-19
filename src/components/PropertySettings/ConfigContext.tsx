import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";
import { Config } from "./types";
import { atkPreset, mixpanelPreset } from "./presets";

type State = Config[];

type Action =
  | { type: "added" }
  | { type: "changed key"; id: string; title: string }
  | { type: "changed values"; id: string; values: string[] }
  | { type: "deleted"; id: string }
  | { type: "move up"; id: string }
  | { type: "move down"; id: string };

type Reducer = (state: State, action: Action) => State;

const ConfigContext = createContext<State | null>(null);

const ConfigDispatchContext = createContext<Dispatch<Action> | null>(null);

export function ConfigProvider({ children }: PropsWithChildren) {
  const [config, dispatch] = useReducer<Reducer>(configReducer, initialConfig);

  return (
    <ConfigContext.Provider value={config}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  );
}

export function useConfig(): State {
  const context = useContext(ConfigContext);
  if (context === null) throw Error("Missing Provider: ConfigProvider");
  return context;
}

export function useConfigDispatch(): Dispatch<Action> {
  const context = useContext(ConfigDispatchContext);
  if (context === null) throw Error("Missing Provider: ConfigProvider");
  return context;
}

const configReducer: Reducer = (config, action) => {
  switch (action.type) {
    case "added": {
      return [
        ...config,
        {
          id: window.crypto.randomUUID(),
          title: "",
          values: [],
        },
      ] satisfies Config[];
    }
    case "changed key": {
      return config.map((item) => {
        if (item.id === action.id) {
          return { ...item, ...action };
        } else {
          return item;
        }
      }) satisfies Config[];
    }
    case "changed values": {
      return config.map((item) => {
        if (item.id === action.id) {
          return { ...item, ...action };
        } else {
          return item;
        }
      }) satisfies Config[];
    }
    case "deleted": {
      return config.filter((t) => t.id !== action.id) satisfies Config[];
    }
    case "move up": {
      return config;
    }
    case "move down": {
      return config;
    }
    default: {
      // @ts-expect-error unknown action type
      throw Error("Unknown action: " + action.type);
    }
  }
};

const initialConfig =
  process.env.NODE_ENV === "development" ? atkPreset : mixpanelPreset;

export function addPreset() {}
