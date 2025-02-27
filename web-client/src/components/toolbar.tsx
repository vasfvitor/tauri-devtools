import { JSXElement } from "solid-js";

type Props = {
  children: JSXElement;
};

export const Toolbar = (props: Props) => (
  <div class="sticky items-center h-toolbar text-sm text-gray-400 px-2 top-0 bg-black bg-opacity-30 backdrop-blur flex justify-end border-b gap-4 border-gray-800">
    {props.children}
  </div>
);
