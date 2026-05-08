import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Lock } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Indian Seller’s Toolkit",
  description: "Stop Overpaying Couriers. Stop Manual Data Entry.",
  keywords: "Volumetric weight calculator India, WhatsApp order extractor private, Shiprocket cost optimizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.payhip.com *.amazon.in;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: *.payhip.com *.amazon.in *.ssl-images-amazon.com;
    connect-src 'self' https://huggingface.co https://cdn-lfs.huggingface.co https://cdn.jsdelivr.net;
    frame-src 'self' *.payhip.com;
  `.replace(/\s+/g, " ").trim();

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#FAFAFA] text-[#1F2937]`}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-[#2563EB]">The Indian Seller’s Toolkit</h1>
              <p className="text-sm text-gray-500">Stop Overpaying Couriers. Stop Manual Data Entry.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200">
              <Lock size={16} className="text-green-600" />
              <span>100% Private (Runs Locally)</span>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm">
            <p>Built for the makers of Chennai. From T.Nagar to the world.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
