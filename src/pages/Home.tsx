import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OptionalAdSenseLoader } from "@/components/OptionalAdSenseLoader";
import { resetSeoToDefaults } from "@/lib/seo";
import { defaultAppEmail } from "@/lib/site";
import {
  Heart,
  Shield,
  Sparkles,
  Users,
  MessageCircle,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";

const shaadiGreen = "#00a85a";
const shaadiGreenDark = "#008c4d";

/** Hero photography (GoDaddy / Getty); used as full-bleed background behind scrim. */
const HERO_IMAGE_URL = "https://img1.wsimg.com/isteam/getty/2148405076";

const stats = [
  { label: "Privacy-first browse", value: "Preview", sub: "Respectful masked listings for free members" },
  { label: "Guided next steps", value: "WhatsApp", sub: "Coordinator-assisted intros when you shortlist" },
  { label: "Full biodata unlock", value: "₹499/mo", sub: "All photos & fields — contact via desk for others" },
];

const features = [
  {
    icon: Shield,
    title: "Trust-first profiles",
    body: "Structured matrimony biodata—not dating bios. Clear sections for family, profession, and values (similar to how Shaadi.com organises serious matches).",
  },
  {
    icon: Sparkles,
    title: "Search that feels familiar",
    body: "Filter by community, city, age, and more. Free members see a curated preview; premium unlocks the full profile view for listings.",
  },
  {
    icon: MessageCircle,
    title: "Human support in the loop",
    body: "When you are ready, our team can help move conversations forward with dignity—without exposing every number on day one.",
  },
];

const stories = [
  {
    names: "Simran & Karan",
    quote:
      "We wanted something dignified for our families. The profile format made it easy to align on values before the first call.",
    meta: "Engaged · 2025",
  },
  {
    names: "Meera & Arjun",
    quote:
      "Clear photos and honest details saved everyone time. Grateful for a platform that feels serious, not like dating noise.",
    meta: "Married · 2024",
  },
];

const footerExplore = [
  "Community",
  "City",
  "Religion",
  "Mother tongue",
  "Profession",
  "NRI profiles",
  "Marital status",
];

const navSecondary = [
  { label: "About", href: "#about" },
  { label: "Success stories", href: "#stories" },
  { label: "How it works", href: "#experience" },
  { label: "FAQ", href: "#faq" },
  { label: "Premium", href: "#premium" },
];

const Home = () => {
  const navigate = useNavigate();
  const [lookingFor, setLookingFor] = useState("Bride");
  const [ageFrom, setAgeFrom] = useState("24");
  const [ageTo, setAgeTo] = useState("32");
  const [motherTongue, setMotherTongue] = useState("");

  const goRegister = () => {
    const params = new URLSearchParams({
      intent: "register",
      lookingFor,
      ageFrom,
      ageTo,
      ...(motherTongue ? { motherTongue } : {}),
    });
    navigate(`/auth?${params.toString()}`);
  };

  const goLogin = () => {
    navigate("/auth");
  };

  useLayoutEffect(() => {
    resetSeoToDefaults();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f3ef] text-foreground">
      {/* Header — aligned with rishtewalesardarji.in: brand left, sign-in actions top-right */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c2f24]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4">
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 sm:h-11 sm:w-11">
              <Heart className="h-5 w-5 fill-[#f0e4c8] text-[#f0e4c8]" />
            </div>
            <span className="truncate font-serif text-base font-bold tracking-tight text-white sm:text-lg md:text-xl">
              Rishtewale Sardarji
            </span>
          </Link>
          <nav
            className="mx-2 hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex lg:gap-2"
            aria-label="Page sections"
          >
            {navSecondary.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-sm transition hover:border-white/35 hover:bg-black/45 hover:text-white sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="px-2 text-xs font-semibold text-white/90 hover:bg-white/10 hover:text-white sm:px-3 sm:text-sm"
              onClick={goLogin}
            >
              Sign in
            </Button>
            <Button
              size="sm"
              className="rounded-full border-0 bg-[#e8d5a8] px-3 text-xs font-bold text-[#0c1f18] hover:bg-[#f5ecd4] sm:px-5 sm:text-sm"
              onClick={goRegister}
            >
              Register
            </Button>
          </div>
        </div>
        <nav
          className="border-t border-white/10 lg:hidden"
          aria-label="Page sections"
        >
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2.5">
            {navSecondary.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-sm whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="main-content">
      {/* Hero — photo + scrim (matches brochure feel; image from Getty via GoDaddy CDN) */}
      <section className="relative overflow-hidden border-b border-[#0a241c]/30">
        <img
          src={HERO_IMAGE_URL}
          alt="Bride and groom in traditional Indian wedding attire exchanging garlands with family."
          className="absolute inset-0 h-full min-h-[58vh] w-full object-cover object-[center_18%] sm:min-h-[64vh] md:min-h-[70vh] lg:min-h-[82vh] xl:min-h-[88vh] lg:object-[center_12%]"
          fetchPriority="high"
        />
        {/* Lighter scrim at top (faces); stronger at bottom for headline contrast */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(2,12,9,0.92)_0%,rgba(2,12,9,0.55)_42%,transparent_68%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0' fill='%23ffffff' fill-opacity='0.9'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-3xl flex-col items-center justify-end px-4 pb-10 pt-28 text-center sm:min-h-[64vh] sm:pb-14 sm:pt-36 md:min-h-[70vh] md:pb-16 md:pt-40 lg:min-h-[82vh] lg:pb-20 lg:pt-48 xl:min-h-[88vh] xl:pb-24 xl:pt-52">
          <h1 className="font-serif text-[1.85rem] font-bold leading-[1.2] tracking-tight text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.95),0_1px_2px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Connecting Hearts,
            <br />
            Building Futures
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm font-medium leading-relaxed text-white/95 [text-shadow:0_2px_16px_rgba(0,0,0,0.9)] sm:text-base md:text-lg">
            The same spirit as our public site — thoughtful matrimonial profiles, family dignity, and a clear path from
            browse to conversation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="rounded-full border-0 bg-[#e8d5a8] px-8 font-bold text-[#0a1a14] shadow-lg hover:bg-[#f2e8c8]"
              onClick={goRegister}
            >
              Begin your journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-white/80 bg-black/35 px-8 font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm hover:bg-black/50"
              onClick={goLogin}
            >
              Sign in
            </Button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-b border-black/[0.06] bg-white py-10 sm:py-12"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:text-left text-center">
          <h2 id="about-heading" className="font-serif text-2xl font-bold text-[#0f3528] sm:text-3xl">
            About Rishtewale Sardarji
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#444] sm:text-base">
            <strong>Rishtewale Sardarji</strong> is an India-focused matrimony desk and web application for families and
            individuals seeking marriage-oriented introductions—not casual dating. The service uses structured biodata,
            filters such as community and profession, and privacy-conscious previews for free members, with optional
            premium access to full listings where the product allows.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#444] sm:text-base">
            Enquiries are handled through our desk email; we help move from browsing to conversation with dignity when you
            are ready. Policies:{" "}
            <Link to="/privacy" className="font-semibold text-[#00a85a] hover:underline">
              Privacy
            </Link>
            ,{" "}
            <Link to="/terms" className="font-semibold text-[#00a85a] hover:underline">
              Terms
            </Link>
            ,{" "}
            <Link to="/safety" className="font-semibold text-[#00a85a] hover:underline">
              Online safety
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Find your match — app entry (below hero like brochure + product) */}
      <section className="border-b border-black/[0.06] bg-[#f6f3ef] pb-14 pt-10">
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <Card className="border border-black/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)]">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-4 flex flex-col items-center justify-between gap-2 border-b border-black/5 pb-4 sm:flex-row">
                <p className="text-center font-serif text-xl font-bold text-[#222] sm:text-left">Find your match</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-sm font-semibold"
                  style={{ color: shaadiGreen }}
                  onClick={goRegister}
                >
                  Skip to register <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
                <div className="space-y-2 lg:col-span-3">
                  <span className="text-xs font-semibold text-[#666]">I&apos;m looking for</span>
                  <Select value={lookingFor} onValueChange={setLookingFor}>
                    <SelectTrigger className="h-12 border-black/10 bg-white text-[15px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bride">Bride</SelectItem>
                      <SelectItem value="Groom">Groom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:col-span-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#666]">Age from</span>
                    <Select value={ageFrom} onValueChange={setAgeFrom}>
                      <SelectTrigger className="h-12 border-black/10 bg-white text-[15px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        {Array.from({ length: 43 }, (_, i) => 21 + i).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-[#666]">Age to</span>
                    <Select value={ageTo} onValueChange={setAgeTo}>
                      <SelectTrigger className="h-12 border-black/10 bg-white text-[15px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        {Array.from({ length: 43 }, (_, i) => 21 + i).map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 lg:col-span-3">
                  <span className="text-xs font-semibold text-[#666]">Mother tongue (optional)</span>
                  <Select value={motherTongue || "any"} onValueChange={(v) => setMotherTongue(v === "any" ? "" : v)}>
                    <SelectTrigger className="h-12 border-black/10 bg-white text-[15px]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Punjabi">Punjabi</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="lg:col-span-2">
                  <Button
                    type="button"
                    className="h-12 w-full rounded-full font-bold text-white shadow-lg hover:opacity-95"
                    style={{ backgroundColor: "#e85d04" }}
                    onClick={goRegister}
                  >
                    Let&apos;s begin
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-[#777]">
                Free to register · Full profile view for others unlocks with premium (₹499/month)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact — section present on rishtewalesardarji.in */}
      <section className="border-b border-black/[0.06] bg-white py-12">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#0f3528] sm:text-3xl">Contact us</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#555] sm:text-base">
            Write to the Rishtewale Sardarji desk for serious enquiries — we&apos;re happy to help before or after you
            register.
          </p>
          <a
            href={`mailto:${defaultAppEmail()}`}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-[#0f3528]/15 bg-[#f6f3ef] px-6 py-2.5 text-sm font-bold text-[#0f3528] transition hover:bg-[#ebe5dc]"
          >
            {defaultAppEmail()}
          </a>
        </div>
      </section>

      {/* Leaderboard strip — mirrors Shaadi “#1 / ratings / success stories” row (honest wording) */}
      <section id="premium" className="border-b border-black/[0.06] bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-6 px-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/8 bg-[#fafafa] p-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-black text-white"
              style={{ backgroundColor: shaadiGreen }}
            >
              1
            </div>
            <div>
              <p className="font-bold text-[#222]">Dedicated rishta desk</p>
              <p className="text-sm text-[#666]">Serious matrimony workflow — not casual swipes.</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/8 bg-[#fafafa] p-4">
            <Star className="h-10 w-10 shrink-0 fill-[#fbbf24] text-[#fbbf24]" />
            <div>
              <p className="font-bold text-[#222]">Built for clarity</p>
              <p className="text-sm text-[#666]">Preview → upgrade path, like leading matrimony sites.</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/8 bg-[#fafafa] p-4">
            <Users className="h-10 w-10 shrink-0" style={{ color: shaadiGreen }} />
            <div>
              <p className="font-bold text-[#222]">Stories in the making</p>
              <p className="text-sm text-[#666]">Share yours with us after you find your match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-black/[0.06] bg-[#f8f7f4] py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold sm:text-4xl" style={{ color: shaadiGreen }}>
                {s.value}
              </p>
              <p className="mt-1 font-bold text-[#222]">{s.label}</p>
              <p className="text-sm text-[#666]">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The experience */}
      <section id="experience" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] sm:text-4xl">The Rishta experience</h2>
            <p className="mx-auto mt-2 max-w-2xl text-[#666]">
              Borrowing the best ideas from category leaders—clear tiers, FAQs, and a calm path from browse to family
              conversation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="border border-black/8 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)]"
              >
                <CardContent className="p-6">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: `linear-gradient(145deg, ${shaadiGreen} 0%, ${shaadiGreenDark} 100%)` }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#222]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666]">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section id="stories" className="border-y border-black/[0.06] py-16 text-white sm:py-20" style={{ background: `linear-gradient(160deg, ${shaadiGreenDark} 0%, #0a3d2e 50%, #062920 100%)` }}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col items-center text-center">
            <Users className="mb-3 h-10 w-10 text-white/90" />
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Real stories, true connections</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              Illustrative stories—your success could be next. Register free to list or browse.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((s) => (
              <Card key={s.names} className="border-0 bg-white/10 text-white backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1 text-[#fbbf24]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-white/95">&ldquo;{s.quote}&rdquo;</p>
                  <p className="mt-4 font-serif text-lg font-semibold text-[#a7f3d0]">{s.names}</p>
                  <p className="text-xs uppercase tracking-wider text-white/55">{s.meta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-[#1a1a1a]">Frequently asked questions</h2>
          <p className="mb-8 text-center text-sm text-[#666]">
            Clear answers—similar to how Shaadi.com explains membership, safety, and next steps.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="1">
              <AccordionTrigger className="text-left font-semibold text-[#222] hover:no-underline">
                <span className="mr-3 font-mono text-sm font-bold" style={{ color: shaadiGreen }}>
                  01
                </span>
                Why use Rishtewale Sardarji?
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#666]">
                We focus on matrimony-grade profiles, tiered privacy, and optional human help—so families waste less time
                on mismatched or shallow chats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger className="text-left font-semibold text-[#222] hover:no-underline">
                <span className="mr-3 font-mono text-sm font-bold" style={{ color: shaadiGreen }}>
                  02
                </span>
                Free vs paid membership?
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#666]">
                Free registration lets you create a profile and browse with a limited preview of others. Paid (₹499/mo)
                unlocks full biodata and all photos for listings; contact for other members is still designed to go
                through our desk where applicable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionTrigger className="text-left font-semibold text-[#222] hover:no-underline">
                <span className="mr-3 font-mono text-sm font-bold" style={{ color: shaadiGreen }}>
                  03
                </span>
                Is this platform trustworthy?
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#666]">
                We combine technical controls (roles, masked feeds) with transparent pricing. Report any misuse—we
                review serious reports promptly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4">
              <AccordionTrigger className="text-left font-semibold text-[#222] hover:no-underline">
                <span className="mr-3 font-mono text-sm font-bold" style={{ color: shaadiGreen }}>
                  04
                </span>
                How do we contact someone we like?
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-[#666]">
                After you shortlist or express interest, our team can coordinate next steps (often over WhatsApp)—similar
                in spirit to concierge-style flows on large matrimony brands, at our scale.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Explore */}
      <section className="border-t border-black/[0.06] bg-[#f4f2ee] py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h3 className="font-serif text-xl font-bold text-[#222]">Explore matrimonial profiles by</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {footerExplore.map((label) => (
              <button
                key={label}
                type="button"
                onClick={goRegister}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#444] shadow-sm transition hover:border-[#00a85a]/35 hover:text-[#008c4d]"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: shaadiGreen }} />
              Join free — upgrade only when you want full browse access
            </div>
            <Button
              className="rounded-full px-8 font-bold text-white hover:opacity-95"
              style={{ backgroundColor: shaadiGreen }}
              onClick={goRegister}
            >
              Create free profile
            </Button>
          </div>
        </div>
      </section>
      </main>

      {/* Footer — Shaadi-style columns */}
      <footer className="bg-[#1a1a1a] py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-[#86efac]" />
              <span className="font-serif text-lg font-bold">Rishtewale Sardarji</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Connecting hearts, building futures — a matrimony desk for families who want clarity and respect online.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/90">Company</p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <a href="https://rishtewalesardarji.in/" className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </li>
              <li>
                <a href={`mailto:${defaultAppEmail()}`} className="hover:text-white">
                  {defaultAppEmail()}
                </a>
              </li>
              <li>
                <Link to="/auth" className="hover:text-white">
                  Log in / Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/90">Privacy &amp; you</p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of use
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-white">
                  Be safe online
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/90">More</p>
            <ul className="space-y-2 text-sm text-white/65">
              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white">
                  Success stories
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-8 text-center text-xs text-white/45">
          Copyright © {new Date().getFullYear()} Rishtewale Sardarji — All rights reserved. Not affiliated with{" "}
          <a href="https://www.shaadi.com/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
            Shaadi.com
          </a>
          .
        </p>
      </footer>
      <OptionalAdSenseLoader />
    </div>
  );
};

export default Home;
