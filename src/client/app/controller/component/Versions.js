/**
 * The versions pane controller.
 */
Ext.define('Zen.controller.component.Versions', {
    extend: 'Ext.app.Controller',

    init: function () {
        this.control({
            'versions grid': {
                rowselected: this.updateDetailsView
            }
        });
    },

    updateDetailsView: function (grid, records) {
        var data;
        if (records.length > 0) {
            data = records[records.length - 1].data;
            grid.ownerCt.down('detailpane').loadModel(data.key, data.d1);
        }
    }
}); 