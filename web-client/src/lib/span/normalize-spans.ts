import { Span } from "../connection/monitor";
import { UiSpan } from "./format-spans-for-ui";
import { calculateSpanColorFromRelativeDuration } from "./calculate-span-color-from-relative-duration";
import { useCalls } from "~/components/span/calls-context";

function scaleNumbers(numbers: number[], min: number, max: number): number[] {
  const range = max - min;
  return numbers
    .map((num) => ((num - min) / range) * 100)
    .map((num) => Math.max(0, Math.min(num, 100)));
}

function scaleToMax(numbers: number[], max: number): number[] {
  return numbers.map((num) => (num / max) * 100);
}

export function computeColorClassName(
  duration: number,
  averageSpanDuration: number
) {
  const relativeDuration = (duration / averageSpanDuration) * 100;
  return calculateSpanColorFromRelativeDuration(relativeDuration);
}

export function computeWaterfallStyle(
  span: UiSpan,
  start: number,
  end: number,
  shortest?: number,
  longest?: number
) {
  const callsContext = useCalls();

  const offset = scaleNumbers([span.original.createdAt], start, end)[0];
  const totalDuration = end - start;

  const shortestSpanTime =
    shortest ?? callsContext.durations.durations.shortestTime;

  const longestSpanTime =
    longest ?? callsContext.durations.durations.longestTime;

  const granularity =
    ((longestSpanTime ?? 1) / (shortestSpanTime ?? 1)) *
    (callsContext.granularity.granularity() / 10000);

  const width = Math.min(
    scaleToMax([span.duration], totalDuration / granularity)[0],
    100 - offset
  );
  const marginLeft = offset - (offset * width) / 100;

  return `width:${width}%;margin-left:${marginLeft}%;`;
}

export function computeSlices(span: Span) {
  const allExits = span.exits.reduce((acc, e) => acc + e.timestamp, 0);
  const allEnters = span.enters.reduce((acc, e) => acc + e.timestamp, 0);

  return span.enters.map((entered, i) => {
    const exited = span.exits[i].timestamp;

    const width = scaleToMax(
      [exited - entered.timestamp],
      allExits - allEnters
    )[0];
    const offset = scaleNumbers(
      [entered.timestamp],
      span.createdAt,
      span.closedAt
    )[0];
    const marginLeft = offset - (offset * width) / 100;

    return {
      entered: entered.timestamp,
      exited,
      threadID: entered.threadID,
      width,
      marginLeft,
    };
  });
}
