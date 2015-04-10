#!/bin/sh

# update system
sudo apt-get update && sudo apt-get upgrade

# ssh key
echo "Generating SSH keys ..."
ssh-keygen -t rsa

echo "Please add this key to Github:"
cat ~/.ssh/id_rsa.pub
echo ""
read -p "Press [enter] to continue..."

# packages
sudo apt-get install nginx python-pip python3-pip imagemagick graphicsmagick git exiftool memcached vim uwsgi uwsgi-plugin-python3
sudo pip3 install boto django flask python3-memcached pygeoip uwsgi
sudo mkdir /www
sudo chown -R ubuntu /www
git clone git@github.com:/dheera/quackspace.git /www/quackspace
sudo chown -R ubuntu /www/quackspace

# nginx
sudo rm /etc/nginx/sites-available/*
sudo rm /etc/nginx/sites-enabled/*
sudo cp /www/quackspace/config/nginx/quackspace /etc/nginx/sites-available/quackspace
sudo ln -s /etc/nginx/sites-available/quackspace /etc/nginx/sites-enabled/quackspace
sudo cp /www/quackspace/config/uwsgi/quackspace.ini /etc/uwsgi/apps-available/quackspace.ini
sudo ln -s /etc/uwsgi/apps-available/quackspace.ini /etc/uwsgi/apps-enabled/quackspace.ini

sudo /etc/init.d/uwsgi start
sudo /etc/init.d/nginx start

sudo wget -N http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz -O /tmp/GeoIP.dat.gz
sudo gunzip /tmp/GeoIP.dat.gz
sudo mkdir /usr/local/share/geoip
sudo mv /tmp/GeoIP.dat /usr/local/share/geoip/
