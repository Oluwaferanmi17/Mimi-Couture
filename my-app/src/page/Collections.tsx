import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Menu, X } from "lucide-react";
// import Image from "next/image";
import { ParallaxScrollSecond } from "../components/ui/parallax-scroll";

// ─── Tailoring-specific collection images (Unsplash) ──────────────────────────
const collectionCategories = [
  {
    id: "Party",
    label: "Owambe",
    tag: "SS 2025",
    description:
      "Hand-cut from English wools and Italian superfine cloths. Every canvas, every pick-stitch placed by our master tailor.",
    accent: "#b8860b",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598808503746-f34cfb3fbf43?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555069519-127aadecd47a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "bridal",
    label: "Bridal",
    tag: "Atelier 2025",
    description:
      "Gowns sculpted in duchess satin, silk organza and Chantilly lace. Each piece born from a single conversation about your day.",
    accent: "#c9a96e",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "trad",
    label: "Traditional Wear",
    tag: "Resort 2025",
    description:
      "Draped silhouettes in charmeuse and velvet for the hours after sundown. Refined, deliberate, unforgettable.",
    accent: "#8b7355",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "alterations",
    label: "Alterations",
    tag: "Always Open",
    description:
      "Invisible mending, restyling and restoration. We honour the garments you love too much to let go.",
    accent: "#9e8a78",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "aso-ebi",
    label: "Aso-Ebi",
    tag: "Very Nigerian",
    description:
      "Invisible mending, restyling and restoration. We honour the garments you love too much to let go.",
    accent: "#9e8a78",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop",
    ],
  },
];

export default function CollectionsPage() {
  const [active, setActive] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const current = collectionCategories[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { background: #f7f5f2; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f0ece6; }
        ::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 2px; }
      `}</style>

      {/* ── Fixed Nav ────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,245,242,0.95) 0%, transparent 100%)",
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-8 py-5">
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
            {[
              { name: "Home", path: "/" },
              { name: "Collections", path: "/collections" },
              { name: "Services", path: "/services" },
              { name: "Lookbook", path: "/lookbook" },
              { name: "Atelier", path: "/atelier" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="uppercase cursor-pointer hover:text-amber-700 transition-colors duration-300"
                  style={{
                    color: item.path === "/collections" ? "#b8860b" : undefined,
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            style={{ color: "#f0e8dc" }}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "rgba(15,10,4,0.96)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(184,134,11,0.15)",
          }}
        >
          <ul
            className="flex flex-col px-6 py-6 gap-6"
            style={{
              fontFamily: "'Jost', sans-serif",
              letterSpacing: "0.25em",
              fontSize: "0.75rem",
            }}
          >
            {[
              { name: "Home", path: "/" },
              { name: "Collections", path: "/collections" },
              { name: "Services", path: "/services" },
              { name: "Lookbook", path: "/lookbook" },
              { name: "Atelier", path: "/atelier" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="uppercase block transition-colors duration-300"
                  style={{
                    color:
                      item.path === "/collections"
                        ? "#b8860b"
                        : "rgba(240,232,220,0.8)",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "80vh" }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="Collections hero"
            // fill
            className="object-cover object-center"
            // priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(44,34,24,0.35) 0%, rgba(44,34,24,0.65) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.5em",
              color: "#c9a96e",
              marginBottom: "1.5rem",
            }}
          >
            Mimi Couture — 2026
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
            The Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              color: "#d4c4aa",
              marginTop: "2rem",
              fontWeight: 300,
            }}
          >
            Four expressions of the tailored life
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
        </motion.div>
      </div>

      {/* ── Category Selector ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 flex justify-center"
        style={{
          background: "rgba(247,245,242,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e8e0d4",
        }}
      >
        <div className="flex overflow-x-auto gap-0 max-w-4xl w-full">
          {collectionCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActive(i)}
              className="relative flex-1 min-w-fit px-6 py-5 text-center transition-all duration-500"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                color: active === i ? "#2c2218" : "#9e8a78",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span className="uppercase">{cat.label}</span>
              {active === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: "2px", background: "#b8860b" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Collection Detail ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Collection intro */}
          <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
            <div>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  color: "#c9a96e",
                  marginBottom: "1.5rem",
                }}
              >
                {current.tag}
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  color: "#2c2218",
                  lineHeight: 1.1,
                  fontWeight: 300,
                }}
              >
                {current.label}
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.9,
                  color: "#7a6a58",
                  fontWeight: 300,
                }}
              >
                {current.description}
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <button
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.3em",
                    padding: "0.85rem 2rem",
                    background: "#2c2218",
                    color: "#f0e8dc",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    transition: "background 0.4s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#b8860b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#2c2218")
                  }
                >
                  Book Consultation
                </button>
                <Link to="/lookbook">
                  <button
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      padding: "0.85rem 2rem",
                      background: "transparent",
                      color: "#7a6a58",
                      border: "1px solid #d4c4aa",
                      cursor: "pointer",
                      textTransform: "uppercase",
                      transition: "border-color 0.4s, color 0.4s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#b8860b";
                      e.currentTarget.style.color = "#b8860b";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d4c4aa";
                      e.currentTarget.style.color = "#7a6a58";
                    }}
                  >
                    View Lookbook
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Thin gold rule */}
          <div className="max-w-6xl mx-auto px-8">
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, #c9a96e, transparent)",
              }}
            />
          </div>

          {/* ── Parallax Gallery ──────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="flex justify-between items-baseline mb-8">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  color: "#9e8a78",
                  fontStyle: "italic",
                }}
              >
                Scroll to explore the collection
              </p>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  color: "#c9a96e",
                }}
              >
                {current.images.length} PIECES
              </p>
            </div>

            <ParallaxScrollSecond
              images={current.images}
              className="rounded-xl"
            />
          </div>

          {/* ── Featured piece callout ─────────────────────────────────── */}
          <div
            className="mx-8 my-12 max-w-6xl md:mx-auto rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            style={{ background: "#2c2218" }}
          >
            <div className="relative" style={{ minHeight: "400px" }}>
              <img
                src={current.images[0]}
                alt="Featured piece"
                // fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(44,34,24,0.3)" }}
              />
            </div>
            <div className="p-12 flex flex-col justify-center">
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.45em",
                  color: "#c9a96e",
                  marginBottom: "1.5rem",
                }}
              >
                SIGNATURE PIECE
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  color: "#f0e8dc",
                  lineHeight: 1.2,
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                }}
              >
                The House Favourite
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#a89880",
                  fontWeight: 300,
                  marginBottom: "2rem",
                }}
              >
                Our most requested piece from this collection. Each one starts
                with a conversation and ends with something entirely your own.
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    height: "1px",
                    width: "30px",
                    background: "#c9a96e",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.3em",
                    color: "#c9a96e",
                  }}
                >
                  FROM ₦850,000
                </span>
              </div>
            </div>
          </div>

          {/* ── Testimonial strip ─────────────────────────────────────── */}
          <div className="text-center py-20 px-8">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                color: "#2c2218",
                fontStyle: "italic",
                fontWeight: 300,
                maxWidth: "700px",
                margin: "0 auto 2rem",
                lineHeight: 1.7,
              }}
            >
              &ldquo;They understood exactly what I wanted before I could even
              find the words. The suit was me — just elevated.&rdquo;
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                color: "#9e8a78",
              }}
            >
              — CHIDI O., LAGOS
            </p>
          </div>

          {/* ── Other collections teaser ──────────────────────────────── */}
          <div style={{ background: "#f0ece6", padding: "4rem 2rem" }}>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.45em",
                color: "#c9a96e",
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              EXPLORE MORE
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {collectionCategories
                .filter((_, i) => i !== active)
                .map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setActive(
                        collectionCategories.findIndex((c) => c.id === cat.id),
                      )
                    }
                    className="group relative overflow-hidden rounded-lg text-left"
                    style={{
                      aspectRatio: "3/4",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={cat.images[0]}
                      alt={cat.label}
                      //   fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(44,34,24,0.85) 0%, rgba(44,34,24,0.1) 60%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.2rem",
                          color: "#f0e8dc",
                          fontWeight: 400,
                        }}
                      >
                        {cat.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.6rem",
                          letterSpacing: "0.3em",
                          color: "#c9a96e",
                          marginTop: "0.25rem",
                        }}
                      >
                        {cat.tag}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* ── Footer CTA ────────────────────────────────────────────── */}
          <div
            className="text-center py-24 px-8"
            style={{ background: "#f7f5f2" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#2c2218",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              Ready to Begin?
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.8rem",
                color: "#9e8a78",
                letterSpacing: "0.1em",
                fontWeight: 300,
                marginBottom: "3rem",
              }}
            >
              Every great garment starts with a single conversation.
            </p>
            <button
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                padding: "1rem 3rem",
                background: "#2c2218",
                color: "#f0e8dc",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "background 0.4s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#b8860b")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#2c2218")
              }
            >
              Book Your Fitting
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
