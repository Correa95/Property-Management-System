import styles from "./Overview.module.css";
function Overview() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.stats}>
        <h1>Total Rent Collected</h1>
        <amount>$10000</amount>
        <small>Last Month</small>
      </div>
      <div className={styles.stats}>
        <h1>Total Rent Collected</h1>
        <amount>$10000</amount>
        <small>Last Month</small>
      </div>
      <div className={styles.stats}>
        <h1>Total Rent Collected</h1>
        <amount>$10000</amount>
        <small>Last Month</small>
      </div>
    </div>
  );
}

export default Overview;
