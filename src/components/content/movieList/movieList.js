import './movieList.scss'
import tpl from './movieList.pug'
import api from '../../../../api/api.js';

let movie = {
    currentStart: 0,
    currentCount: 10,
    count: 0,
    start: 0,
    total: 0,
    isLoading: false,
    url: api.movie.hot,
    q: ''
}
export default {
    init(){
        let movie_listDom = document.querySelector('#movie-list');
        movie_listDom.innerHTML = '';
        _getData({
            url: movie.url,
            success(movieList){
                movie_listDom.innerHTML = tpl(movieList);
            },
            error(err){
                console.log(err);
            }
        });
    },
    getMoreData(){
        if (!movie.isLoading && movie.currentStart + 10 < movie.total) {
            movie.currentStart += 10;
            _getData({
                url: '',
                success(movieList){
                    let liDoms = [];
                    for (let index in movieList.subjects) {
                        let s = movieList.subjects[index];
                        let genres = [];
                        let casts = [];
                        var directors = []
                        for (let g in s.genres) {
                            genres.push("<span>" + s.genres[g] + "</span>");
                        }
                        genres = genres.join('');
                        for (let c in s.casts) {
                            casts.push("<span>" + s.casts[c].name + "</span>");
                        }
                        casts = casts.join('');
                        for (let d in s.directors) {
                            directors.push("<span>" + s.directors[d].name + "</span>");
                        }
                        directors = directors.join('');
                        liDoms.push(`
                     <li>
                     <div class="movie-item">
                     <div class="movie-img">
                     <img src="${s.images.small}">
                     </div>
                     <div class="movie-msg">
                     <div class="title">${s.title}
                     <span class="year">(${s.year})</span>
                     <a href="${s.alt}" target="_blank">详细</a>
                     </div>
                     <div class="rating">评分:${s.rating.average}</div>
                     <div class="genres">分类:
                     ${genres}
                     </div>
                     <div class="casts">主演:
                     ${casts}
                     </div>
                     <div class="directors">导演:
                     ${directors}
                     </div>
                     </div>
                     </div>
                     </li>
                     `)
                    }
                    //console.log(liDoms.join(''));
                    //console.log(ulDom);
                    let oFragment = document.createDocumentFragment();
                    var el = document.createElement('ul');
                    let movie_listDom = document.querySelector('#movie-list');
                    el.innerHTML = liDoms.join('');
                    oFragment.appendChild(el);
                    movie_listDom.appendChild(oFragment);
                },
                error(err){
                    console.log(err);
                }
            })
        } else {
            movie.isLoading = true;
        }

    },
    getLoading(){
        return movie.isLoading;
    },
    getHot(){
        movie.url = api.movie.hot;
        movie.currentStart = 0;
        movie.q = '';
        document.querySelector('#top input').value = '';
        this.init();
    },
    getNow(){
        movie.url = api.movie.now;
        movie.currentStart = 0;
        movie.q = '';
        document.querySelector('#top input').value = '';
        this.init();
    },
    getTop(){
        movie.url = api.movie.top;
        movie.currentStart = 0;
        movie.q = '';
        document.querySelector('#top input').value = '';
        this.init();
    },
    search(key){
        movie.url = api.movie.search;
        movie.currentStart = 0;
        movie.q = key;
        this.init();
    }

}
function _getData(opt) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                if (opt.success) {
                    let response = JSON.parse(xhr.responseText);
                    movie.count = response.count;
                    movie.start = response.start;
                    movie.total = response.total;
                    opt.success(response);
                    movie.isLoading = false;
                    showLoading(false);
                }

            } else {
                if (opt.error) {
                    opt.error(xhr.responseText);
                }
            }
        }
    };
    let url = movie.url + '?start=' + movie.currentStart + '&count=' + movie.currentCount;
    if (movie.q != '') {
        url += '&q=' + movie.q;
    }
    xhr.open(
        'get',
        url,
        true
    );
    xhr.send();
    movie.isLoading = true;
    showLoading(true);
}
function showLoading(bool) {
    let loadingDom = document.querySelector('.loading');
    if (bool) {
        loadingDom.style.display = 'block';
    } else {
        loadingDom.style.display = 'none';
    }

}