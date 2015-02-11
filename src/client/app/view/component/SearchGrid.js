/**
 * A grid component showing the results of a search and containing a search form.
 */
Ext.define('Zen.view.component.SearchGrid', {
    extend: 'Zen.view.component.AbstractGrid',
    alias : 'widget.searchgrid',

    requires: ['Ext.grid.feature.Grouping', 'Ext.grid.plugin.BufferedRenderer'],

    features  : [],
    groupField: null,

    actionConfig: [
        {
            c      : 'transcr',
            tooltip: 'Übertragung',
            icon   : 'zencon-file-text-o',
            event  : 'opendetailtab'
        },
        {
            c      : 'facsimile',
            tooltip: 'Bild',
            icon   : 'zencon-file-photo-o',
            event  : 'opendetailtab'
        },
        {
            c      : 'edition',
            tooltip: 'PDF',
            icon   : 'zencon-file-pdf',
            event  : 'showfirstpdf'
        }
    ],

    initComponent: function () {
        var me = this;

        me.eventTypeMenuConfig = Zen.Global.getUIPref('eventTypeMenuConfig');
        me.eventTypesByName = me.createEventTypesByName(me.eventTypeMenuConfig);

        me.menu = me.createMenu();
        me.plugins = me.getPluginConfig();
        if (me.groupField) {
            me.features = me.getFeatures();
        }
        me.callParent(arguments);

    },

    createEventTypesByName: function (eventTypeMenuConfig) {
        var i, cfg, eventTypesByName;
        i = eventTypeMenuConfig.length;
        eventTypesByName = {};
        while (i--) {
            cfg = eventTypeMenuConfig[i];
            if (cfg.type) {
                eventTypesByName[cfg.type] = {
                    text   : cfg.text,
                    colIcon: cfg.colIcon
                };
            }
        }
        return eventTypesByName;
    },

    getFeatures: function () {
        return [Ext.create('Ext.grid.feature.Grouping', {
            collapsible   : false,
            groupHeaderTpl: ['{name:this.formatName}', {
                formatName: function (name) {
                    return (name) ? name.substring(10) : '';
                }
            }]
        })];
    },

    getPluginConfig: function () {
        return [
            {
                ptype             : 'bufferedrenderer',
                pluginId          : 'bufferedrenderer',
                variableRowHeight : true,
                numFromEdge       : 8,
                trailingBufferZone: 30,
                leadingBufferZone : 40,
                synchronousRender : true,
                scrollToLoadBuffer: 200
            }
        ];
    },

    getViewConfig: function () {
        return {
            plugins   : {
                ptype     : 'gridviewdragdrop',
                dragText  : 'Zur Zwischenablage verschieben',
                enableDrop: false,
                ddGroup   : 'selDD'
            },
            copy      : true,
            stripeRows: false,
            trackOver : false
        };
    },

    getStoreConfig: function () {
        var me = this;
        return Ext.create('Zen.store.component.SearchGrid', {
            groupField: me.groupField,
            pageSize  : +me.pageSize,
            listeners : {
                'metachange': function (store, meta) {
                    me.reconfigure(store, me.getColumnConfig(meta.fields));
                }
            }
        });
    },

    colType: function (unused1, unused2, scope) {
        return {
            menuDisabled: true,
            header      : 'Typ',
            dataIndex   : 'type',
            width       : 36,
            renderer    : function (value) {
                var data, text, colIcon;
                if (!value) {
                    return '&nbsp;';
                }
                data = scope.eventTypesByName[value];
                colIcon = data.colIcon;
                if (colIcon) {
                    text = data.text || '';
                    return '<span class="' + colIcon + '" data-qtip="' + text + '"/>';
                    //          return '<img data-qtip="' + text + '" src="resources/img/' + colIcon + '" height="15"/>';
                }
                return '&nbsp;';
            }
        };
    },

    getColumnConfig: function (fields) {
        var me = this, fieldNames = [], result = [], actions = [], i, j, columnConfig;
        columnConfig = [
            ['place', 'Ort', me.colSmall],
            ['type', 'Typ', me.colType],
            ['name_o', 'Name', me.colDefault],
            ['creator_o', 'Verfasser', me.colDefault],
            ['addressee_o', 'Empfänger', me.colDefault],
            ['prof', 'Beruf / Strauss-Bezug', me.colDefault],
            ['desc_o', 'Beschreibung', me.colDefault],
            ['title', 'Titel', me.colDefault],
            ['rel_o', 'Thema', me.colSmall]
        ];

        for (i = 0, j = fields.length; i < j; i += 1) {
            fieldNames.push(fields[i].name);
        }

        if (!this.groupField && Ext.Array.contains(fieldNames, 'date_o')) {
            result.push(this.colDate('date_o'));
        }

        for (i = 0; i < columnConfig.length; i += 1) {
            if (Ext.Array.contains(fieldNames, columnConfig[i][0])) {
                result.push(columnConfig[i][2](columnConfig[i][0], columnConfig[i][1], me));
            }
        }

        actions = me.createActionColumns(fieldNames);
        if (actions.length > 0) {
            result.push({
                xtype       : 'glyphiconactioncolumn',
                header      : 'Verfügbar',
                menuDisabled: true,
                hideable    : false,
                width       : 80,
                items       : actions
            });
        }

        return result;
    },

    createActionColumns: function (fieldNames) {
        var me = this, actions = [], cfg, i;
        cfg = this.actionConfig;
        for (i = 0; i < cfg.length; i += 1) {
            if (Ext.Array.contains(fieldNames, cfg[i].c)) {
                actions.push(me.actionColumnTemplate(cfg[i]));
            }
        }
        return actions;
    },

    actionColumnTemplate: function (config) {
        return {
            xtype   : 'button',
            action  : config.action,
            tooltip : config.tooltip,
            getClass: function (unused_v, unused_meta, record) {
                if (record.get(config.c) === "1") {
                    return config.icon;
                }
                return 'x-hide-display';
            },
            handler : function (grid, rowIndex) {
                var key = grid.getStore().getAt(rowIndex).get('key');
                Zen.app.fireEvent(config.event, key);
            }
        };
    },

    createMenu: function () {
        var me = this;
        return Ext.widget('searchgridcontextmenu', {
            getRefOwner: function () {
                return me;
            }
        });
    },

    focusFirstField: function () {
        var firstField;
        firstField = this.getDockedComponent('toptoolbar').down('textfield');
        if (firstField) {
            firstField.focus(true, 50);
        }
    },

    createMainSearchBar: function () {
        var me = this, i, searchBarItems, emptyText, scopeArray;

        searchBarItems = [
            {
                xtype  : 'button',
                text   : '+',
                tooltip: 'Weitere Suchfelder für eine spezifischere Suche hinzufügen',
                handler: function () {
                    me.fireEvent('addsearchfield', me);
                }
            }
        ];

        for (i = 0; i < this.searchFields.length; i += 1) {
            emptyText = (this.searchFields[i] === 'fulltext') ? 'Suchbegriffe' : 'Datum / Zeitraum';
            searchBarItems.push({
                xtype        : 'textfield',
                layout       : 'hbox',
                name         : this.searchFields[i],
                emptyText    : emptyText,
                selectOnFocus: true,
                flex         : 1,
                minWidth     : 140
            });
        }

        if (me.cat === 'event') {
            scopeArray = [
                {
                    text       : 'Alle auswählen',
                    xtype      : 'menuitem',
                    hideOnClick: false,
                    handler    : me.toggleScopeItems,
                    scope      : me
                },
                {
                    xtype: 'menuseparator'
                }
            ].concat(me.eventTypeMenuConfig);

            searchBarItems.push({
                text  : 'Spektrum',
                itemId: 'searchScope',
                menu  : {
                    defaults: {
                        xtype  : 'menucheckitem',
                        checked: 'true'
                    },
                    items   : scopeArray
                }
            });
        }

        // NB all toolbar button events are fired via the grid component, as
        // in ExtJS 4.2.1 the controller can't listen to their events directly
        // when the buttons are only visible in the collapse menu.
        searchBarItems.push({
            xtype  : 'button',
            glyph : '58885@iconfont',
//            text   : '<span class="zencon-search"/>',
            tooltip: 'Suchen',
            handler: function () {
                me.fireEvent('searchbtnclick', this);
            }
        });

        return searchBarItems;
    },

    toggleScopeItems: function (toggleItem) {
        var check, checkItems, i;
        check = false;
        checkItems = toggleItem.up('menu').query('menucheckitem');
        i = checkItems.length;
        while (i--) {
            if (!checkItems[i].checked) {
                check = true;
                break;
            }
            ;
        }
        i = checkItems.length;
        while (i--) {
            checkItems[i].setChecked(check);
        }
    },

    afterRender: function () {
        this.callParent(arguments);
        this.focusFirstField();
    }
});
