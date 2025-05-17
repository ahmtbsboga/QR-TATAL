import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TAT-AL | Restaurant",
  description: "TAT-AL QR-Menu",
  keywords: [
    "tat-al",
    "qr menu",
    "restaurant",
    "food",
    "menu",
    "kebap",
    "yemek",
    "içecek",
    "çorba",
    "anamenü",
    "tatlı",
    "ızgara",
    "kahvaltı",
    "pide",
    "yozgat",
    "sorgun",
    "sorgun restoran",
    "yozgat kebap",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="bg-color">
          <Providers>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
          </Providers>

          <Footer />
        </div>
      </body>
    </html>
  );
}
