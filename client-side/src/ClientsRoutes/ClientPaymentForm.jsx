import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ClientPaymentForm() {
  const { user } = useAuth();
  // Guard if user not loaded yet
  const tenantId = user.id; // get tenantId from user
  const [lease, setLease] = useState(null);
  const [method, setMethod] = useState("CARD");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/leases/active/${tenantId}`)
      .then((res) => res.json())
      .then((data) => setLease(data))
      .catch((error) => console.log("No active lease found", error));
  }, [tenantId]);
  if (!user) return <p>Loading user info...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leaseId: lease.id,
        paymentAmount: lease.monthlyRent,
        paymentMethod: method,
        paymentStatus: "COMPLETED",
        isLatePayment: false,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSuccess("Thank you for your Payment!");
    } else {
      setError("Error: ", error);
    }
  };

  if (!lease) return <p>Loading lease info...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Make a Payment</h2>
        <p>
          <strong>Tenant:</strong> {lease.tenant?.firstName}{" "}
          {lease.tenant?.lastName}
        </p>
        <p>
          <strong>Apartment:</strong> {lease.apartment?.unitNumber}
        </p>
        <p>
          <strong>Amount:</strong> ${lease.monthlyRent}
        </p>

        <label>Payment Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="CASH">Cash</option>
          <option value="CREDIT">Credit</option>
          <option value="TRANSFER">Bank Transfer</option>
        </select>

        <button type="submit">Pay ${lease.monthlyRent}</button>
      </form>
    </div>
  );
}

export default ClientPaymentForm;
