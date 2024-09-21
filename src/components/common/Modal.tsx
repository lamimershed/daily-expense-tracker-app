"use client";
import { cn } from "@/utils/cn";
/* eslint-disable */
import { ReactNode, useEffect, useRef } from "react";

type modalProps = {
  open: boolean | null;
  onclose: () => void;
  keepMounted?: boolean | null;
  children?: ReactNode;
  zIndex?: number;
  className?: string;
  backdropClassName?: string;
};
export const Modal: React.FC<modalProps> = (props) => {
  const { open, onclose, children, className, backdropClassName } = props;
  const popupRef = useRef<HTMLDivElement | null>(null);
  const handlePopupClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === popupRef.current) onclose();
  };
  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "5px";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  /* eslint-enable */
  return (
    <>
      {open && (
        <div
          ref={popupRef}
          onClick={(e) => handlePopupClose(e)}
          className={cn(
            `fixed left-0 top-0 z-[100] h-[100vh] w-full overflow-auto bg-[#000000c9]`,
            backdropClassName,
          )}
        >
          <div className={cn(className, `absolute`)} onClick={handleChildClick}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
