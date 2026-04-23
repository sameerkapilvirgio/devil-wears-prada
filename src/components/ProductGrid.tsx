"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="cursor-pointer bg-white flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[340px] lg:w-[380px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, 380px"
          />
        </motion.div>

        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-[#666] hover:text-[var(--color-red)] transition-colors cursor-pointer"
          aria-label="Favourite"
        >
          <HeartIcon />
        </button>

        {product.badge && (
          <div className="absolute bottom-3 left-3 z-10">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18">
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

      <div style={{ padding: "10px 12px 14px" }}>
        <p className="text-sm sm:text-base text-[var(--color-black)] leading-[1.4] line-clamp-2" style={{ marginBottom: 6 }}>
          <span className="font-bold">{product.name}</span>{" "}
          <span className="font-normal text-[#666]">{product.description}</span>
        </p>
        <span
          className="text-sm sm:text-base font-bold text-[var(--color-black)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {product.price}
        </span>
      </div>
    </motion.div>
  );
}

function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-[var(--color-black)]/10 text-[var(--color-black)]/50 hover:border-[var(--color-black)]/30 hover:text-[var(--color-black)] transition-all cursor-pointer bg-white/80 backdrop-blur-sm"
      aria-label={`Scroll ${direction}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export default function ProductGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative py-8 md:py-14"
      style={{ background: "#f5f5f5" }}
    >
      <div className="flex items-end justify-between px-5 md:px-12 lg:px-16 mb-6 md:mb-8" style={{ maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}>
        <h2 className="font-accent text-2xl sm:text-3xl md:text-4xl text-[var(--color-black)]">
          Signature <span className="font-bold italic">Silhouettes</span>
        </h2>
        <div className="flex items-center gap-2">
          <ArrowButton direction="left" onClick={() => scroll("left")} />
          <ArrowButton direction="right" onClick={() => scroll("right")} />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden px-5 md:px-12 lg:px-16 pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product, index) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} index={index} />
          </div>
        ))}
        <div className="flex-shrink-0 w-1" aria-hidden />
      </div>
    </section>
  );
}
