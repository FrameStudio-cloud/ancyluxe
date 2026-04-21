import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPlus, FiTrash2, FiLogOut, FiImage, FiPackage, FiCalendar, FiX } from "react-icons/fi";
import supabase from "../../lib/supabase";
import shop from "../../config/shop";

const CATEGORIES = ["Bouquets", "Arrangements", "Event Decor", "Gift Sets"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("events");

  // Events state
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState({ name: "", price: "", category: CATEGORIES[0], description: "" });
  const [productImage, setProductImage] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("bp_admin")) { navigate("/admin"); return; }
    fetchEvents();
    fetchProducts();
  }, []);

  async function fetchEvents() {
    setLoadingEvents(true);
    const { data } = await supabase.from("gallery_events").select("*, gallery_photos(count)").order("created_at", { ascending: false });
    setEvents(data || []);
    setLoadingEvents(false);
  }

  async function fetchProducts() {
    setLoadingProducts(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoadingProducts(false);
  }

  async function deleteEvent(id) {
    setDeletingEvent(id);
    await supabase.from("gallery_events").delete().eq("id", id);
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeletingEvent(null);
  }

  async function deleteProduct(id) {
    setDeletingProduct(id);
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeletingProduct(null);
  }

  async function uploadToImgBB(file) {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, { method: "POST", body: form });
    const data = await res.json();
    return data.data.url;
  }

  async function saveProduct() {
    if (!productForm.name || !productForm.price) return;
    setSavingProduct(true);
    let image_url = null;
    if (productImage) image_url = await uploadToImgBB(productImage);
    const { data } = await supabase.from("products").insert({
      name: productForm.name,
      price: parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description,
      image_url,
    }).select().single();
    setProducts(prev => [data, ...prev]);
    setProductForm({ name: "", price: "", category: CATEGORIES[0], description: "" });
    setProductImage(null);
    setShowProductForm(false);
    setSavingProduct(false);
  }

  function logout() {
    sessionStorage.removeItem("bp_admin");
    navigate("/admin");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDF6EF", fontFamily: "DM Sans, sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white border-b border-pink-50">
        <h1 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem" }}>
          {shop.name} <span className="text-pink-400">{shop.nameAccent}</span>
        </h1>
        <div className="flex items-center gap-3">
          {tab === "events" && (
            <Link to="/admin/events/new" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-full" style={{ backgroundColor: "#2D5A3D" }}>
              <FiPlus size={16} /> New Event
            </Link>
          )}
          {tab === "products" && (
            <button onClick={() => setShowProductForm(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-full" style={{ backgroundColor: "#2D5A3D" }}>
              <FiPlus size={16} /> New Product
            </button>
          )}
          <button onClick={logout} className="flex items-center justify-center text-gray-500 transition-colors border border-gray-200 rounded-full w-9 h-9 hover:border-red-300 hover:text-red-400">
            <FiLogOut size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-2xl px-4 py-8 mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-5 bg-white border rounded-2xl border-pink-50">
            <p className="mb-1 text-xs text-gray-400">Total Events</p>
            <p className="text-3xl font-light text-gray-800" style={{ fontFamily: "Cormorant Garamond, serif" }}>{events.length}</p>
          </div>
          <div className="p-5 bg-white border rounded-2xl border-pink-50">
            <p className="mb-1 text-xs text-gray-400">Total Products</p>
            <p className="text-3xl font-light text-gray-800" style={{ fontFamily: "Cormorant Garamond, serif" }}>{products.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[["events", FiCalendar, "Events"], ["products", FiPackage, "Products"]].map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === key ? "bg-pink-400 text-white" : "bg-white text-gray-500 border border-gray-200"}`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Add Product Form */}
        {tab === "products" && showProductForm && (
          <div className="p-5 mb-4 bg-white border border-pink-100 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-800">New Product</p>
              <button onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={16} /></button>
            </div>
            <div className="space-y-3">
              <input
                placeholder="Product name"
                value={productForm.name}
                onChange={e => setProductForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300"
              />
              <div className="flex gap-3">
                <input
                  placeholder="Price (KSh)"
                  type="number"
                  value={productForm.price}
                  onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300"
                />
                <select
                  value={productForm.category}
                  onChange={e => setProductForm(p => ({ ...p, category: e.target.value }))}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <textarea
                placeholder="Description (optional)"
                value={productForm.description}
                onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-pink-300 resize-none"
              />
              <div className="flex items-center gap-3">
                <label className="flex-1 border border-dashed border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-pointer hover:border-pink-300 text-center">
                  {productImage ? productImage.name : "Upload image"}
                  <input type="file" accept="image/*" className="hidden" onChange={e => setProductImage(e.target.files[0])} />
                </label>
                <button
                  onClick={saveProduct}
                  disabled={savingProduct}
                  className="px-5 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60"
                  style={{ backgroundColor: "#2D5A3D" }}
                >
                  {savingProduct ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Events list */}
        {tab === "events" && (
          <div className="space-y-3">
            {loadingEvents ? (
              [...Array(3)].map((_, i) => <div key={i} className="h-24 bg-white border rounded-2xl animate-pulse border-pink-50" />)
            ) : events.length === 0 ? (
              <div className="py-20 text-center">
                <FiImage size={32} className="mx-auto mb-3 text-pink-200" />
                <p className="text-sm text-gray-400">No events yet. Create your first one.</p>
              </div>
            ) : events.map(event => (
              <div key={event.id} className="flex items-center gap-4 p-4 bg-white border rounded-2xl border-pink-50">
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-xl bg-pink-50">
                  {event.cover_url && <img src={event.cover_url} alt={event.title} className="object-cover w-full h-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{event.category} · {event.date}</p>
                  <p className="mt-1 text-xs text-pink-400">{event.gallery_photos?.[0]?.count || 0} photos</p>
                </div>
                <button onClick={() => deleteEvent(event.id)} disabled={deletingEvent === event.id} className="flex items-center justify-center flex-shrink-0 text-gray-400 transition-colors border border-gray-100 rounded-full w-9 h-9 hover:border-red-300 hover:text-red-400">
                  {deletingEvent === event.id ? <span className="w-3 h-3 border-2 border-red-300 rounded-full border-t-transparent animate-spin" /> : <FiTrash2 size={15} />}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Products list */}
        {tab === "products" && (
          <div className="space-y-3">
            {loadingProducts ? (
              [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white border rounded-2xl animate-pulse border-pink-50" />)
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <FiPackage size={32} className="mx-auto mb-3 text-pink-200" />
                <p className="text-sm text-gray-400">No products yet. Add your first one.</p>
              </div>
            ) : products.map(product => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-white border rounded-2xl border-pink-50">
                <div className="flex items-center justify-center flex-shrink-0 overflow-hidden w-14 h-14 rounded-xl bg-pink-50">
                  {product.image_url ? <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" /> : <FiImage size={18} className="text-pink-200" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{product.category}</p>
                  <p className="mt-1 text-xs text-pink-400">KSh {Number(product.price).toLocaleString()}</p>
                </div>
                <button onClick={() => deleteProduct(product.id)} disabled={deletingProduct === product.id} className="flex items-center justify-center flex-shrink-0 text-gray-400 transition-colors border border-gray-100 rounded-full w-9 h-9 hover:border-red-300 hover:text-red-400">
                  {deletingProduct === product.id ? <span className="w-3 h-3 border-2 border-red-300 rounded-full border-t-transparent animate-spin" /> : <FiTrash2 size={15} />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}