/**
 * A panel for viewing zoomable images.
 */
Ext.define('Zen.view.component.Image', {

    extend: 'Ext.panel.Panel',

    alias  : 'widget.img',
    header : false,
    cls    : 'img nopadding',
    iconCls: 'tabs',
    layout : 'fit',
    frame  : true,

    imageCounter: null,
    imageArray  : [],
    initialized : false,

    html: '<div class="image-empty">Dokument ohne Bild.</div>',

    initRight: function (cmp) {
        var me = this;
        if (!me.initialized) {
            me.imageCounter = null;
            me.imageArray = [];
            $(cmp.record.get('body')).find('a[data-img]').each(function () {
                me.imageArray.push($(this).attr('data-img'));
            });

            if (me.imageArray.length > 0) {
                me.initToolbar();
                if (typeof me.options !== 'undefined' && typeof me.options.imgPath === 'string') {
                    me.setPageContent(me.options.imgPath);
                } else {
                    me.setPageContent();
                }
            }
            me.initialized = true;
        }
    },

    setPageContent: function (imgPath) {
        var me = this, indexFirstImage, totalPagesLabel;
        if (typeof imgPath === 'string') {
            indexFirstImage = me.imageArray.indexOf(imgPath);
            me.imageCounter = (indexFirstImage !== -1) ? indexFirstImage + 1 : 1;
        } else {
            me.imageCounter = 1;
        }

        totalPagesLabel = me.down('label[name=totalpages]');
        if (totalPagesLabel) {
            totalPagesLabel.setText('/ ' + this.imageArray.length);
        }

        me.showCurrentPage();
    },

    showCurrentPage: function () {
        var me = this, pageLabel;
        pageLabel = me.down('label[name=page]');
        if (pageLabel) {
            pageLabel.setText(me.imageCounter);
        }
        me.setSrc(Zen.Global.getPref('imagePath') + me.imageArray[me.imageCounter - 1]);
    },

    dockedItems: [
        {
            xtype   : 'toolbar',
            cls     : 'header-toolbar',
            defaults: {
                ui      : 'plain',
                focusCls: ''
            }
        }
    ],

    initToolbar: function () {
        var me = this, toolbar;
        me.removeCls('nopadding');
        toolbar = me.down('toolbar');

        if (me.imageArray.length === 1) {
            toolbar.add([
                {
                    xtype  : 'button',
                    text   : '',
                    overCls: ''
                },
                '->',
                {
                    xtype: 'label',
                    name : 'page'
                },
                {
                    xtype: 'label',
                    name : 'totalpages'
                },
                '->',
                {
                    xtype  : 'button',
                    text   : '',
                    overCls: ''
                }
            ]);
        } else {
            toolbar.add(['->', {
                xtype  : 'button',
                text   : '<span class="zencon-chevron-left"></span>',
                action : 'prevpage',
                tooltip: 'vorherige Seite'
            }, {
                xtype: 'label',
                name : 'page'
            }, {
                xtype: 'label',
                name : 'totalpages'
            }, {

                xtype  : 'button',
                text   : '<span class="zencon-chevron-right"></span>',
                action : 'nextpage',
                tooltip: 'n&auml;chste Seite'
            }, '->']);
        }
    },

    setSrc: function (src) {
        var me = this;
        me.update('<img src="' + src + '" class="image-viewer-content"/>');
        $(me.el.dom).find('img').wheelzoom();
    }
});
