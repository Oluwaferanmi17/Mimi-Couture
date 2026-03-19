"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Scissors,
  Ruler,
  Shirt,
  Star,
  Award,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Heart,
  Sparkles,
  //   Thread,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
// import { Variants } from "framer-motion";

// ─── Tailoring-specific services ─────────────────────────────────────────────
const services = [
  {
    icon: <Scissors className="w-6 h-6" />,
    secondaryIcon: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Pattern Cutting",
    description:
      "Every pattern is drafted by hand from your exact measurements. No shortcuts, no digital shortcuts — just a master cutter with chalk, shears, and decades of intuition.",
    position: "left",
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    secondaryIcon: (
      <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Cloth Selection",
    description:
      "We source from the finest mills in Italy, England, and West Africa. Our fabric library holds over 3,000 cloths — from 150s superfine wools to hand-woven Aso-oke.",
    position: "left",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    secondaryIcon: (
      <Star className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Hand Finishing",
    description:
      "Lapel buttonholes, pick-stitching, working sleeve buttons — the hallmarks of a truly bespoke garment. Each piece leaves our atelier with no fewer than 40 hours of hand-sewing.",
    position: "left",
  },
  {
    icon: <Shirt className="w-6 h-6" />,
    secondaryIcon: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Made-to-Measure",
    description:
      "Not ready for full bespoke? Our MTM service uses a base block adjusted to your body, with full choice of cloth, lining, and personalisation — at a shorter lead time.",
    position: "right",
  },
  {
    icon: <Star className="w-6 h-6" />,
    secondaryIcon: (
      <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Restoration",
    description:
      "Beloved garments deserve a second life. Our restoration service reweaves, re-canvases, and rebuilds with invisible precision — honouring the original maker's craft.",
    position: "right",
  },
  {
    icon: <Award className="w-6 h-6" />,
    secondaryIcon: (
      <Star className="w-4 h-4 absolute -top-1 -right-1 text-amber-400" />
    ),
    title: "Private Wardrobe",
    description:
      "For our most discerning clients, a complete wardrobe curation service: seasonal capsules, event dressing, and an annual review to ensure every piece still serves you perfectly.",
    position: "right",
  },
];

const stats = [
  {
    icon: <Award className="w-6 h-6" />,
    value: 340,
    label: "Garments Crafted",
    suffix: "+",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: 280,
    label: "Happy Clients",
    suffix: "+",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    value: 17,
    label: "Years in Craft",
    suffix: "",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: 99,
    label: "Return Rate",
    suffix: "%",
  },
];

const team = [
  {
    name: "Adaeze Okafor",
    role: "Head Cutter & Founder",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop",
    bio: "Trained in Lagos and London. 17 years at the bench.",
  },
  {
    name: "Emeka Nwosu",
    role: "Master Tailor",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop",
    bio: "Specialises in Agbada and West African formals.",
  },
  {
    name: "Chisom Eze",
    role: "Bridal Specialist",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
    bio: "Former couture assistant, Paris & Milan.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AtelierPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.25 },
    },
  };
  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        body { background: #f7f5f2; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 2px; }
      `}</style>

      {/* ── Fixed Nav ──────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,245,242,0.97) 0%, transparent 100%)",
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
                style={{ color: item === "Atelier" ? "#b8860b" : undefined }}
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "70vh" }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop"
          alt="Atelier hero"
          //   fill
          className="object-cover object-center"
          //   priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(44,34,24,0.75) 0%, rgba(44,34,24,0.4) 60%, rgba(184,134,11,0.2) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.55em",
              color: "#c9a96e",
              marginBottom: "1.5rem",
            }}
          >
            MIMI COUTURE — THE CRAFT
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#f7f0e8",
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            The Atelier
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              color: "#d4c4aa",
              marginTop: "1.5rem",
              fontWeight: 300,
              maxWidth: "500px",
            }}
          >
            Where cloth meets craft, and craft becomes legacy
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            style={{
              width: "40px",
              height: "1px",
              background: "#c9a96e",
              margin: "2rem auto 0",
            }}
          />
        </div>
      </div>

      {/* ── About Section (adapted from the component) ──────────────── */}
      <section
        ref={sectionRef}
        className="w-full py-24 px-4 overflow-hidden relative"
        style={{ background: "linear-gradient(to bottom, #f7f5f2, #f0ece6)" }}
      >
        {/* Decorative blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "rgba(184,134,11,0.06)",
            y: y1,
            rotate: rotate1,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "rgba(201,169,110,0.07)",
            y: y2,
            rotate: rotate2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full pointer-events-none"
          style={{ background: "rgba(184,134,11,0.35)" }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full pointer-events-none"
          style={{ background: "rgba(201,169,110,0.3)" }}
          animate={{ y: [0, 18, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="container mx-auto max-w-6xl relative z-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.div
            className="flex flex-col items-center mb-6"
            variants={itemVariants}
          >
            <motion.span
              className="font-medium mb-2 flex items-center gap-2"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.45em",
                color: "#b8860b",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Scissors className="w-4 h-4" />
              DISCOVER OUR STORY
            </motion.span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#2c2218",
                fontWeight: 300,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              About the Atelier
            </h2>
            <motion.div
              className="h-px"
              style={{ background: "#b8860b" }}
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className="text-center max-w-2xl mx-auto mb-20"
            variants={itemVariants}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.9,
              color: "#7a6a58",
              fontWeight: 300,
            }}
          >
            Founded in 2008, Mimi Couture is Lagos's only fully bespoke
            tailoring house. We believe that clothing is not merely worn — it is
            felt. Every garment we make is a conversation between the wearer's
            life and the tailor's hands.
          </motion.p>

          {/* ── Three-column layout (services + centre image) ──────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Left services */}
            <div className="space-y-14">
              {services
                .filter((s) => s.position === "left")
                .map((s, i) => (
                  <ServiceItem
                    key={`l${i}`}
                    icon={s.icon}
                    secondaryIcon={s.secondaryIcon}
                    title={s.title}
                    description={s.description}
                    variants={itemVariants}
                    delay={i * 0.2}
                    direction="left"
                  />
                ))}
            </div>

            {/* Centre image */}
            <div className="flex justify-center items-center order-first md:order-none mb-10 md:mb-0">
              <motion.div
                className="relative w-full max-w-xs"
                variants={itemVariants}
              >
                <motion.div
                  className="rounded-sm overflow-hidden shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.35 } }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=600&auto=format&fit=crop"
                    alt="Tailor at work"
                    className="w-full object-cover"
                    style={{ height: "520px", objectPosition: "center" }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-end justify-center p-5"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(44,34,24,0.7) 0%, transparent 55%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <motion.button
                      className="flex items-center gap-2"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        color: "#f0e8dc",
                        background: "rgba(184,134,11,0.9)",
                        padding: "0.75rem 1.5rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      OUR PROCESS <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Frame accent */}
                <motion.div
                  className="absolute inset-0 -m-3 z-[-1]"
                  style={{
                    border: "1px solid rgba(201,169,110,0.5)",
                    borderRadius: "2px",
                  }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />

                {/* Floating orbs */}
                <motion.div
                  className="absolute -top-5 -right-8 w-14 h-14 rounded-full"
                  style={{ background: "rgba(184,134,11,0.12)", y: y1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full"
                  style={{ background: "rgba(201,169,110,0.12)", y: y2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.1 }}
                />

                {/* Pulse dots */}
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ background: "#b8860b" }}
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ background: "#c9a96e" }}
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </div>

            {/* Right services */}
            <div className="space-y-14">
              {services
                .filter((s) => s.position === "right")
                .map((s, i) => (
                  <ServiceItem
                    key={`r${i}`}
                    icon={s.icon}
                    secondaryIcon={s.secondaryIcon}
                    title={s.title}
                    description={s.description}
                    variants={itemVariants}
                    delay={i * 0.2}
                    direction="right"
                  />
                ))}
            </div>
          </div>

          {/* ── Stats ──────────────────────────────────────────────── */}
          <motion.div
            ref={statsRef}
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {stats.map((s, i) => (
              <StatCounter
                key={i}
                icon={s.icon}
                value={s.value}
                label={s.label}
                suffix={s.suffix}
                delay={i * 0.1}
              />
            ))}
          </motion.div>

          {/* ── CTA Banner ──────────────────────────────────────────── */}
          <motion.div
            className="mt-20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm"
            style={{ background: "#2c2218" }}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.4em",
                  color: "#c9a96e",
                  marginBottom: "0.75rem",
                }}
              >
                READY TO BEGIN?
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  color: "#f0e8dc",
                  fontWeight: 300,
                  marginBottom: "0.5rem",
                }}
              >
                Let's create something for you
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.8rem",
                  color: "#a89880",
                  fontWeight: 300,
                }}
              >
                First consultations are complimentary and unhurried.
              </p>
            </div>
            <motion.button
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                padding: "1rem 2.5rem",
                background: "#b8860b",
                color: "#f0e8dc",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              whileHover={{ scale: 1.05, background: "#c9a96e" }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Fitting <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Meet the Team ────────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#f0ece6" }}>
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
              THE HANDS BEHIND THE WORK
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#2c2218",
                fontWeight: 300,
              }}
            >
              Meet the Team
            </h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#c9a96e",
                margin: "1.5rem auto 0",
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div
                  className="relative mx-auto mb-5 overflow-hidden rounded-sm"
                  style={{ width: "200px", height: "260px" }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                    style={{ background: "rgba(44,34,24,0.15)" }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    color: "#2c2218",
                    fontWeight: 400,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: "#b8860b",
                    margin: "0.4rem 0 0.8rem",
                    textTransform: "uppercase",
                  }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.8rem",
                    color: "#7a6a58",
                    fontWeight: 300,
                  }}
                >
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Atelier Ethos strip ──────────────────────────────────────── */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="Atelier"
            // fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(44,34,24,0.82)" }}
          />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              color: "#f0e8dc",
              fontStyle: "italic",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            &ldquo;We do not make clothes. We make the version of you that walks
            into the room and needs no introduction.&rdquo;
          </motion.p>
          <motion.p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.45em",
              color: "#c9a96e",
              marginTop: "2rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            — ADAEZE OKAFOR, FOUNDER
          </motion.p>
        </div>
      </section>
    </>
  );
}

// ─── ServiceItem ──────────────────────────────────────────────────────────────
interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: any;
  delay: number;
  direction: "left" | "right";
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="relative p-3 rounded-sm transition-colors duration-300 group-hover:bg-amber-100"
          style={{ background: "rgba(184,134,11,0.1)", color: "#b8860b" }}
          whileHover={{
            rotate: [0, -8, 8, -4, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            color: "#2c2218",
            fontWeight: 500,
          }}
          className="group-hover:text-amber-700 transition-colors duration-300"
        >
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="pl-12"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.8rem",
          lineHeight: 1.85,
          color: "#7a6a58",
          fontWeight: 300,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center gap-1 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
        }}
      >
        LEARN MORE <ArrowRight className="w-3 h-3" />
      </motion.div>
    </motion.div>
  );
}

// ─── StatCounter ──────────────────────────────────────────────────────────────
interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);
  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      requestAnimationFrame(() => setHasAnimated(true));
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      requestAnimationFrame(() => setHasAnimated(false));
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (v) => Math.floor(v));

  return (
    <motion.div
      className="p-6 rounded-sm flex flex-col items-center text-center group"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{
        y: -5,
        background: "rgba(255,255,255,0.95)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-amber-50"
        style={{ background: "rgba(44,34,24,0.06)", color: "#b8860b" }}
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="flex items-end"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.5rem",
          color: "#2c2218",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        <motion.span>{displayValue}</motion.span>
        <span style={{ fontSize: "1.5rem", color: "#b8860b" }}>{suffix}</span>
      </motion.div>
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#9e8a78",
          marginTop: "0.5rem",
        }}
      >
        {label.toUpperCase()}
      </p>
      <motion.div
        className="mt-3"
        style={{ height: "1px", background: "#b8860b", width: "24px" }}
        whileHover={{ width: "48px", transition: { duration: 0.3 } }}
      />
    </motion.div>
  );
}
