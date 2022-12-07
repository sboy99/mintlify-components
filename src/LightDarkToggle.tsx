import { Switch } from "@headlessui/react";
import clsx from "clsx";

/**
 * The toggle moves according to the dark class name.
 * defaultChecked exists so the input values returned by onChange are in sync with the original theme.
 */
export function LightDarkToggle({
  defaultChecked,
  onChange,
  colors,
}: {
  defaultChecked: boolean;
  onChange: (enabled: boolean) => void;
  colors?: {
    brandColor: string;
    lightBackground: string;
    darkBackground: string;
  };
}) {
  return (
    <Switch
      defaultChecked={defaultChecked}
      onChange={(enabled: boolean) => onChange(enabled)}
      className="relative inline-flex h-[24px] w-[36px] shrink-0 cursor-pointer border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      {({ checked }) => (
        <>
          <div className="bg-black/10 dark:bg-white/10 rounded-full absolute left-0 right-0 h-[0.65rem] top-1/2 translate-y-[-50%]"></div>
          <span className="sr-only">Switch theme</span>
          <span
            aria-hidden="true"
            className={clsx(
              "translate-x-0 dark:translate-x-3 border border-zinc-300/60 p-[3px] pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition-transform duration-200 ease-in-out",
              checked && !colors
                ? "dark:bg-slate-800 dark:border-indigo-900/80"
                : "bg-white"
            )}
            style={
              checked
                ? {
                    borderColor: colors?.brandColor,
                    backgroundColor: colors?.darkBackground,
                  }
                : {
                    backgroundColor: colors?.lightBackground,
                  }
            }
          >
            <SunIcon />
            <MoonIcon brandColor={colors?.brandColor} />
          </span>
        </>
      )}
    </Switch>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="dark:hidden"
    >
      <path
        className="fill-yellow-500"
        d="M3.828 5.243L2.343 3.757a1 1 0 011.414-1.414l1.486 1.485a5.027 5.027 0 00-1.415 1.415zM7 3.1V1a1 1 0 112 0v2.1a5.023 5.023 0 00-2 0zm3.757.728l1.486-1.485a1 1 0 111.414 1.414l-1.485 1.486a5.027 5.027 0 00-1.415-1.415zM12.9 7H15a1 1 0 010 2h-2.1a5.023 5.023 0 000-2zm-.728 3.757l1.485 1.486a1 1 0 11-1.414 1.414l-1.486-1.485a5.027 5.027 0 001.415-1.415zM9 12.9V15a1 1 0 01-2 0v-2.1a5.023 5.023 0 002 0zm-3.757-.728l-1.486 1.485a1 1 0 01-1.414-1.414l1.485-1.486a5.027 5.027 0 001.415 1.415zM3.1 9H1a1 1 0 110-2h2.1a5.023 5.023 0 000 2zM8 11a3 3 0 110-6 3 3 0 010 6z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}

function MoonIcon({ brandColor }: { brandColor?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="hidden dark:block"
    >
      <path
        className="fill-indigo-800"
        style={brandColor ? { fill: brandColor } : {}}
        d="M7.914 0a6.874 6.874 0 00-1.26 3.972c0 3.875 3.213 7.017 7.178 7.017.943 0 1.843-.178 2.668-.5C15.423 13.688 12.34 16 8.704 16 4.174 16 .5 12.41.5 7.982.5 3.814 3.754.389 7.914 0z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
