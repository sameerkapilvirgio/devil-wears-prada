"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { products, type Product } from "@/data/products";
import { productImages } from "@/data/images";

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imgSrc = productImages[index % productImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="cursor-pointer bg-white"
    >
      {/* Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#f5f5f5]">
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.05 }}
        >
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </motion.div>

        {/* Heart icon */}
        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-[#666] hover:text-[var(--color-red)] transition-colors cursor-pointer"
          aria-label="Favourite"
        >
          <HeartIcon />
        </button>

        {/* Devil Approved badge */}
        {product.badge && (
          <div className="absolute bottom-2 left-2 z-10">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
              <Image
                src="/images/devil-approved-logo.svg"
                alt="Devil Approved"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "8px 10px 10px" }}>
        <p className="text-xs sm:text-sm text-[var(--color-black)] leading-[1.4] line-clamp-2" style={{ marginBottom: 4 }}>
          <span className="font-bold">{product.name}</span>{" "}
          <span className="font-normal text-[#666]">{product.description}</span>
        </p>
        <span
          className="text-xs sm:text-sm font-bold text-[var(--color-black)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {product.price}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative pb-6 md:pb-10"
      style={{ background: "#f5f5f5" }}
    >
      <h2 className="font-accent text-center text-2xl md:text-4xl text-[var(--color-black)] py-6 md:py-10">
        Signature <span className="font-bold italic">Silhouettes</span>
      </h2>
      <div
        className="grid grid-cols-3 lg:grid-cols-4"
        style={{ gap: 4, maxWidth: 1200, marginLeft: "auto", marginRight: "auto", padding: "0 12px" }}
      >
        {products.map((product, index) => (
          <div key={product.id} className={index >= 6 ? "hidden lg:block" : ""} >
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
