import styles from "./Analysis.module.css";
import property from "../apartmentBuilding/property.js";
function Analysis() {
  // console.log(property.units);

  return (
    <section className={styles.statsContainer}>
      <div className={styles.stats}>
        {property.units.map((unit) => console.log(unit.length))}
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
    </section>
  );
}

export default Analysis;
