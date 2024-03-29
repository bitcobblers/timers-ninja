import { $, component$ } from "@builder.io/qwik"
import { FaCircleHalfStrokeSolid } from "@qwikest/icons/font-awesome";

export default component$(() => {

  const item = "dark";
  const otherTheme = item === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      class="group absolute right-4 top-4 z-50 -m-2.5 p-2.5"
      onClick$={$(() => {
        const theme = document.documentElement.className;
        if (theme === "light") {
          document.documentElement.className = "dark";
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.className = "light";
          localStorage.setItem("theme", "light");
        }
      })}
    >
      <span class="sr-only">Switch to {otherTheme} theme</span>
      <FaCircleHalfStrokeSolid class="m-1 h-4 w-4 fill-white opacity-50 transition-opacity group-hover:opacity-100 lg:fill-gray-900 lg:dark:fill-white" />
    </button>
  )
})