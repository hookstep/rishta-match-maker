import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import { applyPageSeo } from "@/lib/seo";
import { useLegalPageJsonLd } from "@/hooks/useLegalPageJsonLd";
import { defaultAppEmail, siteName } from "@/lib/site";

const Privacy = () => {
  useLegalPageJsonLd("/privacy", "Privacy policy");

  useLayoutEffect(() => {
    applyPageSeo({
      title: `Privacy policy — ${siteName}`,
      description: `How ${siteName} collects, uses, and protects personal data for matrimony profiles, browsing, and optional advertising.`,
      canonicalPath: "/privacy",
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
        <h1 className="font-serif text-3xl font-bold text-[#0f3528] sm:text-4xl">Privacy policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="prose prose-neutral mt-8 max-w-none text-[15px] leading-relaxed prose-headings:font-serif prose-headings:text-[#0f3528]">
          <p>
            This policy explains how <strong>{siteName}</strong> (“we”, “us”) handles information when you use our
            matrimony website and related services. By using the site, you agree to this policy alongside our{" "}
            <Link to="/terms" className="text-[#00a85a] hover:underline">
              Terms of use
            </Link>
            .
          </p>

          <h2>Who we are</h2>
          <p>
            {siteName} operates the service at <strong>rishtewalesardarji.in</strong> (and related deployment URLs). For
            privacy questions, contact <a href={`mailto:${defaultAppEmail()}`}>{defaultAppEmail()}</a>.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> email address and authentication identifiers when you register or sign in.
            </li>
            <li>
              <strong>Profile and matrimony data:</strong> information you choose to add to your profile (for example
              age range, community, profession, photos, and preferences) to facilitate introductions.
            </li>
            <li>
              <strong>Technical data:</strong> basic logs and device information typical of web applications (for
              example IP address, browser type, timestamps) as processed by our hosting and security providers.
            </li>
          </ul>

          <h2>How we use data</h2>
          <p>We use data to:</p>
          <ul>
            <li>Provide accounts, profiles, search/browse, and premium features you request.</li>
            <li>Operate masked or tiered visibility where the product is designed that way.</li>
            <li>Keep the service secure, prevent abuse, and respond to support requests.</li>
            <li>Meet legal obligations where applicable.</li>
          </ul>

          <h2>Where data is processed</h2>
          <p>
            The application uses <strong>Supabase</strong> (hosted infrastructure) for authentication, database storage,
            and related APIs. Data may be processed in regions Supabase uses for your project configuration. Review
            Supabase’s documentation and Data Processing Addendum if you need enterprise-grade assurances.
          </p>

          <h2 id="cookies-and-ads">Cookies and similar technologies</h2>
          <p>
            We use cookies or local storage as needed for sign-in sessions and product functionality. If we enable
            third-party advertising (for example Google AdSense), those partners may set additional cookies or use
            identifiers subject to their policies and your choices. When ads are enabled, we will surface an appropriate
            consent mechanism where required by law (for example EEA/UK).
          </p>

          <h2>Advertising (AdSense readiness)</h2>
          <p>
            If display ads are enabled, Google or other partners may collect data as described in their policies. You
            should publish a valid <code className="rounded bg-black/5 px-1">ads.txt</code> file at the root of your
            domain with your publisher line once AdSense approves the site—do not publish placeholder publisher IDs.
            Avoid conflicting DNS records (for example domain forwarding) that prevent HTTPS certificate issuance, since
            ad scripts require a secure origin.
          </p>

          <h2>Retention and deletion</h2>
          <p>
            We retain information while your account is active and as needed for legitimate business or legal purposes.
            You may request account or profile deletion by contacting us; some records may be retained where law requires.
          </p>

          <h2>Children</h2>
          <p>
            The service is intended for adults seeking matrimony. We do not knowingly collect personal information from
            children under 18 in a way that violates applicable law.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, or port your data, or to object
            to certain processing. Contact us at the email above and we will respond within a reasonable time.
          </p>

          <h2>International users</h2>
          <p>
            If you access the service from outside India, your information may be transferred to and processed in India or
            other countries where we or our processors operate.
          </p>

          <h2>Changes</h2>
          <p>We may update this policy from time to time. Material changes will be reflected by updating the date above.</p>
        </div>
      </article>
    </div>
  );
};

export default Privacy;
