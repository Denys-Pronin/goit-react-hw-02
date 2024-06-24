import { useState, useEffect } from "react";
import "./App.css";
import Description from "./Desctiprion/Desctiption";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

function App() {
  const [values, setValue] = useState(() => {
    const savedData = window.localStorage.getItem("Reviews");

    if (savedData !== null) {
      return JSON.parse(savedData);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const totalFeedback = values.good + values.neutral + values.bad;
  const totalPositive = Math.round(
    ((values.good + values.neutral) / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    setValue(
      feedbackType === "reset"
        ? { good: 0, neutral: 0, bad: 0 }
        : { ...values, [feedbackType]: values[feedbackType] + 1 }
    );
  };

  useEffect(() => {
    window.localStorage.setItem("Reviews", JSON.stringify(values));
  }, [values]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} total={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          good={values.good}
          neutral={values.neutral}
          bad={values.bad}
          total={totalFeedback}
          totalPositive={totalPositive}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
