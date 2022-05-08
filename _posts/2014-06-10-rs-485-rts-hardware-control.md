---
layout: post
title: "RS-485 RTS hardware control [Windows]"
---
![TEK0002](../../../uploads/TEK0002.jpg)

If you want to use the serial port for RS-485 communication, you will need to configure it. Under windows the configuration is pretty easy, just use
```
.fRtsControl=RTS_CONTROL_TOGGLE;
```
Note: RTS hardware control work only on real serial port! The most of USB to serial converter (Prolific chip) don't implement it, except FTDI chips.

If you need to communicate in RS-485 over an usb port, use the [USB/RS485 converter cable](http://www.ftdichip.com/Products/Cables/USBRS485.htm) from FTDI which automatically generate RTS!