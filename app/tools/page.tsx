import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata = {
  title: "Free AI Creator Tools - Reelnest",
  description: "Use free AI tools for captions, scripts, hashtags, prompts and YouTube SEO.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">All Tools</h1>
        <p className="text-gray-400 mt-3">Free tools for content creators and marketers.</p>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {tools.map((tool) => (
            <Link
              href={`/tools/${tool.slug}`}
              key={tool.slug}
              className="bg-[#12121a] p-5 rounded-2xl border border-gray-800 hover:border-white transition"
            >
              <h2 className="text-xl font-semibold">{tool.name}</h2>
              <p className="text-gray-400 mt-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}