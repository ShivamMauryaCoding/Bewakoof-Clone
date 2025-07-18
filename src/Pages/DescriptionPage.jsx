import React, { useEffect, useState } from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import axios from "axios";

function DescriptionPage() {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/Product/${id}`)
      .then((res) => {
        setData(res.data);
        setMainImage(res.data.image); // default image
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!Data) return <h2 className="pt-32 text-center">Loading product...</h2>;

  const { description, image, price, lastPrice, discount, listImage } = Data;

  const handleCart = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/cart`);
      const cardData = data.find((el) => el.id == id);

      if (!cardData) {
        await axios.post(`http://localhost:3000/cart`, {
          ...Data,
          quantity: 1,
        });
        alert("Product added to cart successfully");
      } else {
        alert("Product already in cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="flex flex-col lg:flex-row w-full lg:w-[80%] m-auto pt-28 gap-6">
        {/* Left Side */}
        <div className="w-full lg:w-[50%] flex flex-col sm:flex-row justify-around gap-4">
          {/* Thumbnail Images */}
          <div className="w-full sm:w-[25%] flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-wrap sm:flex-nowrap">
            {listImage?.map((el, index) => (
              <img
                key={index}
                src={el}
                alt=""
                width="50%"
                className="cursor-pointer border border-transparent hover:border-black transition-all"
                onClick={() => setMainImage(el)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[68%] flex justify-center">
            <img src={mainImage} alt="" width="68%" />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[50%] pl-2">
          <p className="font-semibold">Bewakoof®</p>
          <p className="text-xs font-normal text-[#181717] mb-3">
            {description}
          </p>

          <p className="flex gap-2 items-center flex-wrap">
            <span className="font-semibold text-xl">₹{price}</span>
            {lastPrice && (
              <span className="line-through text-[#9D9D9D]">₹{lastPrice}</span>
            )}
            {discount && (
              <span className="text-[#008C2D] font-medium">{discount}</span>
            )}
          </p>

          <p className="text-sm text-[#9D9D9D]">inclusive of all taxes</p>

          <div
            className="flex text-[#1C6C9E] mt-2 w-full items-center rounded px-2 py-1"
            style={{
              background:
                "linear-gradient(90deg, rgb(185, 228, 255) 0%, rgba(185, 228, 255, 0) 60%)",
            }}
          >
            <img
              src="https://images.bewakoof.com/web/icon-cart-blue.svg"
              alt=""
              className="mr-2"
            />
            <p className="mb-1.5 font-semibold text-sm">
              120 people bought this in the last 7 days
            </p>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <div className="bg-[#5CD190]">
              <span className="text-white p-1 font-semibold text-xs">
                BUY 3 FOR 999
              </span>
            </div>
            <div className="bg-[#909090]">
              <span className="text-white p-1 font-semibold text-xs">
                BOYFRIEND FIT
              </span>
            </div>
            <div className="px-2" style={{ border: "1px solid #8F8F8F" }}>
              <span className="text-[#8F8F8F] font-semibold text-xs">
                100% COTTON
              </span>
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-5 mb-3">
            <h1 className="font-semibold">Colour Options : CARAMEL</h1>
            <div className="flex gap-2 mt-2">
              <div className="w-[50px] h-[50px] rounded-full bg-amber-700 border"></div>
              <div className="w-[50px] h-[50px] rounded-full bg-[#FCFCFC] border"></div>
            </div>
          </div>

          <hr className="text-[#F5F5F5] w-[85%]" />

          {/* Size Selection */}
          <div className="mt-5 mb-10">
            <h1 className="text-xl mb-2 font-semibold">Select Size</h1>
            <div className="flex gap-2 flex-wrap">
              {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                <p
                  key={size}
                  className="border px-4 py-2 rounded-md cursor-pointer hover:border-black"
                >
                  {size}
                </p>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-[100%] flex flex-col sm:flex-row gap-2 ">
            <div className="w-[100%]" onClick={handleCart}>
              <div className="flex items-center w-full sm:w-[60%] justify-center gap-2 h-[48px] rounded-lg bg-[#FFD232]">
                <MdOutlineShoppingBag size={26} />
                <h1 className="font-semibold text-l text-[#292D35]">
                  ADD TO BAG
                </h1>
              </div>
            </div>

            <div
              className="flex items-center w-[100%] gap-2 justify-center sm:w-[25%] rounded-lg"
              style={{ border: "1px solid #F5F5F5" }}
            >
              <CiHeart size={26} />
              <h1 className="font-semibold text-l text-[#949494]">WISHLIST</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionPage;
