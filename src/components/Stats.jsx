const stats = [
  { value: "3000+", label: "Packages Sold" },
  { value: "5000+", label: "Bouquets Sold" },
  { value: "700+", label: "Happy Clients" },
  { value: "15+", label: "Years of Experience" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:flex md:justify-around items-center px-6 md:px-16 py-10 border-t border-gray-100 gap-6 md:gap-0">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
