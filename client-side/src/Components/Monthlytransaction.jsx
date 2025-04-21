import { useState } from "react";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(!isOpen);
  }
  return (
    <section className="transactionStatementContainer">
      <h1>monthly Transaction</h1>
      <div className="statement" onClick={handleClose}>
        <h2>
          January Statement <span>+</span>
        </h2>

        {isOpen && (
          <>
            <article className="propertyDetail">
              <h1>Nayekah Churr LLC</h1>
              <h3> Street: 240715 Fullstack Academy Graduate</h3>
              <h3>City: Atlanta</h3>
              <h3>State: Georgia</h3>
              <h3>ZipCode: 30349</h3>
            </article>
            <div className="transaction">
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
              <p>mathew unitX paid rent on x date</p>
            </div>
          </>
        )}
        <h2>
          January Statement <span>+</span>
        </h2>
      </div>
    </section>
  );
}

export default MonthlyTransaction;
