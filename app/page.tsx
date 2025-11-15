"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <main className="h-screen flex flex-col">
      <div className="flex grow overflow-hidden">
        {/* LEFT */}
        <motion.div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/900?1')" }}
          onHoverStart={() => setHovered("left")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "left" ? 0.75 : hovered === "right" ? 0.25 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* RIGHT */}
        <motion.div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/900?2')" }}
          onHoverStart={() => setHovered("right")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "right" ? 0.75 : hovered === "left" ? 0.25 : 0.5,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </main>
  );
}
