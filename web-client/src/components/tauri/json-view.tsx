import {
  findLineNumberByKey,
  scrollToHighlighted,
} from "~/lib/tauri/tauri-conf-lib";
import { useConfiguration } from "./configuration-context";
import { createEffect, Show } from "solid-js";
import { CodeView } from "~/components/sources/code-view";
import { useParams, useSearchParams } from "@solidjs/router";
import { retrieveConfigurationByKey } from "~/lib/tauri/config/retrieve-configurations";

export function JsonView() {
  const params = useParams<{ config: string }>();
  const [searchParams] = useSearchParams<{ size: string }>();
  const path = () =>
    retrieveConfigurationByKey(params.config)?.path ?? undefined;
  const {
    highlightKey: { highlightKey },
  } = useConfiguration();

  const lineNumber = () => findLineNumberByKey(highlightKey());

  createEffect(() => {
    highlightKey();
    scrollToHighlighted();
  });

  return (
    <Show when={params.config}>
      <Show
        when={path()}
        fallback={
          <p class="p-3">
            This configuration is parsed and merged, so there is no direct
            source file to display.
          </p>
        }
      >
        <CodeView
          path={path() ?? ""}
          size={Number(searchParams.size)}
          lang="json"
          highlightedLine={lineNumber()}
        />
      </Show>
    </Show>
  );
}
