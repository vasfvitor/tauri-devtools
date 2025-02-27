type Props = {
  className?: string;
}

export const ChevronDownIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="10"
    viewBox="0 0 15 10"
    class={props.className}
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.4793 2.52547L8.11537 8.88943C7.72485 9.27996 7.09168 9.27996 6.70116 8.88944L0.33719 2.52548C-0.0533351 2.13496 -0.0533358 1.50179 0.337188 1.11127C0.727712 0.720744 1.36088 0.720744 1.7514 1.11127L7.40826 6.76812L13.0651 1.11125C13.4556 0.72073 14.0888 0.720729 14.4793 1.11125C14.8698 1.50178 14.8698 2.13494 14.4793 2.52547Z"
      fill="currentColor"
    ></path>
  </svg>
);
