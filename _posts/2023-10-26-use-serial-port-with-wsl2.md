---
layout: post
title: "Use serial port with WSL2"
author: 'Rémi Debord'
comments: true
---

First, install [usbipd-win](https://github.com/dorssel/usbipd-win/releases) like explained on [Connect USB devices](https://learn.microsoft.com/en-us/windows/wsl/connect-usb) microsoft web page.

Once done we can list the usb devices in powershell.
```shell
PS C:\Users\Red> usbipd wsl list
BUSID  VID:PID    DEVICE                                                        STATE
1-3    046d:c083  Périphérique d’entrée USB                                     Not attached
1-4    04d9:0180  Périphérique d’entrée USB                                     Not attached
1-8    041e:324a  Creative MUVO 2c, Périphérique d’entrée USB                   Not attached
1-9    0403:6001  USB Serial Converter                                          Not attached
1-13   0b05:1939  AURA LED Controller, Périphérique d’entrée USB                Not attached
1-14   8087:0029  Intel(R) Wireless Bluetooth(R)                                Not attached
```

And then attach the USB serial converter to WSL by using it's BUSID.
```shell
PS C:\Users\Red> usbipd wsl attach --busid 1-9
```

Now, you can check the USB devices connected on Linux side.
```shell
red@DESKTOP-ATO322N:~$ lsusb
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 002: ID 0403:6001 Future Technology Devices International, Ltd FT232 Serial (UART) IC
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

Let's check if the interface appeared in `/dev`.
```shell
red@DESKTOP-ATO322N:~$ ls /dev/ | grep ttyUSB
ttyUSB0
```

We can now use minicom (in my case serial port is connected to my BeagleBone Black).
```shell
sudo minicom -D /dev/ttyUSB0 -b 115200
```

Note: you may need to disable the HW flow control option (Ctrl A+Z, go to `O` "configure minicom", and "Serial port setup", turn it off by typing `F`).

```shell
Welcome to minicom 2.7.1

OPTIONS: I18n
Compiled on Dec 23 2019, 02:06:26.
Port /dev/ttyUSB0, 23:47:43

Press CTRL-A Z for help on special keys


debian@BeagleBone:~$
debian@BeagleBone:~$ uname -a
Linux BeagleBone 5.10.168-ti-r71 #1bullseye SMP PREEMPT Fri Sep 1 04:05:07 UTC 2023 armv7l GNU/Linux
```