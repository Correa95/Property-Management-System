import { useEffect, useState } from "react";

function Payment() {
  const [lease, setLease] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/lease")
      .then((res) => res.json())
      .then((data) => {
        setLease(data);
        console.log("Lease data:", data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <form>
        <label>
          Lease
          <div>
            {lease.map((leaseItem) => (
              <input
                key={leaseItem.id}
                type="text"
                value={`${leaseItem.apartmentComplex} ${leaseItem.building}`}
                readOnly
              />
            ))}
          </div>
        </label>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default Payment;
