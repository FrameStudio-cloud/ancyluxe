export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-10 min-h-[85vh] gap-10 md:gap-0">
      {/* Left content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="font-['Cormorant_Garamond'] text-[52px] md:text-[72px] leading-tight font-light text-gray-800 mb-6">
          <span className="text-pink-400 italic">Rich</span>
          <br />
          <span className="text-pink-400 italic">Collection</span> of
          <br />
          Flowers
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-10 mx-auto md:mx-0">
          Where flowers are our inspiration to create lasting memories. Whatever
          the occasion, our flowers will make it special.
        </p>
        <a
          href="https://wa.me/254700000000"
          target="_blank"
          className="inline-block bg-gray-900 text-white text-sm px-8 py-4 rounded-full hover:bg-gray-700 transition-colors rounded-bl-3xl rounded-tl-4xl"
        >
          Lets Talk
        </a>
      </div>

      {/* Right: oval image */}
      <div className="flex-1 flex justify-center items-center">
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