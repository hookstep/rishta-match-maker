import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Heart } from "lucide-react";
import { toast } from "sonner";
import { loadSearchPrefs, saveSearchPrefs, type SearchPrefs } from "@/lib/search-prefs";

const Settings = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<SearchPrefs>(() => loadSearchPrefs());

  useEffect(() => {
    setPrefs(loadSearchPrefs());
  }, []);

  const update = (patch: Partial<SearchPrefs>) => {
    setPrefs((p) => ({ ...p, ...patch }));
  };

  const save = () => {
    saveSearchPrefs(prefs);
    toast.success("Preferences saved on this device");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
          </Link>
          <h1 className="text-lg font-semibold">Match preferences</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Filters you care about</CardTitle>
            <CardDescription>Used on Discover and for future alert matching (stored locally for now).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Age min</Label>
                <Input
                  type="number"
                  min={18}
                  max={80}
                  value={prefs.ageMin}
                  onChange={(e) => update({ ageMin: Number(e.target.value) || 18 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Age max</Label>
                <Input
                  type="number"
                  min={18}
                  max={80}
                  value={prefs.ageMax}
                  onChange={(e) => update({ ageMax: Number(e.target.value) || 45 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Communities (comma-separated)</Label>
              <Input
                placeholder="e.g. Jatt, Arora"
                value={prefs.communities.join(", ")}
                onChange={(e) =>
                  update({
                    communities: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Notify about new profiles</p>
                <p className="text-sm text-muted-foreground">When server-side alerts are enabled</p>
              </div>
              <Switch checked={prefs.notifyNewProfiles} onCheckedChange={(v) => update({ notifyNewProfiles: v })} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">Digest instead of instant</p>
                <p className="text-sm text-muted-foreground">Preference only until digest email ships</p>
              </div>
              <Switch
                checked={prefs.digestInsteadOfInstant}
                onCheckedChange={(v) => update({ digestInsteadOfInstant: v })}
              />
            </div>
            <Button onClick={save}>Save</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
