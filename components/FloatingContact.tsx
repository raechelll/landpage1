"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import "./floating-contact.css";

export default function FloatingContact() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [tourVisible, setTourVisible] = useState(false);
  const hidden = footerVisible || tourVisible;

  useEffect(() => {
    const targets = document.querySelectorAll(
      "footer, #fitur, #ekosistem, #solusi, .ops-showcases, #kontrol, .workspace-stage",
    );
    const active = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.tagName === "FOOTER")
          setFooterVisible(entry.isIntersecting);
        else if (entry.isIntersecting) active.add(entry.target);
        else active.delete(entry.target);
      });
      setTourVisible(active.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className="floating-contact"
      href="/contact"
      aria-label="Hubungi tim BukaNota"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      data-footer-visible={footerVisible}
    >
      <MessageCircle size={19} strokeWidth={1.7} aria-hidden="true" />
      <span>Hubungi tim BukaNota</span>
    </a>
  );
}
