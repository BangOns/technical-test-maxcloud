import { Invoice } from "../../../../types/api-types";
import { isPast, parseISO } from "date-fns";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ invoices }: { invoices: Invoice[] }) {
  const paidCount = invoices.filter((inv) => inv.status === "paid").length;
  const unpaidCount = invoices.filter(
    (inv) =>
      inv.status === "unpaid" &&
      !(inv.due_date && isPast(parseISO(inv.due_date))),
  ).length;

  const totalOverdueInvoices = invoices.filter((inv) => {
    if (inv.status === "paid") return false;
    if (inv.status === "overdue") return true;
    if (inv.due_date && isPast(parseISO(inv.due_date))) return true;
    return false;
  }).length;
  const chartData = {
    labels: ["Paid", "Unpaid", "Overdue"],
    datasets: [
      {
        data: [paidCount, unpaidCount, totalOverdueInvoices],
        backgroundColor: ["#22c55e", "#eab308", "#ef4444"], // green, yellow, red from tailwind
        borderColor: ["#16a34a", "#ca8a04", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  return (
    <>
      <Doughnut data={chartData} options={chartOptions} />
    </>
  );
}
