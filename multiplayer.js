var player = {
    instances: [],
    add: function (container, src) {
        var mediaElement = this.createElement(container)
        mediaElement.src = src

        var hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(mediaElement)
        this.instances.push(hls)
    },

    createElement: function (container) {
        var parent = document.getElementById(container)
        var video = document.createElement('video')
        video.className = "video-player"
        video.id = Date.now()
        video.controls = true
        parent.appendChild(video)

        return video
    }
};
