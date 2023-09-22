import React from "react";
import VideoFactory from "./videoControls";
import { Data } from "./type";

export default (props: RuntimeParams<Data>) => {
  return <VideoFactory {...props} />;
};
