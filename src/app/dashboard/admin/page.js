import Analytics from "@/components/Analytics";
export default function Page() {
  return (
    <>
      <h1 className="dash-title mb-6">Platform Analytics</h1>
      <Analytics
        url="/analytics/admin"
        stats={[
          ["Total Users", "users"],
          ["Total Equipment", "equipment"],
          ["Total Bookings", "bookings"],
          ["Pending Approvals", "pending"],
          ["Completed Rentals", "completed"],
          ["Total Revenue", "revenue", "$"],
        ]}
        chartKey="monthlyBookings"
        dataKey="bookings"
        title="Monthly bookings"
      />
    </>
  );
}
