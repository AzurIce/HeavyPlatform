import { A } from "@solidjs/router";
import { Component } from "solid-js";

const NotFound: Component = () => {
  return <>
    <div class="flex flex-col items-center">
      <div class="i-tabler-error-404 text-9xl" />
      <span class="text-2xl">404 Not Found</span>
      <A href="/admin">back to home</A>
    </div>
  </>
}

export default NotFound;