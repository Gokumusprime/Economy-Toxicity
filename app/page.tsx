import NavBar from "./components/navBar";
import DowTicker from "./components/dowTicker";
import NewsList from "./components/newsList";
import CPIGraph from "./components/cpiGraph";
import ToxicityGaugeMeter from "./components/toxicityGaugeMeter";
import { ThemeList } from "./themes/themeList";
import LeadTickerOverview from "./components/leadTickerOverview";

export default function Home() {
  return (
    <>
      <nav className="mb-4">
        <NavBar ThemeList={ThemeList} />
      </nav>
      <main className="columns-1 xl:columns-2 gap-4 space-y-4">
        <NewsList />
        <DowTicker />
        <CPIGraph />
        <LeadTickerOverview />
        <ToxicityGaugeMeter />
      </main>
    </>
  );
}
