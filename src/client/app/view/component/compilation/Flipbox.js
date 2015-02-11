/**
 * The left component in the `compilations` double pane, containing a {@link Zen.view.component.compilation.Overview} and a {@link Zen.view.component.compilation.Tree} component arranged in a flip box.
 */
Ext.define('Zen.view.component.compilation.Flipbox', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.compilation-flipbox',
    require: ['Ext.layout.container.Accordion'],

    title        : 'Zusammenstellung',
    frame        : true,
    preventHeader: true,

    layout: {
        type         : 'accordion',
        titleCollapse: true,
        animate      : true,
        activeOnTop  : true
    },

    defaults: {
        scroll       : true,
        autoScroll   : true,
        collapseFirst: true
    },

    items: [
        {
            itemId: 'overview',
            xtype : 'compilation-overview'
        },
        {
            title : 'Elektra',
            itemId: 'tree',
            xtype : 'compilationtree'
        }
    ]

});
