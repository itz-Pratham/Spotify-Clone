console.log("Welcome to spotify");
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('item'));
let songs = [
    {songName: "Blinding Lights", filepath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "Tu hai kahan",filepath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "Water",filepath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "Broken Angel",filepath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Golden Hour",filepath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "Paint The Town Red",filepath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "Hymm for the Weekend",filepath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName: "Can We Kiss Forever",filepath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName: "Middle of the Night",filepath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName: "Love Nwatiti",filepath:"songs/10.mp3", coverPath:"covers/10.jpg"},
    {songName: "Arcade",filepath:"songs/11.mp3", coverPath:"covers/11.jpg"},
    {songName: "Love Me Like You Do",filepath:"songs/12.mp3", coverPath:"covers/12.jpg"},
    
];
// //audioElement.play();
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})
// Listen to events

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.remove('fa-play');
        document.getElementById(`${songIndex}`).classList.add('fa-pause');
        //gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.remove('fa-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-play');
        //gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    // console.log("timeupdate");
    // UPDATE SEEKBAR
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
        
    })
}

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
//         element.addEventListener('click',(e)=>{
//             if(audioElement.played || audioElement.isPlaying || audioElement.currentTime>0){
//                 // console.log(e.target);
//             makeAllPlays();
//             songIndex = parseInt(e.target.id);
//             e.target.classList.remove('fa-pause');
//             e.target.classList.add('fa-play');
//             // audioElement.src = `songs/${songIndex+1}.mp3`;
//             // masterSongName.innerText = songs[songIndex].songName;
//             // audioElement.currentTime=0;
//             audioElement.pause();
//             masterPlay.classList.remove('fa-circle-pause');
//             masterPlay.classList.add('fa-circle-play');
//             } 
//         })
// })

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click',(e)=>{
//         // console.log(e.target);
//         makeAllPlays();
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-play');
//         e.target.classList.add('fa-pause');
//         audioElement.src = `songs/${songIndex+1}.mp3`;
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime=0;
//         audioElement.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-circle-pause');
//     })
// })

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        // Check if the clicked index matches the current song index
        const isSameSong = songIndex === clickedIndex;

        // Reset all icons to play state
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
            el.classList.remove('fa-pause');
            el.classList.add('fa-play');
        });

        if (isSameSong) {
            if (audioElement.paused) {
                // If it's the same song and it's paused, resume play
                audioElement.play();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                // If it's the same song and it's playing, pause it
                audioElement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            // If it's a different song, play the new song
            makeAllPlays();
            songIndex = clickedIndex;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            const masterImage = document.getElementById('masterImage');
            masterImage.src = `covers/${songIndex+1}.jpg`;
        }
    });
});


document.getElementById('next').addEventListener('click',()=>{
    makeAllPlays();
    if(songIndex>=11){
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
    const masterImage = document.getElementById('masterImage');
    masterImage.src = `covers/${songIndex+1}.jpg`;
})

document.getElementById('previous').addEventListener('click',()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex=11;
    }
    else{
        songIndex=songIndex-1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
    const masterImage = document.getElementById('masterImage');
    masterImage.src = `covers/${songIndex+1}.jpg`;
})



let progressBar = document.getElementById('myProgressBar');

const checkProgress = setInterval(function() {
    // Check if the value is equal to 100
    if (parseInt(progressBar.value) === 100) {
      // Perform an action or change something when the value reaches 100
      makeAllPlays();
      if(songIndex>=11){
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById(`${songIndex}`).classList.remove('fa-play');
    document.getElementById(`${songIndex}`).classList.add('fa-pause');
    const masterImage = document.getElementById('masterImage');
    masterImage.src = `covers/${songIndex+1}.jpg`;
      // You can replace the console.log with your desired action or function call
  
      // Stop checking once the value reaches 100
    //   clearInterval(checkProgress);
    }
  }, 100); // Check every 100 millisec