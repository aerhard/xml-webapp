/**
 * Controller class for detail text panes.
 */
Ext.define('Zen.controller.component.DetailPane', {
    extend: 'Ext.app.Controller',


    statusLabels: {
        'approved' : 'fertig zur Publikation',
        'candidate': 'Publikation anstehend',
        'proposed' : 'Publikation vorgeschlagen',
        'none'     : 'ohne Statusangabe'
    },

    init: function () {

        this.control({
            'detailpane'                       : {
                modelload: this.onModelLoad, innerclick: this.onInnerClick, innercontextmenu: this.onInnerContextMenu
            }, 'detailpanecontextmenu menuitem': {
                click: this.onContextButton
            }, 'permissionsmenu menuitem'      : {
                click: this.onPermissionButtonClick
            }, 'statusmenu menuitem'           : {
                click: this.onStatusButtonClick
            }
        });
    },

    onModelLoad: function (panel) {
        if (!panel.hasToolbar) {
            panel.initToolbar();
            panel.hasToolbar = true;
        }
        this.updateContent(panel);
        if (panel.master) {
            this.initOtherComponents(panel);
        }
        panel.removeBodyCls('body-no-border');
        panel.addBodyCls('body-grey-border');
    },

    /**
     * Changes the title of the tab and starts initializing the right component.
     * @param {Ext.Component} cmp The left detail view component.
     */
    initOtherComponents: function (cmp) {
        var tab = cmp.up('abstracttab');
        tab.tab.setText(cmp.titleText);
        tab.getComponent('docright').initRight(cmp);
    },

    updateContent: function (panel) {
        var me = this, data, header, titleText, permissionText, permissionObj, oldKey, musicArray;
        data = panel.record;
        if (!data) {
            return;
        }
        Ext.suspendLayouts();
        panel.body.scrollTo('top', 0);
        header = data.get('header');

        titleText = data.get('shorttitle');
        panel.titleText = (titleText === '') ? $(header).text() : titleText;

        oldKey = panel.oldKey;
        if (oldKey) {
            panel.getComponent('header').update(header + '<div class="back-button-container">' + me.getReturnButton() +
                                                '</div>');
        } else {
            panel.getComponent('header').update(header + '');
        }

        panel.update(data.get('body'));

        /*
         var parsedBody = $.parseHTML(data.get('body'));
         console.log(parsedBody);
         var musicElements = $(parsedBody[0]).find('span.music');
         panel.update(parsedBody);
         */


        musicArray = data.get('music');
        if (musicArray) {
            me.renderMusic(musicArray, panel);
        }

        permissionText = data.get('permissions') || '';
        permissionObj = (permissionText === '') ? {} : {
            "cls": panel.permissionBtnCls, "text": permissionText
        };
        panel.down('label[name=permissions]').update(permissionObj);

        var statusText = data.get('status');
        var statusObj = (statusText === '') ? {} : {
            "cls": 'badge-status ' + statusText, "text": me.statusLabels[statusText]
        };
        panel.down('label[name=status]').update(statusObj);

        panel.down('label[name=id]').update({
            rsqv: data.get('rsqv').split('|'), key: panel.key, rev: data.get('rev') || null, date: data.get('changed')
        });

        Ext.resumeLayouts(true);
    },

    renderMusic: function (musicArray, panel) {
        var musicCount = 0;
        if (typeof musicArray === 'string') {
            musicArray = [musicArray];
        }
        try {
            $('#' + panel.getId() + ' .music').each(function () {
                new MSV.Viewer({
                    data                  : musicArray[musicCount],
                    target                : this,
                    autoStaveConnectorLine: false,
                    labelMode             : 'full',
                    staff                 : {
                        fill_style: '#000000'
                    },
                    useMeiLib             : false
                });

                musicCount += 1;

            });
        } catch (e) {
            Ext.log(e.message);
        }
    },

    getReturnButton: function () {
        return '<span class="return-button">Zurück</span>';
    },

    onInnerContextMenu: function (cmp, e, el) {
        if (el.className === 'compilation-doc') {
            this.showCitationContextMenu(cmp, e, el);
        } else {
            this.showBodyContextMenu(cmp, e);
        }
    },

    showCitationContextMenu: function (cmp, e, el) {
        var key, uuid, m;
        key = el.getAttribute('data-key');
        uuid = el.getAttribute('data-uuid') || null;
        if (cmp.citationMenu && key) {
            m = cmp.citationMenu;
            m.key = key;
            m.parentCmp = cmp;
            m.uuid = uuid;
            m.showAt(e.getXY());
        }
    },

    showBodyContextMenu: function (cmp, e) {
        var m;
        if (cmp.menu && cmp.key !== null) {
            m = cmp.menu;
            m.key = cmp.key;
            m.parentCmp = cmp;
            m.showAt(e.getXY());
        }
    },

    onContextButton: function (cmp) {
        Zen.app.fireEvent(cmp.action, cmp.up('menu').key);
    },

    onInnerClick: function (cmp, e, el) {
        var me = this, key;
        if ((' ' + el.className + ' ').indexOf('img-link ') > -1) {
            if (cmp.master) {
                cmp.fireEvent('loadimage', cmp, el.dataset.img);
            } else {
                Zen.app.fireEvent('opendetailtab', cmp.key, 'img', {
                    "imgPath": el.dataset.img
                });
            }
            return;
        }
        if (el.className === 'compilation-doc') {
            e.stopEvent();
            key = (el.className === 'compilation-doc') ? el.getAttribute('data-key') : cmp.key;
            if (key) {
                cmp.fireEvent('updatekey', cmp, key, true);
            }
            return false;
        }
        if (el.className === 'badge') {
            if (cmp.key) {
                me.showPermissionsMenu(cmp.key, el);
            }
            return;
        }

        if ((' ' + el.className + ' ').indexOf('badge-status ') > -1) {
            if (cmp.key) {
                me.showStatusMenu(cmp.key, el);
            }
            return;
        }

        if (cmp.oldKey) {
            cmp.loadModel(cmp.oldKey);
        }
    },

    showPermissionsMenu: function (key, el) {
        var menu = Ext.widget('permissionsmenu', {
            key: key
        });
        menu.showBy(el, 'bl-tl?', [0, -8]);
    },


    showStatusMenu: function (key, el) {
        var me = this, menu;
        menu = Ext.widget('statusmenu', {
            key: key, statusLabels: me.statusLabels
        });
        menu.showBy(el, 'bl-tl?', [0, -8]);
    },

    onPermissionButtonClick: function (menuitem) {
        var menu = menuitem.up('menu');
        if (menuitem.name) {
            Zen.app.fireEvent('setpermission', menu.key, menuitem.name);
        }
    },

    onStatusButtonClick: function (menuitem) {
        var menu = menuitem.up('menu');
        if (menuitem.name) {
            Zen.app.fireEvent('setstatus', menu.key, menuitem.name);
        }
    }
});
