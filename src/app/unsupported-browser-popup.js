/* eslint-disable */

// ########## THIS IS ORIGINAL ##########
/*
export default `var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : 'no-browser';
var _chromeOperaFirefoxRegExp = /(opr|chrome|firefox|ucbrowser)\\/([0-9.]+)/g;
var _msieRegExp = /(msie|rv)(\:|\\s+)([0-9.]+)/g;
var _safariRegExp = /version\\/([0-9.]+)/g;
var _androidRegExp = /android(\\s+)([0-9.]+)/g;

// Browsers User-Agent sniffing and matching
var _isChrome = typeof window !== 'undefined' && !!window.chrome && ua.indexOf( 'chrome/' ) !== -1;
var _isAndroid = ua.indexOf( 'android ' ) !== -1;
var _isFirefox = ua.indexOf( 'firefox/' ) !== -1;
var _isMSIE = ( ua.indexOf( 'trident/' ) !== -1 && ua.indexOf( 'rv:' ) !== 1 ) || ua.indexOf( 'msie ' ) !== -1;
var _isOpera = ua.indexOf( 'opr/' ) !== -1;
var _isSafari = ua.indexOf( 'safari/' ) !== -1 && !_isChrome && !_isOpera && !_isMSIE && !_isAndroid;
var _isUCBrowser = ua.indexOf( 'ucbrowser/' ) !== -1 && !_isChrome && !_isOpera && !_isMSIE && !_isAndroid;
var _isBot = ua.indexOf( 'googlebot/' ) !== -1;

var modalHtml = document.createElement("div");
var modalStyle = document.createElement("style");
modalStyle.innerHTML = '.modal{position: fixed !important; position: absolute; top: 50%; left: 50%; width: 580px; height: 250px; margin-top: -180px; margin-left: -300px; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; border: 1px solid #000; background-color: #fff; z-index: 10;}@media screen and (max-width: 1024px){.modal{width: 480px; height: 265px; top: 0; margin-left: -250px; margin-top: 100px; padding-top: 20px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;}}@media screen and (max-width: 768px){.modal{width: 280px; height: 330px; top: 0; margin-left: -150px; margin-top: 20px; padding-top: 0px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;}}.modal-close{float: right; margin-right: 10px; font-size: 30px; font-weight: bold; cursor: pointer;}.modal-link{text-align: center; color: #00a2ef; font-size: 16px;}.modal-browsers{width: 252px; margin: 0 auto; text-align: center;}.modal-browsers div{display: inline-block !important; *display: inline; *zoom: 1; float: left; margin: 15px;}.modal-browsers div a{display: block; text-decoration: none; color: #00a2ef;}.modal-browsers div a:hover{text-decoration: underline; color: #00a2ef;}.modal h2{padding-bottom: 10px; padding-top: 50px; text-align: center; text-transform: uppercase; font-weight: bold; font-size: 16px;}.modal p{padding-top: 10px; padding-bottom: 10px; text-align: center; font-size: 16px;}.modal b{font-weight: bold;}'
modalHtml.innerHTML = '<div class="modal"><div class="modal-close" title="Close" id="modal-close">x</div><h2>You are using a web browser that is not supported</h2><p>You are using a web browser that is not supported by this website. This means that some functionality may not work as intended. This may result in strange behavoirs when browsing around. Use or upgrade/install one of the following browsers to take full advantage of this website.</p><p><b>Thank you!</b></p><div class="modal-browsers"><div><a href="https://www.google.ru/intl/ru/chrome/?brand=CHBD&amp;gclid=EAIaIQobChMItJKQoOfG2QIVUbobCh1L2QgJEAAYASAAEgKaCPD_BwE#" title="Download Chrome">Chrome</a></div><div><a href="https://www.mozilla.org/ru/firefox/new" title="Download Firefox">Firefox</a></div><div><a href="https://support.apple.com/kb/DL1801?viewlocale=en_US&amp;locale=en_US" title="Download Safari">Safari</a></div></div></div>'

var closeModal = function() {
	document.body.removeChild(modalHtml);
	document.head.removeChild(modalStyle);
}

var escapeButtonListener = function(e) {
	if (event.key === 'Escape' || event.keyCode === 27) {
		closeModal();
		document.removeEventListener('keydown', escapeButtonListener);
	}
}

var ALERT = function(log) {
	document.addEventListener('DOMContentLoaded', function(event) {
		document.body.appendChild(modalHtml);
		document.head.appendChild(modalStyle);
		document.getElementById('modal-close').addEventListener('click', closeModal);
		document.addEventListener('keydown', escapeButtonListener);
	})
}

var browsersCheck = {
	googlebot: _isBot,
	chrome: _isChrome,
	firefox: _isFirefox,
	msie: _isMSIE,
	opera: _isOpera,
	safari: _isSafari,
	android: _isAndroid,
	ucbrowser: _isUCBrowser
}

var browserName;
var browserVer;

for ( var browser in browsersCheck ) {
	if ( browsersCheck[ browser ] ) {
		browserName = browser;
	}
}

switch ( browserName ) {
	case 'firefox':
	case 'opera':
	case 'chrome':
	case 'ucbrowser':
		{
			browserVer = parseInt( ua.match( _chromeOperaFirefoxRegExp )[ 0 ].split( "/" )[ 1 ] );
			break;
		}
	case 'msie':
		{
			browserVer = ua.match( _msieRegExp )[ 0 ];
			browserVer = parseInt( browserVer.indexOf( 'msie ' ) !== -1 ? browserVer.split( " " )[ 1 ] : browserVer.split(
				'rv:' )[ 1 ] );
			break;
		}
	case 'safari':
		{
			browserVer = parseInt( ua.match( _safariRegExp )[ 0 ].split( "/" )[ 1 ] );
			break;
		}
	case 'android':
		{
			browserVer = parseInt( ua.match( _androidRegExp )[ 0 ].split(" ")[1].split('.').slice(0, 2).join('') );
			break;
		}
}

var supportedBrowserVer = {
	chrome: 40,
	msie: 11,
	safari: 7,
	opera: 30,
	firefox: 40,
	android: 42,
	ucbrowser: 9,
	googlebot: true
};

function isSupported() {
	for ( var support in supportedBrowserVer ) {
		if ( support === browserName ) {
			if ( browserName === 'googlebot' ) {
				return true;
			} else if ( browserVer >= supportedBrowserVer[ support ] ) {
				return true;
			}
		}
	}
	return false;
}

function changeBrowserSupportVersion(name, ver) {
	supportedBrowserVer[name] = parseInt(ver)
}

if (typeof document !== 'undefined' && !isSupported()) {
	ALERT('Your browser is not supported by us');

	var date = new Date();
		date.setTime(date.getTime() + 604800000 /* 1 week *!/);

	document.cookie = 'accept_old_browser=true; expires=' + date.toUTCString() + '; path=/';
}
`;*/


// ########## THIS IS MINIFIED AND UGLIFIED ##########
export default `var ua="undefined"!=typeof navigator?navigator.userAgent.toLowerCase():"no-browser",_chromeOperaFirefoxRegExp=/(opr|chrome|firefox|ucbrowser)\\/([0-9.]+)/g,_msieRegExp=/(msie|rv)(:|\\s+)([0-9.]+)/g,_safariRegExp=/version\\/([0-9.]+)/g,_androidRegExp=/android(\\s+)([0-9.]+)/g,_isChrome="undefined"!=typeof window&&!!window.chrome&&-1!==ua.indexOf("chrome/"),_isAndroid=-1!==ua.indexOf("android "),_isFirefox=-1!==ua.indexOf("firefox/"),_isMSIE=-1!==ua.indexOf("trident/")&&1!==ua.indexOf("rv:")||-1!==ua.indexOf("msie "),_isOpera=-1!==ua.indexOf("opr/"),_isSafari=!(-1===ua.indexOf("safari/")||_isChrome||_isOpera||_isMSIE||_isAndroid),_isUCBrowser=!(-1===ua.indexOf("ucbrowser/")||_isChrome||_isOpera||_isMSIE||_isAndroid),_isBot=-1!==ua.indexOf("googlebot/"),modalHtml=document.createElement("div"),modalStyle=document.createElement("style");modalStyle.innerHTML=".modal{position: fixed !important; position: absolute; top: 50%; left: 50%; width: 580px; height: 250px; margin-top: -180px; margin-left: -300px; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; border: 1px solid #000; background-color: #fff; z-index: 10;}@media screen and (max-width: 1024px){.modal{width: 480px; height: 265px; top: 0; margin-left: -250px; margin-top: 100px; padding-top: 20px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;}}@media screen and (max-width: 768px){.modal{width: 280px; height: 330px; top: 0; margin-left: -150px; margin-top: 20px; padding-top: 0px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;}}.modal-close{float: right; margin-right: 10px; font-size: 30px; font-weight: bold; cursor: pointer;}.modal-link{text-align: center; color: #00a2ef; font-size: 16px;}.modal-browsers{width: 252px; margin: 0 auto; text-align: center;}.modal-browsers div{display: inline-block !important; *display: inline; *zoom: 1; float: left; margin: 15px;}.modal-browsers div a{display: block; text-decoration: none; color: #00a2ef;}.modal-browsers div a:hover{text-decoration: underline; color: #00a2ef;}.modal h2{padding-bottom: 10px; padding-top: 50px; text-align: center; text-transform: uppercase; font-weight: bold; font-size: 16px;}.modal p{padding-top: 10px; padding-bottom: 10px; text-align: center; font-size: 16px;}.modal b{font-weight: bold;}",modalHtml.innerHTML='<div class="modal"><div class="modal-close" title="Close" id="modal-close">x</div><h2>You are using a web browser that is not supported</h2><p>You are using a web browser that is not supported by this website. This means that some functionality may not work as intended. This may result in strange behavoirs when browsing around. Use or upgrade/install one of the following browsers to take full advantage of this website.</p><p><b>Thank you!</b></p><div class="modal-browsers"><div><a href="https://www.google.ru/intl/ru/chrome/?brand=CHBD&amp;gclid=EAIaIQobChMItJKQoOfG2QIVUbobCh1L2QgJEAAYASAAEgKaCPD_BwE#" title="Download Chrome">Chrome</a></div><div><a href="https://www.mozilla.org/ru/firefox/new" title="Download Firefox">Firefox</a></div><div><a href="https://support.apple.com/kb/DL1801?viewlocale=en_US&amp;locale=en_US" title="Download Safari">Safari</a></div></div></div>';var browserName,browserVer,closeModal=function(){document.body.removeChild(modalHtml),document.head.removeChild(modalStyle)},escapeButtonListener=function(e){"Escape"!==event.key&&27!==event.keyCode||(closeModal(),document.removeEventListener("keydown",escapeButtonListener))},ALERT=function(e){document.addEventListener("DOMContentLoaded",function(e){document.body.appendChild(modalHtml),document.head.appendChild(modalStyle),document.getElementById("modal-close").addEventListener("click",closeModal),document.addEventListener("keydown",escapeButtonListener)})},browsersCheck={googlebot:_isBot,chrome:_isChrome,firefox:_isFirefox,msie:_isMSIE,opera:_isOpera,safari:_isSafari,android:_isAndroid,ucbrowser:_isUCBrowser};for(var browser in browsersCheck)browsersCheck[browser]&&(browserName=browser);switch(browserName){case"firefox":case"opera":case"chrome":case"ucbrowser":browserVer=parseInt(ua.match(_chromeOperaFirefoxRegExp)[0].split("/")[1]);break;case"msie":browserVer=ua.match(_msieRegExp)[0],browserVer=parseInt(-1!==browserVer.indexOf("msie ")?browserVer.split(" ")[1]:browserVer.split("rv:")[1]);break;case"safari":browserVer=parseInt(ua.match(_safariRegExp)[0].split("/")[1]);break;case"android":browserVer=parseInt(ua.match(_androidRegExp)[0].split(" ")[1].split(".").slice(0,2).join(""))}var supportedBrowserVer={chrome:40,msie:11,safari:7,opera:30,firefox:40,android:42,ucbrowser:9,googlebot:!0};function isSupported(){for(var e in supportedBrowserVer)if(e===browserName){if("googlebot"===browserName)return!0;if(browserVer>=supportedBrowserVer[e])return!0}return!1}function changeBrowserSupportVersion(e,o){supportedBrowserVer[e]=parseInt(o)}if("undefined"!=typeof document&&!isSupported()){ALERT("Your browser is not supported by us");var date=new Date;date.setTime(date.getTime()+6048e5),document.cookie="accept_old_browser=true; expires="+date.toUTCString()+"; path=/"}`
