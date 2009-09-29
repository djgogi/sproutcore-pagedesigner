// ==========================================================================
// Project:   Redbull.File
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Redbull */
require('core');
/** @class

  
  
  @extends SC.Object
  @version 0.1
*/
//files states
Redbull.BUSY = 0x0002;
Redbull.ERROR = 0x0003;
Redbull.READY_PARTIAL = 0x0004;
Redbull.READY_FULL = 0x0005;
Redbull.EMPTY = 0x0001;


Redbull.File = SC.Object.extend(
/** @scope Redbull.File.prototype */ {
  
  refresh: function(){
    var status = this.get('status');
    switch(status){
      case Redbull.READY_PARTIAL:
      case Redbull.READY_FULL:
        Redbull.getFile(this);
        break;
      case Redbull.BUSY:
      case Redbull.ERROR:
      case Redbull.EMPTY:
        console.log("RedBull.File#refresh not handled in current state");
        break;
    }
  },
  
  isFile: function(){
    var type = this.get('type');
    
    if(type && type === "file"){
      return YES;
    }
    else{
      return NO;
    }
  }.property('type').cacheable(),
  

  status: Redbull.EMPTY,

  init: function(){
    sc_super();
    if(this.get('path')) this.set('status', Redbull.READY_PARTIAL);
  }

}) ;
