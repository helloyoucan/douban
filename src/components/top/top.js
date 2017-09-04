import tpl from './top.pug'
import './top.scss'
import MovieList from '../content/movieList/movieList';
export default {
    init(){
        let topDom = document.querySelector('#top');
        topDom.innerHTML = tpl();
        let searchInput = topDom.querySelector('input')
        let searchAction = topDom.querySelector('img');
        searchAction.addEventListener('click', () => {
            MovieList.search(searchInput.value);
        });
    }
}
