/**
 * Global utility class, contains the application preferences and general utility functions.
 * @singleton
 */
Ext.define('Zen.Global', {
    singleton: true,

    constructor: function (config) {
        var me = this;
        me.initConfig(config);
        /**
         * @property {Object} prefs The application preferences loaded from the server.
         * @private
         */
        me.prefs = window.prefs;
    },

    /**
     * Gets an application preference.
     * @param {String} pref The name of the preference to get.
     * @return {Object} The preference.
     */
    getPref: function (pref) {
        return this.prefs[pref];
    },

    /**
     * Gets a UI preference.
     * @param {String} pref The name of the preference to get.
     * @return {Object} The preference.
     */
    getUIPref: function (pref) {
        return this.prefs.ui[pref];
    },

    /**
     * Gets a path from the preferences.
     * @param {String} name The name of the path.
     * @return {String} The requested path.
     */
    getPath: function (name) {
        var me = this;
        return me.prefs.ajaxPath + me.prefs.pathMap[name];
    },

    /**
     * Performs a JSON request.
     * @param {Object} options The request options.
     * @param {String} options.url The request url.
     * @param {Boolean} options.async Indicates if an asynchronous request should be performed. Defaults to `true`.
     * @param {String} options.url The callback function to call when the request was successful and contains the property `success` with the boolean value `true`.
     */
    jsonRequest: function (options) {
        Ext.Ajax.request({
            method : 'GET',
            async  : (options.async !== false),
            url    : options.url,
            success: function (responseObj) {
                var response = Ext.decode(responseObj.responseText);
                if (response.success) {
                    options.callback(response.msg);
                } else {
                    Ext.MessageBox.alert('Hinweis', response.msg);
                }
            },
            failure: function (responseObj) {
                Ext.MessageBox.alert('Fehler', 'Serverfehler mit Statuscode ' + responseObj.status);
            }
        });
    },

    /**
     * Gets a query path for a detail view corresponding to a specific key.
     * @param {String} key The key.
     * @return {String} The corresponding key.
     */
    getQueryPathFromKey: function (key) {
        var me = this, path, viewer;
        viewer = this.getUIPref('initialViewerMap')[key.substring(0, 1)];
        path = me.getPath('view') + viewer;
        if (!path) {
            Ext.MessageBox.alert('Systemfehler', 'Für den Schlüssel "' + key + '" ist kein Anfragepfad definiert.');
        }
        return path;
    },

    /**
     * Gets the config object of an action.
     * @param {String} action The name of the action.
     * @return {Object} A clone of the corresponding action config object.
     */
    getActionConfig: function (action) {
        var clone, actionCfg;
        actionCfg = this.prefs.actionConfig[action];
        if (actionCfg) {
            clone = Ext.apply({}, actionCfg);
            return clone;
        }
        Ext.Error.raise('Die angegebene ActionConfig ' + action + ' existiert nicht.');
    },

    /**
     * Generates a pseudo unique identifier.
     * @param {String} separator The separator used in the ID string.
     * @return {String} The generated ID.
     */
    generateUid: function (separator) {
        var delim, s4;

        delim = separator || '-';

        s4 = function () {
            return (Math.floor((1 + Math.random()) * 0x10000)).toString(16).substring(1);
        };

        return (delim + s4() + s4() + delim + s4() + delim + s4() + delim + s4() + delim + s4() + s4() + s4());
    },

    /**
     * Opens a browser popup window.
     * @param {String} url The url of the popup window.
     * @param {String} windowname The title of the popup window.
     * @return {Boolean} This function always returns the boolean value `false` in order to stop the event when called from a DOM element.
     */
    popup: function (url, windowname) {
        if (window.focus) {
            var href = ( typeof url === 'string') ? url : url.href;
            window.open(href, windowname, 'scrollbars=no');
        }
        return false;
    }
});
