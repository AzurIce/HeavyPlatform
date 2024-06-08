import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const GoodsWrapper: Component<RouteSectionProps> = (props) => {
  return <>
    Wrapper:
    {props.children}
  </>
}

export default GoodsWrapper