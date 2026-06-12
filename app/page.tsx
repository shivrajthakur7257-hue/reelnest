import Link from "next/link";
import { tools } from "@/lib/tools";
import { blogs } from "@/lib/blogs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white">
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Reelnest AI Creator Tools
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Free AI tools for creators, students and marketers. Generate scripts,
          captions, hashtags, prompts, thumbnails and more.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/tools" className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
            Explore Tools
          </Link>
          <Link href="/blog" className="border border-white px-6 py-3 rounded-xl font-semibold">
            Read Blog
          </Link>
        </div>
      </section>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Popular Tools</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {tools.slice(0, 9).map((tool) => (
            <Link
              href={`/tools/${tool.slug}`}
              key={tool.slug}
              className="bg-[#12121a] p-5 rounded-2xl border border-gray-800 hover:border-white transition"
            >
              <h3 className="text-xl font-semibold">{tool.name}</h3>
              <p className="text-gray-400 mt-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {blogs.slice(0, 6).map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              className="bg-[#12121a] p-5 rounded-2xl border border-gray-800"
            >
              <p className="text-sm text-gray-500">{blog.category}</p>
              <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
              <p className="text-gray-400 mt-2">{blog.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}