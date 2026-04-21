import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CatalogueCard } from "./CatalogueCard";
import { CatalogueModal } from "./CatalogueModal";
import supabase from "../lib/supabase";
import { IoFlower } from "react-icons/io5";
import { GiSpotedFlower, GiFlowerTwirl, GiGlobeRing } from "react-icons/gi";
import { RiFlowerFill } from "react-icons/ri";
import { PiFlowerTulipDuotone } from "react-icons/pi";

const categories = [
  "All",
  "Bouquets",
  "Arrangements",
  "Event Decor",
  "Gift Sets",
];

function catIcon(cat) {
  const icons = {
    All: <IoFlower color="pink" />,
    Bouquets: <GiSpotedFlower color="pink" />,
    Arrangements: <RiFlowerFill color="pink" />,
    "Event Decor": <GiFlowerTwirl color="pink" />,
    "Gift Sets": <GiGlobeRing color="pink" />,
  };
  return icons[cat] || <PiFlowerTulipDuotone />;
}

export default function Catalogue() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false });
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filtered = products.filter((item) =>
    active === "All" ? true : item.category === active,
  );

  return (
    <section id="shop" className="bg-[#FDF6EF] py-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto mb-10">
        <p className="mb-2 text-xs font-medium tracking-widest text-pink-400 uppercase">
          What We Offer
        </p>
        <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-gray-800">
          Our Best Sellers
        </h2>
      </div>

      {/* Mobile pills */}
      <div className="max-w-6xl mx-auto mb-8 md:hidden">
        <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? "bg-pink-400 text-white" : "bg-white text-gray-500 border border-gray-100"}`}
            >
              {catIcon(cat)} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-w-6xl gap-10 mx-auto">
        {/* Sidebar desktop */}
        <aside className="flex-col flex-shrink-0 hidden w-48 md:flex">
          <p className="mb-5 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Categories
          </p>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-left transition-all ${active === cat ? "bg-pink-400 text-white shadow-sm shadow-pink-200" : "bg-white text-gray-500 border border-gray-100 hover:border-pink-200 hover:text-pink-400"}`}
              >
                <span>{catIcon(cat)}</span> {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-white border rounded-2xl animate-pulse border-pink-50"
                />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence>
                {filtered.map((item) => (
                  <CatalogueCard
                    key={item.id}
                    item={item}
                    onClick={setSelected}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="mb-3 text-3xl">
                <PiFlowerTulipDuotone />
              </p>
              <p className="text-sm text-gray-500">
                No items in this category yet
              </p>
            </div>
          )}
        </div>
      </div>

      <CatalogueModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
