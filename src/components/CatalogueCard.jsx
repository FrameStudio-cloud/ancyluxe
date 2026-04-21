import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast, {Toaster} from 'react-hot-toast'

export function CatalogueCard({ item, onClick }) {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();
  const notify = () => toast.success("product added")

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item)}
      className="overflow-hidden transition-all duration-300 bg-white cursor-pointer rounded-2xl group hover:shadow-lg hover:shadow-pink-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-pink-50">
        <img
          src={item.image_url}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-sm top-3 right-3 bg-white/80 hover:scale-110"
        >
          <span className="text-sm">{liked ? "❤️" : "🤍"}</span>
        </button>

        {/* Badge */}
        {item.badge && (
          <span className="absolute top-3 left-3 bg-pink-400 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="mb-1 text-xs text-gray-400">{item.category}</p>
        <h3 className="mb-2 text-sm font-medium leading-snug text-gray-800 line-clamp-1">
          {item.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-pink-400">
            KSh {Number(item.price).toLocaleString()}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
              notify();
            }}
            className="flex items-center justify-center text-xs transition-colors rounded-full w-7 h-7 bg-pink-50 group-hover:bg-pink-400 group-hover:text-white"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}
