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
            name: 'status',
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
            name: 'identifiers',
            type: 'array'
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
