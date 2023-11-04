---
layout: post
title: "Serial Port Library [Windows/Linux]"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
[![helloworld](../../../uploads/helloworld.png)](../../../uploads/helloworld.png)

In many projects we need to communicate with external equipment, and most of time this communication is done, through a serial port. In order to reduce development time or make easier the prototyping step, i have decided to write my own serial port library and share it ~~with the universe~~.
An exemple of use, where all data received are transmitted,

```c
#include <stdio.h>
#include "../inc/serial.h"

// Create serial port
serial serial;

int main(int argc, char** argv)
{
    char buffer[256] = {0};
    int length = 0;
 
    // Open serial port ("COM3", "/dev/ttyUSB0")
    serial.Open("COM3", 9600, 8, NO, 1);
 
    while(1)
    {
        // Wait character(s)
        length = serial.Read(buffer);
  
        if(length)
        {  
            // Send data
            serial.Write(buffer, length);
        }
    }
 
    // Close serial port
    serial.Close();
 
    return 0;
}
```

The `read()` method is <u>non blocking</u> and return the number of received data.
This library is available [here](http://www.remidebord.fr/files/Serial.rar).
I used Orwell Dev-C++ under Windows and a basic text editor under Linux.

