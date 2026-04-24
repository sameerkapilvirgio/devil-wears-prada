"use client";

import Image from "next/image";
import { products, type Product } from "@/data/products";
import { productImages } from "@/data/images";

const TOTAL = String(products.length).padStart(2, "0");

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imgSrc = productImages[index % productImages.length];
  const num    = String(index + 1).padStart(2, "0");
  const code   = `RW-${num}`;

  return (
    <div
      className="cursor-pointer"
      style={{ background: "#faf8f4", padding: 6 }}
    >
      <div style={{ background: "#faf8f4", border: "1px solid rgba(45,41,38,0.09)" }}>
        <div
          className="flex justify-between items-center px-2 sm:px-3 pt-2 sm:pt-3 pb-1.5 sm:pb-2"
          style={{ borderBottom: "1px solid rgba(45,41,38,0.07)" }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "#b0a99f", letterSpacing: "0.08em" }}>
            {num} / {TOTAL}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", color: "#b0a99f", letterSpacing: "0.12em" }}>
            {code}
          </span>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden mx-2 sm:mx-3 my-2 sm:my-3">
          <div className="absolute inset-0" style={{ background: "#faf8f4" }} />
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{
              filter: "grayscale(1) contrast(1.55) brightness(1.18) sepia(0.08)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>

      <div className="px-1 pt-2 sm:pt-3 pb-1">
        <div className="flex justify-between items-baseline gap-1 sm:gap-2">
          <span className="font-accent italic text-sm sm:text-[1.05rem] text-[var(--color-dark)] leading-tight truncate">
            {product.name}
          </span>
          <span
            className="flex-shrink-0 text-xs sm:text-sm font-semibold text-[var(--color-dark)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.price}
          </span>
        </div>
        <p
          className="mt-0.5 text-[var(--color-gray)] leading-snug hidden sm:block"
          style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem" }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  return (
    <section className="relative pt-6 pb-6 md:pt-20 md:pb-24" style={{ background: "#faf8f4" }}>
      <div
        className="px-5 md:px-12 lg:px-16 mb-8 md:mb-12"
        style={{ maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}
      >
        <h2 style={{ lineHeight: 1, fontSize: "clamp(1.7rem,3.8vw,2.6rem)" }} className="text-[var(--color-dark)]">
          <span className="font-light tracking-wide" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
            Signature
          </span>{" "}
          <span className="font-accent italic">Silhouettes</span>
        </h2>
        <p
          className="mt-2 text-[var(--color-gray)]"
          style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.04em" }}
        >
          Original atelier sketches — each piece drawn before cut.
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-px md:gap-0.5"
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
