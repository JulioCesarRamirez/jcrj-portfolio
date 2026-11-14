import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DevTodoHighlight } from "@/components/DevTodoHighlight";
import { DraftBanner } from "@/components/DraftBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProfile, getResume, getVisibleCaseStudies } from "@/lib/content";
import { isIndexable } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";
import { themeScript } from "@/lib/theme-script";
import { isDraftMode } from "@/lib/visibility";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} · ${profile.eyebrow}`,
      template: `%s · ${profile.name}`,
    },
    description: profile.seoDescription,
    robots: isIndexable() ? undefined : { index: false, follow: false },
    twitter: {
      card: "summary",
      title: profile.name,
      description: profile.seoDescription,
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: profile.name,
      description: profile.seoDescription,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [profile, caseStudies] = await Promise.all([
    getProfile(),
    getVisibleCaseStudies(),
  ]);
  const draft = isDraftMode();
  // No readable case studies: the page 404s, so the link must not exist.
  const nav =
    caseStudies.length === 0
      ? profile.nav.filter((item) => !item.href.startsWith("/case-studies"))
      : profile.nav;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {draft ? <DraftBanner /> : null}
        {draft ? <DevTodoHighlight /> : null}
        <a
          href="#main"
          className="bg-text text-bg sr-only z-50 rounded-md px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header
          name={profile.name}
          nav={nav}
          contactLabel={profile.contactLabel}
          resume={getResume(profile, profile.sections.resumeLabel)}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer
          name={profile.name}
          email={profile.email}
          links={profile.links}
        />
      </body>
    </html>
  );
}
