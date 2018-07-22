function renderTemplate(content) {
  var headerBar = new Ext.Panel({
    tbar: ['->',{
      text: localStorage.getItem('username'),
      iconCls: 'user',
      id: 'menuLoginLogout',
      menu: [{
        text: 'Logout',
        id: 'btnLogout',
        handler: function(){
          localStorage.clear();
          window.location.href = '../login.html';
        }
      }]
    }]
  })

  var contentPanel = {
    id: 'content-panel',
    region: 'center',
    layout: 'card',
    margins: '2 5 5 0',
    activeItem: 0,
    border: false,
    items: [content]
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
      dataUrl:'../js/tree-data.json'
    }),
    root: new Ext.tree.AsyncTreeNode()
  });

  treePanel.on('click', function(n){
    var sn = this.selModel.selNode || {};
    if(n.leaf && n.id != sn.id) {
      if(n.id == 'create-group') {
        window.location.href = './create-group.html?search=';
      }
    }
  });

  new Ext.Viewport({
    layout: 'border',
    renderTo: 'body',
    items: [{
      region: 'north',
      applyTo: 'header',
      height: 30,
      items: [headerBar]
    },{
      layout: 'border',
      id: 'layout-browser',
      region:'west',
      border: false,
      split:true,
      margins: '2 0 5 5',
      width: 180,
      minSize: 180,
      maxSize: 180,
      items: [treePanel]
    },
      contentPanel
    ]
  });
}