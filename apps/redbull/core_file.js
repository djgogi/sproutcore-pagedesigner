require('core');
require('models/file');
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
    wraps everything in an Redbul.File object
  */
  _parse_response: function(content){
    for(var i=0; i < content.length; i+=1){
      
      if(content[i].contents){
        content[i].contents = this._parse_response(content[i].contents);
      }
      content[i] = Redbull.File.create(content[i]);
    }
    return content;
  },
  
  getFile: function(file){
    if(!this._getRequest) this._getRequest = SC.Request.create({type: 'GET'});
    this._getRequest.set('address', "/sproutcore/fs/%@".fmt(file.get('path')));

    this._getRequest.notify(this,this._getCompleted, {file: file}).send();
    
  },
  
  _getCompleted: function(request, params){
    var file = params.file;
    file.set('body', request.response());
    //TODO: set content type...
  }
  
});