Ext.override(Ext.data.AbstractStore, {
            indexOf : Ext.emptyFn
        });

delete Ext.tip.Tip.prototype.minWidth;

if(Ext.isIE) {
    Ext.override(Ext.tip.Tip, {
        componentLayout: {
            type: 'fieldset',
            getDockedItems: function() {
                return [];
            }
        }
    });
}

Ext.QuickTips.init();
