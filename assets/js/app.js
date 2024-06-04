// algorithm
function bubbleSort(arr) {
    if(isArray(arr))
    {
        for(let i = 0; i < 100; i++)
        {
            for(let j = 0; j < n - i - 1; j++)
            {
                if(arr[j] > arr[j+1])
                {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                }
            }
        }
    }
}

// register
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const urlAPIUser = 'http://localhost:3000/user';

function Validator(options)
{
    function getParent(element, selector)
    {
        while(element.parentElement)
        {
            if(element.parentElement.matches(selector))
            {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElemant = getParent(inputElement, options.fomrGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];

        for(let i = 0; i < rules.length; i++)
        {
            switch(inputElement.type)
            {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if(errorMessage) break;
        }

        if (errorMessage) {
            errorElemant.innerText = errorMessage;
            getParent(inputElement, options.fomrGroupSelector).classList.add('invalid');
        }
        else{
            errorElemant.innerText = '';
            getParent(inputElement, options.fomrGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Đầu tiên là lấy form element
    var formElement = document.querySelector(options.form);
    if(formElement)
    {
        formElement.onsubmit = function(e)
        {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach((rule) => {
                var inputElements = formElement.querySelector(rule.selector);
                
                var isValid = validate(inputElements, rule);
                if(!isValid)
                {
                    isFormValid = false;
                }
            });

            if(isFormValid)
            {
                if (typeof options.onSubmit === 'function')
                {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch(input.type)
                        {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input [name"' + input.name + '"]').value;;
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked'))
                                {
                                    values[input.name] = '';
                                    return values;
                                }

                                if (!Array.isArray(values[input.name]))
                                {
                                    values[input.name] = [];
                                }

                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                else
                {
                    formElement.submit();
                }
            }
        }

        options.rules.forEach((rule) => {

            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test);
            }
            else{
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach((inputElement) => {
                inputElement.onblur = function()
                {
                    validate(inputElement, rule);
                }
                // bắt sự kiện ki gõ vào
                inputElement.oninput = function()
                {
                    var errorElemant = getParent(inputElement, options.fomrGroupSelector).querySelector(options.errorSelector);
                    errorElemant.innerText = '';
                    getParent(inputElement, options.fomrGroupSelector).classList.remove('invalid');
                }
            });
            
        });
    }
}

Validator.isRequired = function(selector, message)
{
    return {
        selector,
        test(value)
        {
            // Loại bỏ dấu cách
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector, message)
{
    return {
        selector,
        test(value)
        {
            // mã kiểm tra email
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập email';
        }
    };
}

Validator.isMinlength = function(selector, min, message)
{
    return {
        selector,
        test(value)
        {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message)
{
    return {
        selector,
        test: function (value)
        {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    };
}

const loginRegister = {
    handleEvent: function() {
        const login = document.querySelector('#login');
        const register = document.querySelector('#register');
        const loginRegister = document.querySelector('.main__login__register');
        const loginMain = document.querySelector('.main__login');
        const registerMain = document.querySelector('.main__register');
        const formList = document.querySelectorAll('.regiter__login-form');
        const toLogin = document.querySelector('#move__login--link');
        const toRegister = document.querySelector('#move__register--link');

        loginRegister.onclick = function()
        {
            registerMain.style.display = 'none';
            loginMain.style.display = 'none';
            loginRegister.style.display = 'none';
        }

        login.onclick = function()
        {
            loginRegister.style.display = 'flex';
            loginMain.style.display = 'block';
        }

        register.onclick = function()
        {
            loginRegister.style.display = 'flex';
            registerMain.style.display = 'block';
        }

        toLogin.onclick = function()
        {
            registerMain.style.display = 'none';
            loginMain.style.display = 'block';
        }

        toRegister.onclick = function()
        {
            registerMain.style.display = 'block';
            loginMain.style.display = 'none';
        }

        for(let i of formList)
        {
            i.onclick = function (e)
            {
                e.stopPropagation();
            }
        }
    },
    start: function() {
        this.handleEvent();
    }
};

loginRegister.start();

// register account
function PushServer(data)
{
    var pushmember = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(urlAPIUser, pushmember)
    .then(function (e) {
    })
    .catch(function() {
        console.log('error');
    });
}

// Check account
function getDataJson(callback)
{
    fetch(urlAPIUser)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

let PLAYER_STORAGE_KEY = '';
function checkAccount(datas)
{
    const emailElementLogin = document.querySelector('#check__email');
    const passwordElementLogin = document.querySelector('#check__password')
    const emailLogin = emailElementLogin.value;
    const passwordLogin = passwordElementLogin.value;
    let TestAcc = false;
    for(let data of datas)
    {
        if(data.email == emailLogin && data.password == passwordLogin)
        {
            TestAcc = true;
            PLAYER_STORAGE_KEY = `${data.id}`;
            break;
        }
    }
    if(TestAcc)
    {
        const headerUser = document.querySelector('.header__user');
        const formMain = document.querySelector('.main__login__register');
        const headerUserLogin = document.querySelector('.header__user-login');
        headerUser.style.display = 'none';
        formMain.style.display = 'none';
        headerUserLogin.style.display = 'flex';
        app.setConfig(PLAYER_STORAGE_KEY, {});
    }
    else
    {
        let parentErroremail = emailElementLogin.parentElement;
        let parentErrorpassword = passwordElementLogin.parentElement;
        parentErroremail.classList.add('invalid');
        parentErrorpassword.classList.add('invalid');
        parentErroremail.querySelector('.form-message').innerText = 'Email không đúng';
        parentErrorpassword.querySelector('.form-message').innerText = 'Mật khẩu không đúng';
    }
}

function isLogin(datas) {
    for(let data of datas)
    {
        const localLogin = localStorage.getItem(`${data.id}`);
        
        if(localLogin)
        {
            PLAYER_STORAGE_KEY = `${data.id}`;
            const headerUser = document.querySelector('.header__user');
            const formMain = document.querySelector('.main__login__register');
            const headerUserLogin = document.querySelector('.header__user-login');
            headerUser.style.display = 'none';
            formMain.style.display = 'none';
            headerUserLogin.style.display = 'flex';
        }
    }
}

getDataJson(isLogin, urlAPIUser);

function deleteItemLocal(datas) {
    datas.forEach((data) => {
        const localLogin = localStorage.getItem(`${data.id}`);
        if(localLogin)
        {
            localStorage.removeItem(`${data.id}`);
            PLAYER_STORAGE_KEY = '';
            app.config = '';
        }
    });
}

(function settingUser() {
    const imgUser = $('.user__imgs');
    const list = $('.user__setting-list');
    const listSetting = $$('.user__setting-item');
    imgUser.onclick = function() {
        if(list.style.display === 'none')
        {
            list.style.display = 'block';
        }
        else {
            list.style.display = 'none';
        }
    }
    listSetting.forEach((itemSetting) => {
        itemSetting.onclick = function() {
            if(itemSetting.innerText === 'Đăng xuất')
            {
                const headerUser = document.querySelector('.header__user');
                const headerUserLogin = document.querySelector('.header__user-login');
                headerUser.style.display = 'flex';
                headerUserLogin.style.display = 'none';
                list.style.display = 'none';
                getDataJson(deleteItemLocal, urlAPIUser);
            }
        }
    });
})();

// banner
const bannerContent = $('.header__banner-imgs');
const bannerImgs = $$('.header__banner-img');
const bannerDots = $$('.header__banner-bots li');
const btnPrevBanner = $('#prev-banner');
const btnNextBanner = $('#next-banner');
let Interval;

const banner = {
    currentIndex: 0,
    handleEvent: function() {
        const _this = this;
        btnNextBanner.onclick = function() {
            _this.currentIndex++;
            if(_this.currentIndex >= 5) _this.currentIndex = 0;
            _this.loadbanner();
            clearInterval(Interval);
            Interval = setInterval(() => {btnNextBanner.click()}, 3000);
        }

        btnPrevBanner.onclick = function() {
            _this.currentIndex--;
            if(_this.currentIndex < 0) _this.currentIndex = 4;
            _this.loadbanner();
            clearInterval(Interval);
            Interval = setInterval(() => {btnNextBanner.click()}, 3000);
        }

        bannerDots.forEach((Dot, index) => {
            Dot.onclick = function() {
                _this.currentIndex = index;
                _this.loadbanner();
                clearInterval(Interval);
                Interval = setInterval(() => {btnNextBanner.click()}, 3000);
            };
        });
    },
    loadbanner: function() {
        let checkTop = bannerImgs[this.currentIndex].offsetTop;
        bannerContent.style.top = -checkTop + 'px';
        const elementActiveBanner = $('.banner-active');
        elementActiveBanner.classList.remove('banner-active')
        bannerDots[this.currentIndex].classList.add('banner-active');
    },
    start: function() {
        this.handleEvent();

        Interval = setInterval(() => {btnNextBanner.click()}, 3000);
    }
}
banner.start();

const apiSongs = 'http://localhost:3000/songs';

const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.container__content-playList');
const volume = $('#volume');
const headerInputSearch = $('#header__search--music');
const inputSearchLisst = $('.header__search-list');

function getDatajson(callback, api) {
    fetch(api)
        .then((response) => response.json())
        .then(callback);
}

const navbar = {
    playSong: function() {
        const rightoffPlayer = $('.dashboard').offsetLeft + $('.dashboard').offsetWidth;
        const containerElement = $('.container');
        containerElement.style.left = rightoffPlayer - 35 + 'px';
    },
    mainWeb: function() {
        const containerElement = $('.container');
        containerElement.style.left = 0;
    },
    start: function() {
        const itemList = $$('.navbar__item');
        const navList = $('.navbar__list');
        for(let item of itemList)
        {
            const _this = this;
            item.onclick = function(e) {
                const itemActive = navList.querySelector('.navbar__item.active');
                itemActive.classList.remove('active');
                item.classList.add('active');
                if(e.target.closest('#nav__item-playsong')) _this.playSong();
                else if(e.target.closest('#nav__item-main')) _this.mainWeb();
            }
        }
    }
}

navbar.start();

let app;

function getJsonMusic(data) {
    let songs = [...data];

    setTimeout(function() {
        app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            songs: songs,
            config: PLAYER_STORAGE_KEY !== ''?JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}:'',
            setConfig: function (key, value) {
                if(value)
                {
                    this.config[key] = value;
                    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
                }
            },
            render: function() {
                let html = '';
                for(let i = 0; i < 10; i++)
                {
                    if(this.songs[i])
                    {
                        html += `
                            <li class="container__content-playItem" data-index="${i}">
                                <div class="content__playItem-number">
                                    ${i + 1}
                                </div>
                                <div class="content__playItem-img" style="background-image: url(${this.songs[i].image});">
                                </div>

                                <div class="content__playItem-text">
                                    <div class="playItem__text-name">
                                        ${this.songs[i].name}
                                    </div>
                                    <div class="playItem__text-artist">
                                        ${this.songs[i].singer}
                                    </div>
                                </div>

                                <div class="content__playItem-time">
                                    ${this.songs[i].time}
                                </div>

                                <div class="content__playItem-love ${this.songs[i].love? 'active':''}">
                                    <i class="fa-solid fa-heart icon-love"></i>
                                </div>

                                <div class="content__playItem-nav">
                                    <i class="fa-solid fa-ellipsis icon-nav"></i>
                                </div>
                            </li>
                        `;
                    }
                }
                playlist.innerHTML = html;
            },
            defineProperties: function() {
                Object.defineProperty(this, 'currentSong', {
                    get: function() {
                        return this.songs[this.currentIndex];
                    }
                });
            },
            handleEvents: function() {
                const _this = this;
                // Lấy chiều ngang element
                const cdWidth = cd.offsetWidth;
                const submitLogin = $('.submit-login');

                submitLogin.onclick = function() {
                    setTimeout(() => {
                        _this.config = PLAYER_STORAGE_KEY !== ''?JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}:'';
                    }, 100);    
                }

                // Xử lý cdthumb khi quay và dừng
                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 10000, // 10 second
                    iterations: Infinity
                });

                cdThumbAnimate.pause();

                // Xử lí khi kéo màn hình
                // document.onscroll = function() {
                //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
                //     const newWidth = cdWidth - scrollTop;

                //     cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
                //     cd.style.opacity = newWidth / cdWidth;
                // };

                // toggle play
                playBtn.onclick = function() {
                    if(_this.isPlaying) {
                        audio.pause();
                    }
                    else {
                        audio.play();
                    }
                }

                // Khi bài hát được play
                audio.onplay = function() {
                    _this.isPlaying = true;
                    player.classList.add('playing');
                    cdThumbAnimate.play();
                }

                // Khi bài hát bị pause
                audio.onpause = function() {
                    _this.isPlaying = false;
                    player.classList.remove('playing');
                    cdThumbAnimate.pause();
                }

                // Khi tiến độ bài hát thay đổi
                audio.ontimeupdate = function() {
                    if (audio.duration)
                    {
                        const progressPercent = (audio.currentTime / audio.duration) * 100;
                        progress.value = progressPercent;
                    }
                }

                progress.oninput = function(e) {
                    let seekTime = e.target.value * audio.duration / 100;
                    audio.currentTime = seekTime;
                }

                nextBtn.onclick = function() {
                    if(_this.isRandom) {
                        _this.playRandomSong();
                    }
                    // else if(_this.isRepeat)
                    // {
                    //     _this.loadCurrentSong();
                    // }
                    else {
                        _this.nextSong();
                    }
                    
                    audio.play();
                    _this.activeSongPlay();
                    _this.scrollToActiveSong();
                }

                prevBtn.onclick = function() {
                    if(_this.isRandom) {
                        _this.playRandomSong();
                    }
                    // else if(_this.isRepeat)
                    // {
                    //     _this.loadCurrentSong();
                    // }
                    else {
                        _this.prevSong();
                    }
                    audio.play();
                    _this.activeSongPlay();
                    _this.scrollToActiveSong();
                }

                randomBtn.onclick = function() {
                    _this.isRandom = !_this.isRandom;
                    _this.isRepeat = false;
                    randomBtn.classList.toggle('active', _this.isRandom);
                    repeatBtn.classList.remove('active');
                    if(_this.config !== '')
                    {
                        app.setConfig('isRepeat', app.isRepeat);
                        app.setConfig('isRandom', app.isRandom);
                    }
                    // _this.playRandomSong();
                }

                // NextSong khi audio ended
                audio.onended = function() {
                    if (_this.isRepeat) {
                        audio.play();
                    }
                    else {
                        nextBtn.click();
                    }
                }

                repeatBtn.onclick = function() {
                    _this.isRepeat = !_this.isRepeat;
                    _this.isRandom = false;
                    repeatBtn.classList.toggle('active', _this.isRepeat);
                    randomBtn.classList.remove('active');
                    if(_this.config !== '')
                    {
                        app.setConfig('isRandom', app.isRandom);
                        app.setConfig('isRepeat', app.isRepeat);
                    }
                }
                
                // Lắng nghe click vào playlist
                playlist.onclick = function(e) {
                    const songNode = e.target.closest('.container__content-playItem:not(.active)');
                    if(songNode && !e.target.closest('.icon-nav') && !e.target.closest('.icon-love'))
                    {
                        if(songNode)
                        {
                            _this.currentIndex = Number(songNode.getAttribute('data-index'));
                            _this.loadCurrentSong();
                            audio.play();
                            _this.activeSongPlay();

                            const itemActive = $('.navbar__item.active');
                            const item = $('#nav__item-playsong');
                            itemActive.classList.remove('active');
                            item.classList.add('active');

                            const rightoffPlayer = $('.dashboard').offsetLeft + $('.dashboard').offsetWidth;
                            const containerElement = $('.container');
                            containerElement.style.left = rightoffPlayer - 35 + 'px';
                        }
                    }
                }

                headerInputSearch.oninput = function() {
                    const searchList = $('.header__search-list');
                    const valueInputSearch = this.value.trim();
                    let html = ``;
                    _this.songs.forEach(function(song, index) {
                        if(valueInputSearch.toLowerCase() === '')
                        {
                            html = `
                            <div class="header__search-item">
                                Không tìm thấy gì...
                            </div>
                            `;
                        }
                        else if(song.name.toLowerCase().includes(valueInputSearch.toLowerCase()))
                        {
                            html += `
                                <div class="header__search-item" data-index="${index}">
                                    <div class="search__item-img" style="background-image: url('${song.image}');"></div>
                                    <div class="search__item-text">
                                        <div class="item-text-name">
                                            ${song.name}
                                        </div>
                                        <div class="item-text-artist">
                                            ${song.singer}
                                        </div>
                                    </div>
                                    <div class="content__playItem-love ${song.love ? 'active':''}">
                                        <i class="fa-solid fa-heart icon-love"></i>
                                    </div>
                                </div>
                            `;
                        }
                    });
                    searchList.innerHTML = html;
                }
                
                inputSearchLisst.onclick = function(e) {
                    const searchList = $('.header__search-list');
                    const searchElement = e.target.closest('[data-index]');

                    if(searchElement && !e.target.closest('.content__playItem-love'))
                    {
                        _this.currentIndex = Number(searchElement.getAttribute('data-index'));
                        _this.loadCurrentSong();
                        audio.play();
                        headerInputSearch.value = '';

                        const itemActive = $('.navbar__item.active');
                        const item = $('#nav__item-playsong');
                        itemActive.classList.remove('active');
                        item.classList.add('active');

                        const rightoffPlayer = $('.dashboard').offsetLeft + $('.dashboard').offsetWidth;
                        const containerElement = $('.container');
                        containerElement.style.left = rightoffPlayer - 35 + 'px';

                        _this.activeSongPlay();
                        _this.scrollToActiveSong();
                    }
                }

                volume.oninput = function() {
                    audio.volume = volume.value / 100;
                }

                document.onclick = function(e) {
                    const loveElement = e.target.closest('.content__playItem-love');
                    if(loveElement)
                    {
                        let indexSongLove = Number(loveElement.parentElement.getAttribute('data-index'));
                        
                        const elementLove = $$(`[data-index="${indexSongLove}"]`);
                        if(elementLove)
                        {
                            elementLove.forEach((e) => {
                                e.querySelector('.content__playItem-love').classList.toggle('active', !_this.songs[indexSongLove].love);
                            });
                            _this.songs[indexSongLove].love = !_this.songs[indexSongLove].love;
                            // console.log(_this.songs[indexSongLove].love)
                            // indexSongLove++;
                            // fetch(apiSongs + '/' + indexSongLove, {
                            //     method: 'PATCH',
                            //     headers: {
                                    
                            //     },
                            //     body: JSON.stringify({love: _this.songs[indexSongLove].love})
                            // });
                        }
                    }
                }
            },
            scrollToActiveSong: function() {
                const elementCurrentIndex = playlist.querySelector(`[data-index="${this.currentIndex}"]`);
                if(elementCurrentIndex)
                {
                    setTimeout(() => {
                        $('.container__content-playItem.active').scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        })
                    }, 300);
                }
            },
            loadConfig() {
                this.isRandom = this.config.isRandom || this.isRandom;
                this.isRepeat = this.config.isRepeat || this.isRepeat;
                this.currentIndex = this.config.currentIndex || this.currentIndex;
                this.currentVolume = this.config.currentVolume || this.currentVolume;
            },
            loadCurrentSong: function() {
                heading.textContent = this.currentSong.name;
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
                audio.src = this.currentSong.path;
            },
            nextSong: function() {
                this.currentIndex++;
                if(this.currentIndex >= songs.length) this.currentIndex = 0;
                this.loadCurrentSong();
            },
            prevSong: function() {
                this.currentIndex--;
                if(this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
                this.loadCurrentSong();
            },
            playRandomSong: function() {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * this.songs.length);
                } while(newIndex === this.currentIndex);

                this.currentIndex = newIndex;
                this.loadCurrentSong();
            },
            activeSongPlay: function() {
                const currentSongElement = playlist.querySelector(`[data-index="${this.currentIndex}"]`);
                const elementActived = $('.container__content-playItem.active');
                if(elementActived)
                {
                    elementActived.classList.remove('active');
                }
                if(currentSongElement)
                {
                    currentSongElement.classList.add('active');
                }
            },
            start: function() {
                this.loadConfig();

                // Định nghĩa các thuộc tính cho object
                this.defineProperties();

                // Xử lý các xự kiện
                this.handleEvents();

                // Tải bài hát đầu tiên lên UI khi mở web
                this.loadCurrentSong();

                // Render playList
                this.render();

                randomBtn.classList.toggle('active', this.isRandom);
                repeatBtn.classList.toggle('active', this.isRepeat);
            }
        }
        
        app.start();
    }, 20)
}
getDatajson(getJsonMusic, apiSongs);