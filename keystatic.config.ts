import { collection, config, fields, singleton } from "@keystatic/core";
import { DIAGRAM_KEYS, DIAGRAM_LABELS } from "./src/components/diagrams/keys";

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as
  `${string}/${string}` | undefined;

const linkFields = {
  label: fields.text({ label: "Label", validation: { isRequired: true } }),
  url: fields.url({ label: "URL", validation: { isRequired: true } }),
};

const labelValueFields = {
  label: fields.text({ label: "Label", validation: { isRequired: true } }),
  value: fields.text({ label: "Value", validation: { isRequired: true } }),
};

export default config({
  // GitHub mode in production (every save is a commit); local mode in dev.
  // NEXT_PUBLIC_KEYSTATIC_STORAGE=github forces GitHub mode in `next dev` (used once, to create the GitHub App).
  storage:
    githubRepo &&
    (process.env.NODE_ENV === "production" ||
      process.env["NEXT_PUBLIC_KEYSTATIC_STORAGE"] === "github")
      ? { kind: "github", repo: githubRepo }
      : { kind: "local" },

  singletons: {
    profile: singleton({
      label: "Profile",
      path: "content/profile",
      schema: {
        name: fields.text({ label: "Name", validation: { isRequired: true } }),
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        headline: fields.text({
          label: "Headline",
          multiline: true,
          validation: { isRequired: true },
        }),
        valueStatement: fields.text({
          label: "Value statement",
          multiline: true,
          validation: { isRequired: true },
        }),
        locationLine: fields.text({ label: "Location line" }),
        seoDescription: fields.text({
          label: "SEO description",
          multiline: true,
          validation: { isRequired: true },
        }),
        primaryCta: fields.object(
          {
            label: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),
            href: fields.text({
              label: "Link",
              description: "Path (/case-studies) or full URL.",
              validation: { isRequired: true },
            }),
          },
          { label: "Primary button" },
        ),
        currently: fields.object(
          {
            label: fields.text({ label: "Card label" }),
            status: fields.text({
              label: "Status (for example “Open to offers”)",
            }),
            items: fields.array(
              fields.object({
                title: fields.text({
                  label: "Title",
                  validation: { isRequired: true },
                }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "Items", itemLabel: (p) => p.fields.title.value },
            ),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Stack tags",
            }),
          },
          { label: "“Currently” card" },
        ),
        nav: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),
            href: fields.text({
              label: "Path",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Header navigation",
            itemLabel: (p) => p.fields.label.value,
          },
        ),
        contactLabel: fields.text({ label: "Header contact button label" }),
        links: fields.array(fields.object(linkFields), {
          label: "Links (GitHub, LinkedIn, …)",
          itemLabel: (p) => p.fields.label.value,
        }),
        email: fields.text({ label: "Public contact email" }),
        proofPoints: fields.array(
          fields.object({
            value: fields.text({
              label: "Value",
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),
            note: fields.text({ label: "Note" }),
            highlight: fields.checkbox({
              label: "Accent color",
              description: "Use sparingly: one key number.",
              defaultValue: false,
            }),
          }),
          {
            label: "Proof points (home metric strip)",
            itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
          },
        ),
        shippedAtLabel: fields.text({ label: "“Shipped at” label" }),
        shippedAt: fields.array(fields.text({ label: "Name" }), {
          label: "Shipped at",
        }),
        sections: fields.object(
          {
            caseStudiesEyebrow: fields.text({ label: "Case studies eyebrow" }),
            caseStudiesHeading: fields.text({ label: "Case studies heading" }),
            caseStudiesLink: fields.text({
              label: "Case studies “view all” label",
            }),
            caseLabel: fields.text({
              label: "Case study eyebrow prefix (“Case study”)",
            }),
            backLabel: fields.text({ label: "Back to case studies label" }),
            nextLabel: fields.text({ label: "Next case study prefix" }),
            keyResultsLabel: fields.text({ label: "Key results label" }),
            onThisPageLabel: fields.text({ label: "“On this page” label" }),
            appsEyebrow: fields.text({ label: "Apps strip eyebrow" }),
            appsHeading: fields.text({ label: "Apps strip heading" }),
            appsLink: fields.text({ label: "Apps strip “see all” label" }),
            workHeading: fields.text({ label: "Work page heading" }),
            workIntro: fields.text({
              label: "Work page intro",
              multiline: true,
            }),
            readCaseStudyLabel: fields.text({
              label: "“Read the case study” label",
            }),
            experienceHeading: fields.text({ label: "Experience heading" }),
            skillsHeading: fields.text({ label: "Skills heading" }),
            resumeLabel: fields.text({ label: "Résumé link label" }),
            contactHeading: fields.text({ label: "Contact heading" }),
            contactText: fields.text({
              label: "Contact text",
              multiline: true,
            }),
          },
          { label: "Section copy" },
        ),
        resume: fields.file({
          label: "Résumé (PDF)",
          description:
            "Name the file Julio_Ramirez_Resume.pdf. It is served at /resume/<file name>. The résumé buttons are hidden until a file is uploaded.",
          directory: "public/resume",
          publicPath: "/resume/",
        }),
      },
    }),
    engagement: singleton({
      label: "Hiring and clients",
      path: "content/engagement",
      schema: {
        lookingFor: fields.object(
          {
            show: fields.checkbox({
              label: "Show on Home",
              defaultValue: true,
            }),
            text: fields.text({
              label: "Text",
              description: "For example “Open to senior React roles…”.",
            }),
          },
          { label: "“Currently looking for” line" },
        ),
        teaser: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            text: fields.text({ label: "Text", multiline: true }),
            linkLabel: fields.text({ label: "Link label" }),
          },
          { label: "Home teaser for “Work with me”" },
        ),
        howIWork: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            items: fields.array(
              fields.object({
                title: fields.text({
                  label: "Title",
                  validation: { isRequired: true },
                }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "Items", itemLabel: (p) => p.fields.title.value },
            ),
          },
          { label: "“How I work” (Home)" },
        ),
        workWithMe: fields.object(
          {
            title: fields.text({ label: "Page title" }),
            intro: fields.text({ label: "Intro", multiline: true }),
            buildHeading: fields.text({ label: "“What I build” heading" }),
            build: fields.array(
              fields.object({
                title: fields.text({
                  label: "Title",
                  validation: { isRequired: true },
                }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "What I build", itemLabel: (p) => p.fields.title.value },
            ),
            stepsHeading: fields.text({ label: "“How it works” heading" }),
            steps: fields.array(
              fields.object({
                title: fields.text({
                  label: "Title",
                  validation: { isRequired: true },
                }),
                text: fields.text({ label: "Text", multiline: true }),
              }),
              { label: "Steps", itemLabel: (p) => p.fields.title.value },
            ),
            proofHeading: fields.text({ label: "Proof heading" }),
            proof: fields.array(
              fields.relationship({
                label: "Case study",
                collection: "caseStudies",
              }),
              {
                label: "Proof (2–3 case studies)",
                description:
                  "Unpublished case studies are skipped on the live site.",
                itemLabel: (p) => p.value ?? "Select a case study",
              },
            ),
            ctaLabel: fields.text({ label: "Call-to-action label" }),
            ctaSubject: fields.text({
              label: "Email subject",
              description: "Prefilled in the mail the button opens.",
            }),
          },
          { label: "Work with me page" },
        ),
      },
    }),
    siteInfo: singleton({
      label: "How this site is built",
      path: "content/site-info",
      format: { contentField: "body" },
      entryLayout: "content",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        intro: fields.text({ label: "Intro", multiline: true }),
        body: fields.markdoc({
          label: "Body",
          description:
            "H2 headings appear in the “On this page” nav. No TODO(julio): this page is always public.",
        }),
      },
    }),
  },

  collections: {
    experience: collection({
      label: "Experience",
      path: "content/experience/*",
      slugField: "company",
      format: { data: "yaml" },
      schema: {
        company: fields.slug({
          name: { label: "Company", validation: { isRequired: true } },
        }),
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        location: fields.text({ label: "Location" }),
        start: fields.text({
          label: "Start",
          description: "As written, for example “Jan 2023”.",
          validation: { isRequired: true },
        }),
        end: fields.text({
          label: "End",
          description: "Leave empty for a current role (shown as “Present”).",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        highlights: fields.array(
          fields.text({ label: "Highlight", multiline: true }),
          {
            label: "Highlights",
          },
        ),
        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Stack",
        }),
        order: fields.integer({
          label: "Order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
          validation: { isRequired: true },
        }),
      },
    }),

    apps: collection({
      label: "Apps and products",
      path: "content/apps/*",
      slugField: "name",
      format: { data: "yaml" },
      schema: {
        name: fields.slug({
          name: { label: "Name", validation: { isRequired: true } },
        }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Web", value: "web" },
            { label: "Mobile", value: "mobile" },
          ],
          defaultValue: "web",
        }),
        org: fields.text({ label: "Company or client" }),
        role: fields.text({ label: "Role" }),
        years: fields.text({
          label: "Years",
          description: "For example “2017 – 2018”.",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Stack",
        }),
        links: fields.array(fields.object(linkFields), {
          label: "Links",
          itemLabel: (p) => p.fields.label.value,
        }),
        caseStudy: fields.relationship({
          label: "Related case study",
          collection: "caseStudies",
        }),
        screenshots: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: "public/images/apps",
              publicPath: "/images/apps/",
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: "Alt text",
              validation: { isRequired: true },
            }),
          }),
          { label: "Screenshots", itemLabel: (p) => p.fields.alt.value },
        ),
        featured: fields.checkbox({
          label: "Featured on home",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
          validation: { isRequired: true },
        }),
      },
    }),

    caseStudies: collection({
      label: "Case studies",
      path: "content/case-studies/*/",
      slugField: "title",
      format: { contentField: "body" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        summary: fields.text({
          label: "Summary (one line, used on cards)",
          multiline: true,
          validation: { isRequired: true },
        }),
        lede: fields.text({
          label: "Lede (longer intro on the page)",
          multiline: true,
        }),
        category: fields.text({
          label: "Category",
          description:
            "For example “Architecture” or “Architecture · Performance”.",
        }),
        company: fields.text({ label: "Company label" }),
        facts: fields.array(fields.object(labelValueFields), {
          label: "Facts (Role, Company, Scale, Stack)",
          itemLabel: (p) => p.fields.label.value,
        }),
        outcomeValue: fields.text({ label: "Card outcome value" }),
        outcomeLabel: fields.text({ label: "Card outcome label" }),
        metrics: fields.array(
          fields.object({
            value: fields.text({
              label: "Value",
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: "Label",
              validation: { isRequired: true },
            }),
            note: fields.text({ label: "Note" }),
            highlight: fields.checkbox({
              label: "Accent color",
              defaultValue: false,
            }),
          }),
          {
            label: "Key results",
            itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
          },
        ),
        diagram: fields.select({
          label: "Diagram",
          options: DIAGRAM_KEYS.map((key) => ({
            label: DIAGRAM_LABELS[key],
            value: key,
          })),
          defaultValue: DIAGRAM_KEYS[0],
        }),
        published: fields.checkbox({
          label: "Published",
          description:
            "Unpublished case studies never render or appear in the sitemap.",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
          validation: { isRequired: true },
        }),
        body: fields.markdoc({
          label: "Body",
          description:
            "Template (H2 each): Context, Problem, Options considered, Decision, Architecture, Results, What I’d do differently.",
        }),
      },
    }),

    skills: collection({
      label: "Skills",
      path: "content/skills/*",
      slugField: "group",
      format: { data: "yaml" },
      schema: {
        group: fields.slug({
          name: { label: "Group", validation: { isRequired: true } },
        }),
        order: fields.integer({ label: "Order", defaultValue: 0 }),
        items: fields.array(fields.text({ label: "Skill" }), {
          label: "Items",
        }),
      },
    }),
  },
});
