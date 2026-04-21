import shopConfig from "../config/shop";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export function CatalogueModal({ item, onClose }) {
  const { whatsapp } = shopConfig;
  const { addToCart } = useCart();

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  const whatsappUrl = `https://wa.me/${whatsapp}?text=Hi!%20I'm%20interested%20in%20*${encodeURIComponent(item.name)}*%20(KSh%20${item.price}).%20Please%20advise.`;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full overflow-hidden bg-white border shadow-2xl sm:max-w-xl rounded-t-3xl sm:rounded-2xl border-pink-50"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-pink-50">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                )}

                {/* Category badge */}
                <span className="absolute px-3 py-1 text-xs font-medium text-pink-400 rounded-full top-4 left-4 bg-white/80 backdrop-blur">
                  {item.category}
                </span>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute flex items-center justify-center w-8 h-8 text-sm text-gray-500 transition-colors rounded-full top-4 right-4 bg-white/80 hover:bg-white"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div
                className="p-5 max-h-[60vh] overflow-y-auto"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {/* Name + Price */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2
                    className="text-lg font-semibold leading-snug text-gray-800"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {item.name}
                  </h2>
                  <span className="text-lg font-semibold text-pink-400 whitespace-nowrap">
                    KSh {Number(item.price).toLocaleString()}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(item);
                      toast.success(`${item.name} added to cart`);
                      onClose();
                    }}
                    className="flex-1 py-3 text-sm font-medium text-pink-400 transition-colors border border-pink-300 rounded-xl hover:bg-pink-50"
                  >
                    Add to Cart
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-medium text-white transition-all rounded-xl"
                    style={{ backgroundColor: "#2D5A3D" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
