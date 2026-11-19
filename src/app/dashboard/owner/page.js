import Analytics from "@/components/Analytics";
export default function Page() {
  return (
    <>
      <h1 className="dash-title mb-6">Owner Analytics</h1>
      <Analytics
        url="/analytics/owner"
        stats={[
          ["Listed Equipment", "listed"],
          ["Completed Rentals", "completed"],
          ["Total Earnings", "totalEarnings", "$"],
        ]}
        chartKey="monthlyEarnings"
        dataKey="earnings"
        title="Monthly earnings"
      />
    </>
  );
}
