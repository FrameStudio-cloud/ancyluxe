// src/components/Footer.jsx
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { MdLocationOn, MdAccessTime, MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import shop from '../config/shop'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      style={{ backgroundColor: "#FDF6EF", fontFamily: "DM Sans, sans-serif" }}
      className="relative overflow-hidden"
    >
      {/* Decorative watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(80px, 18vw, 220px)",
            color: "rgba(244, 114, 182, 0.06)",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          Ancy luxe
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-0">
        {/* Top: Brand + tagline centered */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {/* Petal divider left */}
            <span style={{ color: "#f9a8d4", fontSize: "1.2rem" }}>✦</span>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#1f2937",
              }}
              className="text-4xl md:text-5xl font-light tracking-wide mx-3"
            >
              {shop.name}{" "}
              <span style={{ color: "#f472b6" }}>{shop.nameAccent}</span>
            </h2>
            <span style={{ color: "#f9a8d4", fontSize: "1.2rem" }}>✦</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
            {shop.description}
          </p>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[
              {
                icon: <FaInstagram size={16} />,
                href: `https://instagram.com/${shop.social?.instagram}`,
                label: "Instagram",
              },
              {
                icon: <FaFacebook size={16} />,
                href: `https://facebook.com/${shop.facebook}`,
                label: "Facebook",
              },
              {
                icon: <FaTiktok size={16} />,
                href: `https://tiktok.com/${shop.social?.tiktok}`,
                label: "TikTok",
              },
              {
                icon: <FaWhatsapp size={16} />,
                href: `https://wa.me/${shop.whatsapp}`,
                label: "WhatsApp",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-pink-200 flex items-center justify-center text-pink-400 hover:bg-pink-400 hover:text-white hover:border-pink-400 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-pink-100">
          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#1f2937",
              }}
              className="text-xl font-semibold mb-5"
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Catalogue", to: "/#catalogue" },
                { label: "Gallery", to: "/gallery" },
                { label: "Socials", to: "/#socials" },
                // { label: 'About Us', to: '/#about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-pink-200 group-hover:w-6 group-hover:bg-pink-400 transition-all duration-200 inline-block" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#1f2937",
              }}
              className="text-xl font-semibold mb-5"
            >
              What We Do
            </h4>
            <ul className="space-y-3">
              {[
                "Fresh Bouquets",
                "Wedding Florals",
                "Event Decoration",
                "Same-Day Delivery",
                "Corporate Orders",
              ].map((s) => (
                <li
                  key={s}
                  className="text-gray-400 text-sm flex items-center gap-2"
                >
                  <span className="text-pink-300 text-xs">✿</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + WhatsApp CTA */}
          <div>
            <h4
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "#1f2937",
              }}
              className="text-xl font-semibold mb-5"
            >
              Find Us
            </h4>
            <ul className="space-y-4 mb-7">
              {[
                {
                  icon: <MdLocationOn size={16} />,
                  text: shop.location?.address || shop.locations,
                },
                { icon: <MdAccessTime size={16} />, text: shop.hours },
                {
                  icon: <MdEmail size={16} />,
                  text: shop.email,
                  href: `mailto:${shop.email}`,
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-400 text-sm"
                >
                  <span className="text-pink-400 mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-pink-400 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${shop.whatsapp}?text=Hi! I'd like to place an order 🌸`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: "#2D5A3D" }}
            >
              <FaWhatsapp size={16} />
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-gray-400">
          <p>
            © {currentYear} {shop.name} {shop.nameAccent}. All rights reserved.
          </p>
          <p>
            Crafted with care by{" "}
            <a
              href={`https://wa.me/${shop.developerWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:underline"
            >
              {shop.developerName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer