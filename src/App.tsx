/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { 
  Plus, 
  Minus, 
  ShoppingBag, 
  X, 
  Wine, 
  Coffee, 
  CupSoda, 
  Sparkles, 
  Instagram, 
  Facebook, 
  QrCode, 
  Sun, 
  Flame,
  RotateCcw,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { menuData, formatPrice, OrderItem } from "./data";

// Import generated images
import resortPoolBg from "./assets/images/resort_pool_bg_1783965512884.jpg";
import blueGoldHookah from "./assets/images/blue_gold_hookah_1783965523843.jpg";
import poolsideCocktail from "./assets/images/poolside_cocktail_1783965536637.jpg";
import neonLogoTopLeft from "./assets/images/neon_logo_top_left_1783966371599.jpg";
import qrCode from "./assets/images/qr-code.png";

export default function App() {
  const [order, setOrder] = useState<Record<string, OrderItem>>({});
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Helper to add/remove from order
  const addToOrder = (id: string, name: string, category: string, price: number, sizeOrType?: string) => {
    setOrder((prev) => {
      const existing = prev[id];
      if (existing) {
        return {
          ...prev,
          [id]: { ...existing, qty: existing.qty + 1 },
        };
      }
      return {
        ...prev,
        [id]: { id, name, category, price, qty: 1, sizeOrType },
      };
    });
  };

  const updateQty = (id: string, delta: number) => {
    setOrder((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const newQty = existing.qty + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: { ...existing, qty: newQty },
      };
    });
  };

  const clearOrder = () => {
    setOrder({});
  };

  // Order stats
  const totalItems = useMemo(() => {
    return (Object.values(order) as OrderItem[]).reduce((sum, item) => sum + item.qty, 0);
  }, [order]);

  const totalPrice = useMemo(() => {
    return (Object.values(order) as OrderItem[]).reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [order]);

  return (
    <div className="min-h-screen menu-paper-bg text-[#2E241E] font-sans relative selection:bg-[#cfa76e] selection:text-white pb-16">
      
      {/* Background Top Deco (Palm corner leaves simulated with css) */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 pointer-events-none opacity-25 overflow-hidden z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3e5622]">
          <path d="M0,0 Q30,10 40,50 Q10,30 0,0 M0,0 Q10,30 50,40 Q30,10 0,0 M0,0 Q40,5 60,30 Q20,20 0,0" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 pointer-events-none opacity-25 overflow-hidden transform scale-x-[-1] z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#3e5622]">
          <path d="M0,0 Q30,10 40,50 Q10,30 0,0 M0,0 Q10,30 50,40 Q30,10 0,0 M0,0 Q40,5 60,30 Q20,20 0,0" />
        </svg>
      </div>

      {/* Floating Table Order FAB (Replaces sticky navbar) */}
      {/* Main Container Wrapper mimicking the physical premium menu paper */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 relative z-10">
        <div className="border-[3px] border-[#cfa76e] rounded-xl p-4 md:p-8 bg-[#fbf8f3] relative overflow-hidden shadow-2xl">
          
          {/* Inner Golden border lines */}
          <div className="absolute inset-2 border border-[#dfccb0] rounded-lg pointer-events-none z-0" />

          {/* Header section with three parts: Glowing Neon logo on left, Center main text, Beautiful resort pool stairs on right */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-6 mb-12 border-b border-[#ebdcb9] pb-8">
            
            {/* Left Column: Beautiful glowing circular Neon logo */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#F3C53F] shadow-[0_0_25px_rgba(226,143,36,0.7)] bg-[#121c15] flex flex-col items-center justify-center text-center">
                <img
                  src={neonLogoTopLeft}
                  alt="Casa del Sol circular neon logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Center: Main Logo exactly like the image logo */}
            <div className="flex flex-col items-center text-center">
              {/* Casa del Sol cursive top */}
              <span className="font-cursive text-5xl md:text-6xl text-[#13384D] mb-0.5">
                Casa
              </span>
              <span className="font-cursive text-3xl md:text-4xl text-[#C69A50] leading-none mb-2">
                del
              </span>

              {/* Huge S [SUN/MOUNTAIN] L */}
              <div className="flex items-center justify-center gap-4 my-1">
                <span className="font-serif text-7xl md:text-8xl font-medium text-[#13384D] tracking-tight">S</span>
                
                {/* Sun Logo emblem with Mountain Peak Silhouette (exactly matching the user's reference image) */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg viewBox="0 0 100 85" className="w-full h-full">
                    <defs>
                      <linearGradient id="sunGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#C69A50" />
                        <stop offset="100%" stopColor="#F3C53F" />
                      </linearGradient>
                    </defs>
                    
                    {/* Radial tapered sharp triangular sun rays */}
                    <g fill="#C69A50">
                      {/* Top Ray */}
                      <polygon points="50,14 48,27 52,27" />
                      {/* Upper Left 1 */}
                      <polygon points="37,18 41,29 44,27" />
                      {/* Upper Right 1 */}
                      <polygon points="63,18 56,27 59,29" />
                      {/* Mid Left 2 */}
                      <polygon points="26,27 32,36 35,33" />
                      {/* Mid Right 2 */}
                      <polygon points="74,27 65,33 68,36" />
                      {/* Lower Left 3 */}
                      <polygon points="18,40 27,45 29,42" />
                      {/* Lower Right 3 */}
                      <polygon points="82,40 71,42 73,45" />
                      {/* Bottom Left 4 */}
                      <polygon points="15,55 25,56 26,52" />
                      {/* Bottom Right 4 */}
                      <polygon points="85,55 74,52 75,56" />
                    </g>
                    
                    {/* Sun body (glowing sun dome) */}
                    <path d="M26,58 A24,24 0 0,1 74,58 Z" fill="url(#sunGrad)" />
                    
                    {/* Mountain silhouette (exactly like the logo with thin border gaps) */}
                    {/* Left background ridge */}
                    <polygon points="15,70 38,48 58,70" fill="#13384D" stroke="#fbf8f3" strokeWidth="2" strokeLinejoin="round" />
                    {/* Right foreground ridge */}
                    <polygon points="30,70 55,44 82,70" fill="#13384D" stroke="#fbf8f3" strokeWidth="2.5" strokeLinejoin="round" />
                  </svg>
                </div>

                <span className="font-serif text-7xl md:text-8xl font-medium text-[#13384D] tracking-tight">L</span>
              </div>

              {/* Sub-header text and lines: "— RESTAURANT & POOL —" */}
              <div className="flex items-center gap-3 w-full max-w-xs mt-3">
                <span className="text-sm md:text-base font-display tracking-[0.25em] text-[#C69A50] font-bold whitespace-nowrap">
                  — RESTAURANT & POOL —
                </span>
              </div>

              {/* "The Menu" Script text */}
              <span className="font-cursive text-5xl md:text-6xl text-[#13384D] mt-4">
                The Menu
              </span>

              {/* Golden flourish scroll wave divider under "The Menu" */}
              <svg viewBox="0 0 120 12" className="w-28 h-4 text-[#C69A50] mt-1 fill-none stroke-current" strokeWidth="1.2">
                <path d="M10,6 C30,9 40,3 50,6 C55,7.5 58,7.5 60,6 C62,4.5 65,4.5 70,6 C80,3 90,9 110,6" />
                <path d="M45,6 C52,2 58,10 60,6 C62,2 68,10 75,6" />
              </svg>
            </div>

            {/* Right Column: Beautiful Resort Pool/Steps Landscape Photo & Big Scan QR Code */}
<div className="flex flex-col items-center md:items-end justify-center gap-4 w-full max-w-[240px] md:max-w-[280px]">
  <div className="relative w-[380px] h-[300px] md:h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-md border-2 border-[#dfccb0]">
    <img
      src={resortPoolBg}
      alt="Casa Del Sol illuminated bar steps"
      className="w-full h-full object-cover"
      referrerPolicy="no-referrer"
    />
  </div>

  {/* Real Scannable Big QR Code */}
  <div className="flex items-center justify-center md:justify-end w-full">
    <div
      onClick={() => setShowQrModal(true)}
      className="bg-white p-2.5 border border-[#dfccb0] rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-all flex flex-col items-center gap-1.5 group max-w-[150px] w-full hover:scale-[1.03]"
    >
      <img
        src={qrCode}
        alt="Menu QR Code"
        className="w-28 h-28 object-contain transition-transform group-hover:scale-[1.02]"
      />
      <span className="text-[8px] font-mono font-bold tracking-widest text-[#2E241E] uppercase">
        SCAN MENU
      </span>
    </div>
  </div>
</div>

          </div>

          {/* Three-column layout displaying ALL categories on a single screen without tabs, SAJ and SANDWICHES are removed */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            
            {/* COLUMN 1: MEZZA and HOT DRINKS */}
            <div className="space-y-8">
              
              {/* MEZZA */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-[#dfccb0]">
                  <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                    <Sparkles className="h-5 w-5 text-[#cfa76e]" />
                  </div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-widest text-[#2E241E]">
                    MEZZA
                  </h2>
                </div>
                <div className="space-y-4">
                  {menuData.mezza.map((item) => (
                    <div
                      key={item.name}
                      className="p-1 rounded-md"
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                          {item.name}
                        </span>
                        <span className="dots-leader" />
                        <span className="font-mono text-[11px] sm:text-[14px] font-bold text-[#2E241E]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HOT DRINKS */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-[#dfccb0]">
                  <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                    <Coffee className="h-5 w-5 text-[#cfa76e]" />
                  </div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-widest text-[#2E241E]">
                    HOT DRINKS
                  </h2>
                </div>
                <div className="space-y-4">
                  {menuData.hotDrinks.map((item) => (
                    <div
                      key={item.name}
                      className="p-1 rounded-md"
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                          {item.name}
                        </span>
                        <span className="dots-leader" />
                        <span className="font-mono text-[11px] sm:text-[14px] font-bold text-[#2E241E]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUMN 2: SIDES, SOFT DRINKS, ALCOHOL */}
            <div className="space-y-8">
              
              {/* SIDES (Multi-column S, M, L) */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm">
                <div className="grid grid-cols-10 items-center mb-5 pb-2 border-b border-[#dfccb0]">
                  <div className="col-span-4 flex items-center gap-2">
                    <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                      <Sparkles className="h-4 w-4 text-[#cfa76e]" />
                    </div>
                    <h2 className="font-display font-bold text-sm sm:text-base uppercase tracking-widest text-[#2E241E]">
                      SIDES
                    </h2>
                  </div>
                  
                  {/* Columns Indicators with perfect alignment */}
                  <div className="col-span-2 text-center font-mono font-bold text-[10px] sm:text-xs text-[#8a7258]">S</div>
                  <div className="col-span-2 text-center font-mono font-bold text-[10px] sm:text-xs text-[#8a7258]">M</div>
                  <div className="col-span-2 text-center font-mono font-bold text-[10px] sm:text-xs text-[#8a7258]">L</div>
                </div>

                <div className="space-y-4">
                  {menuData.sides.map((item) => (
                    <div key={item.name} className="p-1 rounded-md">
                      <div className="grid grid-cols-10 gap-1 items-baseline">
                        <span className="col-span-4 font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                          {item.name}
                        </span>
                        <div className="col-span-2 text-center font-mono text-[10px] sm:text-[13px] font-bold text-[#2E241E]">
                          {item.prices.S ? (
                            formatPrice(item.prices.S)
                          ) : (
                            <span className="text-[#dfccb0] font-normal">---</span>
                          )}
                        </div>
                        <div className="col-span-2 text-center font-mono text-[10px] sm:text-[13px] font-bold text-[#2E241E]">
                          {item.prices.M ? (
                            formatPrice(item.prices.M)
                          ) : (
                            <span className="text-[#dfccb0] font-normal">---</span>
                          )}
                        </div>
                        <div className="col-span-2 text-center font-mono text-[10px] sm:text-[13px] font-bold text-[#2E241E]">
                          {item.prices.L ? (
                            formatPrice(item.prices.L)
                          ) : (
                            <span className="text-[#dfccb0] font-normal">---</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOFT DRINKS (Enclosed in a gold frame outline like in the original image) */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-[#dfccb0]">
                  <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                    <CupSoda className="h-5 w-5 text-[#cfa76e]" />
                  </div>
                  <h2 className="font-display font-bold text-lg uppercase tracking-widest text-[#2A4D53]">
                    SOFT DRINKS
                  </h2>
                </div>
                <div className="space-y-3.5">
                  {menuData.softDrinks.map((item) => (
                    <div
                      key={item.name}
                      className="p-1 rounded-md"
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                          {item.name}
                        </span>
                        <span className="dots-leader" />
                        <span className="font-mono text-[11px] sm:text-[13px] font-bold text-[#2E241E]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ALCOHOL */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm">
                <div className="grid grid-cols-12 items-center mb-5 pb-2 border-b border-[#dfccb0]">
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                      <Wine className="h-4 w-4 text-[#cfa76e]" />
                    </div>
                    <h2 className="font-display font-bold text-base sm:text-lg uppercase tracking-widest text-[#2E241E]">
                      ALCOHOL
                    </h2>
                  </div>

                  {/* GLASS / BOTTLE headers */}
                  <div className="col-span-3 text-center font-mono font-bold text-[10px] sm:text-xs text-[#8a7258] tracking-widest">GLASS</div>
                  <div className="col-span-3 text-center font-mono font-bold text-[10px] sm:text-xs text-[#8a7258] tracking-widest">BOTTLE</div>
                </div>

                <div className="space-y-4">
                  {menuData.alcohol.map((item) => (
                    <div key={item.name} className="p-1 rounded-md">
                      <div className="grid grid-cols-12 gap-1 items-baseline">
                        <span className="col-span-6 font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                          {item.name}
                        </span>
                        <div className="col-span-3 text-center font-mono text-[10px] sm:text-[13px] font-bold text-[#2E241E]">
                          {item.prices.glass ? (
                            formatPrice(item.prices.glass)
                          ) : (
                            <span className="text-[#dfccb0] font-normal">---</span>
                          )}
                        </div>
                        <div className="col-span-3 text-center font-mono text-[10px] sm:text-[13px] font-bold text-[#2E241E]">
                          {item.prices.bottle ? (
                            formatPrice(item.prices.bottle)
                          ) : (
                            <span className="text-[#dfccb0] font-normal">---</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* COLUMN 3: SHISHA, SHISHA IMAGE, MARKETING BOX */}
            <div className="space-y-8">
              
              {/* SHISHA */}
              <div className="transition-all duration-300 border-2 border-[#dfccb0] bg-[#fbf8f3] p-5 rounded-lg shadow-sm space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-5 pb-2 border-b border-[#dfccb0]">
                    <div className="p-1.5 bg-[#cfa76e]/10 rounded-full">
                      <Flame className="h-5 w-5 text-[#cfa76e]" />
                    </div>
                    <h2 className="font-display font-bold text-lg uppercase tracking-widest text-[#2E241E]">
                      SHISHA
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {menuData.shisha.map((item) => (
                      <div
                        key={item.name}
                        className="p-1 rounded-md"
                      >
                        <div className="flex justify-between items-baseline">
                          <span className="font-serif text-xs sm:text-sm font-medium text-[#2E241E]">
                            {item.name}
                          </span>
                          <span className="dots-leader" />
                          <span className="font-mono text-[11px] sm:text-[14px] font-bold text-[#2E241E]">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shisha Premium Generated Image inside the box */}
                <div className="relative border border-[#dfccb0] rounded-lg overflow-hidden shadow-sm bg-white p-1">
                  <img
                    src={blueGoldHookah}
                    alt="Premium Shisha Hookah"
                    className="w-full h-[400px] object-contain bg-[#FAF6EE] rounded-md"
                    referrerPolicy="no-referrer"
                  />
                  {/* Visual badge */}
                  <div className="absolute top-3 left-3 bg-[#2A4D53]/90 text-white text-[9px] font-display font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                    Premium Hookah Lounge
                  </div>
                </div>
              </div>

              {/* "GOOD FOOD, GOOD DRINKS, GOOD VIBES - Enjoy!" Custom card (Circled in red) */}
              <div className="bg-[#1C3337] rounded-xl p-8 text-center text-[#f6efe2] relative overflow-hidden shadow-lg border border-[#cfa76e]/30">
                {/* Subtle light effect */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#cfa76e]/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Sun icon */}
                <div className="flex justify-center mb-4">
                  <Sun className="h-8 w-8 text-[#E28F24] animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl uppercase tracking-widest text-white">
                    GOOD FOOD
                  </h3>
                  <h3 className="font-serif text-2xl uppercase tracking-widest text-[#dfccb0]">
                    GOOD DRINKS
                  </h3>
                  <h3 className="font-serif text-2xl uppercase tracking-widest text-white">
                    GOOD VIBES
                  </h3>
                </div>

                <p className="font-cursive text-5xl text-[#F3C53F] mt-6">
                  Enjoy!
                </p>

                {/* Subtle border flourishes */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-0.5 w-8 bg-[#cfa76e]/50" />
                  <span className="text-[10px] text-[#cfa76e] tracking-widest">★ ★ ★</span>
                  <div className="h-0.5 w-8 bg-[#cfa76e]/50" />
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Section Layout (As circled in red on bottom): Cocktail image with green leaves & pool scene */}
          <div className="relative mt-16 z-10 border-t border-[#ebdcb9] pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Left: Tropical cocktail & Palm leaf container with decorative glowing lights */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#cfa76e] shadow-md flex-shrink-0 relative">
                  <img
                    src={poolsideCocktail}
                    alt="Refreshing Cocktail with Orange Slice"
                    className="w-full h-full object-cover animate-[pulse_8s_infinite]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center md:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#a08a70] font-semibold block">Craft Cocktails</span>
                  <p className="text-sm italic font-serif text-[#5e4d3c] mt-0.5">
                    "Sip the sunset, feel the pool breeze."
                  </p>
                </div>
              </div>

              {/* Middle & Right: Beautiful Pool Evening scene banner block */}
              <div className="md:col-span-2 relative rounded-xl overflow-hidden h-44 shadow-lg border-2 border-[#dfccb0]">
                {/* Background resort pool image */}
                <img
                  src={resortPoolBg}
                  alt="Casa Del Sol illuminated Pool Side"
                  className="w-full h-full object-cover absolute inset-0 z-0 brightness-[0.85]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

                {/* Content over background */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between items-start text-white">
                  <div className="bg-[#1C3337]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-widest font-display font-semibold border border-[#cfa76e]/30">
                    NIGHTLIFE & SUNSET LOUNGE
                  </div>
                  
                  <div className="w-full flex justify-between items-end">
                    <div>
                      <span className="text-lg font-serif tracking-widest block font-bold text-white">CASA DEL SOL</span>
                      <span className="text-[10px] font-mono tracking-widest text-[#F3C53F] uppercase block">Resort & Pool Lounge</span>
                    </div>
                    <div className="hidden sm:block text-right text-[10px] text-slate-300 font-mono">
                      <span></span>
                      <br />
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* THANK YOU FOR CHOOSING BANNER (Preserved exactly) */}
            <div className="bg-[#1C3337] text-white rounded-xl py-6 px-4 text-center mt-8 relative overflow-hidden shadow-md border border-[#cfa76e]/30">
              <span className="text-[10px] md:text-xs font-display tracking-[0.25em] text-[#F3C53F] block font-bold uppercase mb-2">
                THANK YOU FOR CHOOSING
              </span>
              <h4 className="font-serif text-xl md:text-2xl tracking-[0.1em] font-medium text-white uppercase mb-3">
                CASA DEL SOL
              </h4>
              <p className="font-cursive text-3xl md:text-4xl text-[#dfccb0] italic">
                We hope to see you again soon!
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* QR Code scanned enlargement popup Modal */}
      <AnimatePresence>
        {showQrModal && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl border border-[#cfa76e] p-6 shadow-2xl z-55 text-center flex flex-col items-center"
            >
              <div className="w-full flex justify-end mb-2">
                <button 
                  onClick={() => setShowQrModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-[#a2917d] hover:text-slate-700 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <span className="font-serif text-xl font-bold text-[#2A4D53] mb-1">CASA DEL SOL</span>
              <span className="text-[10px] tracking-widest text-[#cfa76e] font-display font-semibold uppercase mb-4">RESTAURANT & POOL</span>

              <div className="bg-white p-4 border-2 border-[#dfccb0] rounded-lg shadow-inner mb-4">
               <img
                  src={qrCode}
                  alt="Casa Del Sol Menu QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <p className="text-xs text-[#5e4d3c] max-w-xs mb-3">
                Scan this QR code with your mobile camera to share this gorgeous interactive digital menu with friends at your table!
              </p>

              <span className="text-xs font-mono text-[#9E2A2B] font-bold">@casadelsollb</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
