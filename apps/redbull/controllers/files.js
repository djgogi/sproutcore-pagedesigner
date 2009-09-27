// ==========================================================================
// Project:   Redbull.filesController
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Redbull */

/** @class


  @extends TreeController
*/
Redbull.filesController = SC.TreeController.create(
/** @scope Redbull.filesController.prototype */ {

  treeItemChildrenKey: "contents",
  
  setContent: function(c){
    this.set('content',c);
  }
  
  
}) ;
