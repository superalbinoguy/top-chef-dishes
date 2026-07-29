"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [zoomed, setZoomed] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomed]);

  const overlay = (
    <div
      onClick={() => setZoomed(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        zIndex: 1000,
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          width: "auto",
          height: "auto",
          border: "3px solid black",
          borderRadius: "4px",
          boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
          cursor: "default",
        }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          setZoomed(false);
        }}
        aria-label="Close zoomed image"
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid black",
          background: "white",
          fontSize: "20px",
          lineHeight: "1",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );

  return (
    <>
      <div
        onClick={() => setZoomed(true)}
        style={{ cursor: "zoom-in" }}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </div>

      {zoomed && mounted && createPortal(overlay, document.body)}
    </>
  );
}