import { Restore } from "@suid/icons-material";
import { Button } from "@suid/material";
import { Component } from "solid-js";
import { resetDb } from "../../../lib/db";

const MainPage: Component = () => {
  return <>
    <Button variant="outlined" color="error" onClick={() => { resetDb() }}>重置数据库<Restore /></Button>
  </>
};

export default MainPage;