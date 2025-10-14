"use client";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Items from "@/components/Checkout/Items";
import Form from "@/components/Checkout/Form";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { fields } from "@/constants/fields";
import { useRouter } from "next/navigation";
import { sendOrder } from "@/lib/api/sendOrder";
import { RootState } from "@/lib/store";

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
    <div className="flex flex-row mt-10 mb-10">
      <div className="flex flex-col gap-10 pb-10 w-3/5">
        <div className="max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <div
            onClick={() => setDel((prev) => !prev)}
            className="flex flex-row justify-between"
          >
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              1. Delivery
            </h1>
            {del ? <BsArrowUp /> : <BsArrowDown />}
          </div>
          <AnimatePresence>
            {del ? <Items items={items} /> : null}
          </AnimatePresence>
        </div>
        <div className="max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <div
            onClick={() => setInfo((prev) => !prev)}
            className="flex flex-row justify-between"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              2. Complete your information below
            </h3>
            {info ? <BsArrowUp /> : <BsArrowDown />}
          </div>

          <AnimatePresence>
            {info ? (
              <form id="checkout-form" className="space-y-4">
                <Form register={register} />
              </form>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      <OrderSummary
        items={items}
        total={total}
        handleCheckout={handleCheckout}
        allRequiredFieldsFilled={allRequiredFieldsFilled}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
