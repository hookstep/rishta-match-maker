import { useEffect, useState } from "react";
import { mobileGate } from "@/lib/public-env";

const mode = mobileGate();

export function MobileRecommendBanner() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    if (mode === "off" || mode === "block") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (mode === "off" || mode === "block" || !narrow) return null;

  return (
    <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-center text-sm text-muted-foreground">
      Desktop is recommended for the full experience. You can still browse on mobile.
    </div>
  );
}
