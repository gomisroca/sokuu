"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="p-10 max-w-xl mx-auto">
      <nav className="text-xl mb-10">
        <Link href="/">← Back</Link>
      </nav>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6"
      >
        Contact Form
      </motion.h1>

      {submitted ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl"
        >
          Thanks! Your message was sent.
        </motion.p>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full p-2 rounded bg-neutral-800" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              className="w-full p-2 rounded bg-neutral-800"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded font-bold"
          >
            Send
          </button>
        </motion.form>
      )}
    </main>
  );
}
