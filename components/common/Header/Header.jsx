"use client";

import { navigation } from "@/utils/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCall, IoMdClose } from "react-icons/io";
import { IoCartOutline, IoPerson } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import "react-multi-carousel/lib/styles.css";
import HeaderTop from "./HeaderTop";
import AccountDropdown from "./components/AccountDropdown";
import DesktopCategories from "./components/DesktopCategories";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { items, getTotalItems, getSubtotal, clearCart } = useCartStore();
  
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCartCount(getTotalItems());
      setCartTotal(getSubtotal());
    }
  }, [items, mounted, getTotalItems, getSubtotal]);

  const checkoutRedirect = () => {
    router.push("/checkout");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState({});
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const atTopRef = useRef(true);

  // Listen for external requests to open the mobile cart popup
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onCartOpen = () => {
      setIsMobileCartOpen(true);
    };
    window.addEventListener("cart:open", onCartOpen);
    return () => {
      window.removeEventListener("cart:open", onCartOpen);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsMobileCartOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted]);

  // Lock page scroll robustly when mobile menu is open
  useEffect(() => {
    if (!mounted) return;
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const headerEl = document.querySelector(".sticky");
    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;
    const prevBodyPosition = bodyEl.style.position;
    const prevBodyTop = bodyEl.style.top;
    const prevBodyWidth = bodyEl.style.width;
    const prevHeaderTop = headerEl?.style.top;
    let lockedScrollY = 0;

    if (isMenuOpen) {
      lockedScrollY = window.scrollY || 0;
      htmlEl.style.overflow = "hidden";
      bodyEl.style.overflow = "hidden";
      bodyEl.style.position = "fixed";
      bodyEl.style.top = `-${lockedScrollY}px`;
      bodyEl.style.width = "100%";
      if (headerEl) {
        headerEl.style.top = "0";
      }
    }

    return () => {
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
      bodyEl.style.position = prevBodyPosition;
      bodyEl.style.top = prevBodyTop;
      bodyEl.style.width = prevBodyWidth;
      if (headerEl && prevHeaderTop !== undefined) {
        headerEl.style.top = prevHeaderTop;
      }
      if (isMenuOpen) {
        window.scrollTo(0, lockedScrollY);
      }
    };
  }, [isMenuOpen, mounted]);

  useEffect(() => {
    atTopRef.current = isAtTop;
  }, [isAtTop]);

  // Track scroll position
  useEffect(() => {
    if (!mounted) return;
    const UP_THRESHOLD = 8;
    const DOWN_THRESHOLD = 60;
    const STABLE_MS = 180;

    let lastY = window.scrollY || 0;
    let rafId = null;
    let pendingTarget = null;
    let timerId = null;

    const evaluate = () => {
      rafId = null;
      const y = lastY;
      const currentlyTop = atTopRef.current;

      let nextCandidate = null;
      if (currentlyTop) {
        if (y >= DOWN_THRESHOLD) nextCandidate = "not_top";
      } else {
        if (y < UP_THRESHOLD) nextCandidate = "top";
      }

      if (nextCandidate) {
        if (pendingTarget !== nextCandidate) {
          pendingTarget = nextCandidate;
          if (timerId) clearTimeout(timerId);
          timerId = setTimeout(() => {
            const newIsTop = nextCandidate === "top";
            atTopRef.current = newIsTop;
            setIsAtTop(newIsTop);
            pendingTarget = null;
          }, STABLE_MS);
        }
      } else {
        if (pendingTarget) {
          pendingTarget = null;
          if (timerId) clearTimeout(timerId);
        }
      }
    };

    const onScroll = () => {
      lastY = window.scrollY || 0;
      if (rafId === null) rafId = requestAnimationFrame(evaluate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
    };
  }, [mounted]);

  const homeItem = navigation.find((n) => n.slug === "home");
  const categories = navigation.find((n) => n.slug === "categories")?.children || [];
  const pathname = usePathname();

  if (pathname.includes("/administrator/dashboard")) {
    return <></>;
  }

  const handleLogout = async () => {
    await logout();
    clearCart();
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div
        className={`transition-all duration-300 ease-in-out ${isAtTop ? "opacity-100 max-h-[200px]" : "max-h-0 opacity-0 overflow-hidden pointer-events-none"}`}
        aria-hidden={!isAtTop}
      >
        <HeaderTop />
      </div>
      
      <header className="px-4 lg:px-0 py-0 sm:py-8 md:py-0 bg-[#FFF]">
        <div className="flex flex-wrap justify-between items-center mx-auto relative container">
          <div className="flex flex-wrap w-full py-0">
            <div className={`w-full pb-0 ${isAtTop ? "sm:pb-8" : "sm:pb-0"}`}>
              <div className="top-header py-0 flex flex-row gap-[20px] justify-between items-center relative z-[4] max-[576px]:block max-[576px]:py-4">
                {/* Logo */}
                <Link href="/" className="cr-logo flex items-center max-[576px]:mb-[15px] max-[576px]:justify-center">
                  <Image src="/logo.png" alt="logo" width={297} height={100} className="logo block h-auto w-auto max-w-[297px] max-h-[100px] object-contain max-[576px]:max-w-[200px]" />
                </Link>

                {/* Search bar */}
                <form className="cr-search relative flex items-center max-w-[600px] w-full max-[576px]:max-w-[350px] max-[576px]:mx-auto">
                  <div className="flex items-center border pl-4 gap-2 bg-white border-primary h-[46px] rounded-xl overflow-hidden w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#6B7280">
                      <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
                    </svg>
                    <input type="text" className="w-full h-full outline-none text-sm text-gray-500" placeholder="Search Your Product" />
                    <button type="submit" className="bg-primary w-32 h-9 rounded-md text-sm text-white mr-[5px]">Search</button>
                  </div>
                </form>

                <div className="cr-right-bar flex max-[1024px]:hidden items-center justify-center">
                  <div className="flex items-center justify-center">
                    <div className="cr-right-bar-item flex items-center gap-3 relative text-[14px] font-semibold text-[#000] z-[1] py-[11px] pr-[30px] pl-[8px]">
                      <Link href="tel:+35724-400601" className="xl:flex items-center gap-3 hidden">
                        <IoMdCall size={26} color="#000" />
                        <span className=" flex-col flex">
                          <span className="text-[#828282]">Need Help?</span>
                          <span className="text-primary font-bold">+357 24-400601</span>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <ul className="navbar-nav m-auto relative z-[3]">
                    <li className="nav-item dropdown relative group">
                      <a className="nav-link dropdown-toggle cr-right-bar-item transition-all duration-[0.3s] flex items-center gap-3 relative text-[14px] font-semibold text-[#000] py-[11px] pr-[30px] pl-[8px]" href="#">
                        <IoPerson size={26} color="#0068c8" />
                        <span className="leading-[15px] text-[14px] font-semibold text-[#000]">
                          {user ? user.username : "Account"}
                        </span>
                      </a>
                      <ul className="dropdown-menu transition-all duration-[0.3s] py-[8px] min-w-[160px] absolute opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible bg-[#fff] rounded-[5px] block z-[9] border-[1px] border-solid border-[#e9e9e9]">
                        {user ? (
                          <>
                            <li className="w-full"><Link className="dropdown-item py-[7px] px-[20px] bg-[#fff] block text-sm font-medium" href="/my-account">My Profile</Link></li>
                            <li className="w-full"><button onClick={handleLogout} className="dropdown-item py-[7px] px-[20px] bg-[#fff] text-left block w-full text-sm font-medium text-red-600">Logout</button></li>
                          </>
                        ) : (
                          <>
                            <li className="w-full"><Link className="dropdown-item py-[7px] px-[20px] bg-[#fff] block text-sm font-medium" href="/my-account/sign-up">Register</Link></li>
                            <li className="w-full"><Link className="dropdown-item py-[7px] px-[20px] bg-[#fff] block text-sm font-medium" href="/my-account/login">Login</Link></li>
                          </>
                        )}
                      </ul>
                    </li>
                  </ul>

                  <div className="relative group">
                    <Link href="/shopping-cart" className="relative cr-right-bar-item transition-all duration-300 flex items-center gap-3">
                      <span className="relative inline-flex">
                        <IoCartOutline size={26} color="#0068c8" />
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-red-500 rounded-full ring-2 ring-white">
                          {mounted ? cartCount : 0}
                        </span>
                      </span>
                      <span className="flex flex-col leading-[15px]">
                        <span className="text-[14px] font-semibold text-[#000]">My Cart</span>
                        <span className="text-[12px] font-medium text-[#0068c8]">
                          €{mounted ? cartTotal.toFixed(2) : "0.00"}
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="cr-fix mb-4 md:mb-8 w-full pb-0 transition-all duration-300 opacity-100 max-h-[999px]">
          <div className="flex flex-wrap relative items-center mx-auto container shadow-[1px_1px_15px_-1px_#1447e6] rounded-2xl">
            <div className="cr-menu-list w-full relative flex items-center flex-row justify-center">
              <nav className="justify-between relative flex flex-nowrap items-center px-4 lg:px-0">
                <a href="#" className="navbar-toggler py-[7px] px-[14px] hidden max-[1024px]:flex" onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); }}>
                  <RiMenu3Fill size={20} color="#000" />
                </a>
                <DesktopCategories />
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
