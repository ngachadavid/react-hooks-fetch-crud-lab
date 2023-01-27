import React,{ useState ,useEffect}from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {

const [questions, setQuestions] = useState([]);

useEffect(() => {
  fetch(" http://localhost:4000/questions")
  .then((resp) => resp.json())
  .then((data) => setQuestions(data))

}, []);

function deleteClick(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
 })
  .then((resp) => resp.json())
  .then(() => {
    const newQuestions = questions.filter((question) => question.id  !== id);
     setQuestions(newQuestions);
  }) 
}


function answerChange(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({correct: correctIndex}),
  })
    .then((resp) => resp.json())
    .then((updatedQuestion) => {
      const newQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id)
        return updatedQuestion;
        else return question;
      })
      setQuestions(newQuestions);
    });
  }


const questionItems = questions.map((question) => (
  <QuestionItem
  key={question.id}
  question={question}
  onDelete = {deleteClick}
  onAnswerChange = {answerChange}
/>

))
return (
  <section>
    <h1>Quiz Questions</h1>
    <ul>{/* display QuestionItem components here after fetching */}</ul>
    <ul>{questionItems}</ul>
  </section>
);
}
export default QuestionList;
