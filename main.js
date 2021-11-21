/*
* 1. Render songs
* 2. Scroll top
* 3. Play/Pause/ seek
* 4. CD rotare
* 5. Next/previous
* 6. Random
* 7. Next/repeat
* 8.
* 9.
*/
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const app = {
    songs : [
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
        }
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

    // handle events
    handleEvents: function () {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        document.onscroll = function () {
            // console.log(window.scrollY);
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdwitdth = cdWidth - scrollTop


            cd.style.width = newCdwitdth > 0 ? newCdwitdth + 'px' : 0

        }
    },

    start: function () {
        this.render();
        this.handleEvents();
    }
}
app.start(); 