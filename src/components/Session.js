import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Api from "./services/Api";
import Layout from "./Layout";
import Timer from "./Timer";
import Stats from "./Stats";

function Session() {

    const navigate = useNavigate();
    const { sessionId } = useParams();

    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [question, setQuestion] = useState({});
    const [stats, setStats] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [correct, setCorrect] = useState('');
    const [incorrectMsg, setIncorrectMsg] = useState(false);
    const [correctMsg, setCorrectMsg] = useState(false);
    const [nextBtnVisible, setNextBtnVisible] = useState(false);

    const getData = async () => {
        try {
            const res = await Api.get('/sessions/' + sessionId);

            if (res.data.stats) {
                setStats(res.data.stats);
            } else {
                setQuestion(res.data.question);
            }

            setLoading(false);
            setSeconds(res.data.seconds);
            setDisabled(false);
            setAnswer(null);
            setCorrect(null);
            setIncorrectMsg('');
            setCorrectMsg('');
            setNextBtnVisible(false);
        } catch (error) {
            navigate('/');
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnswer = async (value) => {

        setAnswer(value);
        setDisabled(true);

        try {
            const res = await Api.patch('/sessions/' + sessionId, {
                question: question.id,
                answer: value
            },
            {headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

            if (res.data.stats) {
                setStats(res.data.stats);
            } else {
                if (res.data.correct === value) {
                    setCorrectMsg(true);
                } else {
                    setIncorrectMsg(true);
                }
            }

            setCorrect(res.data.correct);
            setNextBtnVisible(true);
        } catch (error) {
            setDisabled(false);
        }
    };

    const handleRefresh = async () => {
        getData();
    }
    
    return (
        <Layout>
            <h1 className="my-4 pb-3 border-bottom">Quote Quizz</h1>

            {!loading && !stats ? <Timer sec={seconds} callback={handleRefresh} className="mb-5" /> : ''}

            {!stats ?
                <Form>
                    <h4>{question.question}</h4>

                    {'binary' === question.type ? 
                        <div className="answers mt-4">
                            <Form.Check
                                type="radio"
                                name="answer"
                                id="answerYes"
                                label="Yes"
                                value="yes"
                                checked={'yes' === answer}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className="fs-5 mb-3"
                                disabled={disabled}
                            />

                            <Form.Check
                                type="radio"
                                name="answer"
                                id="answerNo"
                                label="No"
                                value="no"
                                checked={'no' === answer}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className="fs-5 mb-3"
                                disabled={disabled}
                            />
                        </div>
                    : 
                        <div className="answers mt-4">
                            <Form.Check
                                type="radio"
                                name="answer"
                                id="answerAnsw1"
                                label={'multiple' === question.type ? question.answers.answ1 : ''}
                                value="answ1"
                                checked={'answ1' === answer}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className="fs-5 mb-3"
                                disabled={disabled}
                            />

                            <Form.Check
                                type="radio"
                                name="answer"
                                id="answerAnsw2"
                                label={'multiple' === question.type ? question.answers.answ2 : ''}
                                value="answ2"
                                checked={'answ2' === answer}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className="fs-5 mb-3"
                                disabled={disabled}
                            />

                            <Form.Check
                                type="radio"
                                name="answer"
                                id="answerAnsw3"
                                label={'multiple' === question.type ? question.answers.answ3 : ''}
                                value="answ3"
                                checked={'answ3' === answer}
                                onChange={(e) => handleAnswer(e.target.value)}
                                className="fs-5 mb-3"
                                disabled={disabled}
                            />
                        </div>
                    }

                    {incorrectMsg ?
                        <p className="text-danger py-3">
                            Sorry, you are wrong! The right answer is "{'binary' === question.type ? correct : question.answers[correct]}"
                        </p>
                        : ''
                    }

                    {correctMsg ?
                        <p className="text-success py-3">Correct! The right answer is "{question.answers[correct]}"</p>
                        : ''
                    }

                    {nextBtnVisible ?
                        <Button type="button" variant="primary" onClick={handleRefresh}>Next Question</Button>
                    : ''}
                </Form>
            :
                <Stats total={stats.total} answered={stats.answered} correct={stats.correct} />
            }
        </Layout>
    );
}

export default Session;