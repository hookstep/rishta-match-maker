import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MapPin, Calendar, User, Search, ArrowLeft } from "lucide-react";
import { differenceInYears } from "date-fns";
import { MobileRecommendBanner } from "@/components/MobileRecommendBanner";
import { loadSearchPrefs } from "@/lib/search-prefs";

const Discover = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const prefs = useMemo(() => loadSearchPrefs(), []);
  const [casteFilter, setCasteFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [ageRange, setAgeRange] = useState<[number, number]>([prefs.ageMin, prefs.ageMax]);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["discover-profiles", genderFilter],
    queryFn: async () => {
      let query = supabase.from("profiles").select("*, profile_photos(storage_path, display_order)");
      if (genderFilter !== "all") query = query.eq("gender", genderFilter);
      query = query.order("created_at", { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = useMemo(() => {
    const mine = user?.id;
    return (profiles ?? []).filter((p) => {
      if (mine && p.user_id === mine) return false;
      if (p.published === false) return false;
      const age = p.date_of_birth ? differenceInYears(new Date(), new Date(p.date_of_birth)) : null;
      if (age != null && (age < ageRange[0] || age > ageRange[1])) return false;
      if (casteFilter.trim()) {
        const c = (p.caste || "").toLowerCase();
        if (!c.includes(casteFilter.trim().toLowerCase())) return false;
      }
      if (prefs.communities.length) {
        const comm = (p.caste || "").toLowerCase();
        if (!prefs.communities.some((x) => comm.includes(x.toLowerCase()))) return false;
      }
      return true;
    });
  }, [profiles, user?.id, ageRange, casteFilter, prefs.communities]);

  const getPhotoUrl = (path: string) => {
    const { data } = supabase.storage.from("profile-photos").getPublicUrl(path);
    return data.publicUrl;
  };

  const getAge = (dob: string | null) => {
    if (!dob) return null;
    return differenceInYears(new Date(), new Date(dob));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold">Discover</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-4 py-6">
        <MobileRecommendBanner />

        <div className="grid gap-4 rounded-xl border bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 lg:col-span-2">
            <Label>Community / caste contains</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="e.g. Jatt, Khatri…"
                value={casteFilter}
                onChange={(e) => setCasteFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label>
              Age {ageRange[0]}–{ageRange[1]}
            </Label>
            <Slider
              value={ageRange}
              min={18}
              max={60}
              step={1}
              onValueChange={(v) => setAgeRange(v as [number, number])}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-t-lg bg-muted" />
                <CardContent className="space-y-2 p-4">
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">No profiles match these filters.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((profile) => {
              const photos = profile.profile_photos as { storage_path: string; display_order: number | null }[];
              const firstPhoto = photos?.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))?.[0];
              const age = getAge(profile.date_of_birth);
              return (
                <Card
                  key={profile.id}
                  className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-[var(--shadow-elevated)]"
                  onClick={() => navigate(`/profile/${profile.id}`)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {firstPhoto ? (
                      <img
                        src={getPhotoUrl(firstPhoto.storage_path)}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <User className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute right-2 top-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          profile.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {profile.gender}
                      </span>
                    </div>
                  </div>
                  <CardContent className="space-y-1 p-4">
                    <h3 className="truncate text-lg font-semibold">
                      {profile.name} {profile.surname}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {age != null && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {age} yrs
                        </span>
                      )}
                      {profile.residence_city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {profile.residence_city}
                        </span>
                      )}
                    </div>
                    {profile.caste && <p className="truncate text-sm text-muted-foreground">{profile.caste}</p>}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Discover;
