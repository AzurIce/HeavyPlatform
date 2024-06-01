import { Component } from "solid-js";
import Doc from "../../../../../docs/第三次作业.md?raw";
import Markdown from "../../../components/Markdown";

const MainPage: Component = () => {
  return <>
    Main
    <Markdown mdContent={Doc} />
    {/* <SolidMarkdown renderingStrategy="reconcile" children={Doc}/>
    {Doc} */}
    {/* <Doc /> */}
  </>
};

export default MainPage;