import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const CurrencyPairings = ({ setBase, setTarget, setFavPageOpen, pairs }) => {
  //   const [pairs, setPairs] = useState([]);

  //   const fetchPopularPairs = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_BASE_URL}/popular/`)
  //       .then((res) => setPairs(res.data))
  //       .catch((err) => console.log(err));
  //   };

  //   useEffect(() => {
  //     fetchPopularPairs();
  //   }, []);

  return (
    <div className="w-full h-auto bg-slate-100 mt-20 px-1 py-10 md:px-40 my-4 flex flex-col">
      <h3 className="text-center text-5xl font-semibold text-blue-700 cursor-default">
        Popular Currency Pairings
      </h3>
      <div className="flex flex-col md:flex-row px-4 py-10 flex-wrap justify-center items-center">
        {pairs.map((pair, i) => {
          return (
            <Card
              from={pair.from}
              to={pair.to}
              key={i}
              setBase={setBase}
              setTarget={setTarget}
              setFavPageOpen={setFavPageOpen}
            />
          );
        })}
        {/* <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div>
        <div className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl">
          <p>INR TO GBP</p>
          <p>{">"}</p>
        </div> */}
      </div>
    </div>
  );
};

export default CurrencyPairings;
