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
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: [CATEGORIES.products],
    queryFn: () => fetchCategory(CATEGORIES.products),
    staleTime: 60 * 60 * 1000,
  });

  const { data: soups = [], isLoading: loadingSoups } = useQuery({
    queryKey: [CATEGORIES.soups],
    queryFn: () => fetchCategory(CATEGORIES.soups),
    staleTime: 60 * 60 * 1000,
  });

  const { data: pide = [], isLoading: loadingPide } = useQuery({
    queryKey: [CATEGORIES.pide],
    queryFn: () => fetchCategory(CATEGORIES.pide),
    staleTime: 60 * 60 * 1000,
  });

  const { data: breakfast = [], isLoading: loadingBreakfast } = useQuery({
    queryKey: [CATEGORIES.breakfast],
    queryFn: () => fetchCategory(CATEGORIES.breakfast),
    staleTime: 60 * 60 * 1000,
  });

  const { data: sweets = [], isLoading: loadingSweets } = useQuery({
    queryKey: [CATEGORIES.sweets],
    queryFn: () => fetchCategory(CATEGORIES.sweets),
    staleTime: 60 * 60 * 1000,
  });

  const { data: drinks = [], isLoading: loadingDrinks } = useQuery({
    queryKey: [CATEGORIES.drinks],
    queryFn: () => fetchCategory(CATEGORIES.drinks),
    staleTime: 60 * 60 * 1000,
  });

  const isAnyLoading =
    loadingProducts ||
    loadingSoups ||
    loadingPide ||
    loadingBreakfast ||
    loadingSweets ||
    loadingDrinks;

  if (isAnyLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
      >
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

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
