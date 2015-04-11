#!/bin/bash
ssh ubuntu@quack.space 'cd /www && git pull && sudo /etc/init.d/memcached restart && sudo /etc/init.d/uwsgi restart'
