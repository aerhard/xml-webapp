/**
 * Contains factory methods for components containing a left and a right panel.
 */
Ext.define('Zen.view.DoublePaneFactory', {
    requires : ['Zen.Global'],
    singleton: true,

    constructor: function () {
        Ext.apply(this, Zen.Global.getPref('doublePaneFactoryPrefs'));
    },

    /**
     * Utility function; returns the document category to which a document key belongs.
     * @param {String} key the key from which the category should be derived
     * @return {String} the category
     */
    getCatFromKey: function (key) {
        var me = this, initial = key.substring(key.lastIndexOf('/') + 1).substring(0, 1);
        return me.initialCatMap[initial];
    },

    /**
     * Creates a search tab component.
     * @param {String} type The type of the search tab.
     * @return {Zen.view.tab.AbstractTab} The tab component.
     */
    createTab: function (type) {
        return Ext.create('Zen.view.tab.AbstractTab', this.getTabConfig(type));
    },

    /**
     * Creates a list dialog component.
     * @param {String} type The type of list dialog.
     * @return {Zen.view.dialog.AbstractListDialog} The dialog component.
     */
    createListDialog: function (type) {
        return Ext.create('Zen.view.dialog.AbstractListDialog', this.getTabConfig(type));
    },

    /**
     * Returns the config of a search tab.
     * @private
     * @param {String} cat The document category of the search tab.
     * @return {Object} The config object.
     */
    getTabConfig: function (cat) {
        var me = this, cfgitem = {}, result;
        if (me.cfg[cat]) {
            Ext.apply(cfgitem, me.cfg[cat], me.defaultCfg);
            result = {
                title         : cfgitem.title,
                iconCls       : cfgitem.iconCls,
                type          : cat,
                doAddListeners: Boolean(cfgitem.doAddListeners),
                leftConfig    : {
                    xtype       : cfgitem.leftXType,
                    itemId      : 'docleft',
                    region      : 'west',
                    width       : cfgitem.leftWidth,
                    split       : true,
                    cat         : cat,
                    searchFields: me.getSearchFieldArray(cfgitem.searchFields),
                    groupField  : cfgitem.groupField,
                    pageSize    : cfgitem.pageSize
                },
                rightConfig   : {
                    xtype              : cfgitem.rightXType,
                    itemId             : 'docright',
                    region             : 'center',
                    cat                : cat,
                    contextMenu        : cfgitem.contextMenu,
                    citationContextMenu: cfgitem.citationContextMenu
                }
            };
        } else {
            // should not occur in production
            Ext.Error.raise('DoublePaneFactory.js: No category defined for key "' + key + '".');
        }
        return result;
    },

    getSearchFieldArray: function (searchFields) {
        if (typeof searchFields === 'string') {
            return [searchFields];
        }
        return searchFields;
    },

    /**
     * Creates a list dialog component.
     * @param {String} key The key of the left component.
     * @param {Object} options The option of the right component.
     * @param {String} rightXType The xtype of the right component. (optional)
     * @return {Zen.view.tab.AbstractTab} The component.
     */
    createDetailTab: function (key, options, rightXType) {
        return Ext.create('Zen.view.tab.AbstractTab', this.getDetailTabConfig(key, options, rightXType));
    },

    /**
     * Gets the config of a document detail tab.
     * @private
     * @param {String} key The key of the left pane.
     * @param {Object} options The options passed to the right pane.
     * @param {String} rightXType the x type of the right component
     * @return {Object} The config object.
     */
    getDetailTabConfig: function (key, options, rightXType) {
        var me = this, cfgitem = {}, cat = me.getCatFromKey(key), result;

        if (cat) {
            Ext.apply(cfgitem, me.cfg[cat], me.defaultCfg);
            result = {
                iconCls    : cfgitem.iconCls,
                type       : cat,
                leftConfig : {
                    xtype              : 'detailpane',
                    itemId             : 'docleft',
                    region             : 'west',
                    width              : '50%',
                    split              : true,
                    cat                : cat,
                    master             : true,
                    key                : key,
                    contextMenu        : cfgitem.contextMenu,
                    citationContextMenu: cfgitem.citationContextMenu
                },
                rightConfig: {
                    xtype              : ( typeof rightXType === 'string') ? rightXType : cfgitem.rightXTypeDetail,
                    itemId             : 'docright',
                    region             : 'center',
                    cat                : cat,
                    key                : key,
                    options            : options,
                    contextMenu        : cfgitem.contextMenu,
                    citationContextMenu: cfgitem.citationContextMenu
                }
            };
        } else {
            // should not occur in production
            Ext.Error.raise('DoublePaneFactory.js: No category defined for key "' + key + '".');
        }
        return result;
    }
});
