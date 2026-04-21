// src/pages/Gallery.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import supabase from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = ["All", "Weddings", "Events", "Bouquets", "Seasonal"];

function EventRow({ event }) {
  const scrollRef = useRef(null);

  function scroll(dir) {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="flex items-end justify-between px-1 mb-4">
        <div>
          <p
            className="mb-1 text-xs font-medium tracking-widest text-pink-400 uppercase"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {event.category} · {event.date}
          </p>
          <h3
            className="text-2xl text-gray-800 md:text-3xl"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            {event.title}
          </h3>
        </div>
        <div className="items-center hidden gap-2 md:flex">
          <button
            onClick={() => scroll(-1)}
            className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors border border-gray-200 rounded-full hover:border-pink-400 hover:text-pink-400"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors border border-gray-200 rounded-full hover:border-pink-400 hover:text-pink-400"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 pb-3 overflow-x-auto scrollbar-hide"
      >
        {event.photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex-shrink-0 overflow-hidden cursor-pointer rounded-2xl group"
            style={{ width: "260px", height: "320px" }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      <div className="h-px mt-10 bg-pink-100" />
    </motion.div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const { data: events } = await supabase
        .from("gallery_events")
        .select("*, gallery_photos(*)")
        .order("created_at", { ascending: false });

      const shaped = (events || []).map((e) => ({
        ...e,
        photos: (e.gallery_photos || []).sort(
          (a, b) => a.position - b.position,
        ),
      }));
      setGalleryEvents(shaped);
      setLoading(false);
    }
    fetchGallery();
  }, []);

  const filtered =
    active === "All"
      ? galleryEvents
      : galleryEvents.filter((e) => e.category === active);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF6EF" }}>
      <Navbar
        links={[
          { label: "Home", to: "/", isRoute: true },
          { label: "Gallery", to: "/gallery", isRoute: true },
        ]}
      />

      <div className="max-w-6xl px-4 pt-8 pb-20 mx-auto">
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 transition-colors hover:text-gray-700"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <FiArrowLeft size={15} />
            Back to Home
          </Link>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="mb-2 text-sm font-medium tracking-widest text-pink-400 uppercase"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Our Work
              </p>
              <h1
                className="text-5xl font-light text-gray-800 md:text-6xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Gallery
              </h1>
            </div>
            <p
              className="max-w-xs text-sm text-gray-400"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Every event is a story. Here's a look at the ones we've been part
              of.
            </p>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-3 pb-4 mb-12 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-pink-400 text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-pink-300 hover:text-pink-400"
              }`}
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {cat}
              <span
                className={`ml-2 text-xs ${active === cat ? "text-pink-100" : "text-gray-300"}`}
              >
                {cat === "All"
                  ? galleryEvents.length
                  : galleryEvents.filter((e) => e.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Event rows */}
        {loading ? (
          <div className="space-y-10">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="w-48 h-6 mb-4 bg-pink-100 rounded-full animate-pulse" />
                <div className="flex gap-3">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="flex-shrink-0 w-[260px] h-[320px] rounded-2xl bg-pink-50 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.length > 0 ? (
                filtered.map((event) => (
                  <EventRow key={event.id} event={event} />
                ))
              ) : (
                <p
                  className="py-20 text-center text-gray-400"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  No events in this category yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <Footer />
    </div>
  );
}
