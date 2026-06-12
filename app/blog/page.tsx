import Link from "next/link";
import { blogs } from "@/lib/blogs";

export const metadata = {
  title: "Reelnest Blog - AI, Instagram, YouTube & Creator Guides",
  description: "Read guides about AI tools, Instagram growth, YouTube Shorts and content creation.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">Reelnest Blog</h1>
        <p className="text-gray-400 mt-3">SEO guides for creators, students and marketers.</p>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              className="bg-[#12121a] p-5 rounded-2xl border border-gray-800"
            >
              <p className="text-sm text-gray-500">{blog.category}</p>
              <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
              <p className="text-gray-400 mt-2">{blog.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}