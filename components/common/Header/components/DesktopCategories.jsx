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
            className="min-[1024px]:flex min-[1024px]:basis-auto grow-[1] items-center w-full hidden"
            id="navbarSupportedContent"
        >
            <ul className="navbar-nav flex min-[1024px]:flex-row items-center relative z-[3]  max-[1200px]:mr-[-5px] max-[1024px]:m-[0]">
                <li className="nav-item dropdown relative group mr-[25px] max-[1400px]:mr-[20px] max-[1200px]:mr-[30px]">
                    <Link
                        className="nav-link dropdown-toggle text-[14px] font-semibold block text-[#000] z-[1] flex items-center relative py-6 px-[8px] transition duration-300 hover:text-primary"
                        href="/"
                    >
                        Home
                    </Link>
                </li>
                {Array.isArray(categories) && categories.slice(0, 7).map((category) => (
                    <li
                        key={category.id}
                        className="nav-item dropdown relative group mr-[25px] max-[1400px]:mr-[20px] max-[1200px]:mr-[30px]"
                    >
                        <Link
                            className="nav-link dropdown-toggle text-[14px] font-semibold block text-[#000] z-[1] flex items-center relative py-6 px-[8px] transition duration-300 hover:text-primary"
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