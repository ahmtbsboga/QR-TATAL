"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { IoMdLogOut as LogOut } from "react-icons/io";
import Link from "next/link";
import Header from "@/app/components/header";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function ConfirmDeleteToast({ id, onDelete, onClose }) {
  return (
    <div className="flex flex-col items-center gap-2 text-black">
      <p>Ürünü silmek istediğinize emin misiniz?</p>
      <div className="flex gap-2">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => {
            onDelete(id);
            onClose();
          }}
        >
          Evet
        </button>
        <button
          className="bg-gray-400 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Hayır
        </button>
      </div>
    </div>
  );
}

const categories = [
  { label: "Kahvaltılıklar", value: "breakfast" },
  { label: "İçecekler", value: "drinks" },
  { label: "Pideler", value: "pide" },
  { label: "Izgaralıklar", value: "products" },
  { label: "Çorbalar", value: "soup" },
  { label: "Tatlılar", value: "sweets" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "products",
  });
  const [selectedCategory, setSelectedCategory] = useState("products");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, selectedCategory));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (error) {
      toast.error("Ürünler alınamadı: " + error.message);
    }
  };

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price)
      return toast.error("Tüm alanlar gerekli");
    try {
      await addDoc(collection(db, newProduct.category), {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      });
      setNewProduct({ name: "", price: "", category: newProduct.category });
      toast.success("Ürün eklendi");
      fetchProducts();
    } catch (error) {
      toast.error("Ürün eklenemedi: " + error.message);
    }
  };

  const handleDelete = (id) => {
    const toastId = toast.info(
      <ConfirmDeleteToast
        id={id}
        onDelete={async (id) => {
          try {
            await deleteDoc(doc(db, selectedCategory, id));
            toast.success("Silindi");
            fetchProducts();
          } catch (error) {
            toast.error("Silinemedi: " + error.message);
          }
        }}
        onClose={() => toast.dismiss(toastId)}
      />,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({ name: item.name, price: item.price });
  };

  const handleUpdate = async (id) => {
    if (!editValues.name || !editValues.price)
      return toast.error("Tüm alanlar gerekli");
    try {
      await updateDoc(doc(db, selectedCategory, id), {
        name: editValues.name,
        price: parseFloat(editValues.price),
      });
      toast.success("Güncellendi");
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Güncellenemedi: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Başarıyla çıkış yapıldı");
        router.push("/login");
      })
      .catch((error) => {
        toast.error("Çıkış yapılamadı: " + error.message);
      });
  };

  return (
    <div className="min-h-screen p-0.5">
      <Header />

      <div className="mb-4 mt-50">
        <select
          value={selectedCategory}
          onChange={(e) => {
            const category = e.target.value;
            setSelectedCategory(category);
            setNewProduct((prev) => ({ ...prev, category }));
          }}
          className="p-2 rounded bg-zinc-200  text-zinc-600 outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Ürün adı"
          className=" p-2 rounded flex-1 min-w-[150px] bg-zinc-200  text-zinc-600 outline-none"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Fiyat"
          className=" p-2 rounded flex-1 min-w-[150px] bg-zinc-200 text-zinc-600 outline-none"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>

      <ul className="space-y-2 ">
        {products.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center  p-2 rounded gap-2 bg-zinc-200  text-zinc-600"
          >
            {editingId === item.id ? (
              <div className="flex flex-wrap gap-2 w-full">
                <input
                  type="text"
                  className=" p-1 rounded flex-1 min-w-[150px] bg-zinc-200 outline-none text-zinc-600"
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  className=" p-1 rounded flex-1 min-w-[100px] bg-zinc-200 outline-none text-zinc-600"
                  value={editValues.price}
                  onChange={(e) =>
                    setEditValues({ ...editValues, price: e.target.value })
                  }
                />
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  İptal
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 bg-zinc-200  text-zinc-600 ">
                <span>
                  {item.name} - {item.price} ₺
                </span>
                <div className="flex gap-2 ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Sil
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mb-4 mt-10 flex flex-row-reverse items-center justify-around">
        <Link
          href="/"
          className="bg-zinc-50 hover:bg-black hover:text-white hover:translate-y-[-7px] duration-700 text-zinc-600 px-2 py-2.5 rounded"
        >
          Anasayfaya git
        </Link>
        <button
          title="Yönetici Hesaptan Çıkış Yap"
          onClick={handleLogout}
          className="text-black hover:scale-120 duration-400 hover:border border-gray-600 rounded-full"
        >
          <LogOut size={30} />
        </button>
      </div>
    </div>
  );
}
