import { Config, useConfig, useConfigDispatch } from "./ConfigContext";
import styles from "./PropertySettings.module.scss";

export default function PropertySettings() {
  const list = useConfig();
  const dispatch = useConfigDispatch();

  return (
    <div className={styles.propertySettings}>
      {list.map((item) => (
        <PropertyItem id={item.id} title={item.title} values={item.values} />
      ))}
      <button onClick={() => dispatch({ type: "added" })}>add</button>
    </div>
  );
}

function PropertyItem({ id, title, values }: Config) {
  const dispatch = useConfigDispatch();

  return (
    <div>
      <div>
        {id}: {values}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            dispatch({
              type: "changed key",
              id,
              title: ev.currentTarget.value.trim(),
            });
          }}
        />
        <input
          type="text"
          value={values.toString()}
          onChange={(ev) => {
            const values = ev.currentTarget.value
              .split(",")
              .map((t) => t.trim());
            dispatch({ type: "changed values", id, values });
          }}
        />
      </div>
      <button onClick={() => dispatch({ type: "move up", id })}>up</button>
      <button onClick={() => dispatch({ type: "move down", id })}>down</button>
    </div>
  );
}
