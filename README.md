This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

![Exconomy Toxicity Dashboard](https://github.com/Gokumusprime/Economy-Toxicity/blob/master/app/assets/Screenshot%20Exconomy%20Toxicity%20Dashboard.png)

## Description

This project is a concept dashboard displaying the relationship between news media and economic stats. The dashboard updates in real-time and provides information through small components.

This includes:
- A component that shows the current CPI by month through GraphQL via a mongoDB database.
- A component that shows the Dow Jones Index value with an arrow pointing down or up once the first difference is measured.  This updates every 4 minutes.
- A component that shows any current news being streamed from Google News.  All media organizations are included.  This component does not discriminate.  This only pulls in news that mentions the economy name.  This updates every 1 minute.
- A component that measures the toxicity of the current news streaming in by analyzing the description of each article and using machine learning to establish a score for toxicity.  This updates around every 2 seconds.
- A component that embeds a stock ticker on the leading tech stocks currently.  This is contantly updated via TradingView.
- A theme switching button in the corner to alter the color theme of the page.
- This application is also fully responsive.

Note:
This dashboard uses api's for different components through a proxy page.  I am well aware that some of the api's being used will expose my tokens but I am not bothered by that since these are all free tokens.  They have different call limits but should suffice for the few that use this.

API Calls:
- Financial Modeling Prep to obtain the latest dow jones index:  https://financialmodelingprep.com/stable/quote?symbol=^DJI
- Google News to check for the lateset news involving the economy:  https://news.google.com/rss/search?q=economy&hl=en-US&gl=US&ceid=US:en
- Comment Analyzer by Perspective through Google API's to request toxicity scores based on given news text:  https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze

## Purpose and Methods
I designed this project for interview demos.

Functionality:
This project demonstrates the use of React/Next.js with Typescript to modularize components for a dashboard.  This is very similar to how a CMS might use React to distribute data with components to populate a page.  Most API's being used are client side and I have used one server side for the toxicity component to demonstrate proxy use with both the front end and server side.  Components take advantage of state changes to update regularly while maintaining the previous state till the new state is rendered.  That way no jarring effects are noticed.  There are useEffect listeners to detect specific markup change before altering state.  This is how the themes button and toxicity component work.  The themes button listens for the data-theme property of the HTML tag to change then re-colors the site.  The toxicity component listens for changes to the news slider and monitors the active focused article at the given time it fires off to re-evaluate toxicity.  The graph is being created through chart js with data being received through GraphQL to a mongoDB database.

Design:
I am using Tailwind CSS to style the app.  DaisyUI is being used for specific snippets such as the card markup scaffolding for the different components.  Theme updates to the toxicity component were tricky since you need to listen for a new hex value of the chosen theme's stylesheet classes after a new theme is loaded then apply it to the js options for the alert gauge which I had to trick into accepting classes rather than hex values in its options.  Theme does not update the leading tickers since they are populated by an embed that generates an iframe.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
