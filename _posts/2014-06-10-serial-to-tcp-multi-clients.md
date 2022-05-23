---
layout: post
title: "Serial to TCPIP – Multi clients [Linux]"
comments: true
---
Two weeks ago, i needed to find a way to send/receive serial data over ethernet using TCP/IP protocol, with multi clients support under Linux. All clients can send datas to the serial port, and data from the serial port are send to every clients.

In my investigation i found a lot of softwares ([socat](http://www.dest-unreach.org/socat/), [ser2net](http://ser2net.sourceforge.net/), ...) which permit that, but most of them are limited to one client, except the famous [netcat](http://nmap.org/ncat/) !

First install it:
```bash
sudo apt-get install netcat
```
Configure the serial port (8 databits, 115200 bps, no parity, 1 stopbits):
```bash
stty -F /dev/ttyUSB0 cs8 115200 -parenb -cstopb
```
Launch ncat (listen on port 8060):
```bash
ncat --listen --keep-open --source-port 8060 < /dev/ttyUSB0 > /dev/ttyUSB0
```
That's all ! You can test your serial port to tcpip gateway by using any tcp clients, like netcat or Hercules (HW-group).

Extra: If you want to dump transiting data, into a file, just add `-output file.log` or `-hex-dump file.log` if you want data in hexadecimal.