const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");
const videoControls = document.getElementById("videoControls");
const playBtn = document.getElementById("play");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const fullscreenBtn = document.getElementById("fullscreen");

let volumeValue = 0.5;
video.volume = volumeValue;
let controlsTimeout = null;
let controlsMovementTimeout = null;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handlePlayKeyup = (event) => {
  if (event.code === "Space") {
    handlePlayClick();
  }
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);
const handleLoadedMetadata = (event) => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = video.duration;
};
const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = video.currentTime;
};
const handleTimeline = (event) => {
  video.currentTime = event.target.value;
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeInput = (event) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = event.target.value;
  video.volume = event.target.value;
};

const handleScreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenBtn.innerText = "Enter Fullscreen";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = "Exit Fullscreen";
  }
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoControls.classList.remove("showing");
  }, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
video.addEventListener("keyup", handlePlayKeyup);
document.addEventListener("keyup", handlePlayKeyup);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeline.addEventListener("input", handleTimeline);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeInput);
fullscreenBtn.addEventListener("click", handleScreenClick);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
