// ==========================================================================
// Project:   Redbull
// Copyright: ©2009 Mike Ball
// ==========================================================================
/*globals Redbull */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Redbull = SC.Object.create(
  /** @scope Redbull.prototype */ {

  NAMESPACE: 'Redbull',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from(SC.Record.fixtures)
  
  
  //called whenever the bespin Editor's content changes
  bespinEditorContentChanged: function(){
    if(this.fileController.get('content')) this.fileController.content.bodyChanged();
  }
}) ;
