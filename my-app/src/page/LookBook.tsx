import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
// import Image from "next/image";
import { cn } from "../../lib/utils";
import { ArrowRight, ArrowLeft, X, ZoomIn } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type LookbookCard = {
  title: string;
  subtitle: string;
  styledSrc: string; // shown on hover — person wearing it
  flatSrc: string; // default — flat lay / mannequin / detail
  fabric?: string;
  price?: string;
};

type LookbookSection = {
  id: string;
  label: string;
  season: string;
  description: string;
  cards: LookbookCard[];
  accentColor: string;
  bgTone: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const sections: LookbookSection[] = [
  {
    id: "bubu-kaftan",
    label: "Buba & Kaftan",
    season: "Resort Collection 2025",
    description:
      "Where Yoruba heritage meets contemporary drape. Voluminous silhouettes in hand-embroidered Aso-oke, Swiss voile, and silk-blend ankara.",
    accentColor: "#c9762a",
    bgTone: "#fdf6ee",
    cards: [
      {
        title: "Saffron Kaftan",
        subtitle: "Hand-embroidered Swiss voile",
        flatSrc:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&auto=format&fit=crop&q=80",
        fabric: "Swiss Voile, Gold threadwork",
        price: "From N285,000",
      },
      {
        title: "Ivory Buba Set",
        subtitle: "Oya collection — bespoke",
        flatSrc:
          "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80",
        fabric: "Aso-oke, Cotton underlining",
        price: "From N340,000",
      },
      {
        title: "Tangerine Abaya",
        subtitle: "Modern cut, traditional soul",
        flatSrc:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=700&auto=format&fit=crop&q=80",
        fabric: "Silk georgette, French seams",
        price: "From N195,000",
      },
      {
        title: "Midnight Kaftan",
        subtitle: "Evening weight, full train",
        flatSrc:
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop&q=80",
        fabric: "Dupion silk, Beaded hem",
        price: "From N420,000",
      },
      {
        title: "Sage Wrap Buba",
        subtitle: "Everyday luxury",
        flatSrc:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&auto=format&fit=crop&q=80",
        fabric: "Linen-silk blend, Hand-stitched hem",
        price: "From N155,000",
      },
      {
        title: "The Gold Set",
        subtitle: "Ceremony-weight Aso-oke",
        flatSrc:
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=700&auto=format&fit=crop&q=80",
        fabric: "Aso-oke, Gold metallic weave",
        price: "From N580,000",
      },
    ],
  },
  {
    id: "bridal",
    label: "Bridal Lookbook",
    season: "Atelier 2025",
    description:
      "Every bride deserves a garment that remembers the day. Sculpted in duchess satin, Chantilly lace, and silk organza — each gown is a first and only.",
    accentColor: "#9e7b5a",
    bgTone: "#faf8f5",
    cards: [
      {
        title: "The Adesola",
        subtitle: "Cathedral train, silk duchess",
        flatSrc:
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&auto=format&fit=crop&q=80",
        fabric: "Duchess Satin, Cathedral train",
        price: "From N1,400,000",
      },
      {
        title: "The Chisom",
        subtitle: "Minimal column with statement back",
        flatSrc:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&auto=format&fit=crop&q=80",
        fabric: "Stretch crepe, Open back",
        price: "From N980,000",
      },
      {
        title: "The Ngozi",
        subtitle: "Traditional fusion — Igbo ceremony",
        flatSrc:
          "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=700&auto=format&fit=crop&q=80",
        fabric: "George lace, Satin underlining",
        price: "From N1,200,000",
      },
      {
        title: "The Fatimah",
        subtitle: "Modest bridal — full drape",
        flatSrc:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=700&auto=format&fit=crop&q=80",
        fabric: "Silk chiffon, Pearl buttons",
        price: "From N1,100,000",
      },
      {
        title: "The Adaeze",
        subtitle: "Ballgown — ivory with gold embroidery",
        flatSrc:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80",
        fabric: "Tulle layers, Hand-sewn beading",
        price: "From N1,800,000",
      },
      {
        title: "The Blessing",
        subtitle: "Two-piece — ceremony and reception",
        flatSrc:
          "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop&q=80",
        fabric: "Mikado silk, Detachable train",
        price: "From N1,550,000",
      },
    ],
  },
  {
    id: "evening",
    label: "Evening Wear",
    season: "Noir — Autumn 2025",
    description:
      "For the hours after sundown. Velvet, charmeuse, and crepe in draped silhouettes that move with deliberate grace. Dressed for rooms that remember you.",
    accentColor: "#5a4a3a",
    bgTone: "#f5f3f0",
    cards: [
      {
        title: "Onyx Drape Gown",
        subtitle: "One-shoulder, floor-length",
        flatSrc:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&auto=format&fit=crop&q=80",
        fabric: "Silk charmeuse, Bias-cut",
        price: "From N485,000",
      },
      {
        title: "Claret Velvet",
        subtitle: "Structured bodice, fluid skirt",
        flatSrc:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=700&auto=format&fit=crop&q=80",
        fabric: "Crushed velvet, Boning detail",
        price: "From N520,000",
      },
      {
        title: "The Column",
        subtitle: "Minimal column, slit to the thigh",
        flatSrc:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=700&auto=format&fit=crop&q=80",
        fabric: "Ponte di Roma, Matte finish",
        price: "From N310,000",
      },
      {
        title: "Champagne Cascade",
        subtitle: "Asymmetric hem, strapless",
        flatSrc:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&auto=format&fit=crop&q=80",
        fabric: "Silk organza layers, Horsehair hem",
        price: "From N445,000",
      },
      {
        title: "Noir Co-ord",
        subtitle: "Wide-leg trouser and embellished top",
        flatSrc:
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80",
        fabric: "Matte crepe, Hand-beaded neckline",
        price: "From N375,000",
      },
      {
        title: "The Midnight Wrap",
        subtitle: "Draped wrap, navy to black ombre",
        flatSrc:
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=700&auto=format&fit=crop&q=80",
        styledSrc:
          "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=700&auto=format&fit=crop&q=80",
        fabric: "Ombre chiffon, Hand-rolled hem",
        price: "From N395,000",
      },
    ],
  },
];

// ─── Individual Card ──────────────────────────────────────────────────────────
const LookbookCard = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onOpen,
    accentColor,
  }: {
    card: LookbookCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onOpen: (idx: number) => void;
    accentColor: string;
  }) => {
    const isHovered = hovered === index;
    const isBlurred = hovered !== null && !isHovered;

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onOpen(index)}
        className={cn(
          "relative overflow-hidden cursor-pointer select-none",
          "h-[440px] md:h-[530px] w-full",
        )}
        style={{
          borderRadius: "2px",
          boxShadow: isHovered
            ? "0 24px 60px rgba(44,34,24,0.22)"
            : "0 4px 20px rgba(44,34,24,0.08)",
          filter: isBlurred
            ? "blur(1.5px) brightness(0.6) saturate(0.65)"
            : "none",
          transform: isBlurred
            ? "scale(0.973)"
            : isHovered
              ? "scale(1.015)"
              : "scale(1)",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          zIndex: isHovered ? 2 : 1,
        }}
      >
        {/* Default: flat / detail image */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isHovered ? 0 : 1,
            transition: "opacity 0.65s ease-in-out",
          }}
        >
          <img
            src={card.flatSrc}
            alt={card.title}
            // fill
            className="object-cover object-top"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.02) 60%, rgba(44,34,24,0.55) 100%)",
            }}
          />
          {/* "Hover to reveal" badge */}
          <div
            className="absolute bottom-5 left-5 flex items-center gap-2"
            style={{ opacity: 0.65 }}
          >
            <div
              style={{
                width: "18px",
                height: "1px",
                background: "rgba(255,255,255,0.7)",
              }}
            />
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.4em",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              HOVER TO STYLE
            </span>
          </div>
          {/* Piece number */}
          <span
            className="absolute top-4 right-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
              fontStyle: "italic",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover: styled / person wearing */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.65s ease-in-out",
          }}
        >
          <img
            src={card.styledSrc}
            alt={`${card.title} styled`}
            // fill
            className="object-cover object-center"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {/* Dark scrim for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20,12,5,0.92) 0%, rgba(20,12,5,0.05) 55%)",
            }}
          />
        </div>

        {/* Info panel — slides up on hover */}
        <div
          className="absolute inset-x-0 bottom-0 p-6"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(22px)",
            opacity: isHovered ? 1 : 0,
            transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.45em",
              color: accentColor,
              marginBottom: "0.35rem",
            }}
          >
            {card.subtitle.toUpperCase()}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.55rem",
              color: "#f0e8dc",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "0.3rem",
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(201,169,110,0.75)",
              fontWeight: 300,
              marginBottom: "0.9rem",
            }}
          >
            {card.fabric}
          </p>
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                color: "#f0e8dc",
              }}
            >
              {card.price}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.3em",
                color: "rgba(201,169,110,0.75)",
              }}
            >
              <ZoomIn style={{ width: "13px", height: "13px" }} />
              EXPAND
            </span>
          </div>
        </div>
      </div>
    );
  },
);
LookbookCard.displayName = "LookbookCard";

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  card,
  accentColor,
  onClose,
  onPrev,
  onNext,
}: {
  card: LookbookCard;
  accentColor: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: "rgba(14,8,2,0.96)", backdropFilter: "blur(10px)" }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(240,232,220,0.6)",
          zIndex: 10,
        }}
      >
        <X style={{ width: "28px", height: "28px" }} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(184,134,11,0.12)",
          border: "1px solid rgba(184,134,11,0.25)",
          borderRadius: "2px",
          padding: "0.7rem",
          cursor: "pointer",
          color: "#c9a96e",
          zIndex: 10,
        }}
      >
        <ArrowLeft style={{ width: "20px", height: "20px" }} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        style={{
          position: "absolute",
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(184,134,11,0.12)",
          border: "1px solid rgba(184,134,11,0.25)",
          borderRadius: "2px",
          padding: "0.7rem",
          cursor: "pointer",
          color: "#c9a96e",
          zIndex: 10,
        }}
      >
        <ArrowRight style={{ width: "20px", height: "20px" }} />
      </button>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full max-w-4xl"
        style={{ borderRadius: "2px", maxHeight: "90vh" }}
        initial={{ scale: 0.91, y: 28 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.91, y: 28 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image */}
        <div className="relative" style={{ minHeight: "400px" }}>
          <img
            src={card.styledSrc}
            alt={card.title}
            // fill
            className="object-cover"
          />
        </div>
        {/* Detail */}
        <div
          className="flex flex-col justify-between p-8 md:p-10"
          style={{ background: "#1a1108" }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.5em",
                color: accentColor,
                marginBottom: "1rem",
              }}
            >
              {card.subtitle.toUpperCase()}
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                color: "#f0e8dc",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "2rem",
              }}
            >
              {card.title}
            </h2>
            <div
              style={{
                borderTop: "1px solid rgba(201,169,110,0.15)",
                paddingTop: "1.5rem",
              }}
              className="space-y-4"
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.35em",
                    color: "rgba(201,169,110,0.4)",
                    marginBottom: "0.35rem",
                  }}
                >
                  FABRIC & FINISH
                </p>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(240,232,220,0.75)",
                    fontWeight: 300,
                  }}
                >
                  {card.fabric}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.35em",
                    color: "rgba(201,169,110,0.4)",
                    marginBottom: "0.35rem",
                  }}
                >
                  PRICE
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    color: "#c9a96e",
                    fontWeight: 400,
                  }}
                >
                  {card.price}
                </p>
              </div>
            </div>
          </div>
          <motion.a
            href="/contact"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.4em",
              background: accentColor,
              color: "#f0e8dc",
              padding: "0.9rem 1.5rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "2.5rem",
            }}
            whileHover={{ opacity: 0.85 }}
          >
            ENQUIRE ABOUT THIS PIECE
            <ArrowRight style={{ width: "14px", height: "14px" }} />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function LookbookSection({ section }: { section: LookbookSection }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id={section.id}
      style={{ background: section.bgTone, padding: "7rem 0" }}
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.55em",
              color: section.accentColor,
              marginBottom: "0.8rem",
            }}
          >
            {section.season.toUpperCase()}
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#2c2218",
                fontWeight: 300,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {section.label}
            </h2>
            <div className="flex-1">
              <div
                className="h-px mb-5"
                style={{
                  background: `linear-gradient(to right, ${section.accentColor}55, transparent)`,
                }}
              />
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.85rem",
                  color: "#7a6a58",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  maxWidth: "520px",
                }}
              >
                {section.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cards — asymmetric rhythm: middle column offset */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {section.cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.07, duration: 0.7 }}
              style={{ marginTop: index % 3 === 1 ? "3rem" : "0" }}
            >
              <LookbookCard
                card={card}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
                onOpen={(idx) => setLightboxIndex(idx)}
                accentColor={section.accentColor}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            card={section.cards[lightboxIndex]}
            accentColor={section.accentColor}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + section.cards.length) %
                  section.cards.length,
              )
            }
            onNext={() =>
              setLightboxIndex((lightboxIndex + 1) % section.cards.length)
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LookbookPage() {
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');
        body { background:#f7f5f2; margin:0; }
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#b8860b;border-radius:2px;}
      `}</style>

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5"
        style={{
          background:
            "linear-gradient(to bottom,rgba(247,245,242,0.97),transparent)",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.2rem",
            letterSpacing: "0.3em",
            color: "#2c2218",
          }}
        >
          Mimi Couture
        </span>
        {/* <ul
          className="hidden md:flex gap-8"
          style={{
            fontFamily: "'Jost',sans-serif",
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
              >
                {item}
              </li>
            ),
          )}
        </ul> */}
        <ul
          className="hidden md:flex gap-8"
          style={{
            fontFamily: "'Jost',sans-serif",
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
                // style={{
                //   color: item.path === "/collections" ? "#b8860b" : undefined,
                // }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "88vh" }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="Lookbook hero"
            // fill
            className="object-cover object-center"
            // priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg,rgba(44,34,24,0.35) 0%,rgba(44,34,24,0.2) 40%,rgba(44,34,24,0.82) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,rgba(44,34,24,0.6) 0%,transparent 55%)",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-12 md:px-20 pb-24"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.6em",
              color: "#c9a96e",
              marginBottom: "1.2rem",
            }}
          >
            MIMI COUTURE — 2025
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(4rem,10vw,9rem)",
              color: "#f7f0e8",
              lineHeight: 0.9,
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            The
            <br />
            <em style={{ fontStyle: "italic", color: "#c9a96e" }}>Lookbook</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.8rem",
              color: "rgba(201,169,110,0.65)",
              fontWeight: 300,
              marginTop: "1.8rem",
              maxWidth: "360px",
              lineHeight: 1.85,
            }}
          >
            Hover any piece to see it styled. Click to explore fabric,
            construction &amp; pricing.
          </motion.p>
          <motion.div
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "1px",
                height: "40px",
                background: "linear-gradient(to bottom,transparent,#c9a96e)",
              }}
            />
            <span
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.4em",
                color: "rgba(201,169,110,0.55)",
              }}
            >
              SCROLL TO EXPLORE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Sticky tab nav ── */}
      <div
        className="sticky top-0 z-40 flex justify-center overflow-x-auto"
        style={{
          background: "rgba(247,245,242,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,134,11,0.12)",
        }}
      >
        <div className="flex max-w-3xl w-full">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSection(i);
                scrollTo(s.id);
              }}
              className="relative flex-1 px-4 py-5 text-center transition-colors duration-300"
              style={{
                fontFamily: "'Jost',sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                color: activeSection === i ? "#2c2218" : "#9e8a78",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span className="uppercase whitespace-nowrap">{s.label}</span>
              {activeSection === i && (
                <motion.div
                  layoutId="lb-tab"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: "2px", background: s.accentColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sections ── */}
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <LookbookSection section={section} />
          {i < sections.length - 1 && (
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right,transparent,rgba(184,134,11,0.25),transparent)",
              }}
            />
          )}
        </React.Fragment>
      ))}

      {/* ── Footer CTA ── */}
      <section
        className="relative overflow-hidden py-28 text-center"
        style={{ background: "#1a1108" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: "rgba(184,134,11,0.06)" }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-8">
          <motion.p
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.55em",
              color: "#b8860b",
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SEE SOMETHING YOU LOVE?
          </motion.p>
          <motion.h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(2.5rem,5vw,4rem)",
              color: "#f0e8dc",
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
          >
            Every piece in this lookbook
            <br />
            <em style={{ color: "#c9a96e" }}>can be made for you.</em>
          </motion.h2>
          <motion.p
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.82rem",
              color: "rgba(201,169,110,0.6)",
              fontWeight: 300,
              lineHeight: 1.9,
              marginBottom: "3rem",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Book a free consultation and bring reference images. We'll draft
            something entirely your own from there.
          </motion.p>
          <motion.a
            href="/contact"
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              background: "#b8860b",
              color: "#f0e8dc",
              padding: "1rem 2.5rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ background: "#c9a96e" }}
            whileTap={{ scale: 0.97 }}
          >
            BOOK A CONSULTATION
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </motion.a>
        </div>
      </section>
    </>
  );
}
