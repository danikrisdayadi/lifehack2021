import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const TextQuestion = ({...props}) => {
    // const [question, setQuestion] = useState(
    //     {
    //         content: "Are we gonna survive?",
    //         file: null,
    //         answer: "Yes",
    //         option: null
    //     }
    // );
    let question = props.question 
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1">
                    <div id="question" style={{textAlign:"left"}}>
                        <p>{question.content}</p>
                    </div>
                    <div>
                        <InputGroup>
                        <InputGroup.Text>Type your answer here</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    );
}
export default TextQuestion;
