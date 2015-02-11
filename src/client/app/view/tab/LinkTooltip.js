/**
 * A class showing tooltips on `a.link` and `.hastip` elements. If the element has a `data-tiptext` property, the tooltip content will be read from there; otherwise, an ajax request based on the `data-key` property is performed.
 */
Ext.define('Zen.view.tab.LinkTooltip', {
    extend: 'Ext.tip.ToolTip',
    alias : 'widget.linktooltip',

    delegate: ':any(a.link|.hastip)',

    autoShow  : false,
    autoHide  : false,
    trackMouse: true,
    showDelay : 50,
    /*			showDelay: 1000,*/

    listeners: {
        show      : function (tip) {
            tip.getEl().on('mouseout', function () {
                tip.hide();
            });

            tip.target.on('mouseout', function () {
                tip.hide();
            });
        },
        beforeshow: function (tip) {
            var el = tip.triggerElement;
            if (el.hasAttribute('data-tiptext')) {
                tip.update(el.getAttribute('data-tiptext'));
            } else {
                Ext.Ajax.request({
                    method : 'GET',
                    async  : false,
                    url    : Zen.Global.getPath('tooltip') + Ext.fly(el).getAttribute('data-key'),
                    success: function (response) {
                        if (response.responseText) {
                            tip.update(response.responseText);
                        }
                    }
                });
            }
        }
    }
});
