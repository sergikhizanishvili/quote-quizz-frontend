import { useEffect, useState } from "react";

function SessionPage() {
    
    const [question, setQuestion] = useState({});
    const [answered, setAnswered] = useState(null);
    const [correct, setCorrect] = useState(null);

    useEffect(() => {

    }, []);


    const getQuestion = async () => {
        
    }

    const handleSubmit = async () => {
        
    }

    const handleNext = () => {
        getQuestion();
        setAnswered(null);
        setCorrect(null);
    }
    
    return (
        <></>
    );
}

export default SessionPage;