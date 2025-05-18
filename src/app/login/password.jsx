"use client";
import React, { useState } from "react";
import { LuEye as Open } from "react-icons/lu";
import { LuEyeClosed as Close } from "react-icons/lu";

const PasswordInput = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <input
        type={open ? "text" : "password"}
        placeholder="Şifre"
        required
        className="bg-gradient-to-l from-[#EAE4D5] via-[#B6B09F] text-black outline-none px-4 py-4 rounded-lg font-bold text-md w-full"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="absolute top-4 right-4 hover:bg-[#FAEDCA] py-1 px-1 duration-700 rounded-full hover:scale-120"
      >
        {open ? (
          <Open color="black" size={20} />
        ) : (
          <Close color="black" size={20} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
