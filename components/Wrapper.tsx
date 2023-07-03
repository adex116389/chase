import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Progress from "./Progress";

interface WrapperProps {
  showProgress?: boolean;
  children?: React.ReactNode;
  current?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  showProgress = true,
  current,
}) => {
  return (
    <>
      <Header showAnotherHeader={showProgress} />
      {showProgress && <Progress current={current} />}
      {children}
      <Footer />
    </>
  );
};
