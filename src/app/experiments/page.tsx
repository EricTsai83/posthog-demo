import BinomialDistributionChart from "./_components/binomial-distribution-chart";
import CoinFlipSimulation from "./_components/coin-flip-simulation";

export default function BinomialDistributionExperiment() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-10">
        <BinomialDistributionChart />
        <CoinFlipSimulation />
      </div>
    </div>
  );
}
