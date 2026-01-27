---
layout: post
title: "Arduino + Thermistor (CTN)"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
The last year, I have tried to display temperature on LCD (Arduino) with success, but many month later I have lost all data, in my hard disk... .This post is made in order to rescue me, and other guys, we search how to use a thermistor (CTN) with arduino.

### Formula

In this part, i will explain how to find the formula from the schematic, and for any further information, take a look at the wiki page (thermistor).

The formula used is:

```
R(T) = R0.exp(Beta *((1/TK) - (1/T0)))
```

- R0 : Resistor value
- Beta : Coefficient at 25°C
- TK : Temperature (Kelvin)
- T0 : Ambient temperature (273+25 Kelvin)

We can convert the first expression in order to extract TK,

```
TK = 1/((1/Beta)*ln(R(T)/R0) + 1/T0)
```

The next step consist to find R(T) with the tension divider,

```
R(T) = R0*(+5v-vAn)/vAn
```

vAn : Tension (Analog Pin 0)

The second expression of R(T) can be placed in the TK expression, which permit to find the temperature. The skecth under is an implementation of the formula, with a console display.

### Program

```c
#include <math.h> // Library math.h contain log10()
            	  // Note: ln(x) = log10(x)/ln(10)
                               
const int analogInPin = A0;    // Analog input pin

int sensorValue = 0;           // Value read from the thermistor
float vRef = 5.1;              // Tension on 5v arduino pin
float tension = 0;
float thermistor = 0;
float resistorValue = 100000;  // Value of the resistance
float ln10 = 2.302585;         // Used for ln(x)
float temperature = 0;
float beta = 4300;             // Coefficient at 25°C
float ambTemperature = 298;    // 273 + 25 (Ambient temp. in K)

void setup() {
  // Initialize serial communications at 9600 bps:
  Serial.begin(9600); 
}

void loop() {
  // Read the analog in value
  sensorValue = analogRead(analogInPin);
  // sensor value => tension (volt)
  tension = vRef *sensorValue/1024;
  // tension => thermistor (ohm)
  thermistor = (100000*(5.1-tension))/tension;
  
  // thermistor => temperature (Kelvin)
  temperature = thermistor/resistorValue;
  temperature = ln10*log10(temperature);
  temperature = temperature/beta;
  temperature = temperature+(1/ambTemperature);
  temperature = 1/temperature;
  // temperature (Kelvin) => temperature (Celsius)
  temperature = temperature - 273;

  // print the results to the serial monitor:
  Serial.print("sensor = " );                       
  Serial.print(sensorValue);
  Serial.print(" | tension = " );                       
  Serial.print(tension);
  Serial.print(" | thermistor = " );                       
  Serial.print(thermistor);
  Serial.print(" | temperature = " );                       
  Serial.println(temperature);     

  // Update every sec
  delay(1000);                     
}
```

### Results

[![console](../../../uploads/thermistor_results.PNG)](../../../uploads/thermistor_results.PNG)