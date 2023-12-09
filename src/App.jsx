// import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from "react-dom/client"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  return (
    <BrowserRouter>
      {/* provides context for useQuery */}
      <QueryClientProvider client={queryClient}> 
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <h1>Adopt Me!</h1>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

