import Main from './components/main/main.js';
import './scss/common.scss';
const App = function(){
	var app = document.querySelector("#app");
	var main = new Main();
	app.innerHTML = main.tpl({});
    main.init();
}
new App();