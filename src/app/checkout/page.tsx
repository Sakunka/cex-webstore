"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { fields } from "@/constants/fields";
import { useRouter } from "next/navigation";
import { sendOrder } from "@/lib/api/sendOrder";
import { RootState } from "@/lib/store";
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/Checkout/Form"));
const Items = dynamic(() => import("@/components/Checkout/Items"));

export default function Checkout() {
  const basket = useSelector((state: RootState) => state.checkout);
  const authState = useSelector((state: RootState) => state.auth);

  const [del, setDel] = useState<boolean>(false);
  const [info, setInfo] = useState<boolean>(false);

  const router = useRouter();

  const user = authState.user;

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      full_name: `${user?.firstName} ${user?.lastName}`,
      organization: user?.shippingInfo?.organization || "",
      contact_number: user?.shippingInfo?.contactNumber || "",
      address_1: user?.shippingInfo?.address1 || "",
      address2: user?.shippingInfo?.address2 || "",
      country: user?.shippingInfo?.country || "",
      town_city: user?.shippingInfo?.townCity || "",
      postcode: user?.shippingInfo?.postcode || "",
    },
  });

  const { total, items } = basket;

  function handleCheckout(data: any) {
    const basketItems = items.map((item: any) => ({
      name: item.itemId.name,
      id: item.itemId.id,
      type: item.itemId.type,
      price: item.itemId.price,
      image: item.itemId.image,
    }));

    const sendData = {
      data,
      basketItems,
    };

    sendOrder(sendData, router);
  }

  const watchedFields = watch(fields);

  const requiredFields = [
    watchedFields[0],
    watchedFields[1],
    watchedFields[2],
    watchedFields[3],
    watchedFields[4],
    watchedFields[5],
  ];

  const allRequiredFieldsFilled = requiredFields.every(
    (field) => field && field.trim() !== ""
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-4 md:mt-10 mb-10 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 pb-10 w-full lg:w-3/5">
        <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-md">
          <div
            onClick={() => setDel((prev) => !prev)}
            className="flex flex-row justify-between items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
              1. Delivery
            </h1>
            <div className="text-gray-600">
              {del ? <BsArrowUp size={20} /> : <BsArrowDown size={20} />}
            </div>
          </div>
          <AnimatePresence>
            {del ? (
              <div className="mt-4 md:mt-6">
                <Items items={items} />
              </div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-md">
          <div
            onClick={() => setInfo((prev) => !prev)}
            className="flex flex-row justify-between items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
              2. Complete your information
            </h3>
            <div className="text-gray-600 flex-shrink-0 ml-2">
              {info ? <BsArrowUp size={20} /> : <BsArrowDown size={20} />}
            </div>
          </div>

          <AnimatePresence>
            {info ? (
              <form
                id="checkout-form"
                className="space-y-3 md:space-y-4 mt-4 md:mt-6"
              >
                <Form register={register} />
              </form>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full lg:w-2/5 lg:sticky lg:top-4 lg:self-start">
        <OrderSummary
          items={items}
          total={total}
          handleCheckout={handleCheckout}
          allRequiredFieldsFilled={allRequiredFieldsFilled}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
