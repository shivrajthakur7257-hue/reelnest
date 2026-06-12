import { tools } from "@/lib/tools";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  return {
    title: tool ? `${tool.name} - Reelnest` : "Tool - Reelnest",
    description: tool?.description || "Free AI tool by Reelnest",
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return notFound();

  return (
    <main className="min-h-screen bg-[#07070a] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">{tool.name}</h1>
        <p className="text-gray-400 mt-3">{tool.description}</p>

        <div className="mt-8 bg-[#12121a] p-5 rounded-2xl border border-gray-800">
          <label className="block mb-2 font-semibold">Enter your topic</label>
          <textarea
            className="w-full h-36 p-4 rounded-xl bg-black border border-gray-700 text-white"
            placeholder={tool.placeholder}
          />

          <button className="mt-4 bg-white text-black px-6 py-3 rounded-xl font-semibold">
            Generate
          </button>

          <div className="mt-6 bg-black p-4 rounded-xl border border-gray-800 text-gray-300">
            Output will appear here. Connect this button with AI API later.
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">How to use this tool?</h2>
          <p className="text-gray-400 mt-3">{tool.guide}</p>
        </section>
      </div>
    </main>
  );
}