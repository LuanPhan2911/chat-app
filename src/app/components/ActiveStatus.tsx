"use client";

import { FunctionComponent } from "react";
import useActiveChannel from "../hooks/useActiveChannel";

const ActiveStatus = () => {
  useActiveChannel();
  return null;
};

export default ActiveStatus;
