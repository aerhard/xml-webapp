/**
 * The input/output controller. Defines application event listeners and methods to handle the communication with the database and the oXygen XML Editor.
 */
Ext.define('Zen.controller.io.IO', {
    extend: 'Ext.app.Controller',

    init: function () {
        Zen.app.on({
            showfirstpdf : this.showFirstPdf,
            editdoc      : this.editDoc,
            createdoc    : this.createDoc,
            memorize     : this.memorize,
            movetobin    : this.moveToBin,
            restore      : this.restore,
            scope        : this,
            setpermission: this.setPermission,
            setstatus    : this.setStatus,
            unlock       : this.unlock
        });
    },

    /**
     * Requests the path of the first pdf of a document and opens it in
     * popup window.
     *
     * @param {String} key The key of the document.
     */
    showFirstPdf: function (key) {
        Ext.Ajax.request({
            autoAbort: false,
            url      : Zen.Global.getPath('firstpdf') + key,
            success  : function (response) {
                Zen.Global.popup(response.responseText, '_blank');
            }
        });
    },

    editDoc: function (key) {
        var me = this;
        Zen.Global.jsonRequest({
            url     : Zen.Global.getPath('lock') + key,
            callback: function (msg) {
                me.openInOxygen(msg);
            }
        });
    },

    createDoc: function (tplName) {
        var me = this;
        if (tplName) {
            Zen.Global.jsonRequest({
                url     : Zen.Global.getPath('create') + tplName,
                callback: function (msg) {
                    me.openInOxygen(msg);
                }
            });
        }
    },

    /**
     * Causes the [ZenLauncher](https://github.com/aerhard/zen-launcher) Firefox extension to open a database record in oXygen by firing the event `runlocaloxygen` and setting the property {@link Zen.Application#oxyLoadQueue}.
     * @param {Object} path
     */
    openInOxygen: function (path) {
        var evt = document.createEvent('Events');
        evt.initEvent('runlocaloxygen', true, false);
        Zen.app.oxyLoadQueue = path;
        window.dispatchEvent(evt);
    },

    unlock: function (unused_cmp, key, callbackFn) {
        Zen.Global.jsonRequest({
            url     : Zen.Global.getPath('unlock') + (key || ''),
            callback: function (msg) {
                Zen.app.fireEvent('shortmessage', 'Erledigt', msg);
                if (typeof callbackFn === 'function') {
                    callbackFn();
                }
            }
        });
    },

    setPermission: function (key, group) {
        if (typeof key === 'string' && typeof group === 'string') {
            Zen.Global.jsonRequest({
                url     : Zen.Global.getPath('permissions') + key + '&group=' + group,
                callback: function (msg) {
                    Zen.app.fireEvent('resourcechanged', key);
                    Zen.app.fireEvent('shortmessage', 'Ge&auml;ndert', msg);
                }
            });
        }
    },
    
    setStatus: function (key, status) {
    		console.log(arguments);
        if (typeof key === 'string' && typeof status === 'string') {
            Zen.Global.jsonRequest({
                url     : Zen.Global.getPath('status') + key + '&status=' + status,
                callback: function (msg) {
                    Zen.app.fireEvent('resourcechanged', key);
                    Zen.app.fireEvent('shortmessage', 'Ge&auml;ndert', msg);
                }
            });
        }
    },

    memorize: function (key) {
        Zen.Global.jsonRequest({
            url     : Zen.Global.getPath('memorize') + key,
            callback: function (msg) {
                Zen.app.fireEvent('shortmessage', 'Gemerkt', msg);
            }
        });
    },

    getKeyDesc: function (key) {
        var result;
        Zen.Global.jsonRequest({
            url     : Zen.Global.getPath('keydesc') + key,
            // must be asynchronous
            async   : false,
            callback: function (msg) {
                result = msg;
            }
        });
        return result || 'Kein Resultat bei der Anfrage.';
    },

    moveToBin: function (key) {
        var keyDesc = '"' + this.getKeyDesc(key) + '" (' + key + ')';
        if (typeof key !== 'string') {
            Ext.MessageBox.alert('Fehler', 'Kein ausgew&auml;hltes Dokument gefunden.');
        } else {
            Ext.MessageBox.confirm('L&ouml;schen', 'Soll das folgende Dokument in den Papierkorb verschoben werden? <br/><br/><b>' +
                                              keyDesc +
                                              '</b><br/><br/>(Vor dem L&ouml;schen sicherstellen, dass alle enthaltenen Informationen anderweitig verf&uuml;gbar sind!)', function (btn) {
                if (btn === 'yes') {
                    Zen.Global.jsonRequest({
                        url     : Zen.Global.getPath('remove') + key,
                        callback: function (msg) {
                            Zen.app.fireEvent('resourceremoved', key);
                            Zen.app.fireEvent('shortmessage', 'Erledigt', keyDesc + ' ' + msg);
                        }
                    });
                }
            });
        }
    },

    restore: function (key) {
        if (typeof key !== 'string') {
            Ext.MessageBox.alert('Fehler', 'Kein ausgew&auml;hltes Dokument gefunden.');
        } else {
            Ext.MessageBox.confirm('Wiederherstellen', 'Soll das Dokument wiederhergestellt werden?', function (btn) {
                if (btn === 'yes') {
                    Zen.Global.jsonRequest({
                        url     : Zen.Global.getPath('restore') + key,
                        callback: function (msg) {
                            Zen.app.fireEvent('resourcerestored', key);
                            Zen.app.fireEvent('shortmessage', 'Erledigt', msg);
                        }
                    });
                }
            });
        }
    }
});
