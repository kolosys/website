"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@kolosys-sites/theme";

type StatCardProps = {
  value: number;
  label: string;
  icon: IconName;
  suffix?: string;
  prefix?: string;
};

export function StatCard({ value, label, icon, suffix = "", prefix = "" }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center p-6 rounded-lg border border-border bg-surface hover:shadow-lg transition-shadow"
    >
      <Icon
        name={icon}
        pack="basic-sharp"
        size="lg"
        className="text-primary-emphasis mb-3"
      />
      <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-neutral-500 font-medium">{label}</div>
    </div>
  );
}
