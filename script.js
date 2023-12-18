console.log('Welcome to Spotify');

//Initisalize the variable
let currDuration = 0;
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName:"Let me Love You", filePath: 'song/1.mp3', coverPath: 'covers/1.jpg'},
    {songName:"Comethru", filePath: 'song/2.mp3', coverPath: 'covers/2.jpg'},
    {songName:"Blank Space ", filePath: 'song/3.mp3', coverPath: 'covers/3.jpg'},
    {songName:"Shape of You", filePath: 'song/4.mp3', coverPath: 'covers/4.jpg'},
    {songName:"Senorita", filePath: 'song/5.mp3', coverPath: 'covers/5.jpg'},
    {songName:"Dandelions", filePath: 'song/6.mp3', coverPath: 'covers/6.jpg'},
    {songName:"We don't Talk Anymore", filePath: 'song/7.mp3', coverPath: 'covers/7.jpg'},
    {songName:"Call out my Name", filePath: 'song/8.mp3', coverPath: 'covers/8.jpg'},
]
// have to check this array functions
songItems.forEach((element, i) => {
    let temp = element.getElementsByTagName("img");
    temp[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play/pause Button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100) ;
    currDuration = progress; //use later
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime =( myProgressBar.value * audioElement.duration)/100;
})

//This function changes all other elements play button.
const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
    
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        this.helperPlay(songIndex);
        this.helperSongName(songIndex);
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 7)
    {
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    this.helperPlay(songIndex);
    this.helperSongName(songIndex);
})

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    this.helperPlay(songIndex);
    this.helperSongName(songIndex);
})

function helperPlay(songIndex)
{
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; // by default it takes 0
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
}

function helperSongName(songIndex)
{
    masterSongName.innerText = songs[songIndex].songName;
}