import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import SocialFeed from "./components/SocialFeed";
import WhatsAppFloat from "./components/WhatsAppFloat";
import BackToTop from "./components/BackToTop";
import Catalogue from "./components/Catalogue";
import LocationMap from "./components/LocationMap";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import{ Toaster } from "react-hot-toast";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Gallery from "./pages/Gallery";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewEvent from "./pages/admin/NewEvent";


export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <>
      {!ready && <SplashScreen onDone={() => setReady(true)} />}
      <Routes>
        <Route
          path="/"
          element={
            <div className={ready ? "opacity-100" : "opacity-0"}>
              <Home />
              <Catalogue />
              <SocialFeed />
              <LocationMap />
              <Footer />
              <WhatsAppFloat />
              <BackToTop />
              <Toaster
                toastOptions={{
                  style: {
                    background: "pink",
                    color: "white",
                    borderRadius: "20px",
                  },
                }}
              />
            </div>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events/new" element={<NewEvent />} />
      </Routes>
    </>
  );
}
