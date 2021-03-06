import './bottom.scss';
import  tpl from './bottom.pug';
export default {
    init(){
        let bottomDom = document.querySelector('#bottom');
        let topDom = document.querySelector('#top');
        let movie_listDom = document.querySelector('#movie-list');
        bottomDom.innerHTML = tpl();
        bottomDom.addEventListener('click', (e) => {
            if (e.target.nodeName === 'IMG' || e.target.nodeName === 'DIV') {
                let divDom = e.target.nodeName === 'IMG' ? e.target.parentNode : e.target;
                let divDoms = bottomDom.querySelectorAll('.tab-item');
                divDoms.forEach((val) => {
                    val.classList.remove('active');
                });
                divDom.classList.add('active');
                let tab = divDom.getAttribute('data-tab');
                let contentDom = document.querySelector("#content");
                let translate = 0;
                switch (tab) {
                    case '#movie':
                        translate = 0;
                        if (movie_listDom.scrollTop < 10) {
                            topDom.classList.remove('hide-search');
                        }
                        break;
                    case '#music':
                        translate = -33.3;
                        topDom.classList.add('hide-search');
                        break;
                    case '#book':
                        translate = -66.6;
                        topDom.classList.add('hide-search');
                        break;
                    default:
                        ;
                }
                contentDom.style.transform = 'translate(' + translate + '%)';

            }
        })
    }
}