"use client";

type BgWhiteProps = {
  children: React.ReactNode;
  fullHeight?: boolean;
};

export const BgWhite = ({ children, fullHeight }: BgWhiteProps) => {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-md shadow-black/10 ${
        fullHeight ? "h-[calc(100vh-161px)]" : ""
      }`}
    >
      {children}
    </div>
  );
};
