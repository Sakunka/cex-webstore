"use client";

import Image from "next/image";
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
      <div className="flex flex-col *:border-t-sky-200 my-14 gap-3">
        <p className="flex justify-center">Payment doable with: </p>
        <div className="flex flex-row gap-3 justify-center">
          <Image
            width={48}
            height={60}
            src="/footer/apple-pay.svg"
            alt="apple"
          />
          <Image width={48} height={60} src="/footer/amex.svg" alt="amex" />
          <Image width={48} height={60} src="/footer/visa.svg" alt="visa" />
          <Image
            width={48}
            height={60}
            src="/footer/mastercard.svg"
            alt="mastercard"
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-4 my-10 border-t-amber-300">
        <p className="px-10">
          © All site contents copyright 1999-2025, CeX Ltd. All trademarks
          acknowledged. E&OE.
        </p>
        <div className="flex flex-row gap-3 mb-5">
          <Image
            width={148}
            height={140}
            alt="apple"
            src="/footer/apple-store.svg"
          />
          <Image
            width={148}
            height={140}
            alt="google-play"
            src="/footer/google-play.svg"
          />
        </div>
      </div>
    </footer>
  );
}
