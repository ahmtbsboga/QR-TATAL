"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Header from "../../components/header";

export default function ProductsPage() {
  const [sweets, setSweets] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchSweets = async () => {
      const querySnapshot = await getDocs(collection(db, "sweets"));
      const fetchedSweet = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(fetchedSweet);
    };

    fetchSweets();
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

      <h1 className="text-center font-bold mt-20 text-3xl">TATLI ÇEŞİTLERİ</h1>
      {/* ızgara listesi */}
      <div className="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 px-10 gap-8 w-fit py-10 mt-10">
        {sweets.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer shadow-2xl shadow-gray-600 p-4 rounded-lg flex flex-col justify-between gap-3 hover:translate-y-[-7px] duration-300 bg-white"
          >
            <h2 className="text-sm font-semibold">{product.name}</h2>
            <img
              src={product.imageName}
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
