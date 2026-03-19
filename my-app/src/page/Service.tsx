"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
// import Image from "next/image";
import {
  Scissors,
  Ruler,
  Shirt,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronDown,
  Sparkles,
  Heart,
  Package,
} from "lucide-react";

// ─── Services data ────────────────────────────────────────────────────────────
const services = [
  {
    id: "bespoke",
    number: "01",
    title: "Custom Tailoring",
    subtitle: "Full Bespoke",
    tagline:
      "Built entirely around you — from first chalk line to final press.",
    description:
      "Our signature service. Every pattern is drafted from scratch using your 30+ measurements. You choose the cloth from our curated mill selection, every detail of the construction, and every personalisation — from monogrammed linings to working cuff buttons. Two to three fittings ensure the garment moves exactly as you do.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop",
    icon: <Scissors className="w-6 h-6" />,
    features: [
      "30+ body measurements taken",
      "Hand-drafted pattern — no block adjustments",
      "Full cloth library access (Italian, English & local mills)",
      "2–3 personal fittings",
      "Hand-finished lapel buttonholes & pick-stitching",
      "Personalised lining, buttons & monogram",
    ],
    turnaround: "8–12 weeks",
    startingPrice: "₦650,000",
    accent: "#b8860b",
  },
  {
    id: "alterations",
    number: "02",
    title: "Alterations",
    subtitle: "Precision Adjustments",
    tagline:
      "We make good clothes fit like they were made for you — because they should be.",
    description:
      "From taking in a jacket to a full restructure of an ill-fitting suit, our alterations are invisible and lasting. We re-cut, re-line, re-canvas. We also restore beloved older garments — invisible reweaving, replacing worn collars and cuffs, or simply refreshing a piece you're not ready to retire.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop",
    icon: <Ruler className="w-6 h-6" />,
    features: [
      "Suit & jacket adjustments",
      "Trouser tapering, hemming & waist suppression",
      "Dress & gown resizing",
      "Invisible reweaving & restoration",
      "Collar, cuff & lining replacement",
      "Weight-change restructuring",
    ],
    turnaround: "3–10 days",
    startingPrice: "₦8,000",
    accent: "#9e8a78",
  },
  {
    id: "bridal",
    number: "03",
    title: "Bridal Couture",
    subtitle: "Wedding & Ceremony",
    tagline: "The garment you'll remember wearing for the rest of your life.",
    description:
      "Bridal work is personal beyond measure. We begin months in advance with a conversation about your vision, your venue, how you want to feel. From cathedral-trained ivory duchess satin to minimalist Aso-oke fusion, every bride receives the same unhurried attention. We also dress the groom, the wedding party, and the families — a complete ceremony wardrobe.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop",
    icon: <Heart className="w-6 h-6" />,
    features: [
      "Full bespoke gown or traditional attire",
      "Complete ceremony wardrobe (groom, party & families)",
      "Fabric sourcing from Paris, Milan & Lagos markets",
      "Minimum 4 fittings included",
      "Veil, headpiece & accessories coordination",
      "Post-wedding preservation & storage service",
    ],
    turnaround: "16–24 weeks",
    startingPrice: "₦1,200,000",
    accent: "#c9a96e",
  },
  {
    id: "made-to-measure",
    number: "04",
    title: "Made-to-Measure",
    subtitle: "MTM — The Smart Middle",
    tagline: "More personal than off-the-rack. Faster than full bespoke.",
    description:
      "Our MTM service uses a refined house block adjusted to your measurements as a starting point — cutting lead times significantly while still offering your choice of cloth, lining, and construction details. Ideal for corporate wardrobes, uniform programmes, or clients who need quality pieces on a shorter timeline.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop",
    icon: <Shirt className="w-6 h-6" />,
    features: [
      "Full measurement session",
      "Cloth selection from our MTM library",
      "Choice of lining, buttons & details",
      "One included fitting",
      "Ideal for corporate & event wardrobes",
      "Bulk orders & team programmes available",
    ],
    turnaround: "3–5 weeks",
    startingPrice: "₦185,000",
    accent: "#8b7355",
  },
  {
    id: "fabric",
    number: "05",
    title: "Fabric Sourcing",
    subtitle: "The Cloth Concierge",
    tagline: "You name the cloth. We find it — from Lagos to London.",
    description:
      "Our fabric library holds over 3,000 swatches. But if you have something specific in mind — a particular weight of cashmere, a hand-woven Aso-oke in a precise colour, or Italian superfine shirting — we source it. We work directly with mills in Biella, Yorkshire, and Owerri, and travel to fabric markets twice a year.",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=900&auto=format&fit=crop",
    icon: <Package className="w-6 h-6" />,
    features: [
      "Access to 3,000+ swatch library",
      "Direct mill sourcing — Italy, England & Nigeria",
      "Fabric consultation & recommendation",
      "Bulk fabric procurement for designers",
      "Rare & vintage cloth search service",
      "Fabric-only orders accepted",
    ],
    turnaround: "1–6 weeks (sourcing dependent)",
    startingPrice: "₦15,000 / metre",
    accent: "#7a6a58",
  },
  {
    id: "fittings",
    number: "06",
    title: "Measurement & Fittings",
    subtitle: "The Foundation of Everything",
    tagline: "A fitting is not an appointment. It is a collaboration.",
    description:
      "For clients who need a professional measurement record — whether shopping abroad, ordering online, or preparing for a future bespoke commission — we offer a dedicated measurement session. We record 30+ measurements, prepare a formal measurement card, and advise on fit adjustments for off-the-rack purchases.",
    image:
      "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=900&auto=format&fit=crop",
    icon: <Star className="w-6 h-6" />,
    features: [
      "30+ precision measurements recorded",
      "Formal measurement card provided",
      "Posture & fit analysis",
      "Advice for online & abroad shopping",
      "Re-measurement sessions for weight changes",
      "Complimentary for all bespoke clients",
    ],
    turnaround: "60-minute session",
    startingPrice: "₦25,000",
    accent: "#b8860b",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How long does a bespoke suit take?",
    a: "Our full bespoke process takes 8–12 weeks from the first consultation to final collection. Bridal and ceremonial commissions start at 16 weeks. We do not rush — and we will tell you clearly if a deadline is not achievable before we accept it.",
  },
  {
    q: "Do I need an appointment?",
    a: "Yes. All visits to the atelier are by appointment. This ensures you have the team's undivided attention. First consultations are complimentary. Book via the contact page or by calling directly.",
  },
  {
    q: "Can you work with fabric I already own?",
    a: "Absolutely. Many clients bring heirloom cloth, gifts from travels, or fabric purchased abroad. We will assess it honestly and advise if the weight and construction suits your intended garment.",
  },
  {
    q: "What is your alteration turnaround?",
    a: "Simple alterations (hemming, taking in) are typically 3–5 days. Complex work — re-structuring, full relining, or restoration — can take up to 10 days. We always give you an honest timeline before we begin.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. A 50% deposit is required to begin all commissions. The balance is due at final fitting. For commissions above ₦500,000, we offer a three-stage payment arrangement on request.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        body { background: #f7f5f2; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #b8860b; border-radius: 2px; }
      `}</style>

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,245,242,0.97), transparent)",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            letterSpacing: "0.3em",
            color: "#2c2218",
          }}
        >
          Mimi Couture
        </span>
        <ul
          className="hidden md:flex gap-8"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#7a6a58",
          }}
        >
          {["Home", "Collections", "Services", "Atelier", "Contact"].map(
            (item) => (
              <li
                key={item}
                className="uppercase cursor-pointer hover:text-amber-700 transition-colors duration-300"
                style={{ color: item === "Services" ? "#b8860b" : undefined }}
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "75vh" }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="Services hero"
            // fill
            className="object-cover object-center"
            // priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(44,34,24,0.55) 0%, rgba(44,34,24,0.75) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-end px-12 md:px-24 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              color: "#c9a96e",
              marginBottom: "1.2rem",
            }}
          >
            {/* MIMI COUTURE — WHAT WE DO */}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              color: "#f7f0e8",
              lineHeight: 0.95,
              fontWeight: 300,
              letterSpacing: "0.02em",
              maxWidth: "700px",
            }}
          >
            What can
            <br />
            <em style={{ fontStyle: "italic", color: "#c9a96e" }}>we do</em>
            <br />
            for you?
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            style={{
              width: "60px",
              height: "1px",
              background: "#b8860b",
              margin: "2rem 0 0",
            }}
          />
        </motion.div>
      </div>

      {/* ── Intro ──────────────────────────────────────────────────── */}
      <section style={{ background: "#f7f5f2", padding: "6rem 2rem 4rem" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                color: "#b8860b",
                marginBottom: "1.2rem",
              }}
            >
              SIX SERVICES. ONE PHILOSOPHY.
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#2c2218",
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              Every service we offer begins with listening.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.95,
              color: "#7a6a58",
              fontWeight: 300,
            }}
          >
            We do not believe in a one-size service model. Whether you need a
            gown sewn for the biggest day of your life or a jacket taken in by
            half an inch, the care we bring is exactly the same. Below is
            everything we do — and everything it includes.
          </p>
        </div>
        <div
          className="max-w-5xl mx-auto mt-10"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #c9a96e, transparent)",
          }}
        />
      </section>

      {/* ── Service cards ──────────────────────────────────────────── */}
      <section style={{ background: "#f7f5f2", padding: "2rem 2rem 8rem" }}>
        <div className="max-w-6xl mx-auto space-y-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              isActive={activeService === service.id}
              onToggle={() =>
                setActiveService(
                  activeService === service.id ? null : service.id,
                )
              }
            />
          ))}
        </div>
      </section>

      {/* ── Why choose us — horizontal strip ──────────────────────── */}
      <section style={{ background: "#2c2218", padding: "6rem 2rem" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                color: "#b8860b",
                marginBottom: "1rem",
              }}
            >
              THE MIMI COUTURE DIFFERENCE
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#f0e8dc",
                fontWeight: 300,
              }}
            >
              Why clients come back
            </h2>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}
          >
            {[
              {
                icon: <Scissors className="w-6 h-6" />,
                title: "No shortcuts",
                body: "We use floating canvases, hand-stitched buttonholes and real horn buttons. Fused construction is not something we offer.",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Honest timelines",
                body: "We will never promise a lead time we cannot keep. If your deadline is tight, we will tell you before we accept the commission.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Aftercare for life",
                body: "Every garment we make comes back to us for repairs, relining and re-pressing, free of charge for the first three years.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col p-10 group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRight:
                    i < 2 ? "1px solid rgba(201,169,110,0.12)" : "none",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ background: "rgba(184,134,11,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(184,134,11,0.12)",
                    color: "#b8860b",
                    border: "1px solid rgba(184,134,11,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "#f0e8dc",
                    fontWeight: 400,
                    marginBottom: "1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(201,169,110,0.6)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process timeline ──────────────────────────────────────── */}
      <section style={{ background: "#f0ece6", padding: "7rem 2rem" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                color: "#b8860b",
                marginBottom: "1rem",
              }}
            >
              HOW IT WORKS
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#2c2218",
                fontWeight: 300,
              }}
            >
              From first meeting to finished garment
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #c9a96e 10%, #c9a96e 90%, transparent)",
              }}
            />

            {[
              {
                step: "01",
                title: "Consultation",
                detail:
                  "We meet, we listen. You describe your vision, your lifestyle, your deadline. No pressure, no upselling — just conversation. This first session is always complimentary.",
              },
              {
                step: "02",
                title: "Measurement",
                detail:
                  "Our head cutter takes 30+ measurements and records your posture, fit preferences, and any adjustments required. You leave with a permanent record of your measurements.",
              },
              {
                step: "03",
                title: "Cloth & Design",
                detail:
                  "We visit the cloth library together. We discuss construction, silhouette, and every detail from buttons to lining. You approve everything before a single cut is made.",
              },
              {
                step: "04",
                title: "Fittings",
                detail:
                  "Typically two to three sessions depending on complexity. Each fitting refines the garment further. Nothing leaves our bench until it is right.",
              },
              {
                step: "05",
                title: "Delivery",
                detail:
                  "Your garment arrives freshly pressed, on a wooden hanger, wrapped in tissue and housed in a branded garment bag with full care instructions.",
              },
            ].map((p, i) => (
              <motion.div
                key={p.step}
                className={`relative flex items-start gap-8 mb-14 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* Node */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex-shrink-0 mt-1"
                  style={{
                    background: "#b8860b",
                    boxShadow: "0 0 0 4px rgba(184,134,11,0.15)",
                  }}
                />

                {/* Content */}
                <div
                  className={`pl-14 md:pl-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}
                >
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.4em",
                      color: "#b8860b",
                    }}
                  >
                    {p.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      color: "#2c2218",
                      fontWeight: 400,
                      margin: "0.4rem 0 0.75rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.82rem",
                      color: "#7a6a58",
                      fontWeight: 300,
                      lineHeight: 1.9,
                    }}
                  >
                    {p.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section style={{ background: "#f7f5f2", padding: "7rem 2rem" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                color: "#b8860b",
                marginBottom: "1rem",
              }}
            >
              QUESTIONS & ANSWERS
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#2c2218",
                fontWeight: 300,
              }}
            >
              Things people ask us
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-sm"
                style={{ border: "1px solid rgba(184,134,11,0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center gap-4 text-left p-6 group"
                  style={{
                    background:
                      openFaq === i
                        ? "rgba(184,134,11,0.06)"
                        : "rgba(255,255,255,0.5)",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      color: "#2c2218",
                      fontWeight: 400,
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flexShrink: 0, color: "#b8860b" }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.85rem",
                          color: "#7a6a58",
                          fontWeight: 300,
                          lineHeight: 1.9,
                          padding: "0 1.5rem 1.5rem",
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "9rem 2rem" }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1920&auto=format&fit=crop"
            alt="CTA background"
            // fill
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(44,34,24,0.87)" }}
          />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.5em",
              color: "#b8860b",
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            START HERE
          </motion.p>
          <motion.h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#f0e8dc",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Not sure which service is right for you?
          </motion.h2>
          <motion.p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(201,169,110,0.7)",
              fontWeight: 300,
              lineHeight: 1.85,
              marginBottom: "3rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Book a complimentary 30-minute consultation. We'll understand your
            needs, show you the atelier, and recommend the right path — no
            obligation required.
          </motion.p>
          <motion.button
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              padding: "1.1rem 3rem",
              background: "#b8860b",
              color: "#f0e8dc",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ background: "#c9a96e", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </>
  );
}

// ─── ServiceCard (accordion) ─────────────────────────────────────────────────
interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, index, isActive, onToggle }: ServiceCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.65 }}
      className="overflow-hidden rounded-sm"
      style={{
        border: `1px solid ${isActive ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.15)"}`,
        transition: "border-color 0.4s",
      }}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
        style={{
          background: isActive
            ? "rgba(44,34,24,0.97)"
            : "rgba(255,255,255,0.7)",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "background 0.4s",
        }}
      >
        <div className="flex items-center gap-6 px-8 py-7">
          {/* Number */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              color: isActive
                ? "rgba(201,169,110,0.25)"
                : "rgba(44,34,24,0.12)",
              fontWeight: 300,
              lineHeight: 1,
              flexShrink: 0,
              minWidth: "3rem",
            }}
          >
            {service.number}
          </span>
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            style={{
              background: isActive
                ? "rgba(184,134,11,0.2)"
                : "rgba(184,134,11,0.08)",
              color: "#b8860b",
              border: `1px solid ${isActive ? "rgba(184,134,11,0.4)" : "rgba(184,134,11,0.15)"}`,
            }}
          >
            {service.icon}
          </div>
          {/* Title block */}
          <div className="flex-1 min-w-0">
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.45em",
                color: "#b8860b",
                marginBottom: "0.3rem",
              }}
            >
              {service.subtitle.toUpperCase()}
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: isActive ? "#f0e8dc" : "#2c2218",
                fontWeight: 400,
                lineHeight: 1.2,
                transition: "color 0.3s",
              }}
            >
              {service.title}
            </h3>
          </div>
          {/* Price teaser */}
          <div className="hidden md:flex flex-col items-end flex-shrink-0">
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: isActive
                  ? "rgba(201,169,110,0.5)"
                  : "rgba(122,106,88,0.6)",
              }}
            >
              FROM
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                color: isActive ? "#c9a96e" : "#b8860b",
                fontWeight: 400,
              }}
            >
              {service.startingPrice}
            </span>
          </div>
          {/* Chevron */}
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ color: "#b8860b", flexShrink: 0 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", background: "#2c2218" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative" style={{ minHeight: "320px" }}>
                <img
                  src={service.image}
                  alt={service.title}
                  //   fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 60%, #2c2218 100%)",
                  }}
                />
                <div className="absolute bottom-6 left-6">
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      color: "#f0e8dc",
                      fontStyle: "italic",
                      opacity: 0.9,
                    }}
                  >
                    "{service.tagline}"
                  </span>
                </div>
              </div>

              {/* Detail */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(201,169,110,0.65)",
                      fontWeight: 300,
                      lineHeight: 1.9,
                      marginBottom: "2rem",
                    }}
                  >
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "#b8860b" }}
                        />
                        <span
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "0.78rem",
                            color: "rgba(240,232,220,0.75)",
                            fontWeight: 300,
                          }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div
                    className="flex items-center gap-8 mb-6 pt-4"
                    style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.55rem",
                          letterSpacing: "0.3em",
                          color: "rgba(201,169,110,0.45)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        TURNAROUND
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1rem",
                          color: "#f0e8dc",
                        }}
                      >
                        {service.turnaround}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.55rem",
                          letterSpacing: "0.3em",
                          color: "rgba(201,169,110,0.45)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        STARTING FROM
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1rem",
                          color: "#c9a96e",
                        }}
                      >
                        {service.startingPrice}
                      </p>
                    </div>
                  </div>
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-3 group/btn"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.4em",
                      color: "#f0e8dc",
                      background: "#b8860b",
                      padding: "0.85rem 1.75rem",
                      textDecoration: "none",
                      display: "inline-flex",
                    }}
                    whileHover={{ background: "#c9a96e" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    ENQUIRE ABOUT THIS SERVICE
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
