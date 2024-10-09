import styles from "./MonthlyStatement.module.css";
function MonthlyStatement() {
  return (
    <section className={styles.monthlyStatementContainer}>
      <div className={styles.statement}>
        <h1>monthly Statement</h1>
        <div>
          <h1>Nayekah Churr LLC</h1>
          <h3>atlanta</h3>
          <p>mathew pay $1000 for unit 555 </p>
        </div>
      </div>
    </section>
  );
}

export default MonthlyStatement;
