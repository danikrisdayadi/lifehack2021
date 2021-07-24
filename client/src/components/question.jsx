import React, {useCallback, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import TextQuestion from './textQuestion';
import McqQuestion from './mcqQuestion';

const Question = () => {
    const [questionList, setQuestion] = useState([
        {
            content: "Are we gonna survive?",
            file: null,
            answer: "Yes",
            options: null,
            id: 1,
            questionNumber: 1,
            totalQuestions: 10
        }, 
        {
            content: "Are we gonna survive?",
            file: null,
            answer: "Yes",
            options: ["Yes", "No", "Maybe", "Maybe Not"],
            questionNumber: 1,
            totalQuestions: 10,
            id: 100
        },
        {
            content: "Are we gonna survive?",
            file: null,
            answer: "Yes",
            options: ["Yes", "No", "Maybe", "Maybe Not"],
            questionNumber: 1,
            totalQuestions: 10,
            id: 101
        },
        {
            content: "Are we gonna survive?",
            file: null,
            answer: "Yes",
            options: ["Yes", "No", "Maybe", "Maybe Not"],
            questionNumber: 1,
            totalQuestions: 10,
            id: 102
        }
    ]
    );
    const [answers,setAnswers] = useState({});
    let idx = 0;
    function submitAnswer() {
        
    }
    return (
        <div className="container mb-4">
            {
            questionList.map((question) => {
                idx+=1;
                return (
                    (question.options == null) ? <div><h4 style={{textAlign:"left",marginLeft:"2%"}}>Question {idx}/{questionList.length}</h4><TextQuestion question={question} key={question.id}  setAnswers={setAnswers}  answers={answers}/></div> 
                    : <div><h4 style={{textAlign:"left", marginLeft:"2%"}}>Question {idx}/{questionList.length}</h4><McqQuestion question={question} setAnswers={setAnswers} key={question.id} answers={answers}/></div>
                );
            })
            }
            <Button onClick={() =>submitAnswer() }>Submit</Button>
        </div>
    );
}
export default Question;
