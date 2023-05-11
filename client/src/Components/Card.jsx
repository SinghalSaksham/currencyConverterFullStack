import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ from, to, setBase, setTarget, setFavPageOpen }) => {
  const handleClick = () => {
    setBase(from);
    setTarget(to);

    setFavPageOpen(false);
  };

  return (
    <Link
      className="w-full md:w-1/4 bg-white rounded-md p-5 flex justify-between cursor-pointer shadow-xl mr-0 md:mr-5 my-5 hover:shadow-2xl"
      onClick={handleClick}
    >
      <p>{`${from} TO ${to}`}</p>
      <p>{">"}</p>
    </Link>
  );
};

export default Card;
