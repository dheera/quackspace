#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template, send_file, send_from_directory, redirect, abort
from jinja2 import Markup
from boto.s3.connection import S3Connection
import re
import json
import os
import socket
from random import randrange
from pprint import pprint
import geoip2
import geoip2.database
import pymongo

# geoip = pygeoip.GeoIP('/usr/local/share/geoip/GeoIP.dat', pygeoip.MEMORY_CACHE)

geoip_reader = geoip2.database.Reader('/usr/local/share/geoip/GeoLite2-City.mmdb')

# load settings
fn = os.path.join('/etc/quackspace-settings.json')
with open(fn) as f:
  settings_json = f.read()

settings = json.loads(settings_json)

# mongodb
client = pymongo.MongoClient(settings['mongodb']['host'], int(settings['mongodb']['port']))
db = client.quackspace
db.authenticate(settings['mongodb']['username'], settings['mongodb']['password'])

# s3

s3 = S3Connection(
  settings['aws']['id'],
  settings['aws']['secret']
)

bucket = s3.get_bucket(settings['s3']['bucket'])

# flask
app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

@app.before_request
def limit_remote_addr():
    print(request.remote_addr)
    if not (request.remote_addr.startswith('192.168.') or request.remote_addr.startswith('127.') or request.remote_addr.startswith('18.')) and app.debug:
        abort(403)

@app.route('/')
def get_index():
  try:
    response = geoip_reader.city('18.62.0.1') # request.remote_addr)
    init_lat = response.location.latitude
    init_lon = response.location.longitude
  except geoip2.errors.AddressNotFoundError:
    init_lat = 0
    init_lon = 0
  return render_template('index.html', init_lat = init_lat, init_lon = init_lon)

from .views.upload import upload
app.register_blueprint(upload, url_prefix='/upload')

from .views.search import search
app.register_blueprint(search, url_prefix='/search')

app.jinja_env.globals.update(len=len)
app.jinja_env.globals.update(min=min)
app.jinja_env.globals.update(max=max)

@app.after_request
def after_request(response):
  if response.headers['Content-Type'].find('image/')==0:
    response.headers['Cache-Control'] = 'max-age=7200, must-revalidate'
  elif response.headers['Content-Type'].find('application/')==0:
    response.headers['Cache-Control'] = 'no-cache, must-revalidate, max-age=10'
    response.headers['Expires'] = 'Fri, 1 Jan 2014 1:00:00 UTC'
  else:
    response.headers['Cache-Control'] = 'no-cache, must-revalidate, max-age=10'
    response.headers['Expires'] = 'Fri, 1 Jan 2014 1:00:00 UTC'
  return response

if __name__ == '__main__':
  print(app.url_map)
  app.run(debug=True)
