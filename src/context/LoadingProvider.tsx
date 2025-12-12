import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  useEffect(() => {
    if (!isLoading) {
      console.log("Loading completed, showing main content");
      
      // Immediately ensure main content is visible
      const mainElement = document.getElementsByTagName("main")[0];
      if (mainElement) {
        mainElement.style.opacity = "1";
        mainElement.style.visibility = "visible";
        mainElement.style.display = "block";
        mainElement.style.zIndex = "10";
        if (!mainElement.classList.contains("main-active")) {
          mainElement.classList.add("main-active");
        }
        console.log("Main element styles applied:", {
          opacity: mainElement.style.opacity,
          visibility: mainElement.style.visibility,
          zIndex: mainElement.style.zIndex
        });
      } else {
        console.error("Main element not found!");
      }
      
      // Ensure body overflow is enabled
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
      
      // Ensure background color is set correctly (fallback if initialFX doesn't run)
      if (!document.body.style.backgroundColor || document.body.style.backgroundColor === "rgb(0, 0, 0)") {
        document.body.style.backgroundColor = "#0b080c";
      }
      
      // Delay hiding loading screen to allow fade-out transition
      setTimeout(() => {
        setShowLoading(false);
        console.log("Loading screen hidden");
      }, 500);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {showLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
