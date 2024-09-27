import BinomialDistributionChart from "./_components/binomial-distribution-chart";

export default function BinomialDistributionExperiment() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-center text-4xl font-bold mb-8">
        Binomial Distribution Experiment
      </h2>
      <div className="flex flex-col items-center justify-center">
        <BinomialDistributionChart />
      </div>
    </div>
  );
}
