var player = {
    instances: [],
    eventsOfInterest: ['onerror', 'onplaying'],
    add: function (container, src) {
        var mediaElement = this.createElement(container)
        mediaElement.src = src

        var hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(mediaElement)
        this.attachListeners(mediaElement)
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
    },

    attachListeners: function (mediaElement) {
        this.eventsOfInterest.forEach(function (event) {
            mediaElement[event] = this.eventHandler.bind(this)
        }.bind(this))
    },

    eventHandler: function (event) {
        var target = event.target
        var msg = '[' + event.type + '] - ' + target.id
        
        switch (event.type) {
            case 'error':
                this.logger(msg, event.target.error)
                break;
            default: this.logger(msg, event)
                break;
        }
    },

    logger: function (msg, metadata) {
        console.log(msg, metadata)
    }
};
