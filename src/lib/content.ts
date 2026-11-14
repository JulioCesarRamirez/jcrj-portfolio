import { cache } from "react";
import { reader } from "./reader";
import {
  applyVisibility,
  assertNoTodo,
  isDraftMode,
  withRequiredFields,
} from "./visibility";
import type { Variant } from "./location";

export type Profile = NonNullable<
  Awaited<ReturnType<typeof reader.singletons.profile.read>>
>;

const PROFILE_REQUIRED = [
  "name",
  "headline",
  "valueStatement",
  "seoDescription",
] as const;

/** Compare by `order`, then by slug so the result is deterministic. */
function byOrder<T extends { slug: string; entry: { order: number | null } }>(
  a: T,
  b: T,
) {
  return (
    (a.entry.order ?? 0) - (b.entry.order ?? 0) || a.slug.localeCompare(b.slug)
  );
}

/** Drop entries whose required fields are unconfirmed, then sanitize the rest (production only). */
function visible<E extends object>(
  all: readonly { slug: string; entry: E }[],
  required: readonly (keyof E)[],
) {
  const draft = isDraftMode();
  return all
    .filter(
      ({ entry }) => withRequiredFields([entry], required, draft).length === 1,
    )
    .map(({ slug, entry }) => ({ slug, entry: applyVisibility(entry, draft) }));
}

export const getProfile = cache(async (): Promise<Profile> => {
  const profile = await reader.singletons.profile.read();
  if (!profile)
    throw new Error("Missing content/profile. Create it in /keystatic.");
  assertNoTodo(profile, PROFILE_REQUIRED, "profile");
  return applyVisibility(profile);
});

export const getExperience = cache(async () => {
  const all = await reader.collections.experience.all();
  return visible(all, ["company", "title", "start"]).sort(byOrder);
});

export const getSkills = cache(async () => {
  const all = await reader.collections.skills.all();
  return visible(all, ["group"]).sort(byOrder);
});

/** Case studies readers may see: published ones, plus drafts in `next dev`. */
export const getVisibleCaseStudies = cache(async () => {
  const all = await reader.collections.caseStudies.all();
  const draft = isDraftMode();
  return all
    .filter((c) => draft || c.entry.published)
    .map(({ slug, entry }) => ({ slug, entry: applyVisibility(entry, draft) }))
    .sort(byOrder);
});

export async function getCaseStudy(slug: string) {
  const entry = await reader.collections.caseStudies.read(slug);
  if (!entry || (!entry.published && !isDraftMode())) return null;
  return { slug, entry };
}

export const getApps = cache(async () => {
  const [all, studies] = await Promise.all([
    reader.collections.apps.all(),
    getVisibleCaseStudies(),
  ]);
  const studySlugs = new Set(studies.map((s) => s.slug));
  return visible(all, ["name"])
    .map(({ slug, entry }) => ({
      slug,
      // A card links to a case study only when readers can open it.
      entry: {
        ...entry,
        caseStudy:
          entry.caseStudy && studySlugs.has(entry.caseStudy)
            ? entry.caseStudy
            : null,
      },
    }))
    .sort(byOrder);
});

export const getFeaturedApps = cache(async () =>
  (await getApps()).filter((a) => a.entry.featured),
);

export function getResume(file: string | null, label: string) {
  return file ? { label, href: file } : null;
}

export const getSiteInfo = cache(async () => {
  const info = await reader.singletons.siteInfo.read();
  return info ? applyVisibility(info) : null;
});

export const getEngagement = cache(async () => {
  const engagement = await reader.singletons.engagement.read();
  if (!engagement)
    throw new Error("Missing content/engagement. Create it in /keystatic.");
  return applyVisibility(engagement);
});

const OTHER: Record<Variant, Variant> = {
  chicago: "mexico",
  mexico: "chicago",
};

/** Location copy, address and résumé for one variant. The résumé falls back to the other variant's, then to the profile's. */
export const getLocation = cache(async (variant: Variant) => {
  const [raw, profile] = await Promise.all([
    reader.singletons.locationVariants.read(),
    getProfile(),
  ]);
  if (!raw)
    throw new Error(
      "Missing content/location-variants. Create it in /keystatic.",
    );
  const data = applyVisibility(raw);
  const own = data[variant];
  return {
    locationLine: own.locationLine || profile.locationLine,
    lookingFor: own.lookingFor,
    address: {
      locality: own.locality,
      region: own.region,
      country: own.country,
    },
    resume: own.resume ?? data[OTHER[variant]].resume ?? profile.resume,
  };
});
