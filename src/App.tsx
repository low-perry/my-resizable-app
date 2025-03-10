import { useState, useRef, useEffect } from "react";

function App() {
  const [leftWidth, setLeftWidth] = useState(70); // Initial width in percentage
  const [topHeight, setTopHeight] = useState(33); // Initial height in percentage for the top container
  const [middleHeight, setMiddleHeight] = useState(33); // Initial height in percentage for the middle container
  const [rightTopHeight, setRightTopHeight] = useState(50); // Initial height in percentage for the top section of the right panel
  const isResizing = useRef(false);
  const resizeDirection = useRef<"horizontal" | "vertical" | null>(null);
  const resizeTarget = useRef<string | null>(null);

  const handleMouseDown = (direction: "horizontal" | "vertical", target: string) => {
    isResizing.current = true;
    resizeDirection.current = direction;
    resizeTarget.current = target;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;

    if (resizeDirection.current === "horizontal") {
      const newWidth = (event.clientX / window.innerWidth) * 100;
      setLeftWidth(Math.max(10, Math.min(newWidth, 90))); // Restrict width between 10% and 90%
    } else if (resizeDirection.current === "vertical") {
      const newHeight = (event.clientY / window.innerHeight) * 100;
      const remainingHeight = 100 - newHeight;
      if (resizeTarget.current === "top-resizer") {
        setTopHeight(Math.max(10, Math.min(newHeight, 90))); // Restrict height between 10% and 90%
        setMiddleHeight(remainingHeight - 33); // Adjust middle container height
      } else if (resizeTarget.current === "middle-resizer") {
        setMiddleHeight(Math.max(10, Math.min(newHeight, 90))); // Restrict height between 10% and 90%
        setTopHeight(remainingHeight - 33); // Adjust top container height
      } else if (resizeTarget.current === "right-top-resizer") {
        setRightTopHeight(Math.max(10, Math.min(newHeight, 90))); // Restrict height between 10% and 90%
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    resizeDirection.current = null;
    resizeTarget.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Left Panel */}
      <div style={{ width: `${leftWidth}%`, display: "flex", flexDirection: "column", background: "lightgray" }}>
        <div style={{ height: `${topHeight}%`, background: "red" }}>Dario</div>
        <div
          id="top-resizer"
          style={{
            height: "5px",
            cursor: "ns-resize",
            background: "black",
            zIndex: 1
          }}
          onMouseDown={() => handleMouseDown("vertical", "top-resizer")}
        ></div>
        <div style={{ height: `${middleHeight}%`, background: "green" }}></div>
        <div
          id="middle-resizer"
          style={{
            height: "5px",
            cursor: "ns-resize",
            background: "black",
            zIndex: 1
          }}
          onMouseDown={() => handleMouseDown("vertical", "middle-resizer")}
        ></div>
        <div style={{ flex: 1, background: "yellow" }}></div>
      </div>

      {/* Resizer */}
      <div
        style={{
          width: "5px",
          cursor: "ew-resize",
          background: "black",
          zIndex: 1
        }}
        onMouseDown={() => handleMouseDown("horizontal", "left-resizer")}
      ></div>

      {/* Right Panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "lightblue" }}>
        <div style={{ height: `${rightTopHeight}%`, background: "lightcoral" }}></div>
        <div
          id="right-top-resizer"
          style={{
            height: "5px",
            cursor: "ns-resize",
            background: "black",
            zIndex: 1
          }}
          onMouseDown={() => handleMouseDown("vertical", "right-top-resizer")}
        ></div>
        <div style={{ flex: 1, background: "lightgreen" }}></div>
      </div>
    </div>
  );
}

export default App;