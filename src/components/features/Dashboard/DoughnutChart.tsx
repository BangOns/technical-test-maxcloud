import { Invoice } from "../../../../types/data-types";
import { isPast, parseISO } from "date-fns";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ invoices }: { invoices: Invoice[] }) {
  const counts = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const isOverdue =
          invoice.due_date && isPast(parseISO(invoice.due_date));

        if (invoice.status === "paid") {
          acc.paid++;
          return acc;
        }

        if (invoice.status === "draft") {
          acc.draft++;
          return acc;
        }

        if (invoice.status === "overdue" || isOverdue) {
          acc.overdue++;
          return acc;
        }

        if (invoice.status === "unpaid") {
          acc.unpaid++;
        }

        return acc;
      },
      {
        paid: 0,
        unpaid: 0,
        overdue: 0,
        draft: 0,
      },
    );
  }, [invoices]);

  const chartData = {
    labels: ["Paid", "Unpaid", "Overdue", "Draft"],
    datasets: [
      {
        data: [counts.paid, counts.unpaid, counts.overdue, counts.draft],
        backgroundColor: ["#22c55e", "#eab308", "#ef4444", "#6b7280"],
        borderColor: ["#16a34a", "#ca8a04", "#dc2626", "#4b5563"],
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

  return <Doughnut data={chartData} options={chartOptions} />;
}
