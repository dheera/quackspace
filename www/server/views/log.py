#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# /log
# Reports user-corrected geolocations to system
# for quality improvement from GeoLite database

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

log = Blueprint('log', __name__, template_folder='../template')

@log.route('', methods=['GET'])
def do_log():
  lat = float(request.form.get('lat', 0))
  lon = float(request.form.get('lon', 0))

  if request.headers.getlist("X-Forwarded-For"):
    ip = request.headers.getlist("X-Forwarded-For")[0]
  else:
    ip = request.remote_addr

  print("log: " + ip + " | " + str(lat) + " | " + str(lon))

  db.logs.insert({
    'time': int(time.time()),
    'ip':   ip,
    'geo': { "type": "Point", "coordinates": [ lon, lat ] },
  })

  return "0"
