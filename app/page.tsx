"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Menu,
  X,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  TrendingUp,
  Zap,
  Activity,
  ThumbsUp,
  Droplets,
  Expand,
  XIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data ---
const LOGO_URL = "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/shphvn.jpg?v=1779806935";
const PRODUCT_IMAGES = [
  "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/WIN-1.png?v=1778504117",
  "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/WIN-2.png?v=1778504116",
  "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/WIN-4.png?v=1778504116",
  "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/WIN-5.png?v=1778504116",
  "https://cdn.shopify.com/s/files/1/0730/2958/2983/files/WIN-8.png?v=1778504116",
];
const VIDEOS = [
  "https://cdn.shopify.com/videos/c/o/v/05f0c660ebfd429a91da0c402ca56f7e.mp4",
  "https://cdn.shopify.com/videos/c/o/v/66e744284f3c4445b444adb3b7576ffd.mp4",
  "https://cdn.shopify.com/videos/c/o/v/881c79758acb425ab709f9cffe331db8.mp4",
  "https://cdn.shopify.com/videos/c/o/v/41d6cbebfab34ed681704cc55b395d27.mp4",
];

const WHATSAPP_URL = "https://wa.me/919333927110?text=Hi%20SHOPPERS%20HEAVEN%20%E2%9C%A8%20I%20want%20to%20purchase%20your%20Sweat%20Slim%20Belt%20%F0%9F%94%A5%F0%9F%92%AA";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafc] font-sans text-gray-900 overflow-x-hidden relative">
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onBuyNow={() => setIsProductModalOpen(true)}
      />
      
      <main>
        <Hero onBuyNow={() => setIsProductModalOpen(true)} />
        <Benefits />
        <BeforeAfter />
        <VideoTestimonials />
        <WhyChooseUs />
        <Reviews />
        <ExpertRecommendation />
        <RunningCounter />
        <ProductShowcase onBuyNow={() => setIsProductModalOpen(true)} />
        <FAQ />
      </main>

      <Footer />
      
      <WhatsAppFAB />
      <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
    </div>
  );
}

// --- Sections ---

function Navbar({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, onBuyNow }: any) {
  const links = ["Benefits", "Results", "Reviews", "FAQ"];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={LOGO_URL} width={40} height={40} alt="Shoppers Heaven" className="rounded-full shadow-sm" />
          <span className="font-bold text-xl tracking-tight hidden sm:block">SHOPPERS HEAVEN</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              {link}
            </a>
          ))}
          <button onClick={onBuyNow} className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black/90 transition-all shadow-lg hover:shadow-xl active:scale-95">
            Buy Now
          </button>
        </nav>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 px-4 flex flex-col gap-4 md:hidden border-t border-gray-100"
          >
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50">
                {link}
              </a>
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); onBuyNow(); }} className="mt-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md active:scale-95 flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> Shop Today
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onBuyNow }: { onBuyNow: () => void }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 md:px-8 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffd6e7] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#dff4ff] rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-100 w-fit mx-auto lg:mx-0 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="text-sm font-medium text-pink-700">Premium Fitness Aesthetic</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-gray-900">
            Sweat More <span className="text-red-500">🔥</span> <br className="hidden md:block" /> Burn More <span className="text-orange-500">💪</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            Get Faster Sweat, Better Workouts & A Slimmer Waist Naturally with our luxurious Sweat Slim Belt.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
            <button onClick={onBuyNow} className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:shadow-[0_0_40px_rgba(0,0,0,0.25)] active:scale-95 group">
              Buy Now
              <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#benefits" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg flex items-center justify-center hover:bg-gray-50 transition-all">
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-3 mt-6 justify-center lg:justify-start">
            {[
              { text: "Sweat Faster", icon: Droplets },
              { text: "Comfortable Fit", icon: CheckCircle2 },
              { text: "Premium Quality", icon: Star },
              { text: "Cash On Delivery", icon: ShieldCheck }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <badge.icon size={16} className="text-green-500" />
                {badge.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-blue-50/50 z-0"></div>
          <div className="overflow-hidden h-full rounded-3xl z-10 relative" ref={emblaRef}>
            <div className="flex h-full">
              {PRODUCT_IMAGES.map((src, idx) => (
                <div className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center bg-white/40 backdrop-blur-sm" key={idx}>
                  <Image src={src} alt={`Product ${idx+1}`} fill className="object-contain p-8 md:p-16 drop-shadow-2xl mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/50 text-sm font-semibold text-gray-800 z-20 flex items-center gap-2">
            <TrendingUp size={16} className="text-pink-500" /> High Demand
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    { title: "Increases Sweating", text: "Promotes extreme sweat generation during any activity.", icon: Droplets, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Waist Support", text: "Targeted compression provides excellent support.", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-100" },
    { title: "Workout Companion", text: "Helps you get the most out of your gym sessions.", icon: Activity, color: "text-pink-500", bg: "bg-pink-100" },
    { title: "Lightweight Material", text: "So light you will forget you are even wearing it.", icon: Zap, color: "text-amber-500", bg: "bg-amber-100" },
    { title: "Adjustable Fit", text: "Flex-strap design accommodates changes in your body.", icon: Expand, color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Comfortable All Day", text: "Designed for extended wear without irritation.", icon: ThumbsUp, color: "text-rose-500", bg: "bg-rose-100" }
  ];

  return (
    <section id="benefits" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why You&apos;ll Love It</h2>
        <p className="text-gray-600 text-lg">Engineered with luxury materials to provide the ultimate fitness and beauty experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            key={i} 
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className={`w-14 h-14 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <b.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">{b.title}</h3>
            <p className="text-gray-500">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (clientPosition: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientPosition - left) / width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-white to-[#fffafc] px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 shadow-sm">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Real Transformations</h2>
          <p className="text-gray-600 text-lg">See the difference 30 days can make.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-ew-resize select-none bg-gray-100 shadow-2xl ring-1 ring-black/5"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image (background) */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop')] bg-cover bg-center">
            <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-md">After</span>
          </div>

          {/* Before image (clip-path based on slider) */}
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center filter grayscale-[30%]"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-md">Before</span>
          </div>

          {/* Slider line & handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                <path d="m15 18 6-6-6-6M9 18l-6-6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoTestimonials() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">See It In Action</h2>
        <p className="text-gray-600 text-lg">Watch how our customers use their Sweat Slim Belt.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VIDEOS.map((src, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-[9/16] relative rounded-3xl overflow-hidden shadow-xl bg-gray-900 group"
          >
            <video 
              src={src} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-white">
                <PlayCircle className="fill-white/20" size={24} />
                <span className="font-semibold text-sm drop-shadow-md">Verified Customer</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    "Premium Neoprene Material",
    "Double Compression Design",
    "Sweat Enhancing Technology",
    "Skin Friendly Fabric",
    "Lightweight & Breathable",
    "Easy To Wear"
  ];

  return (
    <section className="py-24 bg-black text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Why 30,000+ Customers Trust Us</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={i} 
                className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl glass-card"
              >
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-2 rounded-xl flex-shrink-0">
                  <CheckCircle2 fill="currentColor" className="text-white w-5 h-5" />
                </div>
                <span className="font-medium text-gray-200">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden hidden lg:block">
           <Image src={PRODUCT_IMAGES[2]} alt="Product Display" fill className="object-cover object-top mix-blend-screen scale-125" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Priya Sharma", text: "Amazing sweating belt! I use it daily during my morning walks and the results are visible.", rating: 5 },
    { name: "Anita Desai", text: "Very comfortable during gym. Doesn't roll down or cause any irritation on my skin.", rating: 5 },
    { name: "Rahul Verma", text: "I can feel the difference in my core temperature immediately. Highly recommend it.", rating: 5 },
    { name: "Sneha Patel", text: "Best waist trimmer belt I've ever bought. Premium quality and totally worth the price.", rating: 5 },
    { name: "Neha Gupta", text: "Fits perfectly under my clothes. I wear it to the office sometimes and no one notices.", rating: 4 },
  ];

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000 })]);

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 bg-[#fffafc] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-gray-600 text-lg">Real reviews from our beautiful community.</p>
          </div>
          <div className="flex gap-1">
             {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-yellow-400" size={28} />)}
             <span className="ml-2 font-bold text-xl">4.9/5</span>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_350px] min-w-0 bg-white p-8 rounded-3xl shadow-sm border border-pink-50 relative">
                <div className="flex text-yellow-400 fill-yellow-400 mb-6">
                   {[...Array(r.rating)].map((_, idx) => <Star key={idx} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-600 text-xl border-2 border-white shadow-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{r.name}</h4>
                    <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle2 size={14} /> Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertRecommendation() {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-pink-50 border border-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/><path d="M18 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/><path d="M10 11v6a2 2 0 0 0 2 2h0"/><path d="M18 11v6a2 2 0 0 0 2 2h0"/></svg>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
            <Image src="https://images.unsplash.com/photo-1594824436998-d40b490db86b?q=80&w=2070&auto=format&fit=crop" width={200} height={200} alt="Doctor" className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-600 inline-block mb-4 shadow-sm">
              Expert Recommended
            </div>
            <h3 className="text-2xl md:text-3xl font-bold italic text-gray-800 mb-4 leading-relaxed">
              &quot;Sweat Slim Belt helps improve workout efficiency and securely supports waist compression without restricting breathing.&quot;
            </h3>
            <p className="font-bold text-gray-900 text-lg">Dr. Ananya Rao</p>
            <p className="text-gray-500">Fitness & Physiotherapy Specialist</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RunningCounter() {
  const stats = [
    { label: "Happy Customers", value: "15,000+" },
    { label: "Orders Delivered", value: "30,000+" },
    { label: "Customer Rating", value: "4.9/5" },
    { label: "Satisfaction", value: "98%" },
  ];

  return (
    <section className="py-20 bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gray-700">
          {stats.map((s, i) => (
            <div key={i} className="text-center px-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-pink-500 mb-2"
              >
                {s.value}
              </motion.div>
              <p className="text-gray-400 font-medium tracking-wide uppercase text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({ onBuyNow }: { onBuyNow: () => void }) {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
       <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
           {PRODUCT_IMAGES.slice(0, 4).map((src, i) => (
             <motion.div 
               whileHover={{ scale: 1.05 }}
               key={i} 
               className={cn("bg-gray-50 rounded-3xl overflow-hidden relative shadow-sm", i === 0 ? "col-span-2 aspect-video" : "aspect-square")}
             >
               <Image src={src} alt="Product display" fill className="object-contain p-6 mix-blend-multiply transition-transform duration-500 hover:scale-110" />
               {i === 0 && (
                 <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                   50% OFF TODAY
                 </div>
               )}
             </motion.div>
           ))}
        </div>
        <div className="lg:w-1/2 w-full flex flex-col gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Ultimate Sweat Belt</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience the luxury of premium fitness apparel. Designed for those who demand the best in quality, comfort, and results.
            </p>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center py-4 border-b border-gray-200">
               <span className="font-semibold text-gray-700">Material</span>
               <span className="font-bold text-right">100% Premium Neoprene</span>
             </div>
             <div className="flex justify-between items-center py-4 border-b border-gray-200">
               <span className="font-semibold text-gray-700">Size</span>
               <span className="font-bold text-right">Free Size (Adjustable)</span>
             </div>
             <div className="flex justify-between items-center py-4 border-b border-gray-200">
               <span className="font-semibold text-gray-700">Washing</span>
               <span className="font-bold text-right">Hand Wash Only</span>
             </div>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-gray-400 line-through text-2xl font-medium">₹1,999</span>
            <span className="text-4xl font-black text-gray-900 shadow-sm px-4 py-1 bg-green-100 text-green-700 rounded-xl">₹999</span>
          </div>

          <button onClick={onBuyNow} className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl font-bold text-xl shadow-[0_10px_40px_rgba(244,63,94,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 group">
            <ShoppingCart size={24} className="group-hover:-rotate-12 transition-transform" />
            Add To Cart Now
          </button>
        </div>
       </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is it comfortable?", a: "Yes! Our Sweat Slim Belt is made from premium, ultra-soft neoprene that contours to your body, ensuring maximum comfort even during intense workouts." },
    { q: "Can both men & women use it?", a: "Absolutely. The adjustable design makes it a unisex product suitable for all body types." },
    { q: "How long should I wear it?", a: "We recommend wearing it for 30-45 minutes during workouts, or up to 2 hours during regular light activities." },
    { q: "Is Cash on Delivery (COD) available?", a: "Yes, we offer free Cash on Delivery across India." },
    { q: "Is it washable?", a: "Yes. We recommend a gentle hand wash with cold water and mild soap. Air dry in the shade to maintain the elasticity." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
            >
              <button 
                className="w-full px-6 py-5 text-left font-semibold text-lg flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className={openIdx === i ? "text-pink-600" : "text-gray-900"}>{faq.q}</span>
                {openIdx === i ? <ChevronUp className="text-pink-500" /> : <ChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Image src={LOGO_URL} width={40} height={40} alt="Logo" className="rounded-full shadow-lg" />
            <span className="font-bold text-xl text-white tracking-tight">SHOPPERS HEAVEN</span>
          </div>
          <p className="text-gray-400 mb-6 text-sm">Premium fitness and beauty accessories designed to enhance your confidence and lifestyle.</p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer text-white"><span className="text-xs">FB</span></div>
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer text-white"><span className="text-xs">IG</span></div>
             <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer text-white"><span className="text-xs">YT</span></div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-pink-400 transition-colors">Home</a></li>
            <li><a href="#benefits" className="hover:text-pink-400 transition-colors">Benefits</a></li>
            <li><a href="#results" className="hover:text-pink-400 transition-colors">Results</a></li>
            <li><a href="#reviews" className="hover:text-pink-400 transition-colors">Reviews</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-pink-400 transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping Info</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><MessageCircle size={16} /> support@shoppersheaven.in</li>
            <li>Monday - Saturday</li>
            <li>9:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} SHOPPERS HEAVEN. All rights reserved.</p>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-gray-800 rounded text-xs font-semibold">SECURE CHECKOUT</div>
        </div>
      </div>
    </footer>
  );
}

// --- Modals & Overlays ---

function WhatsAppFAB() {
  return (
    <a 
      href={WHATSAPP_URL} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all hover:scale-110 flex items-center justify-center animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-2 -left-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </a>
  );
}

function ProductModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [qty, setQty] = useState(1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-gray-800 transition-colors"
          >
            <XIcon size={24} />
          </button>

          <div className="flex-1 overflow-y-auto w-full">
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Gallery */}
              <div className="w-full md:w-1/2 bg-gray-50 relative p-8 flex items-center justify-center border-r border-gray-100">
                <div className="overflow-hidden w-full h-[40vh] md:h-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
                   <div className="flex h-full">
                      {PRODUCT_IMAGES.map((src, i) => (
                        <div key={i} className="flex-[0_0_100%] h-full relative flex items-center justify-center">
                           <Image src={src} fill alt={`Product view ${i+1}`} className="object-contain mix-blend-multiply drop-shadow-xl" />
                        </div>
                      ))}
                   </div>
                </div>
                <div className="absolute bottom-6 bg-white/80 py-1.5 px-4 rounded-full text-xs font-semibold text-gray-500 shadow-sm">
                  Swipe to view gallery
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-white">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />)}
                  <span className="text-sm font-semibold text-gray-500 ml-2">(2,450 Reviews)</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Sweat Slim Belt</h2>
                <p className="text-gray-500 font-medium mb-6">Original Premium Neoprene Waist Trimmer</p>
                
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                  <span className="text-gray-400 line-through text-2xl">₹1,999</span>
                  <span className="text-4xl font-black text-rose-600">₹999</span>
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase ml-auto">
                    Save 50%
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="font-semibold text-sm uppercase text-gray-500 mb-3 tracking-wider">Features</h4>
                    <ul className="grid grid-cols-2 gap-y-3 font-medium text-gray-700">
                       <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Adjustable size</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Hand Washable</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Premium Fabric</li>
                       <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Non-slip grip</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm uppercase text-gray-500 mb-3 tracking-wider">Quantity</h4>
                    <div className="flex items-center w-fit border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                       <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium">-</button>
                       <div className="w-12 text-center font-bold text-lg">{qty}</div>
                       <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors text-xl font-medium">+</button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 grid gap-3">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all active:scale-95 text-lg">
                    <MessageCircle size={22} fill="currentColor" />
                    Buy on WhatsApp
                  </a>
                  <button onClick={() => { alert("Added to cart! Proceeding to checkout..."); onClose(); }} className="w-full py-4 rounded-xl font-bold bg-black text-white hover:bg-gray-900 transition-all text-lg shadow-xl active:scale-95">
                    Add to Cart Now
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2 font-medium flex justify-center items-center gap-1">
                    <ShieldCheck size={14} /> 100% Secure Checkout | Free Shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
