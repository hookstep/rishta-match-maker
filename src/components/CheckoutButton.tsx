import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { rishtaApi } from "@/lib/rishta-api";

type Mode = "subscription" | "payment";

export function CheckoutButton() {
  const { getToken, isSignedIn } = useAuth();

  const start = async (mode: Mode) => {
    if (!isSignedIn) {
      toast.error("Sign in to continue");
      return;
    }
    try {
      const res = await rishtaApi(
        "/api/billing/checkout",
        () => getToken(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode }),
        },
      );
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        toast.error(data.error || `Checkout failed (${res.status})`);
        return;
      }
      if (data.url) window.location.href = data.url;
      else toast.error("No checkout URL returned — set VITE_API_PROXY_TARGET to your Next billing server.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="default" size="sm" onClick={() => start("subscription")}>
        Subscribe
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => start("payment")}>
        One-time
      </Button>
    </div>
  );
}
