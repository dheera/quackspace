var storage_prefix = init_lat.toString() + ',' + init_lon.toString() + ':';
var last_lon = localStorage.getItem(storage_prefix + 'lon');
var last_lat = localStorage.getItem(storage_prefix + 'lat');

extension_fa_mapping = {
  'ps':    'file-pdf-o',
  'pdf':   'file-pdf-o',
  'dvi':   'file-pdf-o',
  'avi':   'file-video-o',
  'mpg':   'file-video-o',
  'mp4':   'file-video-o',
  'mov':   'file-video-o',
  'mpeg':  'file-video-o',
  'svg':   'file-image-o',
  'eps':   'file-image-o',
  'wmf':   'file-image-o',
  'xcf':   'file-image-o',
  'psd':   'file-image-o',
  'ai':    'file-image-o',
  'xpm':   'file-image-o',
  'png':   'file-image-o',
  'bmp':   'file-image-o',
  'gif':   'file-image-o',
  'jpg':   'file-image-o',
  'jpeg':  'file-image-o',
  'doc':   'file-word-o',
  'docx':  'file-word-o',
  'ppt':   'file-powerpoint-o',
  'pptx':  'file-powerpoint-o',
  'xls':   'file-excel-o',
  'xlsx':  'file-excel-o',
  'zip':   'file-archive-o',
  'gz':    'file-archive-o',
  'rar':   'file-archive-o',
  'tgz':   'file-archive-o',
  'tar':   'file-archive-o',
  'txt':   'file-text-o',
  'py':    'file-code-o',
  'pl':    'file-code-o',
  'c':     'file-code-o',
  'cpp':   'file-code-o',
  'js':    'file-code-o',
  'tex':   'file-code-o',
  'rb':    'file-code-o',
  'css':   'file-code-o',
  'ini':   'file-code-o',
  'html':  'file-code-o',
  'xml':   'file-code-o',
  'mp3':   'file-audio-o',
  'wav':   'file-audio-o',
  'aac':   'file-audio-o',
  'ogg':   'file-audio-o',
  '':      'file-o'
}

function onGeoError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }

    if(last_lon && last_lat) {
      position.coords.latitude = last_lat;
      position.coords.longitude = last_lon;
    }
    $('#container-map').slideDown();
    google.maps.event.trigger(map, 'resize');
    reCenterMap();
    $('#container-error').slideDown();
    onPosition(position);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(onPosition, onGeoError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var position = {
  'coords': {
    'latitude': init_lat,
    'longitude': init_lon
  }
};

function onPositionResult(p) {
  console.log('onPositionResult()');
  $('#container-error').slideUp();
  onPosition(p);
  reCenterMap();
}

function reCenterMap() {
  map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}



function onPosition(p) {
    console.log('onPosition()');
    $('#container-loader').transition({ scale: 0 }).slideUp();
    $('#debug').html("Location: " + p.coords.latitude + "," + p.coords.longitude);
    position = p;
    localStorage.setItem(storage_prefix + 'lat', position.coords.latitude);
    localStorage.setItem(storage_prefix + 'lon', position.coords.longitude);
    $.get(
      '/search',
      {
        'lat': p.coords.latitude,
        'lon': p.coords.longitude
      },
      function(results, textStatus, xhr) {
        console.log(results);
        clearFiles();
        $.each(results, function(index, result) {
          appendFile(result['path']);
        })
      },
      'json'
    );
}

var map = null;

$(function() {

  $('img').on('dragstart', function(event) { event.preventDefault(); });

  getLocation();
  if(window.File && window.FileList && window.FileReader) {
    var filedrop = $('#filedrop')[0];
    window.addEventListener("dragover", filedrop_onDragOver, false);
    window.addEventListener("dragleave", filedrop_onDragLeave, false);
    window.addEventListener("drop", filedrop_onDrop, false);
  }

  var mapProp = {
    center:new google.maps.LatLng(init_lat, init_lon),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var circle = new google.maps.Circle({
    map: map,
    radius: 100,
    strokeColor: '#ff8000',
    strokeOpacity: 0.6,
    strokeWeight: 2,
    fillColor: '#ff8000',
    fillOpacity: 0.35
  });
  circle.bindTo('center', map, 'center');
  google.maps.event.addListener(map, 'dragend', function() {
    p = new Object();
    p.coords = new Object();
    p.coords.latitude = map.getCenter().lat();
    p.coords.longitude = map.getCenter().lng();
    onPosition(p);
    $('#container-error').slideUp();
  } );
})

function filedrop_onDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log('filedrop_onDragOver');
  $('body').css('background','#f0f0f0');
}

function filedrop_onDragLeave(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log('filedrop_onDragLeave');
  $('body').css('background','#ffffff');
}

function filedrop_onDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log('filedrop_onDrop');
  $('body').css('background','#ffffff');
  var files = e.target.files || e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    doFile(files[i]);
  }
}

function clearFiles() {
  $('#container-files').empty();
}

function appendFile(path) {
  filename = path.substring(path.indexOf('/')+1);

  var exists = false;
  $('#container-files').children().each(function() {
    if($(this).data('path')==path) {
      exists = true;
    }
  });

  if(exists) return;

  divFile = $('<div></div>').addClass('file')
  divFile.data('path', path);

  divFile.click(function() {
    window.location.href = "http://quack.quack.space/" + path;
  });

  extension = filename.substring(filename.lastIndexOf('.')+1);
  fa_class = extension_fa_mapping[extension] || 'file-o';
  divFile.append('<i class="fa fa-2x fa-' + fa_class + '"></i>');
  divFile.append($('<div>' + filename + '</div>'));
  divFile.appendTo($('#container-files'));
  return divFile;
}

function doFile(f) {
  console.log(f);
  var formData = new FormData();
  formData.append('file', f);
  if(position) {
    formData.append('lat', position.coords.latitude);
    formData.append('lon', position.coords.longitude);
  } else {
    // don't know latitude/longitude
  }
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


