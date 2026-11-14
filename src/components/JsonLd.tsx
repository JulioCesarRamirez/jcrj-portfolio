import type { Profile } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

interface Props {
  profile: Profile;
  location: {
    address: { locality: string; region: string; country: string };
    resume: string | null;
  };
}

/** schema.org Person for search engines. Crawlers always see the default variant's address. */
export function JsonLd({ profile, location }: Props) {
  const { address, resume } = location;
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.eyebrow,
    description: profile.seoDescription,
    url: siteUrl,
    sameAs: profile.links.map((link) => link.url),
    ...(address.locality || address.country
      ? {
          address: {
            "@type": "PostalAddress",
            ...(address.locality && { addressLocality: address.locality }),
            ...(address.region && { addressRegion: address.region }),
            ...(address.country && { addressCountry: address.country }),
          },
        }
      : {}),
    ...(resume
      ? {
          subjectOf: {
            "@type": "DigitalDocument",
            name: "Résumé",
            url: `${siteUrl}${resume}`,
          },
        }
      : {}),
  };
  return (
    <script
      type="application/ld+json"
      // JSON from our own content; "<" is escaped so it cannot close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
