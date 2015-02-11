/**
 * A store containing the data of additional search fields in a search grid component.
 */
Ext.define('Zen.store.component.SearchFieldCombo', {
    extend: 'Ext.data.Store',

    fields: ['key', 'name', 'xtype'],

    autoLoad  : false,
    sortOnLoad: false,

    proxy: {
        type       : 'ajax',
        url        : '',
        extraParams: {},
        listeners  : {
            exception: function (unused_proxy, response, operation) {
                if (operation) {
                    Ext.MessageBox.alert('Hinweis', 'Fehler bei der Suchanfrage. \n' + response.toString());
                } else {
                    Ext.MessageBox.alert('Fehler', response.toString());
                }
            }
        },
        reader     : {
            type           : 'json',
            root           : 'data',
            totalProperty  : 'items',
            successProperty: 'success'
        }
    }

});
