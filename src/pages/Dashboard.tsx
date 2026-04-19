import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useMyProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { Search, Plus, LogOut, Heart, User, Shield } from "lucide-react";
import { fetchProfilesFeed } from "@/lib/fetchProfilesFeed";
import { SubscribeButton } from "@/components/SubscribeButton";
import { ProfileFeedCardGrid } from "@/components/ProfileFeedCardGrid";
import { partitionFeedByOwnerSubscription } from "@/lib/partitionAdminFeed";

const Dashboard = () => {
  const { user, isAdmin, isPaid, entitlementsLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: myProfile, isLoading: myProfileLoading } = useMyProfile({
    enabled: !entitlementsLoading,
  });
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  const { data: profiles, isLoading, error: profilesError } = useQuery({
    queryKey: ["profiles-feed", search, genderFilter, user?.id, isPaid, isAdmin],
    queryFn: async () => {
      if (!user?.id) return [];
      return fetchProfilesFeed({
        search,
        genderFilter,
        viewerUserId: user.id,
        isPaid,
        isAdmin,
      });
    },
    enabled: !!user && !entitlementsLoading,
  });

  const feedSections = useMemo(
    () => partitionFeedByOwnerSubscription(profiles, !!isAdmin),
    [profiles, isAdmin],
  );

  if (entitlementsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin && myProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold font-serif">Rishte Wale Sardarji</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {!isAdmin && !isPaid && <SubscribeButton className="hidden sm:inline-flex" />}
            {myProfile?.id && (
              <Button variant="outline" size="sm" onClick={() => navigate(`/profile/${myProfile.id}/edit`)}>
                Update my profile
              </Button>
            )}
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin">
                  <Shield className="mr-1 h-4 w-4" /> Admin directory
                </Link>
              </Button>
            )}
            <Button
              onClick={() => navigate("/profile/new")}
              size="sm"
              disabled={!isAdmin}
              title={!isAdmin ? "Only admins can add profiles for other accounts" : undefined}
            >
              <Plus className="mr-1 h-4 w-4" /> {isAdmin ? "Add user & profile" : "Add profile"}
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {!isAdmin && !myProfile?.id && !myProfileLoading && (
          <Card className="border-border bg-muted/30">
            <CardContent className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Add your own matrimonial profile when you are ready. You can still browse other listings.
              </p>
              <Button size="sm" onClick={() => navigate("/profile/new")}>
                Create my profile
              </Button>
            </CardContent>
          </Card>
        )}

        {profilesError && (
          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="py-3 text-sm">
              <p className="font-medium text-destructive">Could not load listings</p>
              <p className="text-muted-foreground">{profilesError.message}</p>
            </CardContent>
          </Card>
        )}

        {!isAdmin && !isPaid && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Free preview</p>
                <p className="text-sm text-muted-foreground">
                  You see one photo per listing; names and biodata stay hidden until you subscribe. Our team connects
                  matches over WhatsApp after you upgrade.
                </p>
              </div>
              <SubscribeButton />
            </CardContent>
          </Card>
        )}

        {isAdmin && (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="py-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Admin:</span> New listings appear at the top. Use{" "}
              <strong>Add user &amp; profile</strong> to create a listing for a member (paste their auth user id on the
              form). Below, <strong>Paid subscribers</strong> vs <strong>Free / not subscribed</strong> is based on each
              listing owner&apos;s subscription.
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, city, caste, occupation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-lg" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : profiles?.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No profiles found</h3>
            <p className="text-muted-foreground">
              {search ? "Try a different search term" : "No listings yet"}
            </p>
          </div>
        ) : feedSections.showSections ? (
          <div className="space-y-10">
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-2 border-b pb-2">
                <h2 className="text-lg font-semibold">Paid subscribers</h2>
                <span className="text-sm text-muted-foreground">{feedSections.paid.length} listing(s)</span>
              </div>
              <ProfileFeedCardGrid profiles={feedSections.paid} emptyLabel="No listings from paid members." />
            </section>
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-2 border-b pb-2">
                <h2 className="text-lg font-semibold">Free / not subscribed</h2>
                <span className="text-sm text-muted-foreground">{feedSections.free.length} listing(s)</span>
              </div>
              <ProfileFeedCardGrid profiles={feedSections.free} emptyLabel="No listings from free members." />
            </section>
          </div>
        ) : (
          <ProfileFeedCardGrid profiles={profiles ?? []} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
