import { Link } from "react-router-dom";
import { useEffect } from "react";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero";

// ─── Tailoring-specific content shown after the hero expands ───────────────
const TailoringContent = () => (
  <div
    className="max-w-5xl mx-auto text-stone-900"
    style={{ fontFamily: "'Cormorant Garamond', serif" }}
  >
    {/* Google font import via inline style */}
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`}</style>

    {/* Divider */}
    <div className="flex items-center gap-6 mb-16">
      <div className="h-px flex-1 bg-stone-300" />
      <span
        className="text-xs tracking-[0.4em] uppercase text-stone-400"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Est. 2018
      </span>
      <div className="h-px flex-1 bg-stone-300" />
    </div>

    {/* Services grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
      {[
        {
          number: "01",
          title: "Bespoke Outfit",
          desc: "Hand-cut and finished to your exact measurements. Every seam, every stitch — an expression of who you are.",
        },
        {
          number: "02",
          title: "Occasion-Based Outfit",
          desc: "Gowns and occasion wear crafted from the finest silks, charmeuse, and duchess satin for your most memorable moments.",
        },
        {
          number: "03",
          title: "Alterations",
          desc: "We breathe new life into beloved garments — precise, invisible repairs and restyling that honour the original craft.",
        },
      ].map((s) => (
        <div key={s.number} className="group">
          <p
            className="text-stone-300 text-6xl font-light mb-4 leading-none group-hover:text-amber-400 transition-colors duration-500"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {s.number}
          </p>
          <h3
            className="text-2xl font-semibold text-stone-800 mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {s.title}
          </h3>
          <p
            className="text-stone-500 leading-relaxed text-sm"
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
          >
            {s.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Pull quote */}
    <div className="text-center mb-20 px-4">
      <p
        className="text-3xl md:text-4xl italic text-stone-700 leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        &ldquo;A garment is not merely clothing — it is a second skin,
        <br className="hidden md:block" />
        shaped by the hands that made it and the life lived in it.&rdquo;
      </p>
      <span
        className="block mt-5 text-xs tracking-[0.4em] uppercase text-amber-600"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        — Atelier Mimi Couture
      </span>
    </div>

    {/* Process steps */}
    <div className="mb-20">
      <h2
        className="text-4xl font-light text-stone-800 mb-12 text-center"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Our Process
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          {
            step: "Consultation",
            detail:
              "We listen to your vision, lifestyle, and how you want to feel.",
          },
          {
            step: "Measurement",
            detail: "Over 30 precise measurements taken by our master cutter.",
          },
          {
            step: "Fitting",
            detail:
              "Two to three fittings ensure the garment moves with your body.",
          },
          {
            step: "Delivery",
            detail:
              "Finished and pressed, wrapped in tissue and delivered with care.",
          },
        ].map((p, i) => (
          <div key={p.step} className="relative">
            <div className="flex items-start gap-3 mb-3">
              <span
                className="text-amber-500 text-sm font-medium mt-1"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-amber-300 mt-3" />
            </div>
            <h4
              className="text-xl text-stone-800 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {p.step}
            </h4>
            <p
              className="text-stone-500 text-sm leading-relaxed"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Gallery strip */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20">
      {[
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=400&auto=format&fit=crop",
      ].map((src, i) => (
        <div
          key={i}
          className="aspect-[3/4] overflow-hidden rounded-sm"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center pb-10">
      <p
        className="text-stone-500 text-sm tracking-[0.3em] uppercase mb-6"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Ready to Begin?
      </p>
      <button
        className="px-12 py-4 bg-stone-900 text-amber-50 text-sm tracking-[0.3em] uppercase hover:bg-amber-600 transition-colors duration-500"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Book a Consultation
      </button>
    </div>
  </div>
);

// ─── Home Page ──────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        body { background-color: #faf9f7; }
      `}</style>

      {/* Optional fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center mix-blend-difference">
        <span
          className="text-white text-lg tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Mimi Couture
        </span>
        <ul
          className="hidden md:flex gap-8 text-white/80 text-xs tracking-[0.25em] uppercase"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {[
            { name: "Collections", path: "/collections" },
            { name: "Services", path: "/services" },
            { name: "Lookbook", path: "/lookbook" },
            { name: "Atelier", path: "/atelier" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/test.mp4"
        bgImageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop"
        title="Tailored Perfection"
        date="Couture Atelier"
        scrollToExpand="↓ scroll to discover"
        textBlend
      >
        <TailoringContent />
      </ScrollExpandMedia>
    </>
  );
}
