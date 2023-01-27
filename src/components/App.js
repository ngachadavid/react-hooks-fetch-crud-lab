import React, {useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions]= useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/questions')
    .then(r=>r.json())
    .then(data=>setQuestions(data))
  }, [])

  function onAdd(obj){
    const newQuestions = [...questions, obj]
    setQuestions(newQuestions)
  }
  function onDelete(id){
    const newItems= questions.filter(question=>question.id!==id)
    setQuestions(newItems)
  }
  function handleAnswer(ansQuestion){
    const newItems= questions.map(question=>{
      if(ansQuestion.id===question.id){
        return ansQuestion
      }else{
        return question
      }
    })
    setQuestions(newItems)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={onAdd} /> : <QuestionList questions={questions} onDelete={onDelete} onAnswerChange={handleAnswer} />}
    </main>
  );
}

export default App;
