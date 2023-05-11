import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Favourite = ({ user, setBase, setTarget, setFavPageOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favourite, setFavourite] = useState([]);

  const getFavourites = async () => {
    setIsLoading(true);
    if (user?.id == null) {
      setIsLoading(false);
      return;
    }
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/favourite/${user?.id}`)
      .then((res) => setFavourite(res.data))
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      <div className="h-screen w-full relative">
        {/* <Navbar /> */}
        <img
          src="Assets/dashboard.jpg"
          alt="background image"
          className="h-2/3 w-full object-cover sm:block"
        />
        <div className="absolute top-0 left-0 w-full z-10  flex-col flex items-end justify-center container1 pt-4">
          <div className="w-full h-full bg-[#ffffffc6] drop-shadow-2xl shadow-slate-950 flex flex-col justify-center items-center topField rounded-xl md:space-y-10">
            <div className="w-full h-auto mt-20 px-1  md:px-40 my-1 flex flex-col items-center">
              <p
                className="text-end w-full cursor-pointer text-lg hover:font-bold"
                onClick={() => setFavPageOpen(false)}
              >
                Back
              </p>
              <h3 className="text-center text-5xl font-semibold text-blue-700 cursor-default mb-8">
                Favourites
              </h3>
              {favourite.length == 0 && <p>No Favourites Added....</p>}
              {favourite.map((item, i) => {
                // console.log(item.from, item.to);
                return (
                  <Card
                    from={item.from}
                    to={item.to}
                    key={i}
                    setBase={setBase}
                    setTarget={setTarget}
                    setFavPageOpen={setFavPageOpen}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black bg-opacity-30 text-white z-50">
          <CircularProgress
            color="inherit"
            size="7rem"
            className="self-center"
          />
        </div>
      ) : null}
    </>
  );
};

export default Favourite;
