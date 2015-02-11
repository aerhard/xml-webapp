/**
 * The search grid store.
 */
Ext.define('Zen.store.component.SearchGrid', {
    extend: 'Ext.data.Store',

    fields    : [],
    autoLoad  : false,
    pageSize  : 100000,
    sortOnLoad: true,
    sorters   : {
        property : 'date_o',
        direction: 'ASC'
    },

    proxy: {
        type       : 'ajax',
        url        : '',
        extraParams: {},
        listeners  : {
            success: function (unused_proxy, response) {
                if (response.responseMessage) {
                    Ext.Error.raise('Fehler beim Verarbeiten der Suchanfrage: ' + response.responseMessage);
                }
            }
        },
        reader     : {
            type           : 'json',
            root           : 'data',
            totalProperty  : 'items',
            successProperty: 'success',
            metaProperty   : 'metaData'
        }
    }
}); 