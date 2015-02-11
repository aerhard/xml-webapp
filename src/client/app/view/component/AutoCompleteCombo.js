/**
 * A combo box with autocomplete functionality.
 */
Ext.define('Zen.view.component.AutoCompleteCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.autocompletecombo',

    anchor: '100%',

    displayField : 'str',
    valueField   : 'str',
    queryMode    : 'remote',
    minChars     : 1,
    caseSensitive: false,
    editable     : true,
    hideTrigger  : true,
    listConfig   : {
        loadingText: null,
        loadMask   : false
    },

    typeAhead     : true,
    forceSelection: false,
    triggerAction : 'all',
    selectOnFocus : false,
    autoSelect    : false,
    initComponent : function () {
        var me = this;
        me.store = Ext.create('Zen.store.component.AutoComplete');
        me.store.getProxy().url = Zen.Global.getPath('autocomplete')
        me.callParent(arguments);
    }
}); 