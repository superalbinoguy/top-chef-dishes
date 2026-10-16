"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjygjere";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ fontWeight: 600 }}>
        Thanks! Your message has been sent.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "480px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="searchbar"
          style={{ marginBottom: 0 }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="searchbar"
          style={{ marginBottom: 0, resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="show-more-btn"
        style={{
          alignSelf: "flex-start",
          opacity: status === "submitting" ? 0.6 : 1,
          cursor: status === "submitting" ? "default" : "pointer",
        }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && (
        <p style={{ color: "#a01818", fontSize: "0.85rem" }}>
          Something went wrong — please try again, or email me directly at{" "}
          kurtlosereit@gmail.com.
        </p>
      )}
    </form>
  );
}