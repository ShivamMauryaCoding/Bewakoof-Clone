import React from "react";
import Card from "./Card";
import { NewArrivalsData } from "../Data/CardData";

function CardList({ title }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage:
          "url(https://images.bewakoof.com/uploads/grid/app/tech-product-scroll-blue--4--1749730820.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "12px 0px",
      }}
      className="font-medium h-fit"
    >
      <h4 className="mt-2 text-center mb-6 text-lg sm:text-xl md:text-2xl">
        {title}
      </h4>

      <div className="flex flex-wrap justify-center">
        {NewArrivalsData.map((el, index) => (
          <Card key={index} data={el} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
