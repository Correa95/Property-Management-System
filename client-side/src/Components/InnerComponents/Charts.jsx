import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./Charts.css";

const COLORS = ["#00C49F", "#1bfd9c"]; // Occupied, Vacant

function Charts() {
  const [apartments, setApartments] = useState([]);
  const [leases, setLeases] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/apartment`)
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((err) => console.error("Apartment fetch error:", err));

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/lease`)
      .then((res) => res.json())
      .then((data) => setLeases(data))
      .catch((err) => console.error("Lease fetch error:", err));

    fetch(`${import.meta.env.VITE_API_URL}/api/v1/payment`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Payment fetch error:", err));
  }, []);

  const now = new Date();
  const activeLeases = leases.filter((lease) => {
    const start = new Date(lease.startDate);
    const end = new Date(lease.endDate);
    return start <= now && end >= now;
  });

  const totalUnits = apartments.length;
  const occupiedUnits = activeLeases.length;
  const vacantUnits = totalUnits - occupiedUnits;

  const occupancyData = [
    { name: "Occupied", value: occupiedUnits },
    { name: "Vacant", value: vacantUnits >= 0 ? vacantUnits : 0 },
  ];

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Invalid"
      : date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const revenueByMonth = {};
  payments.forEach((payment) => {
    const month = formatMonthYear(payment.paymentDate);
    const amount = Number(payment.paymentAmount);
    if (!isNaN(amount)) {
      if (!revenueByMonth[month]) revenueByMonth[month] = 0;
      revenueByMonth[month] += amount;
    }
  });

  const revenueData = Object.entries(revenueByMonth).map(([month, total]) => ({
    month,
    revenue: total,
  }));

  return (
    <section className="charts">
      <div className="occupancyRate">
        <h2>Occupancy Rate</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={occupancyData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {occupancyData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="revenue">
        <h2>Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="revenue" fill="#1b998b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default Charts;
