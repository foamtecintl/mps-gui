var role = localStorage.getItem('role');

function renderTemplate(content, menuTree) {

  var t0 = performance.now();

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

  var expandedMPS = false;
  var expandedAdmin = false;

  if(menuTree == 'MPS') {
    expandedMPS = true;
    expandedAdmin = false;
  }
  if(menuTree == 'ADMIN') {
    expandedMPS = false;
    expandedAdmin = true;
  }
  

  var mpsMenu = {
    text:'MPS',
    expanded: expandedMPS,
    iconCls: 'blist',
    children:[{
      text:'Dashborad Group',
      id:'dashborad-group',
      leaf:true,
      iconCls: 'bmenu'
    },{
      text:'Dashborad Part',
      id:'dashborad-part',
      leaf:true,
      iconCls: 'bmenu'
    },{
      text:'Create Forecast',
      id:'select-forecast',
      leaf:true,
      iconCls: 'bmenu'
    },{
      text:'Create Group/Part',
      id:'create-group',
      leaf:true,
      iconCls: 'bmenu'
    }]
  };

  var adminMenu = {
    text:'Admin',
    expanded: expandedAdmin,
    iconCls: 'blist',
    children:[{
      text:'Create User',
      id:'create-user',
      leaf:true,
      iconCls: 'bmenu'
    },{
      text:'User List',
      id:'userList',
      leaf:true,
      iconCls: 'bmenu'
    }]
  };

  var menuBar = [];

  if(role == 'Admin') {
    menuBar = [mpsMenu,adminMenu];
  } else {
    menuBar = [mpsMenu];
  }

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
    loader: new Ext.tree.TreeLoader(),
    root: new Ext.tree.AsyncTreeNode({
      expanded: true,
      children: menuBar
    })
  });

  treePanel.on('click', function(n){
    var sn = this.selModel.selNode || {};
    if(n.leaf && n.id != sn.id) {
      if(n.id == 'create-group') {
        window.location.href = './mps-create-group.html?search=';
      } 
      if(n.id == 'select-forecast') {
        window.location.href = './mps-select-forecast.html?search=';
      }
      if(n.id == 'dashborad-group') {
        window.location.href = './mps-dashborad-group.html?search=';
      }
      if(n.id == 'dashborad-part') {
        window.location.href = './mps-dashborad-part.html?searchPart=';
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

  var t1 = performance.now();
  
  return (t1 - t0);
}