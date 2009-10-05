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
Redbull.EMPTY = "empty";
Redbull.READY_CLEAN = "ready_clean";
Redbull.READY_DIRTY = "ready_dirty";


Redbull.File = SC.Object.extend(
/** @scope Redbull.File.prototype */ {
  
  commit: function(){
    var state = this.get('state');
    switch(state){
      case Redbull.READY_DIRTY:
      case Redbull.EMPTY:
        Redbull.commitFile(this);
        this.set('state', Redbull.BUSY);
        break;
      case Redbull.READY_PARTIAL:
      case Redbull.BUSY:
      case Redbull.ERROR:
      case Redbull.READY_CLEAN:
        console.log("RedBull.File#refresh not handled in current state %@".fmt(state));
        break;
    }
  },
 
  
  refresh: function(){
    var state = this.get('state');
    switch(state){
      case Redbull.READY_PARTIAL:
      case Redbull.READY_CLEAN:
        Redbull.getFile(this);
        this.set('state', Redbull.BUSY);
        break;
      case Redbull.READY_DIRTY:
      case Redbull.BUSY:
      case Redbull.ERROR:
      case Redbull.EMPTY:
        console.log("RedBull.File#refresh not handled in current state %@".fmt(state));
        break;
    }
  },
  
  requestComplete: function(body){
    var state = this.get('state');
    switch(state){
      case Redbull.BUSY:
      case Redbull.EMPTY:
        if(body) this.set('body', body);
        this.set('state', Redbull.READY_CLEAN);
        break;
      case Redbull.READY_CLEAN:
      case Redbull.READY_DIRTY:
      case Redbull.ERROR:
      case Redbull.READY_PARTIAL:
        console.log("RedBull.File#refresh not handled in current state %@".fmt(state));
        break;
    }
  },
  
  bodyChanged: function(){
    var state = this.get('state');
    switch(state){
      case Redbull.EMPTY:
      case Redbull.READY_CLEAN:
      case Redbull.READY_DIRTY:
        this.set('state', Redbull.READY_DIRTY);
        break;
      case Redbull.ERROR:
      case Redbull.BUSY:
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
  
  isDirty: function(){
    if(this.get('state') === Redbull.READY_DIRTY){
      return YES;
    }
    else{
      return NO;
    }
  }.property('state').cacheable(),

  init: function(){
    sc_super();
    if(this.get('path')){
      this.set('state', Redbull.READY_PARTIAL);
    }
    else{
      this.set('state', Redbull.EMPTY);
    }
  }

}) ;
