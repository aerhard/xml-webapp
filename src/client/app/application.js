/**
 * Main application class
 */
Ext.define('Zen.Application', {
    extend     : 'Ext.app.Application',
    name       : 'Zen',
    appFolder  : 'app',
    appProperty: 'app',

    requires: ['Ext.container.Viewport', 'Ext.util.History', 'Zen.view.tab.AbstractTab', 'Ext.data.reader.Xml',
        'Ext.data.ArrayStore', 'Ext.selection.RowModel', 'Zen.Global'],

    controllers: ['Main', 'tab.MainTabPanel', 'io.IO', 'component.Versions', 'component.Compilation',
        'component.DetailPane', 'component.Image', 'component.SearchGrid', 'dialog.Dialogs', 'tab.AbstractTab',
        'tab.MainTabPanel'],

    models: ['component.DetailPane', 'component.TreeNode'],

    stores: ['component.AutoComplete', 'component.DetailPane', 'component.SearchFieldCombo', 'component.SearchGrid',
        'component.Tree'],

    views: ['Viewport', 'component.GlyphIconActionColumn', 'component.SearchFieldCombo', 'component.bin.DetailPane',
        'component.locked.DetailPane', 'component.AutoCompleteCombo', 'component.bin.SearchGrid',
        'component.locked.SearchGrid', 'component.pdf.SearchGrid', 'component.compilation.CitContextMenu',
        'component.compilation.DetailPaneContextMenu', 'component.compilation.Flipbox',
        'component.compilation.Overview', 'component.compilation.TreeContextMenu', 'component.DetailPaneContextMenu',
        'component.SearchGridContextMenu', 'component.DetailPane', 'component.SearchFieldPane', 'component.SearchGrid',
        'component.compilation.Tree', 'component.Image', 'component.versions.Versions', 'component.versions.DetailPane',
        'component.PermissionsMenu', 'dialog.AbstractListDialog', 'tab.PlusTab', 'tab.LinkContextMenu',
        'tab.LinkTooltip', 'tab.MainTabPanel', 'window.MainMenu', 'window.MessageBox'],

    /**
     * The event listener of the Firefox extension ZenLauncher is preconfigured to read the file paths to send to oXygen from this property.
     */
    oxyLoadQueue: null,

    autoCreateViewport: true,

    /**
     * Calls {@link #checkBrowserCompatibility}, {@link #processGetParameters} and {@link #menuFix}
     */
    launch: function () {
        var me = this;
        me.checkBrowserCompatibility();
        me.initHistory();
        me.processGetParameters();
        me.menuFix();
    },

    /**
     * Opens an alert message box if the current browser is IE9 or less. Performs IE fixes.
     */
    checkBrowserCompatibility: function () {
        if (Ext.isIE9m) {
            Ext.MessageBox.alert('Hinweis', 'Als aktueller Browser wurde eine ältere Version des Internet Explorer festgestellt, welche einige Bestandteile der Web-Anwendung nicht korrekt darstellt. ' +
                                            'Zur Nutzung der vorliegenden Web-Anwendung empfehlen wir eine aktuelle Version des Internet Explorer oder einen anderen modernen Browser wie Firefox oder Chrome.');
        }
        if (Ext.isIE || this.isIE11()) {
            Ext.supports.Direct2DBug = true;
        }
    },

    /**
     * Checks if the current browser is the Internet Explorer 11 (ExtJS 4.2.1 doesn't check for IE11)
     * @return {Boolean} true if the current browser is the IE11, otherwise false
     */
    isIE11: function () {
        return !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
    },

    /**
     *  Initializes the ExtJS history component.
     */
    initHistory: function () {
        Ext.History.init();
    },

    /**
     * Opens and closes the first menu component found (prevents display errors when a user click on a menu the first time).
     */
    menuFix: function () {
        var menu = Ext.ComponentQuery.query('menu')[0];
        menu.setVisible(true);
        menu.setVisible(false);
    },

    /**
     * Adds a search or detail tab if the corresponding GET parameters have been provided.
     *
     * - cat=[category] opens a search tab
     * - q=[query] searches for the provided string in the category
     * - id=[identifier] opens a detail tab of the specified database record
     */
    processGetParameters: function () {
        var params = Ext.urlDecode(location.search.substring(1));
        if (params.hasOwnProperty('cat')) {
            Zen.app.fireEvent('opensearchtab', params.cat, params.q || '');
        } else if (params.hasOwnProperty('id')) {
            Zen.app.fireEvent('opendetailtab', params.id);
        }
    }

});
