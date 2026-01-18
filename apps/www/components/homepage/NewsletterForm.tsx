"use client";

import { useState, FormEvent } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { Button, Icon } from "@kolosys-sites/theme";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
    setMessage(result.message);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full px-4 py-3 rounded-md border border-border bg-surface text-foreground placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-emphasis disabled:opacity-50"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <>
              <Icon name="loader-lines" pack="basic" size="sm" className="animate-spin" />
              Subscribing...
            </>
          ) : status === "success" ? (
            <>
              <Icon name="check" pack="basic" size="sm" />
              Subscribed!
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            status === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Icon
              name={status === "success" ? "check-circle" : "x-circle"}
              pack="basic-sharp"
              size="sm"
            />
            {message}
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-500 mt-3 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
