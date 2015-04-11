function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $('#debug').html("Location: " + position.coords.latitude + 
    "," + position.coords.longitude);
}

$(function() {
  getLocation();
  if(window.File && window.FileList && window.FileReader) {
    var filedrop = $('#filedrop');
    filedrop[0].addEventListener("dragover", filedrop_onDragOver, false);
    filedrop[0].addEventListener("dragleave", filedrop_onDragLeave, false);
    filedrop[0].addEventListener("drop", filedrop_onDrop, false);
  }
})

function filedrop_onDragOver() {
  console.log('filedrop_onDragOver');
  $('#filedrop').addClass('filedrop-hover');
}

function filedrop_onDragLeave() {
  console.log('filedrop_onDragLeave');
  $('#filedrop').removeClass('filedrop-hover');
}

function filedrop_onDrop() {
  console.log('filedrop_onDrop');
  $('#filedrop').removeClass('filedrop-hover');
  var files = e.target.files || e.dataTransfer.files;
  console.log(files);
}
