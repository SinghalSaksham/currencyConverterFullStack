import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./SignIn";
import Register from "./Register";
import { useEffect, useState } from "react";
import Favourite from "./Favourite";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [favPageOpen, setFavPageOpen] = useState(false);

  // useEffect(() => {
  //   console.log("value", signedIn);
  // }, [signedIn]);

  return (
    <>
      <Navbar
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        setUser={setUser}
        setFavPageOpen={setFavPageOpen}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              signedIn={signedIn}
              user={user}
              favPageOpen={favPageOpen}
              setFavPageOpen={setFavPageOpen}
            />
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route
          path="/favourite"
          element={
            <Favourite user={user} setBase={setBase} setTarget={setTarget} />
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
