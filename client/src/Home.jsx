import React, { useState, useEffect } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Navbar from "./Components/Navbar";
import axios from "axios";
import currencySymbolMap from "currency-symbol-map";
import { CircularProgress } from "@material-ui/core";
import Favourite from "./Favourite";
import CurrencyPairings from "./Components/CurrencyPairings";
import { useLocation } from "react-router-dom";

const Home = ({ signedIn, user, favPageOpen, setFavPageOpen }) => {
  const [favourite, setFavourite] = useState(false);
  const [data, setData] = useState({});
  const [names, setNames] = useState({});
  const [base, setBase] = useState("");
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [showConversion, setShowConversion] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(0);
  const [amountField, setAmountField] = useState("");
  const [baseField, setBaseField] = useState("");
  const [targetField, setTargetField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [favPageOpen, setFavPageOpen] = useState(false);
  const [pairs, setPairs] = useState([]);

  // const flags = {};
  const location = useLocation();

  const regex = /^[0-9]+(\.[0-9]+)?$/;

  const fetchPopularPairs = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/popular/`)
      .then((res) => setPairs(res.data))
      .catch((err) => console.log(err));
  };

  const markFavourite = async () => {
    setIsLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/favourite/`, {
        userId: user.id,
        from: base,
        to: target,
      })
      .then((res) => setFavourite(true))
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  const isFavourite = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/favourite/isMarked`, {
        userId: user?.id,
        from: base,
        to: target,
      })
      .then((res) => {
        if (res.data == null) setFavourite(false);
        else setFavourite(true);
      })
      .catch((error) => console.log(error));
  };

  const unMarkFavourite = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/favourite/unMark`, {
        userId: user.id,
        from: base,
        to: target,
      })
      .then((res) => {
        setFavourite(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchCurrencies = async () => {
    await axios
      .get(
        "https://openexchangerates.org/api/latest.json?app_id=" +
          process.env.REACT_APP_OPENEXCHANGE_API_KEY
      )
      .then((resp) => {
        setData(resp.data.rates);
      })
      .catch((error) => console.log(error));

    // console.log(flags);
  };

  const fetchCurrencyNames = async () => {
    await axios
      .get("https://openexchangerates.org/api/currencies.json")
      .then((resp) => {
        // console.log(resp.data);
        setNames(resp.data);
      })
      .catch((error) => console.log(error));

    // console.log(flags);
  };

  useEffect(() => {
    // console.log("hello", process.env.REACT_APP_OPENEXCHANGE_API_KEY);
    fetchCurrencies();
    fetchCurrencyNames();

    // console.log("signedINNNNNN", signedIn);
  }, []);

  useEffect(() => {
    fetchPopularPairs();
  }, [base, target]);

  useEffect(() => {
    isFavourite();
  }, [base, target]);

  const handleFromInput = (event) => {
    console.log(event.target.value);

    setBase(event.target.value);
  };

  const handleToInput = (event) => {
    console.log(event.target.value);

    setTarget(event.target.value);
  };

  const handleSwap = () => {
    let temp = base;
    setBase(target);
    setTarget(temp);
  };

  const handleInput = (event) => {
    setAmount(event.target.value);
    if (regex.test(event.target.value)) {
      setIsValidAmount(true);
    } else setIsValidAmount(false);
  };

  const handleConvert = async () => {
    setIsLoading(true);
    if (
      base.length == 0 ||
      target.length == 0 ||
      amount.length == 0 ||
      base === target
    ) {
      setError(true);
      setIsLoading(false);
      return;
    }

    setError(false);
    console.log("data target", data[target]);
    console.log("data base", data[base]);
    console.log("init", data[target] / data[base]);
    console.log("final", (data[target] / data[base]) * amount);

    const res = (data[target] / data[base]) * amount;
    // (parseFloat(data[target]) / parseFloat(data[base])) * parseFloat(amount);

    await axios.post(`${process.env.REACT_APP_BASE_URL}/popular/`, {
      from: base,
      to: target,
    });

    fetchPopularPairs();
    setAmountField(amount);
    setBaseField(base);
    setTargetField(target);
    setResult(res);
    setShowConversion(true);
    setIsLoading(false);
  };

  return (
    <>
      {/* <Favourite /> */}
      {!favPageOpen ? (
        <div className="h-screen w-full relative">
          {/* <Navbar /> */}
          <img
            src="Assets/dashboard.jpg"
            alt="background image"
            className="h-2/3 w-full object-cover sm:block"
          />
          <div className="absolute top-0 left-0 w-full z-10  flex-col flex items-end justify-center container1 pt-36">
            <div className="w-full h-full bg-[#ffffffc6] drop-shadow-2xl shadow-slate-950 flex flex-col justify-center items-center topField rounded-xl md:space-y-10">
              {signedIn ? (
                <div className="flex justify-end items-center w-full">
                  <p
                    className="cursor-pointer"
                    onClick={() => setFavPageOpen(true)}
                  >
                    See Favourites
                  </p>
                  {favourite ? (
                    <img
                      src="Assets/favourite.png"
                      title="Added to Favourite"
                      className="cursor-pointer w-10"
                      onClick={unMarkFavourite}
                    />
                  ) : (
                    <img
                      src="Assets/unfavourite.png"
                      title="Add to Favourite"
                      className="cursor-pointer w-10"
                      onClick={markFavourite}
                    />
                  )}
                </div>
              ) : null}
              <div className="converterBox justify-around w-full md:space-x-5 space-y-3 md:space-y-0">
                <div className="converterBox1 flex flex-col justify-between space-y-4">
                  <p className="text-xl font-semibold cursor-default">Amount</p>
                  <div className="flex inputField items-center space-x-1">
                    {base.length > 0 && (
                      <span className="text-xl">{currencySymbolMap(base)}</span>
                    )}
                    {/* <div className="flex flex-col w-full justify-end"> */}
                    <input
                      type="text"
                      className="outline-none p-2 rounded-md focus:border-blue-600 focus:border border-slate-400 border w-full"
                      style={{
                        borderColor: !isValidAmount
                          ? "red"
                          : "rgb(148 163 184 )",
                      }}
                      value={amount}
                      onChange={handleInput}
                    />

                    {/* </div> */}
                  </div>
                </div>
                <div className="converterBox1 flex flex-col justify-between space-y-4">
                  <p className="text-xl font-semibold cursor-default">From</p>
                  <select
                    onChange={handleFromInput}
                    className="outline-none p-2 rounded-md focus:border-blue-600 focus:border border-slate-400 border inputField"
                    value={base}
                  >
                    <option value="">Select Currency</option>
                    {Object.keys(data).map((country) => {
                      return <option value={country}>{country}</option>;
                    })}
                  </select>
                  {/* <input
                  type="text"
                  className="outline-none p-2 rounded-md focus:border-blue-600 focus:border border-slate-400 border inputField"
                /> */}
                </div>
                <div className="flex items-center mt-10 cursor-pointer">
                  <SwapHorizIcon
                    className="text-cyan-600 iconProp"
                    onClick={handleSwap}
                  />
                </div>

                <div className="converterBox1 flex flex-col justify-between space-y-4">
                  <p className="text-xl font-semibold cursor-default">To</p>
                  <select
                    onChange={handleToInput}
                    className="outline-none p-2 rounded-md focus:border-blue-600 focus:border border-slate-400 border inputField"
                    value={target}
                  >
                    <option value="">Select Currency</option>
                    {Object.keys(data).map((country) => {
                      return <option value={country}>{country}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="flex md:items-start md:justify-start justify-center items-center w-full">
                {!isValidAmount && (
                  <p className="text-red-600 text-xs">
                    Please Enter a Valid Amount
                  </p>
                )}
                {error && (
                  <p className="text-red-600 text-xs">
                    Please Fill All Fields Appropriately
                  </p>
                )}
              </div>
              <div className="bottomBox flex justify-between w-full items-start">
                <div className="w-3/5">
                  {showConversion && (
                    <div className="flex flex-col resultBox">
                      <p className="text-lg font-bold text-slate-700 my-3 cursor-default">
                        {`${amountField} ${names[baseField]} = `}
                      </p>
                      <p className="text-3xl font-semibold my-2 text-center cursor-default">
                        {`${result.toFixed(6)} ${names[targetField]}`}{" "}
                      </p>
                      <div className="flex conversionRate space-x-5">
                        <div className="flex justify-between space-x-1">
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {`1 ${baseField}`}
                          </p>
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {" "}
                            ={" "}
                          </p>
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {`${(data[targetField] / data[baseField]).toFixed(
                              6
                            )} ${targetField}`}
                          </p>
                        </div>
                        <div className="flex justify-between space-x-1">
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {`1 ${targetField}`}
                          </p>
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {" "}
                            ={" "}
                          </p>
                          <p className="text-base text-gray-500 font-normal cursor-default">
                            {`${(data[baseField] / data[targetField]).toFixed(
                              6
                            )} ${baseField}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 focus:bg-blue-800 font-semibold"
                  onClick={handleConvert}
                >
                  Convert
                </button>
              </div>
            </div>
            <CurrencyPairings
              setBase={setBase}
              setTarget={setTarget}
              setFavPageOpen={setFavPageOpen}
              pairs={pairs}
            />
          </div>
        </div>
      ) : (
        <Favourite
          user={user}
          setTarget={setTarget}
          setBase={setBase}
          setFavPageOpen={setFavPageOpen}
        />
      )}
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

export default Home;
