import { useState } from "react";
import styles from "./MonthlyCashFlowStatement.module.css";

function MonthlyCashFlowStatement() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(!isOpen);
  }
  return (
    <section className={styles.CashFlowStatementContainer}>
      <h1>Cash Flow Statement</h1>
      <div className={styles.cashFlow} onClick={handleClose}>
        <h2>
          Cash Flow Statement <span>+</span>
        </h2>

        {isOpen && (
          <>
            <article className={styles.propertyCashFlowStatement}>
              <h1>Nayekah Churr LLC</h1>
              <h3> Street: 240715 Fullstack Academy Graduate</h3>
              <h3>City: Atlanta</h3>
              <h3>State: Georgia</h3>
              <h3>ZipCode: 30349</h3>
            </article>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Range</th>
                    <th>0-100</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Model S</td>
                    <td>$83,900</td>
                    <td>651 km</td>
                    <td>1.99 s</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Model 3</td>
                    <td>$42,900</td>
                    <td>437 km</td>
                    <td>3.1 s</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Model X</td>
                    <td>$99,990</td>
                    <td>564 km</td>
                    <td>2.5 s</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Model Y</td>
                    <td>$54,990</td>
                    <td>531 km</td>
                    <td>3.7 s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default MonthlyCashFlowStatement;
