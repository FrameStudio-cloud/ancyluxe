import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import shop from '../config/shop'

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalItems } = useCart()

  // Build WhatsApp message from cart items
  function buildWhatsAppMessage() {
    if (items.length === 0) return ''
    const lines = items.map(i => `• ${i.name} x${i.qty} — ${i.priceLabel}`)
    return `Hi Bloom & Petal! I'd like to order:\n\n${lines.join('\n')}\n\nPlease confirm availability and delivery. 🌸`
  }

  const whatsappUrl = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage())}`

  if (items.length === 0) {
    return (
      <div className="bg-[#FDF6EF] min-h-screen flex flex-col items-center justify-center gap-6">
        <span className="text-6xl">🛒</span>
        <h2 className="font-['Cormorant_Garamond'] text-4xl text-gray-800">Your cart is empty</h2>
        <p className="text-sm text-gray-400">Go back and add some flowers 🌸</p>
        <Link
          to="/"
          className="bg-[#2D5A3D] text-white text-sm px-8 py-3 rounded-full hover:bg-[#1a3827] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FDF6EF] min-h-screen">

      {/* Header */}
      <div className="max-w-3xl px-6 pt-16 pb-6 mx-auto">
        <Link to="/" className="inline-block mb-6 text-sm text-gray-400 transition-colors hover:text-pink-400">
          ← Back to Shop
        </Link>
        <h1 className="font-['Cormorant_Garamond'] text-5xl font-light text-gray-800">
          Your Cart
        </h1>
        <p className="mt-1 text-sm text-gray-400">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
      </div>

      {/* Items */}
      <div className="flex flex-col max-w-3xl gap-4 px-6 mx-auto mb-10">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white shadow-sm rounded-2xl shadow-pink-50">

            {/* Image */}
            <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-xl bg-pink-50">
              <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-0.5">{item.category}</p>
              <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
              <p className="mt-1 text-sm font-semibold text-pink-400">{item.price}</p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="flex items-center justify-center text-sm text-gray-500 transition-colors border border-gray-200 rounded-full w-7 h-7 hover:border-pink-400 hover:text-pink-400"
              >
                −
              </button>
              <span className="w-4 text-sm font-medium text-center text-gray-800">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="flex items-center justify-center text-sm text-gray-500 transition-colors border border-gray-200 rounded-full w-7 h-7 hover:border-pink-400 hover:text-pink-400"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-2 text-lg text-gray-300 transition-colors hover:text-red-400"
            >
              ×
            </button>

          </div>
        ))}
      </div>

      {/* Checkout */}
      <div className="max-w-3xl px-6 pb-20 mx-auto">
        <div className="p-6 bg-white shadow-sm rounded-2xl shadow-pink-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total items</span>
            <span className="font-medium text-gray-800">{totalItems}</span>
          </div>
          <p className="mb-6 text-xs text-gray-400">
            Final price will be confirmed on WhatsApp based on availability.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#2D5A3D] hover:bg-[#1a3827] text-white font-medium text-sm rounded-xl transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order via WhatsApp
          </a>

          <button
            onClick={clearCart}
            className="w-full py-2 mt-3 text-xs text-gray-400 transition-colors hover:text-red-400"
          >
            Clear cart
          </button>
        </div>
      </div>

    </div>
  )
}