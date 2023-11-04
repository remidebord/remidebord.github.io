---
layout: post
title: "Debian repository on Raspbian"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
On a Rasberry Pi 2, if you need packages which is not includes inside Raspbian repository, you can use debian repository (Wheezy for now).

Use these command lines to add Debian Wheezy repository
```bash
echo "deb http://ftp.debian.org/debian/ wheezy main" > backports.list
echo "deb http://ftp.debian.org/debian/ wheezy-backports main" >> backports.list
sudo mv backports.list /etc/apt/sources.list.d
```
When it's done, try to make a sudo apt-get update. Usually, you can see that APT need to register the new repositories and request to add public keys.
First install a list of key server,
```bash
sudo apt-get install debian-keyring
```
Next register the keys provide by APT (replace the key 8B48AD6246925553 by yours),
```bash
gpg --recv-key 8B48AD6246925553
gpg -a --export 8B48AD6246925553 | sudo apt-key add -
```
and then update your packages list,
```bash
sudo apt-get update
```
Note: If you need a package in a specific repository used this kind of command
```bash
sudo apt-get install -t wheezy-backports gstreamer1.0*
```
