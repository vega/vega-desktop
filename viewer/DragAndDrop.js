module.exports = function(dropTarget, onLoad) {
  dropTarget.ondragover = function(e){
    if(dropTarget.className.indexOf('landing')===-1) {
      dropTarget.className += ' landing';
    }
    return false;
  };
  dropTarget.ondragleave = function(e){
    dropTarget.className = dropTarget.className.replace('landing', '');
    return false;
  };
  dropTarget.ondrop = function(e){
    e.preventDefault();

    dropTarget.className = dropTarget.className.replace('landing', '');
    file = e.dataTransfer.files[0];
    onLoad(file.path);
    return false;
  };
}
