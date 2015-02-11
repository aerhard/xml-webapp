/**
 * A sliding message box used to show short info messages at the top of the viewport.
 */
Ext.define('Zen.view.window.MessageBox', {
    alias: 'widget.msgbox',
    msgCt: null,

    constructor: function () {
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {
            id: 'msg-div'
        }, true);
    },

    /**
     * Helper function for the {#shortMessage} method. Builds the short message
     * box HTML string.
     *
     * @private
     * @param {String} title The message title
     * @param {String} text The message body text
     * @return {String} the html string to insert
     */
    createBox: function (title, text) {
        return '<div class="msg"><h3>' + title + '</h3><p>' + text + '</p></div>';
    },

    /**
     * Shows a short message box.
     *
     * @param {String} title The title of the message.
     * @param {String} body The body of the message.
     */
    shortMessage: function (title, text) {
        var me = this, m;
        if (!me.msgCt) {
            me.msgCt = Ext.DomHelper.insertFirst(document.body, {
                id: 'msg-div'
            }, true);
        }
        m = Ext.DomHelper.append(me.msgCt, me.createBox(title, text), true);
        m.hide();
        m.slideIn('t').ghost("t", {
            delay : 1000,
            remove: true
        });
    }
});
