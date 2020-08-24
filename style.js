
let artistArray = [];
let songTitleArray = [];


const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", function () {
    let inputArtist = document.getElementById("artist-input").value;
    findLyrics(inputArtist); 
})


function findLyrics(title) {
    fetch(`https://api.lyrics.ovh/suggest/${title}`)
        .then(response => response.json())
        .then(data => {
            let len = document.querySelectorAll(".author").length;
            for (let i = 0; i < len; i++) {
                let titleName = data.data[i].title;
                songTitleArray.push(titleName);
                document.querySelectorAll(".song-title")[i].innerHTML = titleName; 
                let artistName = data.data[i].artist.name;
                artistArray.push(artistName);
                document.querySelectorAll(".album-name")[i].innerHTML = artistName; 
            }
        });
}


let lyricBtnLen = document.querySelectorAll(".getLyrics").length;
for (let j = 0; j < lyricBtnLen; j++) {
    document.querySelectorAll(".getLyrics")[j].addEventListener("click", function () {
        document.querySelector(".main-taitle").innerText = songTitleArray[j];
        getLyricsByAPI(artistArray[j], songTitleArray[j]);
    })
}


function getLyricsByAPI(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(data => {
            if (data.lyrics == undefined) {
                document.getElementById("full-lyric").innerText = "Lyrics Not Found"
            } else {
                document.getElementById("full-lyric").innerText = data.lyrics;
            }
        })
}