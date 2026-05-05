"use client";

import Link from "next/link";
import useCategoryStore from "@/store/categoryStore";
import { useEffect } from "react";

const DesktopCategories = () => {
    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        console.log("Fetching categories...");
        fetchCategories();
    }, [fetchCategories]);

    console.log("Current categories in store:", categories);

    return (
        <div
            className="flex basis-auto grow-[1] items-center justify-center w-full overflow-hidden"
            id="navbarSupportedContent"
        >
            <ul className="navbar-nav flex flex-nowrap lg:flex-wrap justify-start lg:justify-center items-center relative z-[3] w-full gap-x-4 lg:gap-x-6 xl:gap-x-8 gap-y-2 py-2 overflow-x-auto hide-scrollbar px-2 lg:px-0">
                <li className="nav-item dropdown relative group shrink-0">
                    <Link
                        className="nav-link dropdown-toggle text-[13px] xl:text-[14px] font-semibold text-[#000] z-[1] flex items-center relative py-2 xl:py-4 transition duration-300 hover:text-primary whitespace-nowrap uppercase"
                        href="/"
                    >
                        Home
                    </Link>
                </li>
                {Array.isArray(categories) && categories.slice(0, 7).map((category) => (
                    <li
                        key={category.id}
                        className="nav-item dropdown relative group shrink-0"
                    >
                        <Link
                            className="nav-link dropdown-toggle text-[13px] xl:text-[14px] font-semibold text-[#000] z-[1] flex items-center relative py-2 xl:py-4 transition duration-300 hover:text-primary whitespace-nowrap uppercase"
                            href={`/shop-now?category=${category.id}`}
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DesktopCategories;