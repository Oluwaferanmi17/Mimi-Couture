"use client";

// import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    },
  },
};

const numberVariants = {
  hidden: (dir: number) => ({
    opacity: 0,
    x: dir * 45,
    y: 18,
    rotate: dir * 6,
  }),
  visible: {
    opacity: 0.65,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.85,
      ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    },
  },
};

const scissorsVariants = {
  hidden: { scale: 0.7, opacity: 0, rotate: -20 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
    },
  },
  floating: {
    rotate: [-12, 12],
    y: [-6, 6],
    transition: {
      rotate: {
        duration: 2.4,
        ease: [0.42, 0, 0.58, 1] as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
      y: {
        duration: 1.8,
        ease: [0.42, 0, 0.58, 1] as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotFoundPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        body { margin: 0; background: #f7f5f2; }
      `}</style>

      {/* Subtle grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Ambient gold blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(184,134,11,0.06)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(201,169,110,0.05)" }}
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Decorative stitch border — top */}
      <div
        className="fixed top-0 left-0 right-0 z-10"
        style={{
          height: "3px",
          background:
            "repeating-linear-gradient(90deg, #b8860b 0px, #b8860b 12px, transparent 12px, transparent 20px)",
        }}
      />
      {/* Decorative stitch border — bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-10"
        style={{
          height: "3px",
          background:
            "repeating-linear-gradient(90deg, #b8860b 0px, #b8860b 12px, transparent 12px, transparent 20px)",
        }}
      />

      {/* Nav wordmark */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-5">
        <Link
          to="/"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            letterSpacing: "0.3em",
            color: "#2c2218",
            textDecoration: "none",
          }}
        >
          Mimi Couture
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* 4 — scissors — 4 */}
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-10 md:mb-14">
              <motion.span
                variants={numberVariants}
                custom={-1}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(5rem, 14vw, 10rem)",
                  fontWeight: 300,
                  color: "#2c2218",
                  opacity: 0.65,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                4
              </motion.span>

              {/* Scissors icon (replaces ghost) */}
              <motion.div
                variants={scissorsVariants}
                animate={["visible", "floating"]}
                whileHover={{ scale: 1.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "clamp(70px,12vw,100px)",
                    height: "clamp(70px,12vw,100px)",
                    background: "rgba(184,134,11,0.1)",
                    border: "1px solid rgba(184,134,11,0.3)",
                    boxShadow: "0 8px 32px rgba(184,134,11,0.12)",
                  }}
                >
                  <Scissors
                    style={{
                      width: "42%",
                      height: "42%",
                      color: "#b8860b",
                      strokeWidth: 1.5,
                    }}
                  />
                </div>
              </motion.div>

              <motion.span
                variants={numberVariants}
                custom={1}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(5rem, 14vw, 10rem)",
                  fontWeight: 300,
                  color: "#2c2218",
                  opacity: 0.65,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}
              >
                4
              </motion.span>
            </div>

            {/* Gold rule */}
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "linear-gradient(to left, #b8860b, transparent)",
                }}
              />
              <Scissors
                style={{
                  width: "12px",
                  height: "12px",
                  color: "#b8860b",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background: "linear-gradient(to right, #b8860b, transparent)",
                }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "#2c2218",
                marginBottom: "1rem",
                lineHeight: 1.15,
                userSelect: "none",
              }}
            >
              This page has been
              <br />
              <em style={{ fontStyle: "italic", color: "#b8860b" }}>
                cut from the pattern.
              </em>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                color: "#7a6a58",
                lineHeight: 1.85,
                maxWidth: "420px",
                margin: "0 auto 3rem",
                userSelect: "none",
              }}
            >
              The page you're looking for no longer exists — or perhaps it never
              did. Let us stitch you back to familiar ground.
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="group inline-flex items-center gap-3"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.4em",
                  background: "#2c2218",
                  color: "#f0e8dc",
                  padding: "1rem 2.5rem",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "background 0.4s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#b8860b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#2c2218")
                }
              >
                Return to Atelier
                <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
            </motion.div>

            {/* Secondary links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { label: "Collections", to: "/collections" },
                { label: "Services", to: "/services" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.35em",
                    color: "#9e8a78",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    borderBottom: "1px solid rgba(158,138,120,0.3)",
                    paddingBottom: "2px",
                    transition: "color 0.3s, border-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#b8860b";
                    e.currentTarget.style.borderColor = "#b8860b";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#9e8a78";
                    e.currentTarget.style.borderColor = "rgba(158,138,120,0.3)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            {/* Atelier note */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "rgba(122,106,88,0.5)",
                marginTop: "3.5rem",
                userSelect: "none",
              }}
            >
              — Mimi Couture, Lagos
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
