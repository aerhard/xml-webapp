Ext.define("Zen.view.component.SearchFieldPane", {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.searchfieldpane',
    requires: ['Ext.form.field.Checkbox'],

    store: null,

    baseCls: 'search-field-pane',

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.items = me.getItemsConfig();
        me.callParent(arguments);
        
        if (me.initialComboKey) {
      me.down('searchfieldcombo').select(me.initialComboKey);
    }
    if (me.initialValue) {
      var textField = me.down('#valueField');
      textField.setValue(me.initialValue);
    }
    },

    getItemsConfig: function () {
        return [
            {
                xtype : 'container',
                layout: 'hbox',
                items : this.getFieldConfig()
            }
        ];
    },

    valueFieldConfigs: {
        textfield: {
            xtype : 'textfield',
            itemId: 'valueField',
            name  : 'val',
            flex  : 1
        },
        checkbox : {
            xtype      : 'checkboxfield',
            name       : 'val',
            itemId     : 'valueField',
            inputValue : false,
            fieldSubTpl: ['<div class="{wrapInnerCls} {noBoxLabelCls}" role="presentation">',
                '<input type="checkbox" id="{id}" role="{role}" {inputAttrTpl}',
                '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>', '<tpl if="disabled"> disabled="disabled"</tpl>',
                '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
                ' class="{fieldCls} {typeCls} {inputCls} {childElCls} {afterLabelCls}" autocomplete="off" hidefocus="true" />',
                '<tpl>', '{beforeBoxLabelTpl}',
                '<label id="{cmpId}-boxLabelEl" {boxLabelAttrTpl} class="{boxLabelCls} {boxLabelCls}-{boxLabelAlign}" for="{id}">',
                '{beforeBoxLabelTextTpl}', '{boxLabel}', '{afterBoxLabelTextTpl}', '</label>', '{afterBoxLabelTpl}',
                '</tpl>', '</div>', {
                    disableFormats: true,
                    compiled      : true
                }]
        }
    },

    setRightComponent: function (xtype) {
        var me = this, valueField, cfg;
        Ext.suspendLayouts();
        window.m = me;
        valueField = me.down('#valueField');
        if (valueField) {
            me.down('container').remove(valueField, true);
        }
        me.down('container').add(me.valueFieldConfigs[xtype]);
        Ext.resumeLayouts(true);
    },

    getFieldConfig: function () {
        var me = this;
        return [
            {
                xtype  : 'button',
                action : 'removesearchfield',
                ui     : 'default',
                text   : '-',
                tooltip: 'Suchfeld entfernen'
            },
            {
                xtype: 'searchfieldcombo',
                store: me.store,
                name : 'cat'
            },
            me.valueFieldConfigs.textfield
        ];
    }
});
