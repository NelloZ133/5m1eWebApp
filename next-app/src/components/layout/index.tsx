import { LayoutStore } from "@/store/layout.store";
import { Spin } from "antd";
import { FC } from "react";
import Header from "./header";

interface IProps {
  title: string;
  children?: React.ReactNode;
  backRoute?: string;
  backable?: boolean;
  hideAuthSection?: boolean;
}

const Container: FC<IProps> = ({
  title,
  backable,
  backRoute,
  hideAuthSection,
  children,
}: IProps) => {
  const { isLoading } = LayoutStore();
  return (
    <Spin
      spinning={isLoading}
      size="large"
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      <Header
        title={title}
        backable={backable}
        hideAuthSection={hideAuthSection}
        backRoute={backRoute}
      />
      <div
        className="w-full overflow-y-auto overflow-x-hidden"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="w-full h-full p-4 m-auto">{children}</div>
      </div>
    </Spin>
  );
};

export default Container;
