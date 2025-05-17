import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-[200px] bg-gray-200 border-t border-gray-500 text-black text-center">
      <div className="mt-8">
        <h1 className="font-extrabold text-lg">Sosyal Medya Hesaplarımız</h1>

        <div className="flex flex-row justify-center mt-4 items-center gap-10 max-sm:flex-row max-sm:gap-3">
          <Link href={"/"}>
            📞 İletişim: <br /> 0 (537) 379 35 04
          </Link>
          <Link
            href={"https://www.instagram.com/berber_ali_turgut/"}
            target="_blank"
          >
            <FaInstagram
              className="bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] rounded-full p-2"
              size={40}
              color="white"
            />
          </Link>

          <Link
            href={"https://www.facebook.com/beberali.turgut?locale=tr_TR"}
            target="_blank"
          >
            <FaFacebook
              className="bg-gradient-to-r from-[#1877F2] via-[#145DBF] to-[#3B5998] rounded-full p-2"
              size={40}
              color="white"
            />
          </Link>

          <Link href={"https://wa.me/905373793504"} target="_blank">
            <FaWhatsapp
              className="bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] rounded-full p-2"
              size={40}
              color="white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
