import React, { useState, useEffect } from 'react'; // import react hooks from react
import './App.css';
import SnippetSelector from './SnippetSelector'; // importing SnippetSelector component and aliasing as SnippetSelector

const App = () => {
    const buttonTextItems = [
        "Bears, beets, battleship galactica",
        "What's Forrest Gump's password? 1Forrest1",
        "Where do programmers like to hang out? The Foo Bar"
    ];

    const initialGameState = {
        victory: false,
        startTime: null,
        endTime: null,
    }

    const [hasError, setErrors] = useState(false);
    const [films, setFilms] = useState([]);
    const [snippet, setSnippet] = useState("");
    const [userText, setUserText] = useState("");
    const [gameState, setGameState] = useState(initialGameState);
    const [wins, setWins] = useState(null);

    const updateUserText = event => { 
        setUserText(event.target.value);

        if (event.target.value === snippet) {
            setGameState({
                ...gameState,
                victory: true,
                endTime: new Date().getTime() - gameState.startTime
            });
        }
    };

    // const chooseSnippet = index => {]
    const chooseSnippet = selectedSnippet => {
        setSnippet(selectedSnippet) ;
        setGameState({ ...gameState, startTime: new Date().getTime() });
    };

    const fetchData = async() => {
        let response = await fetch("https://ghibliapi.vercel.app/films?limit=3");
        response
            .json()
           .then(result => setFilms(result))
           .catch(err => setErrors(err))
    }

    useEffect(() => {
        if (gameState.victory) {
            document.title = 'Victory!';
        }
        // setWins(wins + 1); // asked to remove in instructions
    })

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <h2>TypeRace</h2>
            <hr/>
            <h3>"Snippet"</h3>
            <div>{snippet}</div>
            <h4>{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
            <input value={userText} onChange={updateUserText}/>
            <hr/>
            <SnippetSelector 
                films={films}
                chooseSnippet={chooseSnippet}
            />
        </div>
    )
}

export default App;
