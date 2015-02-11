/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'iconfont\'">' + entity + '</span>' + html;
	}
	var icons = {
		'zencon-search': '&#xe605;',
		'zencon-quill': '&#xe603;',
		'zencon-dice': '&#xe604;',
		'zencon-lock': '&#xe600;',
		'zencon-unlocked': '&#xe601;',
		'zencon-menu': '&#xe602;',
		'zencon-lock2': '&#xf023;',
		'zencon-book': '&#xf02d;',
		'zencon-align-justify': '&#xf039;',
		'zencon-map-marker': '&#xf041;',
		'zencon-camera-retro': '&#xf083;',
		'zencon-comments': '&#xf086;',
		'zencon-globe': '&#xf0ac;',
		'zencon-magic': '&#xf0d0;',
		'zencon-money': '&#xf0d6;',
		'zencon-suitcase': '&#xf0f2;',
		'zencon-file-text-o': '&#xf0f6;',
		'zencon-stack-overflow': '&#xf16c;',
		'zencon-pagelines': '&#xf18c;',
		'zencon-file-photo-o': '&#xf1c5;',
		'zencon-refresh': '&#xe004;',
		'zencon-question-sign': '&#xe006;',
		'zencon-chevron-right': '&#xe00b;',
		'zencon-chevron-left': '&#xe00c;',
		'zencon-resize-full': '&#xe014;',
		'zencon-plus': '&#xe016;',
		'zencon-minus': '&#xe017;',
		'zencon-copy': '&#xe029;',
		'zencon-undo': '&#xe02a;',
		'zencon-lightbulb': '&#xe031;',
		'zencon-pencil': '&#xe034;',
		'zencon-book2': '&#xe035;',
		'zencon-image': '&#xe036;',
		'zencon-history': '&#xe037;',
		'zencon-unlocked2': '&#xe039;',
		'zencon-remove': '&#xe03d;',
		'zencon-file-pdf': '&#xe047;',
		'zencon-file': '&#xe048;',
		'zencon-search2': '&#xe049;',
		'zencon-user': '&#xe04a;',
		'zencon-calendar': '&#xe04e;',
		'zencon-newtab': '&#xe051;',
		'zencon-books': '&#xe053;',
		'zencon-library': '&#xe054;',
		'zencon-users': '&#xe056;',
		'zencon-notebook': '&#xe058;',
		'zencon-images': '&#xe05c;',
		'zencon-edit': '&#xe05f;',
		'zencon-envelope': '&#xe060;',
		'zencon-music': '&#xe061;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/zencon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
