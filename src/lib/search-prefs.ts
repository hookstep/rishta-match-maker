const KEY = "rishta_search_prefs_v1";

export type SearchPrefs = {
  communities: string[];
  ageMin: number;
  ageMax: number;
  notifyNewProfiles: boolean;
  digestInsteadOfInstant: boolean;
};

const defaultPrefs: SearchPrefs = {
  communities: [],
  ageMin: 21,
  ageMax: 45,
  notifyNewProfiles: true,
  digestInsteadOfInstant: false,
};

export function loadSearchPrefs(): SearchPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultPrefs };
    const p = JSON.parse(raw) as Partial<SearchPrefs>;
    return {
      ...defaultPrefs,
      ...p,
      communities: Array.isArray(p.communities) ? p.communities : defaultPrefs.communities,
      ageMin: typeof p.ageMin === "number" ? p.ageMin : defaultPrefs.ageMin,
      ageMax: typeof p.ageMax === "number" ? p.ageMax : defaultPrefs.ageMax,
      notifyNewProfiles: p.notifyNewProfiles !== false,
      digestInsteadOfInstant: !!p.digestInsteadOfInstant,
    };
  } catch {
    return { ...defaultPrefs };
  }
}

export function saveSearchPrefs(p: SearchPrefs) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
