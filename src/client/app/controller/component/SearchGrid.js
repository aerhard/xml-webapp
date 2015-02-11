/**
 * The search grid controller.
 */
Ext.define('Zen.controller.component.SearchGrid', {
    extend: 'Ext.app.Controller',

    init: function () {

        this.control({
            'abstractgrid'                               : {
                storeupdate   : this.onStoreUpdate,
                searchbtnclick: this.onSearchButtonClick
            },
            'searchgrid'                                 : {
                addsearchfield : this.addSearchfield,
                itemcontextmenu: this.openSearchGridContextMenu
            },
            'searchgrid textfield'                       : {
                specialkey: this.onKeypress
            },
            'searchgrid button[action=removesearchfield]': {
                click: this.removeSearchfield
            },
            'searchgridcontextmenu menuitem'             : {
                click: this.onContextButton
            },
            'searchfieldcombo'                           : {
                select: this.changeSearchValueXType
            }
        });
    },

    changeSearchValueXType: function (combo, records) {
        var xtype = records[0].get('xtype');
        combo.up('searchfieldpane').setRightComponent(xtype);
    },

    onKeypress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            if (field.isXType('combo') && field.isExpanded) {
                return;
            }
            this.performSearch(field.up('grid'), field);
            field.selectText(0, field.length);
        }
    },

    onSearchButtonClick: function (btn) {
        this.performSearch(btn.up('grid'), btn);
    },

    performSearch: function (grid) {
        var store = grid.store;
        store.getProxy().extraParams = this.assembleSearchParameters(grid);
        store.load();
    },

    assembleSearchParameters: function (grid) {
        var parameters = {}, itemName, i, docked, formData, extendedSearch = [], topToolbar, searchScope, checked, checkItems;
        topToolbar = grid.getDockedComponent('toptoolbar');
        topToolbar.items.each(function (item) {
            itemName = item.name;
            if (typeof itemName === 'string') {
                parameters[itemName] = item.getValue();
            }
        });
        searchScope = topToolbar.down('#searchScope');
        if (searchScope) {
            checked = [];
            checkItems = searchScope.query('menucheckitem');
            i = checkItems.length;
            while (i--) {
                if (checkItems[i].checked && checkItems[i].type) {
                    checked.push([checkItems[i].type]);
                }
            }
            parameters.searchScope = checked.toString();
        }
        docked = grid.getDockedItems();
        for (i = 0; i < docked.length; i += 1) {
            if (docked[i].additional) {
                formData = docked[i].getForm().getFieldValues();
                if (formData.cat !== null && formData.val !== '') {
                    extendedSearch.push(formData);
                }
            }
        }
        parameters.ext = JSON.stringify(extendedSearch);
        return parameters;
    },

    onStoreUpdate: function (store, grid, scrollToTop) {
        var text, records, resultsLabel;
        records = store.getTotalCount();
        if (records === 0) {
            records = store.getCount();
        }
        records -= store.getRemovedRecords().length;
        text =
        (records === 0) ? 'Keine Suchergebnisse' : (records === 1) ? '1 Suchergebnis' : records + ' Suchergebnisse';

        resultsLabel = grid.down('label[name=resultmessage]');
        if (resultsLabel) {
            resultsLabel.setText(text);
        }
        if (scrollToTop) {
            grid.getView().getEl().scrollTo('top', 0);
        }
    },

    addSearchfield: function (cmp, comboItemKey, value) {
        var pane, cat, store;
        cat = cmp.cat || '';
        store = Ext.create('Zen.store.component.SearchFieldCombo');
        store.getProxy().url = Zen.Global.getPath('searchfields') + cat;
        store.load();
        pane = Ext.create('Zen.view.component.SearchFieldPane', {
            additional: true,
            initialComboKey : comboItemKey,
      initialValue : value,
            store     : store
        });
        cmp.addDocked(pane);
    },

    removeSearchfield: function (cmp) {
        cmp.up('grid').removeDocked(cmp.up('form'), true);
    },

    clearSearchText: function (grid) {
        var store, itemName;
        store = grid.store;
        store.getProxy().extraParams = {};
        grid.getDockedComponent('toptoolbar').items.each(function (item) {
            itemName = item.name;
            if (itemName) {
                item.setRawValue('');
            }
        });
    },

    openSearchGridContextMenu: function (view, unused, unusedTwo, unusedThree, e) {
        var m = view.up('grid').menu;
        if (m) {
            m.key = null;
            m.rowSelection = view.getSelectionModel().getSelection();
            m.showAt(e.getXY());
        }
    },

    // currently only the last row is processed
    onContextButton          : function (cmp) {
        var records = cmp.up('menu').rowSelection;
        if (records) {
            Zen.app.fireEvent(cmp.action, records[records.length - 1].get('key'));
        }
    }
});
