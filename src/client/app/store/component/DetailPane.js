/**
 * The store of a detail view pane.
 */
Ext.define('Zen.store.component.DetailPane', {
    extend: 'Ext.data.Store',
    model : 'Zen.model.component.DetailPane',

    autoLoad: false,

    proxy: {
        type       : 'ajax',
        url        : '',
        extraParams: {},
        listeners  : {
            exception: function (unused_proxy, response, operation) {
                if (operation) {
                    Ext.MessageBox.alert('Hinweis', 'Suchanfrage konnte nicht bearbeitet werden. \n' +
                                                    'Bitte Inhalt der Suchfelder auf Stimmigkeit pr&uuml;fen.');
                } else {
                    Ext.MessageBox.alert('Fehler', response.toString());
                }
            }
        },
        reader     : {
            record     : {},
            read       : function (response) {
                var data = response.responseText || response.data;
                return (typeof data !== 'undefined') ? this.readRecords(data) : this.nullResultSet;
            },
            readRecords: function (data) {
                var record, $header, $text, $meta;
                $header = $(data).find('#doc');
                $text = $(data).find('#viewcontents');
                // TODO hier steht 2x viewcontents; korrigieren!
                $meta = $(data).find('#viewcontents');

                // get Records
                record = {
                    header: $header.html(),
                    key   : $header.attr('ref'),
                    text  : $text.html(),
                    meta  : $meta.html()
                };
                this.record = record;
            }
        }
    }
});
