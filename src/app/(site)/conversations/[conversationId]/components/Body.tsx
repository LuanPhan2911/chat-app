"use client";
import { FunctionComponent } from "react";

interface BodyProps {}

const Body: FunctionComponent<BodyProps> = () => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
