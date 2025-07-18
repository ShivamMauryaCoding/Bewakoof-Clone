import React, { useEffect, useRef, useState } from "react";
import {
  heroSliderImg,
  HomeCategoryWomenImg,
  HomeManCategoryImg,
} from "../Data/HomePageData";
import CardList from "../components/CardList";

const NavList = [
  "MEN",
  "WOMEN",
  "SHOP NOW",
  "LIVE NOW",
  "PLUS SIZE",
  "ACCESSORIES",
  "OFFICIAL MERCH",
  "SNEAKERS",
  "BEWAKOOF AIR",
  "HEAVY DUTY",
  "CUSTOMIZATION",
  "WINTERWEAR",
];

// ✅ Hero Slider Component — 3 Images at a Time
const HeroSlider = () => {
  const visibleSlides = 3;
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev + visibleSlides >= heroSliderImg.length ? 0 : prev + visibleSlides
    );
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="w-full overflow-x-hidden pt-[100px] relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${(heroSliderImg.length / visibleSlides) * 100}%`,
          transform: `translateX(-${(current / heroSliderImg.length) * 100}%)`,
        }}
      >
        {heroSliderImg.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex gap-2"
            style={{ width: "681px" }}
          >
            <img
              src={img}
              alt={`slide-${idx}`}
              className="w-[681px] max-w-full h-auto object-cover mx-auto"
            />
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({
          length: Math.ceil(heroSliderImg.length / visibleSlides),
        }).map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx * visibleSlides === current ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ✅ Home Page
function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Navbar */}
      <div className="w-full fixed top-0 z-40 bg-white">
        <hr className="text-[#d3d3d3]" />
        <nav className="font-medium text-sm sm:text-base flex flex-wrap justify-start sm:justify-center gap-4 mt-3 mb-6 px-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          {NavList.map((el, idx) => (
            <p key={idx} className="shrink-0 cursor-pointer">
              {el}
            </p>
          ))}
        </nav>
      </div>

      {/* Hero Slider */}
      <HeroSlider />

      {/* Coupon Banner */}
      <div className="Homecupon mt-8 mb-5 px-2">
        <img
          src="https://images.bewakoof.com/uploads/grid/app/Desktop-coupon-thin-strip-1747924789.jpg"
          className="w-full"
          alt=""
        />
      </div>

      {/* New Arrivals */}
      <CardList title={"New Arrivals"} />
      <div className="text-center mt-7 mb-7 text-sm font-semibold text-[#42A2AA]">
        <h3>Explore All</h3>
      </div>

      {/* Men Category */}
      <div>
        <h2 className="text-center text-lg font-medium mb-2">
          Shop by Category - Men
        </h2>
        <div className="w-full flex flex-wrap justify-center ">
          {HomeManCategoryImg.slice(0, 12).map((el, idx) => (
            <img
              key={idx}
              src={el}
              alt=""
              className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%] mb-3"
            />
          ))}
        </div>
        <div className="w-full flex flex-wrap justify-center ">
          {HomeManCategoryImg.slice(13, 17).map((el, idx) => (
            <img
              key={idx}
              src={el}
              alt=""
              className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%]"
            />
          ))}
          <div className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%] h-[100px] bg-[#E9E9E9] font-semibold flex justify-center items-center text-xl sm:text-2xl">
            <h1>View All</h1>
          </div>
        </div>
      </div>

      {/* Women Category */}
      <div className="mt-10">
        <h2 className="text-center font-medium text-lg sm:text-xl mb-3">
          Shop by Category - Women
        </h2>
        <div className="w-full flex flex-wrap justify-center">
          {HomeCategoryWomenImg.slice(0, 12).map((el, idx) => (
            <img
              key={idx}
              src={el}
              alt=""
              className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%] mb-3"
            />
          ))}
        </div>
        <div className="w-full flex flex-wrap justify-center ">
          {HomeCategoryWomenImg.slice(13, 16).map((el, idx) => (
            <img
              key={idx}
              src={el}
              alt=""
              className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%]"
            />
          ))}
          <div className="w-[48%] sm:w-[30%] md:w-[23%] lg:w-[16.6%] h-[100px] bg-[#E9E9E9] font-semibold flex justify-center items-center text-xl sm:text-2xl">
            <h1>View All</h1>
          </div>
        </div>
      </div>

      {/* More Cards */}
      <CardList title={"Buy 2 Oversized T-shirts at Rs.999"} />
      <div className="text-center mt-7 mb-7 text-sm font-semibold text-[#42A2AA]">
        <h3>Explore All</h3>
      </div>
      <CardList title={"Denim Verse"} />
      <div className="text-center mt-7 mb-7 text-sm font-semibold text-[#42A2AA]">
        <h3>Explore All</h3>
      </div>
    </div>
  );
}

export default HomePage;
