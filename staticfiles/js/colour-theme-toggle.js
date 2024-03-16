function switchColour(){
    var light=document.getElementById("colour-mode");
      if (light.checked){
        document.documentElement.setAttribute('data-theme', 'light');
      }
      else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
}