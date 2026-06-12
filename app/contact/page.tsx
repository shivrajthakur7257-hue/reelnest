export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050509] px-4 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Contact Reelnest Tools</h1>
        <p className="mt-4 text-white/60">
          Have a suggestion or want a new tool? Contact us.
        </p>

        <form className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <input className="mb-4 w-full rounded-xl bg-black/40 p-4" placeholder="Your name" />
          <input className="mb-4 w-full rounded-xl bg-black/40 p-4" placeholder="Email" />
          <textarea className="mb-4 min-h-32 w-full rounded-xl bg-black/40 p-4" placeholder="Message" />
          <button className="rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 font-semibold">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}