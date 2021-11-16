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
    songs: {
        render: function () {
            const html = this.songs.map(song => {
                return `
                <div class="song">
                <div class="thumb" style="background-image: url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg')">
                </div>
                <div class="body">
                    <h3 class="title">Music name</h3>
                    <p class="author">Singer</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>                
            `
            })
            $('playlist').innerHTML = html.join('');
        },

        start: function () {
            this.render()
        }
    }
}

app.start()