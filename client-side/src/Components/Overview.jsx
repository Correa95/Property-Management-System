import styles from "./Overview.module.css";
function Overview() {
  return (
    <>
      <section>
        <div className={styles.statsContainer}>
          <div className={styles.stats}>
            <h1>Vacancy Rate</h1>
            <amount>100%</amount>
            <small>As of Last Month</small>
          </div>
          <div className={styles.stats}>
            <h1>Total Rent Collected</h1>
            <amount>$100000</amount>
            <small>As of Last Month</small>
          </div>
          <div className={styles.stats}>
            <h1>Total Expenses</h1>
            <amount>$250000</amount>
            <small>As of Last Month</small>
          </div>
        </div>
      </section>
      <section className={styles.tableCharts}>
        <div className={styles.table}>
          <table>
            <h1>TABLE DATA</h1>
            <th>mathew</th>
            <tr>correa</tr>
            <th>mathew</th>
            <tr>correa</tr>
            <th>mathew</th>
            <tr>correa</tr>
            <th>mathew</th>
            <tr>correa</tr>
            <th>mathew</th>
            <tr>correa</tr>
            <th>mathew</th>
            <tr>correa</tr>
            {/* <div className={styles.charts}>
              <h1>REACT MONTHLY CHARTS</h1>
            </div> */}
          </table>
        </div>
        <div className={styles.chart}>
          <h1>REACT MONTHLY CHARTS</h1>
        </div>
      </section>
      {/* <section>
        <div className={styles.charts}>
          <h1>REACT MONTHLY CHARTS</h1>
        </div>
      </section> */}
    </>
  );
}

export default Overview;
