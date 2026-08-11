import { useState } from "react";
import axios from "axios";
import { FiMail, FiMessageCircle, FiSend } from "react-icons/fi";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const SendMail = () => {
  const [formData, setFormData] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const collectData = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      const { data } = await axios.post("/api/mail/new", formData);
      setStatus({
        type: "success",
        message: data.message || "Thanks—your message has been sent.",
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.error ||
          "Something went wrong. Please email me directly instead.",
      });
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left text-zinc-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";

  return (
    <section id="getInTouch" className="px-5 py-20 shadow-sm shadow-zinc-300 dark:shadow-zinc-800 md:px-10">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-zinc-950 p-8 text-white md:p-12">
          <div className="inline-flex rounded-2xl bg-cyan-400 p-3 text-2xl text-zinc-950">
            <FiMessageCircle />
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Get in touch
          </p>
          <h2 className="mt-3 text-left text-4xl font-black leading-tight">
            Have a project, role, or idea?
          </h2>
          <p className="mt-5 text-left leading-8 text-zinc-300">
            Tell me what you&apos;re building and where you need help. Your message
            will arrive directly in my inbox.
          </p>
          <a
            href="mailto:mehboobmehboob090@gmail.com"
            className="mt-8 inline-flex items-center gap-3 text-left font-semibold text-cyan-300 hover:text-cyan-200"
          >
            <FiMail /> mehboobmehboob090@gmail.com
          </a>
        </div>

        <form onSubmit={sendMessage} className="p-8 md:p-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-left text-sm font-bold">
              Your name
              <input
                className={`${fieldClass} mt-2`}
                name="name"
                onChange={collectData}
                placeholder="Your full name"
                required
                maxLength={100}
                value={formData.name}
              />
            </label>
            <label className="text-left text-sm font-bold">
              Email address
              <input
                className={`${fieldClass} mt-2`}
                name="email"
                onChange={collectData}
                placeholder="you@company.com"
                required
                type="email"
                maxLength={160}
                value={formData.email}
              />
            </label>
          </div>

          <label className="mt-5 block text-left text-sm font-bold">
            Subject
            <input
              className={`${fieldClass} mt-2`}
              name="subject"
              onChange={collectData}
              placeholder="What would you like to discuss?"
              required
              maxLength={160}
              value={formData.subject}
            />
          </label>

          <label className="mt-5 block text-left text-sm font-bold">
            Message
            <textarea
              className={`${fieldClass} mt-2 min-h-36 resize-y`}
              name="message"
              onChange={collectData}
              placeholder="A few details about the opportunity or project..."
              required
              maxLength={5000}
              value={formData.message}
            />
          </label>

          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label>
              Website
              <input
                name="website"
                onChange={collectData}
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
              />
            </label>
          </div>

          <button
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
            disabled={sending}
            type="submit"
          >
            <FiSend /> {sending ? "Sending..." : "Send message"}
          </button>

          {status.message ? (
            <p
              className={`mt-4 rounded-2xl px-4 py-3 text-center text-sm font-semibold ${
                status.type === "success"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
              }`}
              role="status"
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default SendMail;
