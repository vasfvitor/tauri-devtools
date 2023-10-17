import { For, Show, createSignal } from "solid-js";
import { AutoscrollPane } from "~/components/autoscroll-pane";
import { FilterToggle } from "~/components/filter-toggle";
import { formatTimestamp, timestampToDate } from "~/lib/formatters";
import { useMonitor } from "~/lib/connection/monitor";

export default function Console() {
  const { monitorData } = useMonitor();
  const [showTimestamp, toggleTimeStamp] = createSignal(true);
  const [shouldAutoScroll, toggleAutoScroll] = createSignal<boolean>(true);

  return (
    <>
      <div class="sticky h-toolbar top-0 bg-black bg-opacity-30 backdrop-blur flex justify-end border-b border-gray-800">
        <FilterToggle
          defaultPressed
          aria-label="time stamps"
          changeHandler={() => toggleTimeStamp((prev) => !prev)}
        >
          <span>Timestamps</span>
        </FilterToggle>
        <FilterToggle
          aria-label="auto scroll"
          defaultPressed
          changeHandler={() => toggleAutoScroll((prev) => !prev)}
        >
          <span>Autoscroll</span>
        </FilterToggle>
      </div>
      <AutoscrollPane
        dataStream={monitorData.logs[0]}
        shouldAutoScroll={shouldAutoScroll}
      >
        <For each={monitorData.logs}>
          {({ message, at }) => {
            if (!at) return null;

            const timeDate = timestampToDate(at);

            return (
              <li class="p-1 items-center flex">
                <Show when={showTimestamp()}>
                  <time
                    dateTime={timeDate.toISOString()}
                    class="font-mono pr-4"
                  >
                    {formatTimestamp(timeDate)}
                  </time>
                </Show>
                <span>{message}</span>
              </li>
            );
          }}
        </For>
      </AutoscrollPane>
    </>
  );
}
