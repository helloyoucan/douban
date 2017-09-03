import main from './main.scss';
import tpl from './main.pug';
import Content from '../content/content.js'
import Bottom from '../bottom/bottom.js';

function Main(){
	return {
		tpl,
		init(){
            Content.init();
            Bottom.init();
		}
	}
}
export default Main;