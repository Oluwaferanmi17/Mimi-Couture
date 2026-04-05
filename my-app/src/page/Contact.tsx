"use client";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  Scissors,
  Shirt,
  Calendar,
  Ruler,
} from "lucide-react";
// import Image from "next/image";

// ─── Contact methods ──────────────────────────────────────────────────────────
const contactMethods = [
  {
    icon: Mail,
    title: "Email the Atelier",
    description: "For enquiries, lookbooks & quotes",
    value: "hello@maisondrappe.com",
    link: "mailto:hello@maisondrappe.com",
    gradient: "from-amber-600/25 to-yellow-600/15",
    border: "rgba(184,134,11,0.35)",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our head cutter",
    value: "+234 (0) 812 345 6789",
    link: "tel:+2348123456789",
    gradient: "from-stone-600/20 to-stone-400/10",
    border: "rgba(158,138,120,0.3)",
  },
  {
    icon: MapPin,
    title: "Visit the Studio",
    description: "By appointment only",
    value: "14 Awolowo Road, Ikoyi, Lagos",
    link: "#map",
    gradient: "from-amber-800/20 to-stone-600/10",
    border: "rgba(120,90,60,0.3)",
  },
];

// ─── Atelier stats ────────────────────────────────────────────────────────────
const atelierStats = [
  { label: "Response Time", value: "< 4 hrs", icon: Clock },
  { label: "Years in Craft", value: "17", icon: Scissors },
  { label: "Garments Made", value: "340+", icon: Shirt },
  { label: "Fitting Sessions", value: "2–3", icon: Ruler },
];

// ─── Service interest options ─────────────────────────────────────────────────
const serviceOptions = [
  "Bespoke Suit",
  "Bridal Gown",
  "Evening Wear",
  "Made-to-Measure",
  "Alterations",
  "Private Wardrobe",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Your name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Please enter a valid email";
    if (!formData.message.trim())
      e.message = "Please tell us about your project";
    else if (formData.message.trim().length < 10)
      e.message = "At least 10 characters please";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.23, 0.86, 0.39, 0.96] as [number, number, number, number],
      },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  // ── Input style helper ────────────────────────────────────────────────────
  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "2px",
    color: "#f0e8dc",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 300,
    padding: "1rem 1rem 1rem 2.8rem",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        body { margin: 0; background: #1a1108; }
        input::placeholder, textarea::placeholder { color: rgba(201,169,110,0.35); }
        input:focus, textarea:focus, select:focus { border-color: rgba(184,134,11,0.7) !important; }
        select option { background: #2c2218; color: #f0e8dc; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #b8860b; border-radius: 2px; }
      `}</style>

      {/* ── Fixed Nav ──────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,17,8,0.97) 0%, transparent 100%)",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            letterSpacing: "0.3em",
            color: "#f0e8dc",
          }}
        >
          Mimi Couture
        </span>
        {/* <ul
          className="hidden md:flex gap-8"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
          }}
        >
          {["Home", "Collections", "Services", "Atelier", "Contact"].map(
            (item) => (
              <li
                key={item}
                className="uppercase cursor-pointer transition-colors duration-300"
                style={{
                  color:
                    item === "Contact" ? "#b8860b" : "rgba(201,169,110,0.6)",
                }}
              >
                {item}
              </li>
            ),
          )}
        </ul> */}
        <ul
          className="hidden md:flex gap-8"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
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
                className="uppercase cursor-pointer transition-colors duration-300"
                style={{
                  color:
                    item.path === "/contact"
                      ? "#b8860b"
                      : "rgba(201,169,110,0.6)",
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "60vh", minHeight: "400px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop"
          alt="Contact hero"
          //   fill
          className="object-cover object-center"
          //   priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,17,8,0.6) 0%, rgba(26,17,8,0.92) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              color: "#b8860b",
              marginBottom: "1.5rem",
            }}
          >
            Mimi Couture — BEGIN YOUR JOURNEY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#f7f0e8",
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(201,169,110,0.7)",
              marginTop: "1.5rem",
              fontWeight: 300,
              maxWidth: "440px",
              lineHeight: 1.8,
            }}
          >
            Every great garment begins with a conversation. Ours are unhurried.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 1.2 }}
            style={{
              width: "40px",
              height: "1px",
              background: "#b8860b",
              margin: "2rem auto 0",
            }}
          />
        </div>
      </div>

      {/* ── Main section ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{
          background:
            "linear-gradient(135deg, #1a1108 0%, #0f0a04 50%, #1a1108 100%)",
        }}
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(184,134,11,0.06)" }}
            animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "rgba(201,169,110,0.05)" }}
            animate={{ x: [0, -60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Decorative diagonal lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent"
              style={{
                left: `${18 + i * 16}%`,
                top: `${10 + i * 12}%`,
                height: "160px",
                transform: `rotate(${25 + i * 18}deg)`,
              }}
              animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [1, 1.4, 1] }}
              transition={{
                duration: 3.5 + i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Floating gold dots */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: "rgba(184,134,11,0.3)",
                left: `${8 + i * 13}%`,
                top: `${15 + i * 11}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <motion.div
          ref={containerRef}
          className="relative z-10 max-w-6xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Stats bar ──────────────────────────────────────────── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            variants={fadeUp}
          >
            {atelierStats.map((s, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-sm group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,169,110,0.15)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  scale: 1.04,
                  y: -4,
                  borderColor: "rgba(184,134,11,0.4)",
                }}
                variants={fadeUp}
              >
                <motion.div
                  className="w-11 h-11 rounded-sm flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: "rgba(184,134,11,0.1)",
                    color: "#b8860b",
                    border: "1px solid rgba(184,134,11,0.2)",
                  }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <s.icon className="w-5 h-5" />
                </motion.div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    color: "#f0e8dc",
                    fontWeight: 400,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: "rgba(201,169,110,0.6)",
                    marginTop: "0.3rem",
                  }}
                >
                  {s.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Two-column layout ──────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.5em",
                  color: "#b8860b",
                  marginBottom: "1rem",
                }}
              >
                SEND AN ENQUIRY
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  color: "#f0e8dc",
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                }}
              >
                Write to us
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(201,169,110,0.6)",
                  marginBottom: "2.5rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                We'll respond within 4 hours and schedule a complimentary
                consultation.
              </p>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: "rgba(184,134,11,0.5)" }}
                        />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          style={{
                            ...inputBase,
                            borderColor: errors.name
                              ? "#ef4444"
                              : "rgba(201,169,110,0.2)",
                          }}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "0.7rem",
                              color: "#f87171",
                              marginTop: "0.4rem",
                            }}
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: "rgba(184,134,11,0.5)" }}
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          style={{
                            ...inputBase,
                            borderColor: errors.email
                              ? "#ef4444"
                              : "rgba(201,169,110,0.2)",
                          }}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "0.7rem",
                              color: "#f87171",
                              marginTop: "0.4rem",
                            }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: "rgba(184,134,11,0.5)" }}
                        />
                        <input
                          type="tel"
                          placeholder="Phone (optional)"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          style={inputBase}
                        />
                      </div>
                      <div className="relative">
                        <Scissors
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
                          style={{ color: "rgba(184,134,11,0.5)" }}
                        />
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            handleChange("service", e.target.value)
                          }
                          style={{
                            ...inputBase,
                            appearance: "none",
                            cursor: "pointer",
                            color: formData.service
                              ? "#f0e8dc"
                              : "rgba(201,169,110,0.35)",
                          }}
                        >
                          <option value="">Service of Interest</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-3 top-4 w-4 h-4"
                        style={{ color: "rgba(184,134,11,0.5)" }}
                      />
                      <textarea
                        placeholder="Tell us about your project, occasion, or vision..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        style={{
                          ...inputBase,
                          paddingTop: "1rem",
                          resize: "none",
                          borderColor: errors.message
                            ? "#ef4444"
                            : "rgba(201,169,110,0.2)",
                        }}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "0.7rem",
                            color: "#f87171",
                            marginTop: "0.4rem",
                          }}
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden flex items-center justify-center gap-3"
                      style={{
                        background: isSubmitting
                          ? "rgba(184,134,11,0.6)"
                          : "#b8860b",
                        color: "#f0e8dc",
                        border: "none",
                        padding: "1rem 2rem",
                        cursor: isSubmitting ? "wait" : "pointer",
                        borderRadius: "2px",
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                      }}
                      whileHover={{ scale: 1.02, background: "#c9a96e" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shimmer */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                        }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 rounded-full"
                          style={{
                            borderColor: "rgba(240,232,220,0.3)",
                            borderTopColor: "#f0e8dc",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Enquiry
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: "rgba(184,134,11,0.15)",
                        border: "1px solid rgba(184,134,11,0.4)",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CheckCircle
                        className="w-10 h-10"
                        style={{ color: "#b8860b" }}
                      />
                    </motion.div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2rem",
                        color: "#f0e8dc",
                        fontWeight: 300,
                        marginBottom: "1rem",
                      }}
                    >
                      Enquiry Received
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.82rem",
                        color: "rgba(201,169,110,0.7)",
                        fontWeight: 300,
                        lineHeight: 1.9,
                        marginBottom: "2rem",
                      }}
                    >
                      Thank you for writing to us. Our head cutter will be in
                      touch within 4 hours to arrange your consultation.
                    </p>
                    <motion.button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        padding: "0.85rem 2rem",
                        background: "transparent",
                        color: "#c9a96e",
                        border: "1px solid rgba(201,169,110,0.35)",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                      whileHover={{ borderColor: "#b8860b", color: "#b8860b" }}
                    >
                      Send Another Enquiry
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: contact methods + info */}
            <motion.div className="space-y-8" variants={fadeUp}>
              <div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.5em",
                    color: "#b8860b",
                    marginBottom: "1rem",
                  }}
                >
                  REACH US DIRECTLY
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    color: "#f0e8dc",
                    fontWeight: 300,
                    marginBottom: "0.75rem",
                  }}
                >
                  Other ways to connect
                </h3>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(201,169,110,0.6)",
                    fontWeight: 300,
                    lineHeight: 1.8,
                  }}
                >
                  We are reachable Monday – Saturday, 9am – 6pm WAT.
                </p>
              </div>

              {/* Contact method cards */}
              <div className="space-y-4">
                {contactMethods.map((m, i) => (
                  <motion.a
                    key={i}
                    href={m.link}
                    className="flex items-center gap-4 p-5 rounded-sm group transition-all duration-300 block"
                    style={{
                      background: `linear-gradient(135deg, ${m.gradient})`,
                      border: `1px solid ${m.border}`,
                      backdropFilter: "blur(8px)",
                      textDecoration: "none",
                    }}
                    variants={fadeUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <motion.div
                      className="w-13 h-13 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: "rgba(184,134,11,0.15)",
                        border: "1px solid rgba(184,134,11,0.25)",
                        color: "#b8860b",
                      }}
                      whileHover={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <m.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h4
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.15rem",
                          color: "#f0e8dc",
                          fontWeight: 400,
                          marginBottom: "0.2rem",
                        }}
                      >
                        {m.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          color: "rgba(201,169,110,0.5)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {m.description}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "0.82rem",
                          color: "#c9a96e",
                          fontWeight: 300,
                        }}
                      >
                        {m.value}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0"
                      style={{ color: "rgba(184,134,11,0.5)" }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Appointment guarantee card */}
              <motion.div
                className="p-6 rounded-sm"
                variants={fadeUp}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,134,11,0.08), rgba(201,169,110,0.04))",
                  border: "1px solid rgba(184,134,11,0.25)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5" style={{ color: "#b8860b" }} />
                  <h4
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.15rem",
                      color: "#f0e8dc",
                      fontWeight: 400,
                    }}
                  >
                    Consultation Guarantee
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(201,169,110,0.65)",
                    fontWeight: 300,
                    lineHeight: 1.9,
                  }}
                >
                  Your first consultation is entirely complimentary and never
                  rushed. We set aside a minimum of 60 minutes to understand
                  your vision before a single stitch is made.
                </p>
              </motion.div>

              {/* Studio image */}
              <motion.div
                className="relative overflow-hidden rounded-sm"
                style={{ height: "220px" }}
                variants={fadeUp}
              >
                <img
                  src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=800&auto=format&fit=crop"
                  alt="The studio"
                  //   fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,17,8,0.85) 0%, rgba(26,17,8,0.2) 60%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: "#f0e8dc",
                      fontStyle: "italic",
                    }}
                  >
                    "The studio, Ikoyi — where every appointment begins with
                    tea."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Map / Address strip ─────────────────────────────────────── */}
      <div
        style={{
          background: "#0f0a04",
          padding: "3rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(184,134,11,0.12)",
        }}
      >
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.5em",
            color: "#b8860b",
            marginBottom: "0.75rem",
          }}
        >
          FIND US
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            color: "#f0e8dc",
            fontWeight: 300,
          }}
        >
          14 Awolowo Road, Ikoyi, Lagos — by appointment only
        </p>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.75rem",
            color: "rgba(201,169,110,0.5)",
            marginTop: "0.5rem",
            fontWeight: 300,
          }}
        >
          Monday – Saturday · 9:00 am – 6:00 pm WAT
        </p>
      </div>
    </>
  );
}
