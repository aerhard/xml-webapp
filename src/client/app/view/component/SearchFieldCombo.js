/**
 * A combo box for selection the search category in a search field pane.
 */
Ext.define('Zen.view.component.SearchFieldCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.searchfieldcombo',

    baseCls: 'search-field-combo',

    editable      : false,
    queryMode     : 'local',
    forceSelection: true,

    displayField: 'name',
    valueField  : 'key',
    value       : 'key'

});
