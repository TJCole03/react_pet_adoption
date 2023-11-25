// import React from 'react'
// import ReactDOM from 'react-dom'
import {createRoot} from "react-dom/client"
// import Pet from './Pet'
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
      {/* <Pet name="Charmeleon" animal="Flame Lizard" breed="Fire" />
      <Pet name="Big Hawk" animal="Chicken" breed="Aggressive" />
      <Pet name="Strapped Panda" animal="Endangered" breed="Once per year" /> */}
    </div>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

