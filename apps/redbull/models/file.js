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
Redbull.BUSY = "busy";
Redbull.ERROR = "error";
Redbull.READY_PARTIAL = "ready_partial";
Redbull.READY_FULL = "ready_full";
Redbull.EMPTY = "empty";


Redbull.File = SC.Object.extend(
/** @scope Redbull.File.prototype */ {
  
  refresh: function(){
    var state = this.get('state');
    switch(state){
      case Redbull.READY_PARTIAL:
      case Redbull.READY_FULL:
        Redbull.getFile(this);
        this.set('state', Redbull.BUSY);
        break;
      case Redbull.BUSY:
      case Redbull.ERROR:
      case Redbull.EMPTY:
        console.log("RedBull.File#refresh not handled in current state %@".fmt(state));
        break;
    }
  },
  
  refreshComplete: function(body){
    var state = this.get('state');
    switch(state){
      case Redbull.BUSY:
      case Redbull.EMPTY:
        this.set('body', body);
        this.set('state', Redbull.READY_FULL);
        break;
      case Redbull.READY_FULL:
      case Redbull.ERROR:
      case Redbull.READY_PARTIAL:
        console.log("RedBull.File#refresh not handled in current state %@".fmt(state));
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
    if(this.get('path')) this.set('state', Redbull.READY_PARTIAL);
  }

}) ;
