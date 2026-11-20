import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "RentGear | Equipment Rental Platform",
  description:
    "Rent construction, photography, vehicle, agriculture, electronics and event equipment from verified owners.",
};
const toastStyle = {
  background: "#0e0e0e",
  color: "#f1ebe4",
  border: "1px solid #F28A2E",
  borderRadius: "14px",
  padding: "12px 16px",
  fontWeight: 600,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="rentlight" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='rentdark'||t==='rentlight')document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: toastStyle,
              success: { iconTheme: { primary: "#F28A2E", secondary: "#000" } },
              error: { iconTheme: { primary: "#FF6B5E", secondary: "#000" } },
            }}
          />
          <Navbar />
          <div className="min-h-[70vh]">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
