import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode> // turn off strict mode as marker and any route on the map cannot be displayed if it is on
	<App />
	// </React.StrictMode>
);
