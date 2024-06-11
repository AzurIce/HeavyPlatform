import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Button, Container } from "@suid/material";
import { Component } from "solid-js";

const OrdersWrapper: Component<RouteSectionProps> = (props) => {
  const navigate = useNavigate();

  return <>
    {props.children}
  </>
}

export default OrdersWrapper;