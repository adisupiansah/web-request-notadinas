import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import NavigasiBar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Logistik Polres Karimun",
  description: "nota dinas logistik polres karimun - polda kepri",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigasiBar />
        {children}
      </body>
    </html>
  );
}
