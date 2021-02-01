/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const fullScreen = player.querySelector(".fullScreen");

/* Build out functions */
/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
    range.addEventListener("mousemove", handleRangeUpdate)
);

fullScreen.addEventListener('click', enterFullScreen);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// Play or pause the video
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
}

// Change the play/pause button icon according to the video state
function updateButton() {
    const icon = this.paused ? "►" : "❚ ❚";
    console.log(icon);
    toggle.textContent = icon;
}

// Skip ahead or previous
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Handles the volume and speed of video
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Automatically updates the progress bar as video plays
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// Handles the scubbing feature
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Toggle in and out of fullscreen mode
function enterFullScreen() {
    if (!video.webkitDisplayingFullscreen) {
        video.webkitRequestFullScreen();
    } else {
        document.webkitExitFullscreen();
    }
}
