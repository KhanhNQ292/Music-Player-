/* Check HTML Audio/Video on W3school
* 1. Render songs       => done
* 2. Scroll top         => done
* 3. Play/Pause/ seek   => done
* 4. CD rotare          => done
* 5. Next/previous      => done
* 6. Random             => done
* 7. Next/repeat when ended => done
* 8. Active Song            => done
* 9. Scroll Active song into view
*10. 
*/
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'Ramsey'

const playBtn = $('.btn-toggle-play')
const player = $('.player')
const cd = $('.cd')
const cdWidth = cd.offsetWidth
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    // Cho chỉ mảng = 0 trc 
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: 'SOFAR',
            singer: 'Binz',
            path: './assets/music/SOFAR-Binz.mp3',
            image: './assets/img/anh.jpg'
        },
        {
            name: 'ĐỘ TỘc',
            singer: 'PHUCDU ft PHÁO, Misi',
            path: './assets/music/Do-Toc-2-Do-Mixi-Phao-Phuc-Du-Masew.mp3',
            image: './assets/img/3753ba563f732ae757e3595521bf2fee.jpg'
        },
        {
            name: '1800 love',
            singer: 'HIEUTHUHAI',
            path: './assets/music/1-800-LOVE-HIEUTHUHAI-HURRYKNG-MANBO.mp3',
            image: './assets/img/251511523_2223117014496963_2292358535906818185_n.jpg'
        },
        {
            name: 'Nam ngu em ru^',
            singer: 'Binz',
            path: './assets/music/nam-ngu-emru-Bich-Phuong.mp3',
            image: './assets/img/226291729_159314122940883_3751615973881081162_n.jpg'
        },
        {
            name: 'FI H`anh Ra',
            singer: 'Le Wuyen',
            path: './assets/music/Phi-Hanh-Gia-Renja-Slow-T-Lil-Wuyn-Kain-Sugar-Cane.mp3',
            image: './assets/img/avt1.jpg'
        },
        {
            name: 'call me big hand :v',
            singer: 'Binz',
            path: './assets/music/Tay-To-Rapital-MCK-RPT-PhongKhin.mp3',
            image: './assets/img/avtFIT.jpg'
        },
        {
            name: 'SOFAR',
            singer: 'Binz',
            path: './assets/music/SOFAR-Binz.mp3',
            image: './assets/img/0812_wp4676582-4k-pc-wallpapers.jpg'
        },
    ],

    // setConfig
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    // Render 
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}"
                data-index = "${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>                
            `
        })
        // ko lap lai nen k can khai bao lai
        playlist.innerHTML = htmls.join('');
    },


    // get currentSong
    defindProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    // handle events
    handleEvents: function () {
        // xử lí cd quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }

        ],
            {
                duration: 10000, // 10 seconds
                iteration: Infinity // loop ? 
            })
        cdThumbAnimate.pause()

        // Xử lí thu phòng CD
        document.onscroll = function () {
            // console.log(window.scrollY);
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdwitdth = cdWidth - scrollTop

            // cd width > 0 or cd wỉdth = 0
            cd.style.width = newCdwitdth > 0 ? newCdwitdth + 'px' : 0
            cd.style.opacity = newCdwitdth / cdWidth
        }

        // Xử lí play/pause 
        const _this = this
        playBtn.onclick = () => {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // play/pause with Space

        document.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                audio.play()
            }
            if (_this.isPlaying && event.key === ' ') {
                audio.pause()
            }
        })
        // Playing
        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Pause
        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Cach 2: 
        // playBtn.onclick = () => {
        //     if (_this.isPlaying) {
        //         _this.isPlaying = false
        //         audio.pause()
        //         player.classList.remove('playing')
        //     } else {
        //         _this.isPlaying = true
        //         audio.play()
        //         player.classList.add('playing')
        //     }
        // }

        // When time of song changes
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progessPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progessPercent
            }
        }

        // Rewind Song's Progress
        progress.oninput = (e) => {
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }

        // When Next/Prev song
        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // random songs
        randomBtn.onclick = (e) => {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }


        // Repeat song
        repeatBtn.onclick = (e) => {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)

        }
        // next when audio ended
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                _this.randomSong()
            }
            audio.play()
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                // Xử lí khi click vào song thì chuyển sang bài đó 
                if (songNode) {
                    // convert sang Number vì songNode.dataset.index => array
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // Xử lí khi click vào song option

            }
        }
    },

    // FUNCTIONS 

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView(
                {
                    behavior: 'smooth', // Xác định hoạt ảnh
                    block: 'nearest', // Xác định căn chỉnh theo chiều dọc
                    inline: 'nearest'// Xác định căn theo chiều ngang
                })
        }, 100)
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
        this.isRepeat = this.config.isRepeat
        this.isRandom = this.config.isRandom
    },


    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },



    // START 
    start: function () {

        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defindProperties()

        // Lắng nghe + xử lí các sự kiện
        this.handleEvents();

        // Load 1st song'in4 into UI when load app
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // hiện thị setting repeat/random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }
}
app.start(); 