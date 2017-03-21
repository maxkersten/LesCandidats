
var candidateSources = function(bio) {


  var listSources = document.createElement('ul');
  listSources.className = "list-unstyled";

  for(var key in bio['Sources'])
  {
    if(bio['Sources'].hasOwnProperty(key)) {
      var link = document.createElement('a');
      link.textContent = key;
      link.href = bio['Sources'][key];

      var ul = document.createElement('ul');
      ul.appendChild(link);

      listSources.appendChild(ul);

    }
  }

  var candidateName = document.createElement('h3');
  candidateName.textContent = bio['name'];

  var nameDiv = document.createElement('div');
  nameDiv.className = 'nameDiv';
  nameDiv.appendChild(candidateName);

  var sourcesCol = document.createElement('div');
  sourcesCol.className = "col-lg-4 col-md-4 col-sm-6 col-xs-12 text-left wordDiv";
  sourcesCol.appendChild(nameDiv);
  sourcesCol.appendChild(listSources);

  return sourcesCol;
};



(function() {
  var container = document.getElementById('sources');
  for(var i=0; i < candidateOrder.length; ++i) {
    var sources = candidateSources(listOfCandidates[candidateOrder[i]]);
    container.appendChild(sources);
  }
})();
