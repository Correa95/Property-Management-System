import "./Maintenance.css";
import { useState } from "react";
const requests = [
  {
    id: 1,
    tenant: "Alice Johnson",
    date: "2025-03-01",
    description:
      "Leaking faucet in the kitchen sink. It has been dripping continuously for the last few days.",
  },
  {
    id: 2,
    tenant: "Victor Chang",
    date: "2025-04-20",
    description:
      "The AC unit is not cooling properly. It blows warm air even after running for a while.",
  },
  {
    id: 3,
    tenant: "Grace Lee",
    date: "2025-06-05",
    description:
      "Bathroom light keeps flickering and goes off randomly. Might be a wiring issue.",
  },
  {
    id: 4,
    tenant: "Emily Baker",
    date: "2025-06-30",
    description:
      "Bathroom light keeps flickering and goes off randomly. Might be a wiring issue.",
  },
  {
    id: 5,
    tenant: "Henry Clark",
    date: "2025-06-15",
    description:
      "Bathroom light keeps flickering and goes off randomly. Might be a wiring issue.",
  },
];
function Maintenance() {
  const [isOpenRequestId, setIsOpenRequestId] = useState(null);

  function truncateDescription(text, wordLimit = 10) {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  function handleToggle(id) {
    setIsOpenRequestId((prevId) => (prevId === id ? null : id));
  }

  return (
    <div className="maintenanceContainer">
      <h1>Maintenance Request Board</h1>
      <div className="maintenanceRequest">
        {requests.map((request) => {
          const isOpen = isOpenRequestId === request.id;
          return (
            <div key={request.id} className="maintenance">
              <div
                className="requestDetail"
                onClick={() => handleToggle(request.id)}
              >
                <h3>{request.tenant}</h3>
                <h3>{request.date}</h3>
              </div>
              <div className="descriptionContainer">
                <p>
                  {isOpen
                    ? request.description
                    : truncateDescription(request.description)}
                </p>
                <button
                  className="toggleBtn"
                  onClick={() => handleToggle(request.id)}
                >
                  {isOpen ? "Show less" : "Read more"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Maintenance;
