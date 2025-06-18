import { useEffect, useState } from "react";

function Payment() {
  const [leases, setLeases] = useState([]);
  const [selectedLeaseId, setSelectedLeaseId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/lease")
      .then((res) => res.json())
      .then((data) => {
        setLeases(data);
        console.log("Lease data:", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const paymentData = {
      leaseId: selectedLeaseId,
      amount: parseFloat(amount),
      paymentDate,
    };

    await fetch("http://localhost:3000/api/v1/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit payment");
        }
        return res.json();
      })
      .then((data) => {
        setSuccess("Payment recorded successfully!");
        console.log("Response:", data);
        setSelectedLeaseId("");
        setAmount("");
        setPaymentDate("");
      })
      .catch((err) => {
        console.error("Payment error:", err);
        setError("Failed to submit payment");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {success && <p>{success}</p>}

        <label>
          Select Lease:
          <select
            value={selectedLeaseId}
            onChange={(e) => setSelectedLeaseId(e.target.value)}
            required
          >
            <option value="">-- Choose Lease --</option>
            {leases.map((lease) => (
              <option key={lease.id} value={lease.id}>
                {`Tenant: ${lease.tenant?.firstName} ${lease.tenant?.lastName} | Unit: ${lease.apartment?.unitNumber}`}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <br />

        <label>
          Payment Date:
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </label>

        <br />

        <button type="submit">Submit Payment</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Payment;
