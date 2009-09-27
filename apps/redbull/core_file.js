require('core');
/*
  
  handles all interaction with the filesystem

*/

Redbull.mixin({
  
  
  
  listFiles: function(){
    if(!this._listRequest) this._listRequest = SC.Request.create({type: 'GET', isJSON: YES, address: '/sproutcore/fs?action=list'});
    
    this._listRequest.notify(this,this._listCompleted, {}).send();
  },
  
  _listCompleted: function(request, params){
    var response = this._parse_response(request.response());
    Redbull.filesController.set('content', SC.Object.create({'contents': response, treeItemIsExpanded: YES}));
  },
  
  /*
    wraps everything in an SC.Object
  */
  _parse_response: function(content){
    for(var i=0; i < content.length; i+=1){
      
      if(content[i].contents){
        content[i].contents = this._parse_response(content[i].contents);
      }
      content[i] = SC.Object.create(content[i]);
    }
    return content;
  }
  
  
});