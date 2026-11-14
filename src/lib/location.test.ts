import {
  isBot,
  resolveVariant,
  variantForCountry,
  type Variant,
} from "./location";

const MX = ["MX", "AR", "CO"];

describe("variantForCountry", () => {
  it("maps listed countries to mexico and everything else to chicago", () => {
    expect(variantForCountry("MX", MX)).toBe("mexico");
    expect(variantForCountry("co", MX)).toBe("mexico");
    expect(variantForCountry("US", MX)).toBe("chicago");
    expect(variantForCountry(null, MX)).toBe("chicago");
    expect(variantForCountry("", MX)).toBe("chicago");
  });
});

describe("resolveVariant", () => {
  it("uses the IP country", () => {
    expect(resolveVariant({ country: "MX", mexicoCountries: MX })).toEqual({
      variant: "mexico",
      source: "ip",
      cookie: null,
    });
    expect(resolveVariant({ country: "US", mexicoCountries: MX }).variant).toBe(
      "chicago",
    );
  });

  it("defaults to chicago without a country (dev)", () => {
    expect(resolveVariant({ mexicoCountries: MX })).toMatchObject({
      variant: "chicago",
      source: "default",
    });
  });

  it("lets ?loc= beat the IP and set the cookie", () => {
    expect(
      resolveVariant({ query: "mexico", country: "US", mexicoCountries: MX }),
    ).toEqual({
      variant: "mexico",
      source: "query",
      cookie: { set: "mexico" },
    });
  });

  it("lets the cookie beat the IP", () => {
    const variant: Variant = "mexico";
    expect(
      resolveVariant({ cookie: variant, country: "US", mexicoCountries: MX }),
    ).toMatchObject({ variant, source: "cookie" });
  });

  it("clears the override with ?loc=auto and falls back to the IP", () => {
    expect(
      resolveVariant({
        query: "auto",
        cookie: "mexico",
        country: "US",
        mexicoCountries: MX,
      }),
    ).toEqual({ variant: "chicago", source: "ip", cookie: "clear" });
  });

  it("ignores unknown values", () => {
    expect(
      resolveVariant({
        query: "paris",
        cookie: "nope",
        country: "MX",
        mexicoCountries: MX,
      }).variant,
    ).toBe("mexico");
  });

  it("always serves bots the chicago variant, whatever the country or override", () => {
    expect(
      resolveVariant({
        userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1)",
        query: "mexico",
        cookie: "mexico",
        country: "MX",
        mexicoCountries: MX,
      }),
    ).toEqual({ variant: "chicago", source: "bot", cookie: null });
  });
});

describe("isBot", () => {
  it.each([
    "Googlebot/2.1",
    "LinkedInBot/1.0",
    "Slackbot-LinkExpanding 1.0",
    "Twitterbot/1.0",
    "facebookexternalhit/1.1",
  ])("detects %s", (ua) => expect(isBot(ua)).toBe(true));

  it("does not flag a browser", () => {
    expect(isBot("Mozilla/5.0 (Macintosh) AppleWebKit/605 Safari/605")).toBe(
      false,
    );
    expect(isBot(null)).toBe(false);
  });
});
