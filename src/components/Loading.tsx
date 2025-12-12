import { useEffect, useState, memo } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = memo(({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (percent < 100) {
        console.warn("Loading timeout reached, forcing completion");
        setIsLoading(false);
      }
    }, 30000); // 30 seconds timeout

    return () => clearTimeout(timeout);
  }, [percent, setIsLoading]);

  // Handle percent reaching 100 - moved into useEffect to prevent race conditions
  useEffect(() => {
    if (percent >= 100) {
      let timer2: ReturnType<typeof setTimeout>;
      const timer1: ReturnType<typeof setTimeout> = setTimeout(() => {
        setLoaded(true);
        timer2 = setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      }, 600);
      return () => {
        clearTimeout(timer1);
        if (timer2) {
          clearTimeout(timer2);
        }
      };
    }
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    
    const loadInitialFX = async () => {
      try {
        const module = await import("./utils/initialFX");
        setClicked(true);
        timeoutId = setTimeout(() => {
          try {
            // Make main content visible BEFORE calling initialFX
            const mainElement = document.getElementsByTagName("main")[0];
            if (mainElement) {
              mainElement.style.opacity = "1";
              mainElement.style.visibility = "visible";
            }
            document.body.style.overflow = "auto";
            document.body.style.overflowY = "auto";
            
            if (module.initialFX) {
              module.initialFX();
            }
            setIsLoading(false);
          } catch (error) {
            console.error("Error in initialFX:", error);
            // Ensure main content is visible even if initialFX fails
            const mainElement = document.getElementsByTagName("main")[0];
            if (mainElement) {
              mainElement.style.opacity = "1";
              mainElement.style.visibility = "visible";
              mainElement.classList.add("main-active");
            }
            document.body.style.overflow = "auto";
            document.body.style.overflowY = "auto";
            setIsLoading(false);
          }
        }, 900);
      } catch (error) {
        console.error("Failed to load initialFX:", error);
        setClicked(true);
        timeoutId = setTimeout(() => {
          // Ensure main content is visible even if initialFX fails to load
          const mainElement = document.getElementsByTagName("main")[0];
          if (mainElement) {
            mainElement.style.opacity = "1";
            mainElement.style.visibility = "visible";
            mainElement.classList.add("main-active");
          }
          document.body.style.overflow = "auto";
          document.body.style.overflowY = "auto";
          setIsLoading(false);
        }, 900);
      }
    };

    loadInitialFX();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className={`loading-header ${clicked ? "hidden" : ""}`}>
        <a href="/#" className="loader-title" data-cursor="disable">
          SURAJIT
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className={`loading-screen ${clicked ? "hidden" : ""}`}>
        <div className="loading-marquee">
          <Marquee>
            <span> AI & ML Engineer</span> <span>Designer</span>
            <span> AI & ML Engineer</span> <span>Frontend Developer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Loading.displayName = "Loading";

export default Loading;
