/**
 * The model of a document in a detail view component.
 */
Ext.define('Zen.model.component.DetailPane', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'shorttitle',
            type: 'string'
        },
        {
            name: 'permissions',
            type: 'string'
        },
        {
            name: 'rev',
            type: 'string'
        },
        {
            name: 'changed',
            type: 'string'
        },
        {
            name: 'rsqv',
            type: 'string'
        },
        {
            name: 'header',
            type: 'string'
        },
        {
            name: 'body',
            type: 'string'
        },
        {
            name: 'music',
            type: 'auto'
        }
    ],

    proxy: {
        type       : 'ajax',
        url        : '',
        extraParams: {},
        reader     : {
            type  : 'json',
            record: 'data'
        }
    }

});
