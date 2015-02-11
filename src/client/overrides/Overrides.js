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


//Ext.apply(Ext.form.field.VTypes, {
//	DateRange : function(val, field) {
//		var start, end, date = field.parseDate(val);
//		if (!date) {
//			return false;
//		}
//		if (field.startDateField
//				&& (!field.dateRangeMax || (date.getTime() !== field.dateRangeMax
//						.getTime()))) {
//			start = field.up(field.ownerCt.xtype)
//					.down('datefield[vfield=beginDate]');
//			start.setMaxValue(date);
//			start.validate();
//			field.dateRangeMax = date;
//		} else if (field.endDateField
//				&& (!field.dateRangeMin || (date.getTime() !== field.dateRangeMin
//						.getTime()))) {
//			end = field.up(field.ownerCt.xtype)
//					.down('datefield[vfield=endDate]');
//			end.setMinValue(date);
//			end.validate();
//			field.dateRangeMin = date;
//		}
//		return true;
//	},
//	DateRangeText : ''
//});
//
//
//Ext.override(Ext.tip.ToolTip, {
//    helperElId: 'ext-quicktips-tip-helper',
//
//
//
//
//    initComponent: function() {
//        var me = this;
//        me.callParent(arguments);
//        me.lastActive = new Date();
//        me.setTarget(me.target);
//        me.origAnchor = me.anchor;
//
//        // new stuff
//        me.on('move', function ()
//        {
//            var offset = me.hasCls('x-tip-form-invalid') ? 35 : 12,
//                helperEl = Ext.fly(me.helperElId) || Ext.fly(
//                    Ext.DomHelper.createDom({
//                        tag: 'div',
//                        id: me.helperElId,
//                        style: {
//                            position: 'absolute',
//                            left: '-1000px',
//                            top: '-1000px',
//                            'font-size': '12px',
//                            'font-family': 'arial, verdana, sans-serif'
//                        }
//                    }, Ext.getBody())
//                );
//
//            if (me.html && (me.html !== helperEl.getHTML() || me.getWidth() !== (helperEl.dom.clientWidth + offset)))
//            {
//                helperEl.update(me.html);
//                me.setWidth(Ext.Number.constrain(helperEl.dom.clientWidth + offset, me.minWidth, me.maxWidth));
//            }
//        }, this);
//    }
//
//
//
////    initComponent: function ()
////    {
////        var me = this;
////
////        me.target = me.target || Ext.getDoc();
////        me.targets = me.targets || {};
////        me.callParent();
////
////        // new stuff
////        me.on('move', function ()
////        {
////            var offset = me.hasCls('x-tip-form-invalid') ? 35 : 12,
////                helperEl = Ext.fly(me.helperElId) || Ext.fly(
////                    Ext.DomHelper.createDom({
////                        tag: 'div',
////                        id: me.helperElId,
////                        style: {
////                            position: 'absolute',
////                            left: '-1000px',
////                            top: '-1000px',
////                            'font-size': '12px',
////                            'font-family': 'arial, verdana, sans-serif'
////                        }
////                    }, Ext.getBody())
////                );
////
////            if (me.html && (me.html !== helperEl.getHTML() || me.getWidth() !== (helperEl.dom.clientWidth + offset)))
////            {
////                helperEl.update(me.html);
////                me.setWidth(Ext.Number.constrain(helperEl.dom.clientWidth + offset, me.minWidth, me.maxWidth));
////            }
////        }, this);
////    }
//});
//
//
//
//Ext.override(Ext.tip.QuickTip, {
//    helperElId: 'ext-quicktips-tip-helper',
//    initComponent: function ()
//    {
//        var me = this;
//
//        me.target = me.target || Ext.getDoc();
//        me.targets = me.targets || {};
//        me.callParent();
//
//        // new stuff
//        me.on('move', function ()
//        {
//            var offset = me.hasCls('x-tip-form-invalid') ? 35 : 12,
//                helperEl = Ext.fly(me.helperElId) || Ext.fly(
//                    Ext.DomHelper.createDom({
//                        tag: 'div',
//                        id: me.helperElId,
//                        style: {
//                            position: 'absolute',
//                            left: '-1000px',
//                            top: '-1000px',
//                            'font-size': '12px',
//                            'font-family': 'arial, verdana, sans-serif'
//                        }
//                    }, Ext.getBody())
//                );
//
//            if (me.html && (me.html !== helperEl.getHTML() || me.getWidth() !== (helperEl.dom.clientWidth + offset)))
//            {
//                helperEl.update(me.html);
//                me.setWidth(Ext.Number.constrain(helperEl.dom.clientWidth + offset, me.minWidth, me.maxWidth));
//            }
//        }, this);
//    }
//});