const clientId = 'ee07468c33674d9b87ff349c54308de8';
const clientSecret = '7a712bea6c10447e8bbdacc96eae5bc4';
const redirectUri = 'http://localhost:3000/';

const currentURL = window.location.href;
let accessToken = '';
let expires_in = 0;
let userID = '';

const Spotify = {
    userID : '',
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        else if((currentURL.match(/access_token=([^&]*)/))
            && (currentURL.match(/expires_in=([^&]*)/))){
           let accessTokens = currentURL.match(/access_token=([^&]*)/);
            expires_in = currentURL.match(/expires_in=([^&]*)/);
            accessToken = accessTokens[1];
            console.log(accessToken);
            const expires_t = expires_in[1];

            window.setTimeout(()=> accessToken = '', expires_t*1000);
            window.history.pushState('Access Token', null,'/');
            return accessToken;
        }
        else {  //if((accessToken==='') && (currentURL.match(/access_token=([^&]*)/)) )
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location =url;
        }
    },

   async search(term){
        accessToken =await this.getAccessToken();
        const urll = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(urll,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response =>
        {
            return response.json();
        }).then(jsonResponse=>{
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
            }
        });
    },

    async savePlaylist(playlistName, trackURIs){
    //console.log("ACCESS TOKEN IN POST METHOD: "+ this.accessToken); ///how to get access token available globally???
        //GET request to obtain userID

        //let access_token = accessToken; //this.getAccessToken();
        let headersVariable = {Authorization: `Bearer ${accessToken}` }
        let data =  {
            'name': playlistName,
        }

        if((playlistName) && (trackURIs.length>0)){
            let result = await fetch("https://api.spotify.com/v1/me", {headers: headersVariable}).
            then(response => {return response.json()}).
            then(jsonResponse => {
                userID= jsonResponse.id; //21qc4iik5dxwo2mqyasuyqdhy
                return userID;
            });
        }
        else return;

        //post req to create new playlist with selected tracks
        try{
            const response = await fetch(`https://api.spotify.com/v1/users/21qc4iik5dxwo2mqyasuyqdhy/playlists`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },});
            const json = await response.json();
            const playlistID= json.id;


            const uriData = {
                'uris' : trackURIs,
            };

            //SAVE TRACK URIs POST
            const pID =await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
              method: "POST",
                body: JSON.stringify(uriData),
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },});
            const playlistResponse = await pID.json();
            const respId = playlistResponse.snapshot_id;

            throw new Error('Request failed!');
        }
        catch(error){
          console.log(error);
        }
    }
}
    export default Spotify;
