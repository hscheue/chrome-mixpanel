import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";

type State = {
  api_host: string | undefined;
};

const initialSetting = { api_host: undefined } satisfies State;

type Action =
  | { type: "load"; api_host: string }
  | { type: "set api_host"; textvalue: string }
  | { type: "set priority properties"; textvalue: string }
  | { type: "set super properties"; textvalue: string };

type Reducer = (state: State, action: Action) => State;

const SettingsContext = createContext<State | null>(null);
SettingsContext.displayName = "SettingsContext";

const SettingsDispatchContext = createContext<Dispatch<Action> | null>(null);
SettingsDispatchContext.displayName = "SettingsDispatchContext";

export function SettingsProvider({ children }: PropsWithChildren) {
  const [setting, dispatch] = useReducer<Reducer>(
    settingsReducer,
    initialSetting
  );

  return (
    <SettingsContext.Provider value={setting}>
      <SettingsDispatchContext.Provider value={dispatch}>
        <LoadEffect />
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useSettings(): State {
  const context = useContext(SettingsContext);
  if (context === null) throw Error("Missing Provider: SettingsProvider");
  return context;
}

export function useSettingsDispatch(): Dispatch<Action> {
  const context = useContext(SettingsDispatchContext);
  if (context === null) throw Error("Missing Provider: SettingsProvider");
  return context;
}

const settingsReducer: Reducer = (state, action) => {
  switch (action.type) {
    case "load": {
      return { ...state, api_host: action.api_host };
    }
    case "set api_host": {
      chrome.storage.local.set({
        api_host: action.textvalue,
      });
      return {
        ...state,
        api_host: action.textvalue,
      };
    }

    default: {
      return state;
    }
  }
};

function LoadEffect() {
  const dispatch = useSettingsDispatch();

  useEffect(() => {
    (async () => {
      const { api_host = "" } = await chrome.storage.local.get(["api_host"]);
      dispatch({ type: "load", api_host });
    })();
  }, []);

  return null;
}
