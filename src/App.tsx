import { useState, useRef, useEffect } from "react";

function App() {
  const [leftWidth, setLeftWidth] = useState(70); // Initial width in percentage
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = (event.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.max(10, Math.min(newWidth, 90))); // Restrict width between 10% and 90%
  };

  const handleMouseUp = () => {
    isResizing.current = false;
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
        <div style={{ flex: 1, background: "red" }}>Dario</div>
        <div style={{ flex: 1, background: "green" }}></div>
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
        onMouseDown={handleMouseDown}
      ></div>

      {/* Right Panel */}
      <div style={{ flex: 1, background: "lightblue" }}></div>
    </div>
  );
}

export default App;