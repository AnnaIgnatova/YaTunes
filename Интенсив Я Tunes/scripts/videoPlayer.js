export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoIconDown = document.querySelector('.icon-down');
    const videoIconUp = document.querySelector('.icon-up');
    const videoFullscreen = document.querySelector('.video-fs');

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };
    
    const togglePlay = event => {
        event.preventDefault();
         if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
        toggleIcon();
    };

    let saveVolume = 0;

    const toggleVolumeIconDown = () => {
        let currentVolume = videoVolume.value;

        if (videoVolume.value != 0) {
            videoPlayer.volume = 0;
            videoVolume.value = 0;
            saveVolume = currentVolume;
        } else {
            videoVolume.value = saveVolume;
            videoPlayer.volume = saveVolume / 100;
        }
        toggleVolumeDown();
    };
    
    const toggleVolumeIconUp = () => {
        let currentVolume = videoVolume.value;

        if (videoVolume.value != 100) {
            videoPlayer.volume = 1;
            videoVolume.value = 100;
            saveVolume = currentVolume;
        } else {
            videoVolume.value = saveVolume;
            videoPlayer.volume = saveVolume / 100;
        }
    };

    const toggleVolumeDown = () => {
        if (videoVolume.value == 0) {
            videoIconDown.classList.remove('fa-volume-down');
            videoIconDown.classList.add('fa-volume-off');

        } else {
            videoIconDown.classList.add('fa-volume-down');
            videoIconDown.classList.remove('fa-volume-off');
        }
    };


    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const addZero = n => n < 10 ? '0' + n : n;

    const changeValue = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoButtonStop.addEventListener('click', stopPlay);

    videoIconDown.addEventListener('click', toggleVolumeIconDown);
    videoIconUp.addEventListener('click', toggleVolumeIconUp);
    videoVolume.addEventListener('change', toggleVolumeDown);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });
        
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoVolume.addEventListener('input', changeValue);

    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100);
    });

    changeValue();

};