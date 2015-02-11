/**
 * The image pane controller.
 */
Ext.define('Zen.controller.component.Image', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.control({
            'img button[action=prevpage]': {
                click: this.onBtnPrevClick
            },
            'img button[action=nextpage]': {
                click: this.onBtnNextClick
            }
        });
    },

    onBtnPrevClick: function (button) {
        var img = button.up('panel');
        img.imageCounter = (img.imageCounter === 1) ? img.imageArray.length : img.imageCounter - 1;
        img.showCurrentPage();
    },

    onBtnNextClick: function (button) {
        var img = button.up('panel');
        img.imageCounter = (img.imageCounter === img.imageArray.length) ? 1 : img.imageCounter + 1;
        img.showCurrentPage();
    }
});
