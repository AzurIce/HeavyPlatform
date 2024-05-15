import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const MainWrapper: Component<RouteSectionProps> = (props) => {
  return <>
    Wrapper:
    {props.children}
  </>
};

export default MainWrapper;