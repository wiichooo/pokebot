const express = require('express');
const bodyParser = require('body-parser');
const db = require('./pokedex.json');
const app = express();


app.use(bodyParser.json());


// Load routes 
app.post('/pokemon-informations', getPokemonInformations);
//app.post('/pokemon-evolutions', getPokemonEvolutions);
app.post('/errors', function (req, res) {
    console.error(req.body);
    res.sendStatus(200);
});


function findPokemonByName(name) {
    const data = db.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (!data) {
        return null;
    }
    return data;
};


function getPokemonInformations(req, res) {
    console.log(req.body.memory.pokemon);
    const pokemon = req.body.conversation.memory.pokemon;
    const pokemonInfos = findPokemonByName(pokemon.value);
    if (!pokemonInfos) {
        res.json({
            replies: [{
                type: 'text',
                content: `I don't know a Pokémon called ${pokemon} :(`
            }, ],
        });
    } else {
        res.json({
            replies: [{
                    type: 'text',
                    content: `${pokemonInfos.name} infos`
                },
                {
                    type: 'text',
                    content: `Type(s): ${pokemonInfos.types.join(' and ')}`
                },
                {
                    type: 'text',
                    content: pokemonInfos.description
                },
                {
                    type: 'picture',
                    content: pokemonInfos.image
                },
            ],
        });
    }
}

// Start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));