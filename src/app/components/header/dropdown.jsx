"use client";
import { useState, useEffect } from "react";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Firebase yapılandırmanızın olduğu dosya
import Link from "next/link";

const DropDown = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Kullanıcı giriş yapmışsa rolünü kontrol et
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Yükleniyorsa hiçbir şey gösterme

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="">
        {!open ? (
          <MdRestaurantMenu size={30} className="" />
        ) : (
          <MdOutlineClose size={30} />
        )}

        {open && (
          <div className="absolute w-[250px] top-20 right-[-50] rounded-xl py-6 shadow-2xl shadow-black bg-[#FFF2E2] flex flex-col">
            <Link href={"/menu"} className="dropdown border-t">
              Anasayfa
            </Link>
            <Link href={"/menu1"} className="dropdown">
              Izgaralar
            </Link>
            <Link href={"/menu2"} className="dropdown">
              Çorbalar
            </Link>
            <Link href={"/menu3"} className="dropdown">
              Pideler
            </Link>
            <Link href={"/menu4"} className="dropdown">
              Kahvaltı
            </Link>
            <Link href={"/menu5"} className="dropdown">
              Tatlı
            </Link>
            <Link href={"/menu6"} className="dropdown">
              İçecekler
            </Link>
            {isAdmin && (
              <Link href="/dashboard">
                <li className="dropdown font-bold text-blue-600">Dashboard</li>
              </Link>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default DropDown;
