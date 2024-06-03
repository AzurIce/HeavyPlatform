import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  return <>
    Wrapper:
    {props.children}
  </>
};

export default MainWrapper;