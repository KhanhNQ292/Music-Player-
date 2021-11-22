/* Check HTML Audio/Video on W3school
* 1. Render songs       => done
* 2. Scroll top         => done
* 3. Play/Pause/ seek   => done
* 4. CD rotare          => done
* 5. Next/previous
* 6. Random
* 7. Next/repeat
* 8.
* 9.
*/
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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


const app = {
    // Cho chỉ mảng = 0 trc 
    currentIndex: 0,
    isPlaying: false,

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
    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
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
        $('.playlist').innerHTML = htmls.join('');
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
            { transform: 'rotate(360deg)'}

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
            _this.nextSong()
            audio.play()
        }
        prevBtn.onclick = () => {
            _this.prevSong()
            audio.play()
        }
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
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



    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defindProperties()

        // Lắng nghe + xử lí các sự kiện
        this.handleEvents();

        // Load 1st song'in4 into UI when load app
        this.loadCurrentSong();

        // Render playlist
        this.render();

    }
}
app.start(); 