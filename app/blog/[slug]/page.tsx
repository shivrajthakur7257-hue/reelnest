import { blogs } from "@/lib/blogs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  return {
    title: blog ? `${blog.title} - Reelnest Blog` : "Blog - Reelnest",
    description: blog?.description || "Reelnest blog article",
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return notFound();

  return (
    <main className="min-h-screen bg-[#07070a] text-white px-6 py-12">
      <article className="max-w-3xl mx-auto">
        <p className="text-gray-500">{blog.category}</p>
        <h1 className="text-4xl font-bold mt-2">{blog.title}</h1>
        <p className="text-gray-400 mt-4">{blog.description}</p>

        <div className="mt-8 space-y-6 text-gray-300 leading-8">
          {blog.content.map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
              <p className="mt-2">{section.text}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}