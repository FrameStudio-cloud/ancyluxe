const stats = [
  { value: "3000+", label: "Packages Sold" },
  { value: "5000+", label: "Bouquets Sold" },
  { value: "700+", label: "Happy Clients" },
  { value: "15+", label: "Years of Experience" },
];

export default function Stats() {
  return (
    <div className="grid items-center w-full max-w-6xl grid-cols-2 gap-6 px-6 py-10 mx-auto border-t border-gray-100 md:flex md:justify-around md:px-16 md:gap-0">
      {" "}
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
