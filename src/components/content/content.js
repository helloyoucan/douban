import './content.scss';
import tpl from './content.pug';
import MovieList from './movieList/movieList';
export default {
    tpl,
    init(){
        (function () {//滑动切换
            let contentDom = document.querySelector('#content');
            let touchstart = {
                x: 0,
                y: 0
            };
            contentDom.innerHTML = tpl();
            contentDom.addEventListener('touchstart', (e) => {
                if (e.changedTouches.length === 1) {
                    touchstart.x = e.changedTouches[0].pageX;
                    touchstart.y = e.changedTouches[0].pageY;
                }

            });
            contentDom.addEventListener('touchend', (e) => {
                if (e.changedTouches.length == 1) {
                    let page = {
                        x: e.changedTouches[0].pageX,
                        y: e.changedTouches[0].pageY
                    };
                    let contentDom = document.querySelector("#content");
                    let translate = contentDom.style.transform;
                    translate = translate.slice(translate.indexOf('(') + 1, translate.indexOf(')') - 1);
                    let tab_itemDoms = document.querySelectorAll('.tab-item');
                    if (page.x > touchstart.x) {//右滑
                        if (page.x - touchstart.x > 70
                            && Math.abs(page.y - touchstart.y) < 100) {
                            //console.log("右滑");
                            switch (translate) {
                                case '-33.3':
                                    translate = 0;
                                    tab_itemDoms[1].classList.remove('active');
                                    tab_itemDoms[0].classList.add('active');
                                    break;
                                case '-66.6':
                                    translate = -33.3;
                                    tab_itemDoms[2].classList.remove('active');
                                    tab_itemDoms[1].classList.add('active');
                                    break;
                            }
                            contentDom.style.transform = 'translate(' + translate + '%)';

                        }
                    } else {//左滑
                        if (touchstart.x - page.x > 70
                            && Math.abs(page.y - touchstart.y) < 100) {
                            //console.log("左滑");
                            if (translate <= 0 && translate > -66.6) {
                                switch (translate) {
                                    case '0':
                                        translate = -33.3;
                                        tab_itemDoms[0].classList.remove('active');
                                        tab_itemDoms[1].classList.add('active');
                                        break;
                                    case '-33.3':
                                        translate = -66.6;
                                        tab_itemDoms[1].classList.remove('active');
                                        tab_itemDoms[2].classList.add('active');
                                        break;
                                }
                                contentDom.style.transform = 'translate(' + translate + '%)';
                            }
                        }
                    }
                }
            });
        })();
        //渲染电影列表
        MovieList.init();
        //滑动加载
        let movie_listDom = document.querySelector('#movie-list');
        movie_listDom.addEventListener('scroll', (e) => {
            if (!MovieList.getLoading() && movie_listDom.scrollHeight - movie_listDom.clientHeight - movie_listDom.scrollTop < 300) {
                MovieList.getMoreData();
            }
        });
        //点击分类
        (function () {
            let movie_select = document.querySelector('#movie-select');
            let spanDoms = movie_select.querySelectorAll('span');
            movie_select.addEventListener('click', (e) => {
                let clickSpan = e.target.nodeName == 'LI' ? e.target.childNodes[0] : e.target;
                let tab = clickSpan.getAttribute('data-tab');
                spanDoms.forEach((span) => {
                    span.classList.remove('active');
                });
                clickSpan.classList.add('active');
                switch (tab) {
                    case 'hot':
                        MovieList.getHot();
                        break;
                    case 'now':
                        MovieList.getNow();
                        break;
                    case 'top':
                        MovieList.getTop();
                        break;
                }
            });
        })();
    }
}