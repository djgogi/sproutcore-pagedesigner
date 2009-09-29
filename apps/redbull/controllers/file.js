// ==========================================================================
// Project:   Redbull.file
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Redbull */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Redbull.fileController = SC.ObjectController.create(
/** @scope Redbull.fileController.prototype */ {

  contentBinding: 'Redbull.filesController.selection',
  contentBindingDefault: SC.Binding.single(),
  
  
  _content_observer: function(){
    var content = this.get('content');
    if(content.refresh && content.get('isFile')) content.refresh();
  }.observes('content')
  
  
}) ;
