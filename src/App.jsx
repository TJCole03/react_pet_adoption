// import React from 'react'
// import ReactDOM from 'react-dom'
import { useState } from "react";
import { createRoot } from "react-dom/client"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import SearchParams from "./SearchParams";
import Details from './Details'

//creating client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, //asking browser how long they want me to cache things
      cacheTime: Infinity, //to cache for ten minutes 1000 * 60 * 10 
    }
  },
})

const App = () => {
  const adoptedPet = useState(null)
  return (
    <BrowserRouter>
      {/* provides context for useQuery */}
      <QueryClientProvider client={queryClient}> 
        <AdoptedPetContext.Provider value={adoptedPet}> 
          {/* we're passing the hook adoptedPet with the context; Provider is like wormhole. datatype does not matter; can be hook
          string, number etc. */}
          {/* makes adopted pet available to any consumer of adopted pet context inside of it
            Details and SearchParams have it available
          */}
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <h1>Adopt Me!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
          </Routes>
          </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

