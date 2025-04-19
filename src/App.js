import { Route, Routes } from "react-router-dom";
import React, {useState, useEffect} from 'react';

import Navbar from "./Components/Navbar/navbar";
import Footer from "./Components/Footer/footer";
import Home from "./Components/home";
import User from "./Components/user";
import MoviePage from "./Components/moviepage";
import TvPage from "./Components/tvpage";
import Search from "./Components/search";
import Redir from "./Components/reload";

function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  }, [])

  if (isLoading) {
    return null;
  }

  return (
    <div className="App">

      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Geist:wght@100..900&display=swap" rel="stylesheet dns-prefetch preconnect"></link>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" exact="true" element={<Home />} />
          <Route path="/user" exact="true" element={<User />} />
          <Route name="moviepage" path="/movie" exact="true" element={<MoviePage />} />
          <Route name="tvpage" path="/tv" exact="true" element={<TvPage />} />
          <Route name="search" path="/search" exact="true" element={<Search />} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;
