import { Accessor, JSXElement, createEffect, on } from "solid-js";

function scrollEnd(ref?: HTMLElement, smooth?: boolean) {
  ref?.scroll({
    top: ref.scrollHeight,
    /**
     * @todo
     * make it smooth when autoscroll is turned BACK on.
     */
    behavior: smooth ? "smooth" : "instant",
  });
}

type AutoScrollPaneProps = {
  dataStream: unknown;
  shouldAutoScroll: Accessor<boolean>;
  children: JSXElement;
};

export function AutoscrollPane(props: AutoScrollPaneProps) {
  let logPanel: HTMLUListElement | undefined;

  createEffect(
    on(
      () => props.dataStream,
      () => {
        if (props.shouldAutoScroll()) {
          scrollEnd(logPanel);
        }
      }
    )
  );

  return (
    <ul
      class="h-[calc(100%-var(--toolbar-height))] overflow-auto"
      ref={(e) => (logPanel = e)}
    >
      {props.children}
    </ul>
  );
}
