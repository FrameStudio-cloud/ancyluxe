import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import seedGallery from "../data/gallery.json";

export default function GalleryPreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("gallery_events")
        .select("id, title, category, cover_url")
        .order("created_at", { ascending: false })
        .limit(6);
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(seedGallery.events.slice(0, 6));
      }
    }
    fetch();
  }, []);

  if (events.length === 0) return null;

  return (
    <section id="gallery" className="px-4 py-20" style={{ backgroundColor: "#FDF6EF" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="mb-2 text-sm font-medium tracking-widest text-pink-400 uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Our Work
            </p>
            <h2 className="text-4xl font-light text-gray-800 md:text-5xl" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Events We've Styled
            </h2>
          </div>
          <Link to="/gallery" className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-gray-300 hover:border-pink-400 hover:text-pink-400 transition-colors text-gray-500">
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden cursor-pointer rounded-2xl group aspect-square"
            >
              <img src={event.cover_url} alt={event.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100">
                <div>
                  <p className="text-sm font-medium leading-tight text-white" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}>
                    {event.title}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {event.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-full">
            See All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}