"use client";

import { useRef, type MouseEvent } from "react";
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
      className="cursor-pointer flex-shrink-0 w-[72vw] sm:w-[46vw] md:w-[300px] lg:w-[340px]"
      style={{ background: "var(--color-cream)", padding: 10 }}
    >
      {/* Inner sketch card */}
      <div style={{ background: "#faf8f4", border: "1px solid rgba(45,41,38,0.09)" }}>
        {/* Header row — card number + code */}
        <div
          className="flex justify-between items-center px-3 pt-3 pb-2"
          style={{ borderBottom: "1px solid rgba(45,41,38,0.07)" }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "#b0a99f", letterSpacing: "0.08em" }}>
            {num} / {TOTAL}
          </span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "#b0a99f", letterSpacing: "0.12em" }}>
            {code}
          </span>
        </div>

        {/* Sketch image */}
        <div className="relative aspect-[3/4] overflow-hidden mx-3 my-3">
          <div className="absolute inset-0" style={{ background: "#faf8f4" }} />
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 72vw, (max-width: 768px) 46vw, 340px"
            style={{
              filter: "grayscale(1) contrast(1.55) brightness(1.18) sepia(0.08)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>

      {/* Info footer */}
      <div className="px-1 pt-3 pb-1">
        <div className="flex justify-between items-baseline gap-2">
          <span className="font-accent italic text-[1.05rem] text-[var(--color-dark)] leading-tight truncate">
            {product.name}
          </span>
          <span
            className="flex-shrink-0 text-[0.82rem] font-semibold text-[var(--color-dark)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.price}
          </span>
        </div>
        <p
          className="mt-0.5 text-[var(--color-gray)] leading-snug"
          style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem" }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex w-9 h-9 items-center justify-center text-[var(--color-dark)]/40 hover:text-[var(--color-dark)] transition-colors duration-300 cursor-pointer rounded-sm"
      style={{ border: "1px solid rgba(45,41,38,0.15)" }}
      aria-label={`Scroll ${direction}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

export default function ProductGrid() {
  const scrollRef   = useRef<HTMLDivElement>(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollRef.current.offsetWidth * 0.6 : scrollRef.current.offsetWidth * 0.6,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current  = true;
    startX.current      = e.pageX - scrollRef.current.offsetLeft;
    startScroll.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = startScroll.current - (x - startX.current) * 1.2;
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24" style={{ background: "var(--color-cream)" }}>
      {/* Section header */}
      <div
        className="flex items-end justify-between px-5 md:px-12 lg:px-16 mb-8 md:mb-12"
        style={{ maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px" style={{ background: "var(--color-red)" }} />
            <span className="tracking-editorial text-[var(--color-gray)] text-[0.56rem]">THE COLLECTION</span>
          </div>
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
        <div className="flex items-center gap-2">
          <ArrowButton direction="left"  onClick={() => scroll("left")}  />
          <ArrowButton direction="right" onClick={() => scroll("right")} />
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 px-5 md:px-12 lg:px-16 pb-8 snap-x snap-mandatory select-none"
        style={{
          overflowX: "auto", overflowY: "visible",
          scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
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
