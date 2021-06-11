import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import loadingImage from "./assets/loading.gif";

const App = lazy(() => import("./App"));

const loadingOverlay = {
  width: "100px",
  height: "100px",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#610000",
};

const loadingImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="loading-overlay" style={loadingOverlay}>
          <img src={loadingImage} alt="Spin" style={loadingImageStyle} />
        </div>
      }
    >
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
