import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import { applyPageSeo } from "@/lib/seo";
import { useLegalPageJsonLd } from "@/hooks/useLegalPageJsonLd";
import { defaultAppEmail, siteName } from "@/lib/site";

const SafetyOnline = () => {
  useLegalPageJsonLd("/safety", "Be safe online");

  useLayoutEffect(() => {
    applyPageSeo({
      title: `Be safe online — ${siteName}`,
      description: `Safety tips for matrimony: verify identities, avoid scams, and use ${siteName} with confidence.`,
      canonicalPath: "/safety",
      noindex: false,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f3ef] text-foreground">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-sm font-bold text-[#0f3528] hover:underline">
            ← {siteName}
          </Link>
          <Link to="/auth" className="text-sm font-semibold text-[#00a85a] hover:underline">
            Log in
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <h1 className="font-serif text-3xl font-bold text-[#0f3528] sm:text-4xl">Be safe online</h1>
        <p className="mt-2 text-sm text-muted-foreground">Guidance for matrimony seekers and families</p>

        <div className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed prose-headings:font-serif prose-headings:text-[#0f3528]">
          <p>
            Matrimony platforms can attract the same scams seen elsewhere online. {siteName} combines technical controls
            with common sense—use both.
          </p>

          <h2>Verify before you trust</h2>
          <ul>
            <li>Prefer gradual disclosure of sensitive personal and financial details.</li>
            <li>Confirm identities through independent channels (video calls with family present, mutual references).</li>
            <li>Be cautious if someone refuses reasonable verification or pressures you to move off-platform immediately.</li>
          </ul>

          <h2>Money and urgency</h2>
          <ul>
            <li>Never send money, gift cards, or crypto to someone you have not met through a trusted process.</li>
            <li>Watch for “emergencies” that require instant transfers—classic scam pattern.</li>
            <li>Premium payments for {siteName} should only happen through the official payment links shown in the product.</li>
          </ul>

          <h2>Photos and documents</h2>
          <p>
            Stolen photos and forged documents exist. Reverse-image search can help; inconsistencies in stories are a red
            flag.
          </p>

          <h2>Report concerns</h2>
          <p>
            If you experience harassment, suspected fraud, or policy violations, email{" "}
            <a href={`mailto:${defaultAppEmail()}`}>{defaultAppEmail()}</a> with as much detail as you can share safely.
          </p>

          <p className="text-sm text-muted-foreground">
            Also read our{" "}
            <Link to="/privacy" className="text-[#00a85a] hover:underline">
              Privacy policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-[#00a85a] hover:underline">
              Terms of use
            </Link>
            .
          </p>
        </div>
      </article>
    </div>
  );
};

export default SafetyOnline;
