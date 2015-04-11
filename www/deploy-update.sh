#!/bin/bash
ssh ubuntu@quack.space 'cd /quackspace && git pull && sudo /etc/init.d/memcached restart && sudo /etc/init.d/uwsgi restart'
