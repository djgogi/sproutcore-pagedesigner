// ==========================================================================
// Project:   Redbull - mainPage
// Copyright: ©2009 Mike Ball
// ==========================================================================
/*globals Redbull */
require('embed');
require('views/bespin');

// This page describes the main user interface for your application.  
Redbull.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'fileList bespin toolBar'.w(),
    
    toolBar: SC.ToolbarView.design(SC.Border, {
      anchorLocation: SC.ANCHOR_TOP,
      borderStyle: SC.BORDER_BOTTOM,

      childViews: 'save'.w(),
      
      save: SC.ButtonView.design({
        title: 'Save',
        layout: {right: 20, top: 4, width: 100, height: 24},
        target: Redbull.fileController,
        action: 'save',
        isEnabledBinding: 'Redbull.fileController.isDirty'
      })
      
    }),
    
    
    fileList: SC.ScrollView.design({
      layout: { top: 32, bottom: 0, left: 0, width: 238 },
      hasHorizontalScroller: NO,
      contentView: SC.ListView.design({
        contentValueKey: 'name',
        contentBinding: 'Redbull.filesController.arrangedObjects',
        selectionBinding: 'Redbull.filesController.selection'
     })
    }),
    
    bespin: Redbull.BespinView.design({
      layout: { left: 238, right: 0, top: 32, bottom: 0 },
      contentBinding: 'Redbull.fileController.content'
    })
  })

});
