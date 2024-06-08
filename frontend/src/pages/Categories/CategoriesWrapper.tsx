import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const CategoriesWrapper: Component<RouteSectionProps> = (props) => {
  return <>
    Wrapper:
    {props.children}
  </>
}

export default CategoriesWrapper