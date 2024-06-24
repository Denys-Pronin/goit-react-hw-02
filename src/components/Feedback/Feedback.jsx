import css from "./Feedback.module.css";
const Feedback = ({ good, neutral, bad, total, totalPositive }) => {
  return (
    <ul>
      <li className={css.good}>Good: {good}</li>
      <li className={css.neutral}>Neutral: {neutral}</li>
      <li className={css.bad}>Bad: {bad}</li>
      <li>Total: {total}</li>
      <li>Positive: {totalPositive}%</li>
    </ul>
  );
};

export default Feedback;
