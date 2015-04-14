#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# /delete
# Deletes a file.

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

delete = Blueprint('delete', __name__, template_folder='../template')

@delete.route('')
def do_delete():
  path = request.args.get('path', '')
  key =  request.args.get('key', '')

  print("delete: " + path)

  result = db.files.remove({
    'path': path,
    'key':  key,
  })

  if result and result.get('n') == 1:
    try:
      bucket.delete_key(path)
    except:
      print("Error deleting key")

  return "0"
