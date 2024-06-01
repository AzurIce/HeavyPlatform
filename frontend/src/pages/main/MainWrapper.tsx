import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, onMount } from "solid-js";

const MainWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();
  onMount(() => {
    navigate(`/admin`)
  })
  return <>
    Wrapper:
    {props.children}
  </>
};

export default MainWrapper;