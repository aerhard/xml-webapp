/**
 * The model of a node in a tree.
 */
Ext.define('Zen.model.component.TreeNode', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'text',
            type: 'string'
        },
        {
            name        : 'leaf',
            type        : 'boolean',
            defaultValue: false
        },
        {
            name        : 'cls',
            type        : 'string',
            defaultValue: 'treenode-no-icon'
        },
        {
            name        : 'expanded',
            type        : 'boolean',
            defaultValue: false,
            persist     : false
        },
        {
            name: 'index',
            type: 'int'
        }
    ]
}); 