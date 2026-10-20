import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import { applyPageSeo } from "@/lib/seo";
import { useLegalPageJsonLd } from "@/hooks/useLegalPageJsonLd";
import { defaultAppEmail, siteName } from "@/lib/site";

const Terms = () => {
  useLegalPageJsonLd("/terms", "Terms of use");

  useLayoutEffect(() => {
    applyPageSeo({
      title: `Terms of use — ${siteName}`,
      description: `Terms and conditions for using ${siteName} matrimony services, accounts, subscriptions, and acceptable use.`,
      canonicalPath: "/terms",
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
        <h1 className="font-serif text-3xl font-bold text-[#0f3528] sm:text-4xl">Terms of use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed prose-headings:font-serif prose-headings:text-[#0f3528]">
          <p>
            These terms govern your use of <strong>{siteName}</strong> (“Service”). By creating an account or using the
            Service, you agree to these terms and our{" "}
            <Link to="/privacy" className="text-[#00a85a] hover:underline">
              Privacy policy
            </Link>
            .
          </p>

          <h2>Eligibility and purpose</h2>
          <p>
            The Service is offered for <strong>serious matrimony</strong> purposes. You must provide accurate
            information to the best of your ability and must not use the Service for harassment, fraud, spam, or
            non-matrimonial solicitation.
          </p>

          <h2>Accounts</h2>
          <p>
            You are responsible for safeguarding your credentials and for activity under your account. Notify us at{" "}
            <a href={`mailto:${defaultAppEmail()}`}>{defaultAppEmail()}</a> if you suspect unauthorized access.
          </p>

          <h2>Profiles and content</h2>
          <p>
            You retain rights to content you submit, but grant us a licence to host, display, and process it as needed
            to operate the Service (including tiered visibility features). You must have rights to any photos you
            upload.
          </p>

          <h2>Paid features</h2>
          <p>
            Premium or paid features may be offered through third-party payment links (for example Stripe). Pricing,
            taxes, and renewal terms are presented at purchase. Unless required by law, fees are generally
            non-refundable once a billing period has started—contact us if you believe a charge is in error.
          </p>

          <h2>Acceptable use</h2>
          <ul>
            <li>No impersonation, stalking, or abusive behaviour.</li>
            <li>No attempts to scrape, hack, or overload the Service.</li>
            <li>No circumvention of access controls, including attempting to view data you are not permitted to see.</li>
          </ul>

          <h2>Disclaimers</h2>
          <p>
            The Service is provided <strong>“as is”</strong>. We do not guarantee matches, marriage outcomes, or
            uninterrupted availability. Marketing examples on the site may be illustrative and are not guarantees of
            results.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or
            punitive damages, or for any loss arising from interactions between users off-platform.
          </p>

          <h2>Third parties</h2>
          <p>
            {siteName} is <strong>not affiliated with Shaadi.com</strong> or other matrimony brands unless expressly
            stated. Links to third-party sites are governed by those sites’ terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of <strong>India</strong>, without regard to conflict-of-law rules.
            Courts at a forum competent in India shall have jurisdiction, subject to mandatory consumer protections
            where applicable.
          </p>

          <h2>Changes and contact</h2>
          <p>
            We may update these terms; continued use after changes constitutes acceptance. Questions:{" "}
            <a href={`mailto:${defaultAppEmail()}`}>{defaultAppEmail()}</a>.
          </p>
        </div>
      </article>
    </div>
  );
};

export default Terms;
