import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const OrdersWrapper: Component<RouteSectionProps> = (props) => {
  return <>
    orders wrapper
    {props.children}
  </>
}

export default OrdersWrapper;