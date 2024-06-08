import { RouteSectionProps } from "@solidjs/router";
import { Container } from "@suid/material";
import { Component } from "solid-js";

const GoodsWrapper: Component<RouteSectionProps> = (props) => {
  return <>
    <Container sx={{ paddingBottom: '15px' }}>
      {props.children}
    </Container>
  </>
}

export default GoodsWrapper