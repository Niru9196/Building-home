import brandManifest from "@/propsoch.json";

const defaultSiteUrl = "https://www.propsoch.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const absolute = (path: string) =>
  path.startsWith("http") ? path : `${defaultSiteUrl}${path}`;

export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavigationColumn {
  heading?: string;
  links: readonly NavigationLink[];
}

export interface NavigationCategory {
  label: string;
  columns: readonly NavigationColumn[];
}

export const siteConfig = {
  name: brandManifest.short_name,
  fullName: brandManifest.name,
  description: brandManifest.description,
  siteUrl: configuredSiteUrl || defaultSiteUrl,
  colors: {
    background: brandManifest.background_color,
    primary: brandManifest.theme_color,
    navy: "#122A3F",
  },
  links: {
    home: `${defaultSiteUrl}/`,
    login: absolute("/verify?entry_point=landing-hero&cta=sign-in"),
    getStarted: absolute("/get-started?entry_point=landing-hero"),
    exploreServices: absolute("/guided-home-buying?entry_point=landing-hero"),
    community:
      process.env.NEXT_PUBLIC_COMMUNITY_URL ||
      "https://nas.io/propsochs-business",
  },
} as const;

export const megaNavigation: readonly NavigationCategory[] = [
  {
    label: "Properties",
    columns: [
      {
        heading: "Properties",
        links: [
          {
            label: "Search & Filter Properties",
            href: absolute(
              "/buy/property-for-sale-in-bengaluru?minBudget=15000000&maxBudget=50000000&sortType=popularity&sortOrder=desc&possession=any&currentPage=1&entry_point=navbar&reset=true",
            ),
            description:
              "Search, filter and sort from 500+ RERA-approved properties in Bengaluru",
          },
          {
            label: "Compare Properties",
            href: absolute("/compare-properties/bengaluru?initial=true&entry_point=navbar"),
            description:
              "Compare properties exhaustively on 40+ parameters you won't find elsewhere",
          },
          {
            label: "Sell Your Property",
            href: "https://tally.so/r/RG91N9",
            description:
              "Share details & we'll match you with genuine homebuyers from our community",
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: [
      {
        heading: "Services",
        links: [
          {
            label: "Guided Homebuying",
            href: absolute("/guided-home-buying?entry_point=navbar"),
            description:
              "Trusted by 1000+ intelligent buyers who bought their ideal homes confidently",
          },
          {
            label: "Peace of Mind Report",
            href: absolute("/peace-of-mind?entry_point=navbar"),
            description:
              "India's most comprehensive report covering 80+ critical data points",
          },
          {
            label: "NRI Advisory",
            href: absolute("/nri"),
            badge: "New",
            description: "Independent guidance for NRIs buying property in India remotely",
          },
          {
            label: "Home Loans",
            href: "https://forms.gle/Bu3WZ1XDyEmn42KVA",
            description: "Compare lenders, get best offers & end-to-end guidance",
          },
          {
            label: "Legal Services",
            href: "https://docs.google.com/document/d/13fdZzYiMlwYasBDOtz79AHSh55RNcL46/edit",
            description: "Complete title due diligence, agreement reviews & advisory",
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          {
            label: "Blog",
            href: "https://www.propsoch.com/blogs/",
            description: "In-depth insights, guides & real estate updates every week",
          },
          {
            label: "Homebuying Guide 101",
            href: "https://www.propsoch.com/blogs/home-buying-guide-101/",
            description: "Navigate your homebuying journey with clarity",
          },
          {
            label: "Homebuying Checklist",
            href: "https://www.propsoch.com/blogs/homebuying-checklist/",
            description: "See if your dream home checks all the boxes",
          },
          {
            label: "Bangalore Real Estate 2026",
            href: "https://www.propsoch.com/blogs/state-of-bangalore-real-estate-trends-projections-and-insights-for-2026/",
            description: "Supply, demand and price trends for 2026",
          },
        ],
      },
      {
        heading: "Tools",
        links: [
          {
            label: "Loyalty Reward Calculator",
            href: absolute("/loyalty-reward-calculator"),
            description: "See what you'll earn in money, time & sanity",
          },
          {
            label: "Fair Price Calculator",
            href: absolute("/fair-price-calculator"),
            badge: "New",
            description: "Check if a property's price is fair",
          },
          {
            label: "EMI Calculator",
            href: absolute("/intelligent-emi-calculator"),
            badge: "New",
            description: "Calculate EMIs, prepayments and possession dates",
          },
        ],
      },
    ],
  },
  {
    label: "Company",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About Us", href: absolute("/about-us") },
          { label: "Customer Reviews", href: absolute("/reviews") },
          { label: "Careers", href: "https://www.linkedin.com/company/propsoch/jobs/" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/propsoch/" },
          { label: "YouTube", href: "https://www.youtube.com/@club.propsoch" },
        ],
      },
    ],
  },
];
