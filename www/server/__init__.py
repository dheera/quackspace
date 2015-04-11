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
import pygeoip
import pymongo

# geoip = pygeoip.GeoIP('/usr/local/share/geoip/GeoIP.dat', pygeoip.MEMORY_CACHE)

# load settings
fn = os.path.join('/etc/quackspace-settings.json')
with open(fn) as f:
  settings_json = f.read()

settings = json.loads(settings_json)

# mongodb
client = pymongo.MongoClient(settings['mongodb']['host'], int(settings['mongodb']['port']))
db = client.quackspace
db.authenticate(settings['mongodb']['username'], settings['mongodb']['password'])

# flask
app = Flask(__name__)

@app.before_request
def limit_remote_addr():
    print(request.remote_addr)
    if not (request.remote_addr.startswith('192.168.') or request.remote_addr.startswith('127.') or request.remote_addr.startswith('18.')) and app.debug:
        abort(403)

@app.route('/')
def get_index():
  return render_template('index.html')

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
