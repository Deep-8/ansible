import React, { useRef, useEffect } from "react";
const useClickOutSide = (
  ref: React.MutableRefObject<HTMLButtonElement | null>,
  callback: () => void
) => {
  const callbackRef = useRef<() => void>();
  callbackRef.current = callback;
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node) && callbackRef.current)
        callbackRef.current();
    };
    document.addEventListener("click", handleClickOutSide, true);
    return () =>
      document.removeEventListener("click", handleClickOutSide, true);
  }, [callbackRef, ref]);
};
export default useClickOutSide;
