"use client";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="grid grid-cols-2 md:grid-cols-4 w-6/7 gap-20 justify-between mx-auto pt-12">
        <div>
          <ul className="flex flex-col gap-2">
            <li className="font-bold">About us</li>
            <li>Sell an Item</li>
            <li>Careers</li>
            <li>Franchising</li>
            <li>CeX Blog</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li>Support</li>
            <li>Find a store</li>
            <li>Repairs</li>
            <li>Contact us</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <li>Legal</li>
            <li>Terms and Conditions</li>
            <li>Cookies Policy</li>
            <li>Privacy Policy</li>
            <li>Manage Cookies</li>
          </ul>
        </div>
        <ul className="flex flex-row gap-3">
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaFacebook />
          </li>
          <li>
            <FaYoutube />
          </li>
          <li>
            <RiTwitterXLine />
          </li>
        </ul>
      </div>
      <div className="flex flex-col *:border-t-sky-200 py-8 gap-3">
        <p className="flex justify-center">Payment doable with: </p>
        <div className="flex flex-row gap-3 justify-center">
          <img
            width={48}
            src="https://uk.webuy.com/footer-payment-logos/apple-pay.svg"
            alt="apple"
          ></img>
          <img
            width={48}
            src="	https://uk.webuy.com/footer-payment-logos/amex.svg"
            alt="amex"
          ></img>
          <img
            width={48}
            src="https://uk.webuy.com/footer-payment-logos/visa.svg"
            alt="visa"
          ></img>
          <img
            width={48}
            src="https://uk.webuy.com/footer-payment-logos/mastercard.svg"
            alt="mastercard"
          ></img>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-4 mb-10 border-t-amber-300">
        <p>
          © All site contents copyright 1999-2025, CeX Ltd. All trademarks
          acknowledged. E&OE.
        </p>
        <div className="flex flex-row gap-3">
          <img src="https://uk.webuy.com/img/mobile-app-buttons/apple-store.svg" />
          <img src="https://uk.webuy.com/img/mobile-app-buttons/google-play.svg" />
        </div>
      </div>
    </footer>
  );
}
