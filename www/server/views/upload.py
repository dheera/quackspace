#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# /upload
# Uploads a file

from flask import Blueprint, render_template, abort, redirect, Response, request
from jinja2 import TemplateNotFound
from server import db
import json, os, uuid, time, pymongo
from bson.son import SON
import bson
from pprint import pprint
from werkzeug import secure_filename
from server import bucket
from server import db

upload = Blueprint('upload', __name__, template_folder='../template')

@upload.route('', methods=['POST'])
def do_upload():
  lat = float(request.form.get('lat', 0))
  lon = float(request.form.get('lon', 0))

  if request.headers.getlist("X-Forwarded-For"):
    ip = request.headers.getlist("X-Forwarded-For")[0]
  else:
    ip = request.remote_addr

  print("upload: " + ip + " | " + str(lat) + " | " + str(lon))

  f = request.files.get('file')
  if f:
    uuid_str = uuid.uuid4().hex
    key_str = uuid.uuid4().hex
    filename = secure_filename(f.filename)
    ensure_dir('/tmp/quackspace/')
    local_path = os.path.join('/tmp/quackspace/', filename)
    s3_path = uuid_str + '/' + filename
    f.save(local_path)
    try:
      key = bucket.new_key(s3_path)
      key.set_contents_from_filename(local_path, reduced_redundancy = True)
    except:
      print("Error creating key")

    os.unlink(local_path)

    db.files.remove({
      'time': { '$lt': int(time.time())-3600 }
    })
    
    insert_object = {
      'geo': { "type": "Point", "coordinates": [ lon, lat ] },
      'ip': ip,
      'time': int(time.time()),
      'key': key_str,
      'path': s3_path,
    }

    db.files.insert(insert_object)
    print(s3_path)
    print(local_path)

    if '_id' in insert_object:
      del(insert_object['_id'])

    return json.dumps(insert_object)

  return "{}"

def ensure_dir(f):
  d = os.path.dirname(f)
  if not os.path.exists(d):
    os.makedirs(d)
