import LoadingModal from "@/app/components/LoadingModal";
import { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return <LoadingModal />;
};

export default Loading;
