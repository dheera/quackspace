var storage_prefix = init_lat.toString() + ',' + init_lon.toString() + ':';
var last_lon = localStorage.getItem(storage_prefix + 'lon');
var last_lat = localStorage.getItem(storage_prefix + 'lat');

extension_fa_mapping = {
  'ps':    {'class':'fa-file-pdf-o', 'color':'#ff0000'},
  'pdf':   {'class':'fa-file-pdf-o', 'color':'#ff0000'},
  'dvi':   {'class':'fa-file-pdf-o', 'color':'#ff0000'},
  'avi':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'mpg':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'mp4':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'mov':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'wmv':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'rm':    {'class':'fa-file-video-o', 'color':'#0080cc'},
  'asx':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'asf':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'flv':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'm4v':   {'class':'fa-file-video-o', 'color':'#0080cc'},
  'mpeg':  {'class':'fa-file-video-o', 'color':'#0080cc'},
  'svg':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'eps':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'wmf':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'xcf':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'psd':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'ai':    {'class':'fa-file-image-o', 'color':'#0080cc'},
  'xpm':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'png':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'tif':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'tiff':  {'class':'fa-file-image-o', 'color':'#0080cc'},
  'bmp':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'gif':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'jpg':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'jif':   {'class':'fa-file-image-o', 'color':'#0080cc'},
  'jiff':  {'class':'fa-file-image-o', 'color':'#0080cc'},
  'jpeg':  {'class':'fa-file-image-o', 'color':'#0080cc'},
  'webp':  {'class':'fa-file-image-o', 'color':'#0080cc'},
  'sxw':   {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'odt':   {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'doc':   {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'dot':   {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'docx':  {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'rtf':   {'class':'fa-file-word-o', 'color':'#6eb81f'},
  'odp':   {'class':'fa-file-powerpoint-o', 'color':'#6eb81f'},
  'key':   {'class':'fa-file-powerpoint-o', 'color':'#6eb81f'},
  'pps':   {'class':'fa-file-powerpoint-o', 'color':'#6eb81f'},
  'ppt':   {'class':'fa-file-powerpoint-o', 'color':'#6eb81f'},
  'pptx':  {'class':'fa-file-powerpoint-o', 'color':'#6eb81f'},
  'gnumeric': {'class':'fa-file-excel-o', 'color':'#6eb81f'},
  'ods':   {'class':'fa-file-excel-o', 'color':'#6eb81f'},
  'xls':   {'class':'fa-file-excel-o', 'color':'#6eb81f'},
  'xlsx':  {'class':'fa-file-excel-o', 'color':'#6eb81f'},
  'zip':   {'class':'fa-file-archive-o', 'color':'#8f4242'},
  'gz':    {'class':'fa-file-archive-o', 'color':'#8f4242'},
  'rar':   {'class':'fa-file-archive-o', 'color':'#8f4242'},
  'tgz':   {'class':'fa-file-archive-o', 'color':'#8f4242'},
  'tar':   {'class':'fa-file-archive-o', 'color':'#8f4242'},
  'txt':   {'class':'fa-file-text-o', 'color':'#cfaf2d'},
  'dat':   {'class':'fa-file-text-o', 'color':'#cfaf2d'},
  'log':   {'class':'fa-file-text-o', 'color':'#cfaf2d'},
  'py':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'pl':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'c':     {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'm':     {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'java':  {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'lua':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'h':     {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'cs':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'sh':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'cpp':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'js':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'tex':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'rb':    {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'css':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'ini':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'html':  {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'xml':   {'class':'fa-file-code-o', 'color':'#cfaf2d'},
  'mp3':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'm4a':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'm3u':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'wma':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'mid':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'ra':    {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'aif':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'wav':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'aac':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  'ogg':   {'class':'fa-file-audio-o', 'color':'#cc358a'},
  '':      {'class':'fa-file-o', 'color': '#000000'}
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
  fa_info = extension_fa_mapping[extension] || {'class':'fa-file-o', 'color':'#808080'};
  divFile.append($('<i style="color:' + fa_info['color'] + '" class="fa fa-2x ' + fa_info['class'] + '"></i>'));
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
    $('#container-uierror').slideUp();
    if (xhr.status === 200) {
      console.log('all done: ' + xhr.status);
    } else {
      console.log('Something went terribly wrong...');
    }
  };
  xhr.upload.onprogress = function(e){
    var done = e.position || e.loaded, total = e.total || e.totalSize
    var present = Math.floor(done/total*100)
    $('#container-uierror').slideDown();
    $('#container-uierror').html(present + '% uploaded')
  }
  xhr.onerror = function () {
    if (xhr.status === 413) {
      console.log("Request entity too large");
      $('#container-uierror').html('<b>Oops!</b> Sorry, this service is limited to files under 50 MB.');
      $('#container-uierror').slideDown();
      window.setTimeout("$('#container-uierror').slideUp();", 2000);
    }
  }
  xhr.send(formData);
}


