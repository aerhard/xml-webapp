/**
 * The store used by tree components.
 */
Ext.define('Zen.store.component.Tree', {
    extend: 'Ext.data.TreeStore',
    model : 'Zen.model.component.TreeNode',

    autoLoad  : false,
    folderSort: true,
    sorters   : [
        {
            property : 'index',
            direction: 'ASC'
        }
    ],

    constructor: function (config) {
        var me = this;
        me.url = config.url;
        Ext.applyIf(config, {
            proxy: me.createProxy(config.key)
        });
        me.callParent([config]);
    },

    createApiConfig: function (key) {
        var cfg, path = this.url;
        cfg = {
            read   : path + key + '&mode=read',
            create : path + key + '&mode=write',
            update : path + key + '&mode=write',
            destroy: path + key + '&mode=delete'
        };
        return cfg;
    },

    setApi: function (key) {
        this.getProxy().api = this.createApiConfig(key);
    },

    createProxy: function (key) {
        var me = this;
        return {
            type     : 'ajax',
            api      : me.createApiConfig(key),
            listeners: {
                exception: function (unused_proxy, response, operation) {
                    if (operation) {
                        Ext.MessageBox.alert('Hinweis', 'Fehler bei der Suchanfrage.');
                    } else {
                        Ext.MessageBox.alert('Fehler', response.toString());
                    }
                }
            },
            reader   : {
                type  : 'xml',
                root  : 'nodes',
                record: 'node'

            },
            writer   : {
                type          : 'xml',
                root          : 'nodes',
                record        : 'node',
                writeAllFields: true
            }
        };
    },

    root: {
        id: 'root'
    }
}); 