import { Restore } from "@suid/icons-material";
import { Button, Divider, Typography } from "@suid/material";
import { Component } from "solid-js";
import doc from "../../../assets/第三次作业.png";
import { resetAllData } from "../../../lib/store";

const MainPage: Component = () => {
  return <>
    <Button variant="outlined" color="error" onClick={() => { resetAllData() }}>重置数据库<Restore /></Button>

    <Typography>
      项目地址：<a href="https://github.com/AzurIce/HeavyPlatform">AzurIce/HeavyPlatform</a>
    </Typography>
    <Typography>
      第三次作业文档：<a href="https://github.com/AzurIce/HeavyPlatform">AzurIce/HeavyPlatform/docs/第三次作业.md</a>
    </Typography>

    <Divider />

    <img src={doc} alt="doc" class="w-100 m-auto"/>
  </>
};

export default MainPage;