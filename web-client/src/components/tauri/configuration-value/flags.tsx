import { Switch, Match } from "solid-js";
import {
  getDescriptionByKey,
  findLineNumberByKey,
} from "~/lib/tauri/tauri-conf-lib";

export function Flags(props: { key: string; value: boolean | string }) {
  const localSchema = () => getDescriptionByKey(props.key);

  const isInConfig = () => {
    const lineNumber = findLineNumberByKey(props.key);
    return lineNumber > 0;
  };
  return (
    <span class="text-neutral-400 pr-2 font-mono">
      <Switch>
        <Match
          when={isDefaultValue(localSchema(), props.value) && isInConfig()}
        >
          Set Default
        </Match>

        <Match when={isDefaultValue(localSchema(), props.value)}>Default</Match>

        <Match when={isInConfig()}>User Set</Match>
      </Switch>
    </span>
  );
}

export function isDefaultValue(
  schema:
    | {
        default?: string;
        enum?: string[];
      }
    | undefined,
  value: boolean | null | string
) {
  if (!schema) return false;

  if (Object.hasOwn(schema, "default") && schema.default === value) return true;

  if ((!Object.hasOwn(schema, "default") && value === null) || value === "")
    return true;

  if ("enum" in schema && schema.enum && schema.enum[0] === value) return true;

  return false;
}
