import React from "react";
import { CiHeart } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";

function Card({ data }) {
  return (
    <NavLink to={`/description/${data.id}`} className="p-2">
      <div className="rounded-b-sm relative border border-gray-300 bg-white overflow-hidden flex flex-col h-full">
        <img
          src={data.image}
          alt="product"
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-200"
        />

        <div className="p-3 text-sm flex justify-between flex-grow">
          <div className="w-[90%]">
            <h3 className="font-semibold text-sm">Bewakoof®</h3>
            <p className="text-[#6a686b] text-xs">
              {data.description.substring(0, 30) + "..."}
            </p>
            <p className="flex items-center gap-1 mt-1 text-sm flex-wrap">
              <span className="font-bold">₹{data.price}</span>
              <span className="line-through text-[#afaeaf]">
                ₹{data.lastPrice}
              </span>
              <span className="text-[#00b852] font-semibold">
                {data.discount}
              </span>
            </p>
          </div>

          <CiHeart size={22} color="#afaeaf" />
        </div>

        {/* Rating Badge */}
        {data.ratings ? (
          <div className="absolute top-2 left-2 bg-white rounded-full flex items-center justify-center gap-1 px-2 py-1 text-xs font-semibold shadow">
            <AiFillStar color="#FFD232" size={14} />
            <span>{data.ratings}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </NavLink>
  );
}

export default Card;
