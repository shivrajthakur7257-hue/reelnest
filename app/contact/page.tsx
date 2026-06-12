import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-20 text-white">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-black">Contact Us</h1>
          <p className="mt-4 text-white/60">
            Have a suggestion or want a new tool? Contact Reelnest Tools.
          </p>

          <form className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <input className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Your name" />
            <input className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Email address" />
            <textarea className="mb-4 min-h-[150px] w-full rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Message" />
            <button className="rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 font-semibold">
              Send Message
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
