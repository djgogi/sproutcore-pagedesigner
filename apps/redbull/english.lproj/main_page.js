// ==========================================================================
// Project:   Redbull - mainPage
// Copyright: ©2009 Mike Ball
// ==========================================================================
/*globals Redbull */

// This page describes the main user interface for your application.  
Redbull.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'fileList'.w(),
    
    fileList: SC.ScrollView.design({
      layout: { top: 0, bottom: 0, left: 0, width: 238 },
      hasHorizontalScroller: NO,
      contentView: SC.ListView.design({
        contentValueKey: 'name',
        contentBinding: 'Redbull.filesController.arrangedObjects',
        selectionBinding: 'Redbull.filesController.selection'
     })
    })
  })

});
