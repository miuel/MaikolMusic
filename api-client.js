const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=8024b7f8ee0860ee0b5965bd5dad580b&format=json';

//lista de favoritos en argentina
// const URL = 'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=argentina&api_key=8024b7f8ee0860ee0b5965bd5dad580b&format=json'

function getArtists() {
    return fetch(URL)
            .then(response => response.json())
            .then(data => data.topartists.artist)
            .then(artists => artists.map(artist => {
                return {
                    id: artist.mbid,
                    name: artist.name,
                    image: artist.image[3]['#text'], 
                    likes: 200, 
                    comments: 140
                }
            }))
}

export { getArtists }