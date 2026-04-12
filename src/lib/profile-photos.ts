export type ProfilePhotoRow = {
  id: string;
  storage_path: string;
  display_order: number | null;
};

export function sortProfilePhotos(photos: ProfilePhotoRow[] | null | undefined): ProfilePhotoRow[] {
  return [...(photos ?? [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}
