window._location=window.location;
window._location.urlformat=(function(){
	var att1=location.search.substring(1).split("&"),att2=[],obj={};
	for(i=0;i<att1.length;i++) att2=att1[i].split("="),obj[att2[0]]=att2[1];
	return obj;
})()