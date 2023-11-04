---
layout: post
title: "Round a number to the nearest value [C]"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
This method is known as round to nearest via modulus division, and permit to round to the nearest multiple of the number.
```c
int round(int number, int multiple)
{
    int half = multiple/ 2;
    int result = 0;

    if(number < 0) half = -half;

    result = ((number + half) - ((number + half) % multiple));

    return result;
}
```
Examples:
```bash
round(63, 4)
>> 64

round(61, 4)
>> 60

round(8, 10)
>> 10

round(2, 10)
>> 0
```
Thanks to [Gavin Kistner](http://phrogz.net/).