import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaSnapchatGhost,
  FaApple,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">
        {/* Logo + Customer Service */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-yellow-400">BEWAKOOF®</h1>
          <div>
            <h2 className="font-semibold text-yellow-400 mb-2">
              CUSTOMER SERVICE
            </h2>
            <ul className="space-y-1 text-[#CCCCCC]">
              <li>Contact Us</li>
              <li>Track Order</li>
              <li>Return Order</li>
              <li>Cancel Order</li>
              <li className="flex items-center gap-2 mt-2">
                <img
                  src="https://images.bewakoof.com/web/15-days-return-icon-white.png"
                  alt=""
                  className="w-4 h-4"
                />
                15 Days Return Policy*
              </li>
              <li className="flex items-center gap-2">
                <img
                  src="https://images.bewakoof.com/web/cod-icon-white.png"
                  alt=""
                  className="w-4 h-4"
                />
                Cash On Delivery*
              </li>
            </ul>
          </div>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h2 className="font-semibold text-yellow-400">COMPANY</h2>
          <ul className="space-y-1 text-[#CCCCCC]">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>We are Hiring</li>
          </ul>

          <h2 className="mt-6 font-semibold text-yellow-400">
            DOWNLOAD THE APP
          </h2>
          <div className="flex gap-2">
            <img
              src="https://images.bewakoof.com/web/app_android_v1.png"
              alt="Google Play"
              className="w-28"
            />
            <img
              src="https://images.bewakoof.com/web/app_ios_v1.png"
              alt="App Store"
              className="w-28"
            />
          </div>
        </div>

        {/* Connect With Us */}
        <div className="space-y-4">
          <h2 className="font-semibold text-yellow-400">CONNECT WITH US</h2>
          <ul className="space-y-1 text-[#CCCCCC]">
            <li className="flex items-center gap-2">
              <FaFacebookF /> 4.7M People like this
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram /> 1M People like this
            </li>
          </ul>
          <div className="flex gap-3 text-xl mt-2 text-[#CCCCCC]">
            <FaTwitter />
            <FaPinterest />
            <FaSnapchatGhost />
            <FaApple />
          </div>

          <h2 className="mt-6 font-semibold text-yellow-400">
            100% SECURE PAYMENT
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <img
              src="https://images.bewakoof.com/web/google-pay-logo.png"
              className="h-6"
              alt="GPay"
            />
            <img
              src="https://images.bewakoof.com/web/paytm-payment-option.png"
              className="h-6"
              alt="Paytm"
            />
            <img
              src="https://images.bewakoof.com/web/phonepe-payment-option.png"
              className="h-6"
              alt="PhonePe"
            />
            <img
              src="https://images.bewakoof.com/web/visa-card-payment.png"
              className="h-6"
              alt="Visa"
            />
            <img
              src="https://images.bewakoof.com/web/rupay-card-payment.png"
              className="h-6"
              alt="Rupay"
            />
            <img
              src="https://images.bewakoof.com/web/master-card-payment.png"
              className="h-6"
              alt="Mastercard"
            />
          </div>
        </div>

        {/* Keep Up To Date */}
        <div className="space-y-4 w-full">
          <h2 className="font-semibold text-yellow-400">KEEP UP TO DATE</h2>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Enter Email Id:"
              className="px-3 py-2 w-full sm:w-auto border-b border-yellow-400 bg-transparent text-white placeholder-[#cccccc] focus:outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
