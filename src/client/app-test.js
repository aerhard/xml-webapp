Ext.require('Ext.app.Application');

Ext.application({
  name : 'Zen',
  appFolder : 'app',
  appProperty : 'app',

  requires : ['Ext.container.Viewport', 'Ext.data.reader.Xml', 'Ext.data.ArrayStore', 'Ext.selection.RowModel', 'Zen.Global', 'Ext.ux.container.SwitchButtonSegment'],

  controllers : ['Main', 'tab.TabPanel', 'io.IO', 'io.Oxygen', 'component.Versions', 'component.Clipboard', 'component.Collation', 'component.DetailPane', 'component.Image', 'component.SearchGrid', 'dialog.Dialogs', 'tab.AbstractTab', 'tab.Browser', 'tab.TabPanel'],

  models : ['component.DetailPane', 'component.SearchGrid', 'component.TreeNode', 'tab.Browser'],

  stores : ['component.AutoComplete', 'component.DetailPane', 'component.SearchFieldPaneCombo', 'component.SearchGrid', 'component.Tree', 'tab.Browser'],

  views : ['Viewport', 'component.bin.DetailPane', 'component.AutoCompleteCombo', 'component.bin.SearchGrid', 'component.locked.SearchGrid', 'component.latestchanges.SearchGrid', 'component.latestchanges.DetailPane', 'component.pdf.SearchGrid', 'component.clipboard.Clipboard', 'component.clipboard.FileContextMenu', 'component.clipboard.FolderContextMenu', 'component.compilation.CitContextMenu', 'component.compilation.DetailPaneContextMenu', 'component.compilation.Flipbox', 'component.compilation.Overview', 'component.compilation.TreeContextMenu', 'component.DetailPaneContextMenu', 'component.SearchGridContextMenu', 'component.DetailPane', 'component.SearchFieldPane', 'component.SearchGrid', 'component.compilation.Tree', 'component.Image', 'component.versions.Versions', 'component.versions.DetailPane', 'dialog.Permissions', 'dialog.Prefs', 'dialog.ExtendedSearch', 'dialog.ListWindow', 'tab.Browser', 'tab.LinkContextMenu', 'tab.LinkTooltip', 'tab.TabPanel', 'window.Menu', 'window.SearchField'],

  oxyLoadQueue : null,

  autoCreateViewport : false,

  launch : function() {
    var jasmineEnv, htmlReporter, currentWindowOnload;

    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

      jasmineEnv.execute();

  }
});
