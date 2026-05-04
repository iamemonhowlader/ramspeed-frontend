"use client";

import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { WeekDealCounter } from ".";

export default function WeekDeal({ title }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 41,
    seconds: 22,
  });

  const [leftQuantity, setLeftQuantity] = useState(1);
  const [rightQuantity, setRightQuantity] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  const handleQuantityChange = (side, change) => {
    if (side === "left") {
      const newQuantity = leftQuantity + change;
      if (newQuantity >= 1) {
        setLeftQuantity(newQuantity);
      }
    } else {
      const newQuantity = rightQuantity + change;
      if (newQuantity >= 1) {
        setRightQuantity(newQuantity);
      }
    }
  };
  let ProductlayoutItem = 1;

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-3xl font-black text-black mb-6 capitalize">
        {title}
      </h2>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Product Card - Air Buds */}
        <div className="lg:col-span-3">
          <Product ProductlayoutItem={ProductlayoutItem} />
        </div>

        {/* Middle Section - 50% OFF Deal */}
        <div className="lg:col-span-6">
          <WeekDealCounter />
        </div>

        {/* Right Product Card - Samsung Galaxy */}
        <div className="lg:col-span-3">
          <Product ProductlayoutItem={ProductlayoutItem} />
        </div>
      </div>
    </div>
  );
}
