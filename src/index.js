

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const AppLayout = ()=>{
    return(
       <React.Fragment  >
         <App />
       </React.Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppLayout />);
