#!/usr/bin/env python3
# -*- coding: utf-8 -*-

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

search = Blueprint('search', __name__, template_folder='../template')

@search.route('')
def do_search():
  lat = float(request.args.get('lat', 0))
  lon = float(request.args.get('lon', 0))
  ip = request.remote_addr
  print("search: " + ip + " | " + str(lat) + " | " + str(lon))

  results_geo = db.files.find({
    'geo': { '$near': {
      '$geometry': { 'type': 'Point', 'coordinates': [lon, lat] },
      '$maxDistance': 200
      }
    }
  })

  results_ip = db.files.find({ 'ip': ip })

  output_results = {}

  for result in results_geo:
    del(result['_id'])
    output_results[result['path']] = result

  for result in results_ip:
    del(result['_id'])
    output_results[result['path']] = result

  return json.dumps(list(output_results.values()))
