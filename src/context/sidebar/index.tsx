import useWindowSize from "@/utils/useWindowSize";
import { Size } from "@/utils/useWindowSize";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
const SidebarContext = createContext(true);
const SidebarUpdateContext = createContext((isOpen: boolean) => {});

export const useSideBarContext = () => useContext(SidebarContext);
export const useSideBarUpdateContext = (isOpen: boolean) =>
  useContext(SidebarUpdateContext);

export const SideBarContextProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const handleSetIsSidebarOpen = (isSidebarOpen: boolean) => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const size: Size = useWindowSize();
  useEffect(() => {
    if (size.width !== undefined && size?.width < 768) {
      handleSetIsSidebarOpen(true);
    }
  }, [size]);

  return (
    <SidebarContext.Provider value={isSidebarOpen}>
      <SidebarUpdateContext.Provider
        value={(isOpen: boolean) => handleSetIsSidebarOpen(isOpen)}
      >
        {children}
      </SidebarUpdateContext.Provider>
    </SidebarContext.Provider>
  );
};
