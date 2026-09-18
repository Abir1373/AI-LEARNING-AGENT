import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";

const StartQuiz = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosInstance = useAxios();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({}); // stores what user selected
  const [score, setScore] = useState(null); // stores the final score

  // 1. Generate quiz
  const onSubmit = async (data) => {
    setLoading(true);
    setScore(null);
    setAnswers({});

    const res = await axiosInstance.post("/generate-quiz", {
      topicName: data.topicName,
      query: data.query,
    });

    setQuiz(res.data);
    setLoading(false);
  };

  // 2. When user clicks a radio button
  const handleSelect = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  // 3. Check answers and calculate score
  const checkAnswers = () => {
    let correct = 0;

    quiz.questions.forEach((item, index) => {
      // IMPORTANT: change "correctAnswer" if your API uses different name
      if (answers[index] === item.correctAnswer) {
        correct = correct + 1;
      }
    });

    setScore(correct);
  };

  return (
    <div>
      {/* ========== Form ========== */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-9">
          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Topic Name</span>
            </label>
            <input
              type="text"
              {...register("topicName", { required: "Topic Name is required" })}
              placeholder="Machine Learning"
              className="input input-bordered w-full bg-white text-black"
            />
            {errors.topicName && (
              <p className="text-error text-sm mt-1">
                {errors.topicName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">
              <span className="font-medium label-text">Enter Your Query</span>
            </label>
            <input
              {...register("query", { required: "Query is required" })}
              placeholder="About Turing Test"
              className="input input-bordered w-full bg-white text-black"
              type="text"
            />
            {errors.query && (
              <p className="text-error text-sm mt-1">{errors.query.message}</p>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setQuiz(null);
                  setScore(null);
                  setAnswers({});
                }}
                className="btn btn-outline border-[#BF1E2E] text-[#BF1E2E]"
              >
                Reset
              </button>
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <span className="loading loading-spinner text-error m-9"></span>
      )}

      {/* ========== Quiz ========== */}
      {quiz && (
        <div className="m-9">
          <h2 className="text-2xl font-bold mb-6">Your Quiz</h2>

          {quiz.questions?.map((item, index) => (
            <div key={index} className="border rounded-lg p-5 mb-5 bg-white">
              <h3 className="font-semibold text-lg mb-4">
                {index + 1}. {item.question}
              </h3>

              <div className="flex flex-col gap-3">
                {item.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleSelect(index, option)}
                      className="radio"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Check Answers Button */}
          <button onClick={checkAnswers} className="btn btn-primary mt-4">
            Check Answers
          </button>

          {/* Show Score */}
          {score !== null && (
            <div className="mt-6 text-xl font-bold">
              Score: {score} / {quiz.questions.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
