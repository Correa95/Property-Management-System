import { useEffect, useState } from "react";
import "./Payment.css";
function Payment() {
  const [leases, setLeases] = useState([]);
  const [selectedLeaseId, setSelectedLeaseId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD"); // no leading space
  const [isLatePayment, setIsLatePayment] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/lease`)
      .then((res) => res.json())
      .then((data) => setLeases(data))
      .catch((error) => setError(error.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedLeaseId) {
      setError("Please select a lease.");
      return;
    }

    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (paymentDate && isNaN(new Date(paymentDate).getTime())) {
      setError("Invalid payment date.");
      return;
    }

    const paymentData = {
      leaseId: selectedLeaseId,
      paymentAmount: parseFloat(paymentAmount),
      paymentMethod: paymentMethod.trim(),
      isLatePayment,
      paymentDate: paymentDate || undefined,
      paymentStatus,
    };

    try {
      const res = await fetch("${process.env.API_URL}/api/v1/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) throw new Error("Failed to submit payment");

      const data = await res.json();

      console.log("Payment response:", data);
      setSuccess("Payment recorded successfully!");
      setSelectedLeaseId("");
      setPaymentAmount("");
      setPaymentMethod("CREDIT_CARD");
      setIsLatePayment(false);
      setPaymentDate("");
    } catch (err) {
      setError(err.message || "Failed to submit payment");
    }
  }

  return (
    <div className="paymentContainer">
      <form onSubmit={handleSubmit} className="paymentForm">
        <h2 className="paymentTitle">Payment Form</h2>
        {success && <p className="errorMessage">{success}</p>}
        <div className="leaseSelect">
          <label>
            Select Lease:
            <select
              value={selectedLeaseId}
              onChange={(e) => setSelectedLeaseId(e.target.value)}
            >
              <option value="">-- Choose Lease --</option>
              {leases.map((lease) => (
                <option key={lease.id} value={lease.id}>
                  {`Tenant: ${lease.tenant?.firstName} ${lease.tenant?.lastName} | Unit: ${lease.apartment?.unitNumber}`}
                </option>
              ))}
            </select>
          </label>

          <label>
            Amount:
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="leaseSelect">
          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
            </select>
          </label>

          <label>
            Payment Date:
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </label>
        </div>
        <div className="leaseSelect">
          <label>
            Payment Status:
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </select>
          </label>

          <label>
            Late Payment?
            <input
              type="checkbox"
              checked={isLatePayment}
              onChange={(e) => setIsLatePayment(e.target.checked)}
            />
          </label>
        </div>

        <button type="submit">Submit Payment</button>
        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
