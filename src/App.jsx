// import React from 'react'
// import ReactDOM from 'react-dom'
import { useState, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
// import SearchParams from "./SearchParams";
// import Details from './Details'

const Details = lazy(() => import('./Details'))
/*

  Import is a built in function by JavaScript; works like require used to for common JS; 
  saying "if something tries to render details, panic and load details."

*/
const SearchParams = lazy(() => import('./SearchParams'))

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
    //tailwind is adding utility classes for all the CSS you want to write
    <div className="p-0 m-0" //p = padding, m = margin
         style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperC.jpg)",
      }}
    >
    <BrowserRouter>
      {/* provides context for useQuery */}
      <QueryClientProvider client={queryClient}> 
        <Suspense fallback={<div className="loading-pane"><h2 className="loader">Dog</h2></div>}>
          <AdoptedPetContext.Provider value={adoptedPet}> 
          {/* we're passing the hook adoptedPet with the context; Provider is like wormhole. datatype does not matter; can be hook
          string, number etc. */}
          {/* makes adopted pet available to any consumer of adopted pet context inside of it
            Details and SearchParams have it available
          */}
        <header className="w-full mb-10 bg-gradient-to-b from from-green-400 via-blue-500 to-green-200 p-7 text-center" >
              <Link className="text-6xl text-white hover:text-gray-200" to="/">Adopt Me!</Link> 
        </header>
        <h1>Adopt Me!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
          </Routes>
          </AdoptedPetContext.Provider>
        </Suspense>
      </QueryClientProvider>
      </BrowserRouter>
    </div>  
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

