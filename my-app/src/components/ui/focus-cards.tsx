"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../../lib/utils";

export type LookbookCard = {
  title: string;
  detail: string;
  /** Image shown at rest — garment on mannequin / flat lay / styled shot */
  src: string;
  /** Image revealed on hover — garment worn / editorial shot */
  hoverSrc: string;
  fabric?: string;
  price?: string;
};

export const LookCard = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: LookbookCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const isHovered = hovered === index;
    const isBlurred = hovered !== null && !isHovered;

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative overflow-hidden cursor-pointer group",
          "transition-all duration-500 ease-out",
          isBlurred && "blur-[2px] scale-[0.97] opacity-60",
        )}
        style={{ borderRadius: "2px" }}
      >
        {/* ── Rest state: mannequin / flat lay ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          <img
            src={card.src}
            alt={`${card.title} — at rest`}
            // fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </div>

        {/* ── Hover state: styled / worn shot ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <img
            src={card.hoverSrc}
            alt={`${card.title} — styled`}
            // fill
            className="object-cover object-center scale-105 transition-transform duration-700 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(44,34,24,0.85) 0%, rgba(44,34,24,0.1) 55%)",
            }}
          />
        </div>

        {/* ── Label — always visible, slides up on hover ── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-all duration-500"
          style={{ transform: isHovered ? "translateY(0)" : "translateY(4px)" }}
        >
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.4em",
              color: "#c9a96e",
              marginBottom: "0.4rem",
              opacity: isHovered ? 1 : 0.7,
              transition: "opacity 0.4s",
            }}
          >
            {card.detail.toUpperCase()}
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem",
              color: "#f0e8dc",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {card.title}
          </h3>
          {/* Fabric & price — only on hover */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: isHovered ? "60px" : "0",
              opacity: isHovered ? 1 : 0,
            }}
          >
            <div
              className="flex justify-between items-center mt-2 pt-2"
              style={{ borderTop: "1px solid rgba(201,169,110,0.25)" }}
            >
              {card.fabric && (
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.65rem",
                    color: "rgba(201,169,110,0.7)",
                    fontWeight: 300,
                  }}
                >
                  {card.fabric}
                </span>
              )}
              {card.price && (
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    color: "#c9a96e",
                  }}
                >
                  {card.price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── "View look" tag — appears on hover ── */}
        <div
          className="absolute top-4 right-4 z-10 transition-all duration-400"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(-6px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "#f0e8dc",
              background: "rgba(184,134,11,0.8)",
              padding: "0.35rem 0.75rem",
              backdropFilter: "blur(4px)",
            }}
          >
            STYLED LOOK
          </span>
        </div>
      </div>
    );
  },
);

LookCard.displayName = "LookCard";

export function FocusCards({
  cards,
  tall = false,
}: {
  cards: LookbookCard[];
  tall?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <div key={card.title} style={{ height: tall ? "560px" : "440px" }}>
          <LookCard
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
      ))}
    </div>
  );
}
