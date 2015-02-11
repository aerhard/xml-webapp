/**
 * A store for search fields with autocomplete functionality.
 */
Ext.define('Zen.store.component.AutoComplete', {
    extend: 'Ext.data.Store',

    autoLoad: false,

    fields: ['str'],

    proxy: {
        type       : 'ajax',
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
            successProperty: 'success'
        }
    }
});
