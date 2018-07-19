var contentPanel = {
  id: 'content-panel',
  region: 'center',
  layout: 'card',
  margins: '2 5 5 0',
  activeItem: 0,
  border: false,
  items: [home_panel, dashborad_panel, create_group_part_panel]
};

var treePanel = new Ext.tree.TreePanel({
  id: 'tree-panel',
  title: 'Menu',
  region: 'center',
  split: true,
  height: 300,
  minSize: 150,
  autoScroll: true,
  rootVisible: false,
  lines: false,
  singleExpand: true,
  useArrows: true,
  loader: new Ext.tree.TreeLoader({
    dataUrl:'./js/tree-data.json'
  }),
  root: new Ext.tree.AsyncTreeNode()
});

treePanel.on('click', function(n){
  var sn = this.selModel.selNode || {};
  if(n.leaf && n.id != sn.id) {
    Ext.getCmp('content-panel').layout.setActiveItem(n.id + '-panel');
  }
  console.log(n.leaf);
});

new Ext.Viewport({
  layout: 'border',
  renderTo: 'body',
  items: [{
    xtype: 'box',
    region: 'north',
    applyTo: 'header',
    height: 0
  },{
    layout: 'border',
    id: 'layout-browser',
    region:'west',
    border: false,
    split:true,
    margins: '2 0 5 5',
    width: 225,
    minSize: 180,
    maxSize: 225,
    items: [treePanel]
  },
    contentPanel
  ]
});