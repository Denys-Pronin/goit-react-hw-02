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

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "good") {
      setValue({ ...values, good: values.good + 1 });
    } else if (feedbackType === "bad") {
      setValue({ ...values, bad: values.bad + 1 });
    } else if (feedbackType === "neutral") {
      setValue({ ...values, neutral: values.neutral + 1 });
    } else if (feedbackType === "reset") {
      setValue({ good: 0, neutral: 0, bad: 0 });
    }
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
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
