const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const axios = require('axios');
const fs = require('fs');



const client = new Twitter(keys.twitter);
const spotify = new Spotify(keys.spotify);

const theSwitch = () => {
    console.clear();


    const verb = process.argv[2];
    const noun = process.argv.splice(3).join(' ');   



    switch (verb) {
        case 'my-tweets':
            getTwits();
            break;
        case 'spotify-this-song': 
            getSong(noun);
            break;
        case 'movie-this':
            getMovie(noun);
            break;
        case 'do-what-it-says':
            random();
            break
    }
    

}



const getTwits = () => {
    return client.get('statuses/user_timeline',{include_rts: false }, function(error, tweet, response) {
        if(error) throw error
        const data = JSON.parse(response.body);
        data.forEach(item => console.log("Twit: " + item.text + "\n" + "Created at: " + item.created_at));
      });
}

const getSong = (song) => {
    return spotify.search({ type: 'track', query: song , limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }   
        
        data.tracks.items.forEach(item => {
            console.log(item.name);
            console.log(item.preview_url);
            console.log(item.album.name)
            console.log(item.artists[0].name)
        });
      });
}

const getMovie = movie => {
    movie = movie.replace(' ', '+');
    console.log(movie);
    // axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`)
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err));
}



const random = () => {
    return fs.readFile('random.txt','utf8', (err, data) => {
        if (err) throw err;
        data = data.split(',');
        const rand = Math.floor(Math.random() * 3);
        data = data[rand];
        console.log(data);
      });
}


// Switch statement controls below

const verb = process.argv[2];
const noun = process.argv.splice(3).join(' ');


const theSwitch = () => {
    console.clear();


    const verb = process.argv[2];
    const noun = process.argv.splice(3).join(' ');   



    switch (verb) {
        case 'my-tweets':
            getTwits();
            break;
        case 'spotify-this-song': 
            getSong(noun);
            break;
        case 'movie-this':
            getMovie(noun);
            break;
        case 'do-what-it-says':
            random();
            break
    }
    

}



theSwitch();