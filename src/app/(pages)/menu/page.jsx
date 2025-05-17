"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Header from "../../components/header";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [soups, setSoups] = useState([]);
  const [pide, setPide] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);
    };

    const fetchSoups = async () => {
      const querySnapshot = await getDocs(collection(db, "soup"));
      const fetchedSoups = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSoups(fetchedSoups);
    };
    const fetchPide = async () => {
      const querySnapshot = await getDocs(collection(db, "pide"));
      const fetchedPides = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPide(fetchedPides);
    };

    const fetchBreakfast = async () => {
      const querySnapshot = await getDocs(collection(db, "breakfast"));
      const fetchedBreakfast = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBreakfast(fetchedBreakfast);
    };

    const fetchSweets = async () => {
      const querySnapshot = await getDocs(collection(db, "sweets"));
      const fetchedSweets = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(fetchedSweets);
    };

    const fetchDrinks = async () => {
      const querySnapshot = await getDocs(collection(db, "drinks"));
      const fetchedDrinks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrinks(fetchedDrinks);
    };

    fetchProducts();
    fetchSoups();
    fetchPide();
    fetchBreakfast();
    fetchSweets();
    fetchDrinks();
  }, []);

  return (
    <div className="min-h-screen text-black relative">
      <Header />

      <div className="py-10"></div>

      {/*  modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[70%] max-w-md relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-white bg-black rounded-full w-7 h-7 text-sm"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-center">
              {selectedProduct.name}
            </h2>
            <p className="mt-4 text-center font-bold">
              {selectedProduct.price > 0
                ? `Fiyat: ${selectedProduct.price}₺`
                : ""}
            </p>
            <img
              src={selectedProduct.imageName}
              alt="ürün"
              className="w-[100px] h-[100px] object-cover rounded-full mt-4 mx-auto"
            />
          </div>
        </div>
      )}
      <marquee
        behavior="right"
        direction="left"
        className="shadow-2xl shadow-black py-2 px-2  w-full bg-[#FFF2E2] text-[#4B3F36] font-bold fixed mt-14 "
      >
        İlk meze servisi ikramımızdır. Sonraki talepleriniz ayrıca
        ücretlendirilecektir.
      </marquee>
      <h1 className="text-center font-bold mt-30 text-3xl mb-[-40px]">
        IZGARA ÇEŞİTLERİ
      </h1>
      {/* ızgara listesi */}
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-10">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col justify-between gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{product.name}</h2>
            <img
              src={product.imageName || "/default.png"}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default.png";
              }}
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>

      {/* çorba listesi */}
      <h1 className="text-center font-bold mt-3 text-3xl">ÇORBA ÇEŞİTLERİ</h1>
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-5">
        {soups.map((soup) => (
          <div
            key={soup.id}
            onClick={() => setSelectedProduct(soup)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{soup.name}</h2>
            <img
              src={soup.imageName}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>

      {/* pide listesi */}
      <h1 className="text-center font-bold mt-3 text-3xl">PİDE ÇEŞİTLERİ</h1>
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-5">
        {pide.map((pide) => (
          <div
            key={pide.id}
            onClick={() => setSelectedProduct(pide)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{pide.name}</h2>
            <img
              src={pide.imageName}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>

      {/* kahvaltı listesi */}
      <h1 className="text-center font-bold mt-3 text-3xl">
        KAHVALTI ÇEŞİTLERİ
      </h1>
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-5">
        {breakfast.map((i) => (
          <div
            key={i.id}
            onClick={() => setSelectedProduct(i)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{i.name}</h2>
            <img
              src={i.imageName}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>

      {/* tatlı listesi */}
      <h1 className="text-center font-bold mt-3 text-3xl">TATLI ÇEŞİTLERİ</h1>
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-5">
        {sweets.map((i) => (
          <div
            key={i.id}
            onClick={() => setSelectedProduct(i)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{i.name}</h2>
            <img
              src={i.imageName}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>
      {/* içecek listesi */}
      <h1 className="text-center font-bold mt-3 text-3xl">İÇECEKLER</h1>
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-5">
        {drinks.map((i) => (
          <div
            key={i.id}
            onClick={() => setSelectedProduct(i)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{i.name}</h2>
            <img
              src={i.imageName}
              alt="resim"
              className="rounded-full border-4 border-amber-300 object-cover w-[120px] h-[100px]"
            />
            <button className="text-black shadow-2xl shadow-gray-600 bg-[#F6F0E8] px-2 rounded-xl py-1 hover:bg-black duration-400 hover:text-white">
              Detay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
