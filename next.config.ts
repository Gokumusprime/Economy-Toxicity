import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/dow-jones",
        destination:
          "https://financialmodelingprep.com/stable/quote?symbol=^DJI&apikey=WdXEeu3b1Q7XC8WInnDcScEdyBfafLo8",
      },
      {
        source: "/api/economy-news",
        destination:
          "https://news.google.com/rss/search?q=economy&hl=en-US&gl=US&ceid=US:en",
      },
    ];
  },
};

export default nextConfig;