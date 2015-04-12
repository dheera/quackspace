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
    var filedrop = $('#filedrop')[0];
    window.addEventListener("dragover", filedrop_onDragOver, false);
    window.addEventListener("dragleave", filedrop_onDragLeave, false);
    window.addEventListener("drop", filedrop_onDrop, false);
    filedrop.addEventListener("dragover", filedrop_onDragOver, false);
    filedrop.addEventListener("dragleave", filedrop_onDragLeave, false);
    filedrop.addEventListener("drop", filedrop_onDrop, false);
  }
})

function filedrop_onDragOver(e) {
  console.log('filedrop_onDragOver');
  $('body').css('background','#f0f0f0');
  e.stopPropagation();
  e.preventDefault();
}

function filedrop_onDragLeave(e) {
  console.log('filedrop_onDragLeave');
  $('body').css('background','#ffffff');
  e.stopPropagation();
  e.preventDefault();
}

function filedrop_onDrop(e) {
  console.log('filedrop_onDrop');
  $('body').css('background','#ffffff');
  var files = e.target.files || e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    doFile(files[i]);
  }
  e.stopPropagation();
  e.preventDefault();
}

function doFile(f) {
  divFile = $('<div></div>')
    .addClass('file')
    .addClass('file-uploading')
    .text(f.name)
    .appendTo($('#filecontainer'));
  console.log(f);
  var formData = new FormData();
  formData.append('file', f);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('all done: ' + xhr.status);
    } else {
      console.log('Something went terribly wrong...');
    }
  };
  xhr.send(formData);
}


