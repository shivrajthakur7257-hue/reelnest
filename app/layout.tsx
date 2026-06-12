import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Reelnest - Free AI Creator Tools",
  description: "Free AI tools for scripts, captions, hashtags, prompts and creator growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-[#07070a] text-white border-b border-gray-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Reelnest</Link>
            <div className="flex gap-5 text-sm">
              <Link href="/tools">Tools</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}