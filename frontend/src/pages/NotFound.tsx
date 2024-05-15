import { Component } from "solid-js";

const NotFound: Component = () => {
  return <>
    <div class="flex flex-col items-center">
      <div class="i-tabler-error-404 text-9xl" />
      <span class="text-2xl">404 Not Found</span>
    </div>
  </>
}

export default NotFound;