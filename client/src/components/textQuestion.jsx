import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const TextQuestion = () => {
    const [question, setQuestion] = useState(
        {
            content: "Are we gonna survive?",
            file: null,
            answer: "Yes",
            option: null
        }
    );
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1">
                    <div id="question">
                        <h4>Question {/*todo*/}1/10{/*todo*/}</h4>
                        <p>What is the capital of Indo?{/*tofillquestion*/}</p>
                    </div>
                    <div>
                        <InputGroup>
                        <InputGroup.Text>Type your answer here</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    </div>
                    <div id="quizButton" className="mt-2">
                        <Button variant="secondary" onClick="/*TODO*/">Next Question</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TextQuestion;
