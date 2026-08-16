import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
  id?: string;
}

export function Container({ children, className = "", as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-14 ${className}`}>
      {children}
    </Tag>
  );
}
