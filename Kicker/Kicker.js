function count() {
  var form = document.querySelector("form");
  var height, radius, angle, length, foot, deepth, radiusIs;
  form.addEventListener("submit", function(event) {
    height = +form.elements.height.value;
    radius = +form.elements.radius.value;
    angle = +form.elements.angle.value;
    event.preventDefault();

    var angleRad = angle * 0.0174532925;
    var angleBrad = ((180 - angle)/2)*0.0174532925;

    if (radius == "") {
      radiusIs = Math.round(height/(2*(Math.sin(angleRad/2)*Math.sin(angleRad/2)))*100)/100;
      form.elements.radius.value = radiusIs;
      console.log(radiusIs );
    }
    else if (angle == "") {
      var angleIs = (2 * Math.asin(Math.sqrt(height/(2*radius)))/0.0174532925).toFixed(2);
      form.elements.angle.value = angleIs;
      console.log(angleIs);
    }

    length = (height / Math.sin(angleRad/2)).toFixed(2);
    document.getElementById("length").innerHTML = "Length: " + length + " meters";

    foot = (height * Math.tan(angleBrad)).toFixed(2);
    document.getElementById("foot").innerHTML = "Foot: " +foot+" meters";

    deepth = (radiusIs-radiusIs*Math.sin((90-angle/2)*0.0174532925)).toFixed(2);
    document.getElementById("deepth").innerHTML = "Deepth: "+deepth+" meters";
  });
}
