import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

export default function MonForm() {
    const [url, setUrl] = useState("");
    const [shinyUrl, setShinyUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);

        const formData = Object.fromEntries(form.entries());

        // get photos from pokeapi
        const pokeapiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${formData.name.toLowerCase()}`, {
            headers: {
                'Content-Type': 'application.json',
            },
            method: 'GET'
        });

        const pokeapiResult = await pokeapiResponse.json();

        const url = pokeapiResult?.sprites?.front_default;
        setUrl(url);

        const shinyUrl = pokeapiResult?.sprites?.front_shiny;
        setShinyUrl(shinyUrl);

        // add to db
        const redisResponse = await fetch('api/mons', {
            body: JSON.stringify({name: formData.name.toLowerCase(), url: url, shinyUrl: shinyUrl}),
            headers: {
                'Content-Type': 'application.json',
            },
            method: 'POST'
        });

        if(pokeapiResponse.status === 200) await redisResponse.json();
    };

    return (
        <>
            <Container>
                <Row>
                <form onSubmit={handleSubmit}>
                    <input name="name" type="text" />
                    <button type="submit">Search</button>
                </form>
                </Row>
                <Row>
                    <img src={url} />
                    <img src={shinyUrl} />
                </Row>
            </Container>
        </>
    );
}