import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiX, FiUploadCloud } from "react-icons/fi";
import supabase from "../../lib/supabase";

const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;
const CATEGORIES = ["Weddings", "Events", "Bouquets", "Seasonal"];

async function uploadToImgBB(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  return data.data.url;
}

export default function NewEvent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Events");
  const [photos, setPhotos] = useState([]); // { file, preview, url, status }
  const [saving, setSaving] = useState(false);

  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      url: null,
      status: "pending", // pending | uploading | done | error
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!title || !date || photos.length === 0) return;
    setSaving(true);

    // 1. Upload all photos to imgBB
    const uploaded = [];
    for (let i = 0; i < photos.length; i++) {
      setPhotos((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: "uploading" } : p)),
      );
      try {
        const url = await uploadToImgBB(photos[i].file);
        uploaded.push(url);
        setPhotos((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, url, status: "done" } : p)),
        );
      } catch {
        setPhotos((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, status: "error" } : p)),
        );
      }
    }

    // 2. Create the event in Supabase
    const { data: event, error } = await supabase
      .from("gallery_events")
      .insert({ title, date, category, cover_url: uploaded[0] })
      .select()
      .single();

    if (error || !event) {
      setSaving(false);
      return;
    }

    // 3. Insert all photos
    const photoRows = uploaded.map((src, i) => ({
      event_id: event.id,
      src,
      alt: `${title} photo ${i + 1}`,
      position: i,
    }));
    await supabase.from("gallery_photos").insert(photoRows);

    setSaving(false);
    navigate("/admin/dashboard");
  }

  const canSave = title && date && photos.length > 0 && !saving;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FDF6EF", fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Top bar */}
      <div className="bg-white border-b border-pink-50 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500"
        >
          <FiArrowLeft size={16} />
        </button>
        <h2 className="text-lg font-medium text-gray-800 flex-1">New Event</h2>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="px-5 py-2 rounded-full text-white text-sm font-medium disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: "#2D5A3D" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Title */}
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">
            Event Title
          </label>
          <input
            type="text"
            placeholder="e.g. Bridal Deco in Bungoma"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-pink-400 outline-none text-sm bg-white"
          />
        </div>

        {/* Date + Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">
              Date
            </label>
            <input
              type="text"
              placeholder="e.g. March 2024"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-pink-400 outline-none text-sm bg-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-pink-400 outline-none text-sm bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block uppercase tracking-wider">
            Photos
          </label>

          <label className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-2xl border-2 border-dashed border-pink-200 bg-white cursor-pointer hover:border-pink-400 transition-colors">
            <FiUploadCloud size={24} className="text-pink-400" />
            <p className="text-sm text-gray-500">Tap to select photos</p>
            <p className="text-xs text-gray-300">Select multiple at once</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Photo previews */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden aspect-square bg-gray-100"
              >
                <img
                  src={photo.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Status overlay */}
                {photo.status === "uploading" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  </div>
                )}
                {photo.status === "done" && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}
                {photo.status === "error" && (
                  <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                    <span className="text-white text-xs">Failed</span>
                  </div>
                )}

                {/* Remove button — only before saving */}
                {!saving && (
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white"
                  >
                    <FiX size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Note about cover */}
        {photos.length > 0 && (
          <p className="text-xs text-gray-400 text-center">
            First photo will be used as the event cover
          </p>
        )}
      </div>
    </div>
  );
}
