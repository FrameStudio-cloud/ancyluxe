import shop from "../config/shop";
export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-10 min-h-[85vh] gap-10 md:gap-0 max-w-6xl mx-auto w-full">
      {" "}
      {/* Left content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="font-['Cormorant_Garamond'] text-[52px] md:text-[72px] leading-tight font-light text-gray-800 mb-6">
          <span className="italic text-pink-400">Rich</span>
          <br />
          <span className="italic text-pink-400">Collection</span> of
          <br />
          Flowers
        </h1>
        <p className="max-w-xs mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:mx-0">
          Where flowers are our inspiration to create lasting memories. Whatever
          the occasion, our flowers will make it special.
        </p>
        <a
          href={`https://wa.me/${shop.whatsapp}`}
          target="_blank"
          className="inline-block px-8 py-4 text-sm text-white transition-colors bg-gray-900 rounded-full hover:bg-gray-700 rounded-bl-3xl rounded-tl-4xl"
        >
          Lets Talk
        </a>
      </div>
      {/* Right: oval image */}
      <div className="flex items-center justify-center flex-1">
        <div className="w-[280px] h-[340px] md:w-[420px] md:h-[520px] rounded-[50%] bg-pink-100 overflow-hidden flex items-center justify-center">
          <img
            src="/tulips-bouquet-design-template-removebg-preview.png"
            alt="Fresh flowers"
            className="w-[85%] h-[100%] object-cover rounded-[50%]"
          />
        </div>
      </div>
    </section>
  );
}