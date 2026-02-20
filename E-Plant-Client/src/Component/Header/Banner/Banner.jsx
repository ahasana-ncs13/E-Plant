import { useState, useEffect } from "react";

const banners = [
  {
    tag: "New Arrival",
    headline: "Grow Something Beautiful",
    sub: "Rare & exotic plants delivered to your door",
    cta: "Shop Now",
    badge: "badge-success",
    btn: "btn-success",
    bg: "bg-base-200",
    emoji: "🌿",
  },
  {
    tag: "Limited Offer",
    headline: "50% Off All Succulents",
    sub: "This weekend only — no code needed",
    cta: "Grab the Deal",
    badge: "badge-warning",
    btn: "btn-warning",
    bg: "bg-base-300",
    emoji: "🌵",
  },
  {
    tag: "Featured",
    headline: "Indoor Jungle Starter Kit",
    sub: "Everything you need to start your green collection",
    cta: "Explore Kit",
    badge: "badge-info",
    btn: "btn-info",
    bg: "bg-base-200",
    emoji: "🪴",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const b = banners[current];

  return (
    <div className={`hero min-h-96 rounded-box ${b.bg} transition-all duration-500`}>
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-5xl gap-8 py-12 px-8">

        {/* Illustration */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-52 h-52 rounded-full bg-base-100 shadow-xl flex items-center justify-center text-8xl select-none">
            {b.emoji}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2">
          <span className={`badge ${b.badge} badge-outline mb-4`}>{b.tag}</span>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {b.headline}
          </h1>

          <p className="text-base-content/60 text-lg mb-8">{b.sub}</p>

          <div className="flex items-center gap-3 flex-wrap">
            <button className={`btn ${b.btn}`}>
              {b.cta}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn-ghost">Learn More</button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                  i === current ? `w-8 ${b.btn} opacity-100` : "w-4 bg-base-content opacity-30"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}