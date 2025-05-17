"use client";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Header from "@/app/components/header";
import { useState, useRef, useEffect } from "react";

const CATEGORIES = {
  products: "products",
  soups: "soup",
  pide: "pide",
  breakfast: "breakfast",
  sweets: "sweets",
  drinks: "drinks",
};

const fetchCategory = async (category) => {
  try {
    const querySnapshot = await getDocs(collection(db, category));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      imageName: doc.data().imageName || "/default.png",
    }));
  } catch (error) {
    console.error(`${category} verisi çekilirken hata:`, error);
    return [];
  }
};

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  // Modal dışına tıklanınca kapatma efekti
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProduct(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TÜM KATEGORİLERİ ÇEKİYORUZ
  const { data: products = [] } = useQuery({
    queryKey: [CATEGORIES.products],
    queryFn: () => fetchCategory(CATEGORIES.products),
    staleTime: 60 * 60 * 1000,
  });

  const { data: soups = [] } = useQuery({
    queryKey: [CATEGORIES.soups],
    queryFn: () => fetchCategory(CATEGORIES.soups),
    staleTime: 60 * 60 * 1000,
  });

  const { data: pide = [] } = useQuery({
    queryKey: [CATEGORIES.pide],
    queryFn: () => fetchCategory(CATEGORIES.pide),
    staleTime: 60 * 60 * 1000,
  });

  const { data: breakfast = [] } = useQuery({
    queryKey: [CATEGORIES.breakfast],
    queryFn: () => fetchCategory(CATEGORIES.breakfast),
    staleTime: 60 * 60 * 1000,
  });

  const { data: sweets = [] } = useQuery({
    queryKey: [CATEGORIES.sweets],
    queryFn: () => fetchCategory(CATEGORIES.sweets),
    staleTime: 60 * 60 * 1000,
  });

  const { data: drinks = [] } = useQuery({
    queryKey: [CATEGORIES.drinks],
    queryFn: () => fetchCategory(CATEGORIES.drinks),
    staleTime: 60 * 60 * 1000,
  });

  // Kategorileri düzenliyoruz
  const allCategories = [
    { name: "IZGARA ÇEŞİTLERİ", items: products },
    { name: "ÇORBA ÇEŞİTLERİ", items: soups },
    { name: "PİDE ÇEŞİTLERİ", items: pide },
    { name: "KAHVALTI ÇEŞİTLERİ", items: breakfast },
    { name: "TATLI ÇEŞİTLERİ", items: sweets },
    { name: "İÇECEKLER", items: drinks },
  ];

  return (
    <div className="min-h-screen text-black relative">
      <Header />

      <marquee className="bg-[#FFF2E2] text-[#4B3F36] font-bold py-2 mt-8 fixed top-14 w-full z-10">
        İlk meze servisi ikramımızdır. Sonraki talepleriniz ayrıca
        ücretlendirilecektir.
      </marquee>

      <div className="pt-35">
        {allCategories.map((category) => (
          <section key={category.name} className="mb-12">
            <h1 className="text-center font-bold text-3xl my-8">
              {category.name}
            </h1>
            <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mx-auto">
              {category.items.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onClick={() => setSelectedProduct(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-white bg-black rounded-full w-7 h-7 text-sm"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold text-center">
                {selectedProduct.name}
              </h2>
              <p className="text-lg font-semibold">
                Fiyat:
                {selectedProduct.price > 0 ? `${selectedProduct.price}₺` : ""}
              </p>
              <img
                src={selectedProduct.imageName}
                alt={selectedProduct.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-amber-300"
              />

              <div className="w-full space-y-2"></div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2 bg-black text-white rounded-lg mt-4"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col justify-between gap-3 hover:translate-y-[-7px] duration-300 bg-white"
    >
      <h2 className="text-sm font-semibold">{product.name}</h2>
      <img
        src={product.imageName}
        alt={product.name}
        className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px] mx-auto"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/default.png";
        }}
      />
      <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
        Detay
      </button>
    </div>
  );
}
