"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useCategoryStore from "@/store/categoryStore";
import { useEffect } from "react";
import Link from "next/link";

// Mapping of names to icons if needed, or fallback icon
const getIcon = (name) => {
  // Generic icon for fallback
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4.79199C13.4128 4.79199 4.79999 13.4048 4.79999 23.992V34.408C4.79999 36.536 5.63199 38.552 7.11999 40.056L9.32799 42.28L12.528 43.208H12.576C15.216 43.208 17.376 41.048 17.376 38.408V28.968C17.376 26.328 15.216 24.168 12.576 24.168H12.528L9.32799 25.112L7.99999 26.4464V23.992C7.99999 15.1696 15.1776 7.99199 24 7.99199C32.8224 7.99199 40 15.1696 40 23.992V26.4448L38.672 25.112L35.472 24.168H35.424C32.784 24.168 30.624 26.328 30.624 28.968V38.408C30.624 41.048 32.784 43.208 35.424 43.208H35.472L38.672 42.28L40.88 40.056C42.368 38.552 43.2 36.536 43.2 34.408V23.992C43.2 13.4048 34.5872 4.79199 24 4.79199Z" fill="#0068C8"/>
    </svg>
  );
};

export default function HeaderCategories() {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="container mx-auto px-4 lg:px-0 py-8 sm:pb-8">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {categories.map((cat, index) => (
            <CarouselItem
              key={cat.id || index}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/6"
            >
              <Link href={`/shop-now?category=${cat.id}`}>
                <div className="p-1">
                  <div className="p-2 lg:p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-center cursor-pointer border border-gray-200 hover:border-primary transition duration-300 focus:border-primary bg-white h-full">
                    <span className="scale-60 max-h-4 md:scale-70 md:max-h-12">
                      {getIcon(cat.name)}
                    </span>
                    <h2 className="text-[#454f5b] text-xs sm:text-base font-bold capitalize">
                      {cat.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
