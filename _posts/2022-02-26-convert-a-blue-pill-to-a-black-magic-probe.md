---
layout: post
title: "Convert a Blue pill to a Black Magic Probe"
author: 'Rémi Debord'
comments: true
---
### Introduction 
I was lookin for a cheap solution to debug SAMD21 microcontroller as they are more and more popular (next generation of Arduino boards), and as STM32 are pretty rare those times.

I found a project called [Black Magic Probe](https://github.com/blackmagic-debug/blackmagic), which offer debugging capacity for all kind of ARM chips via SWD or JTAG (+ virtual COM port), but the probe is difficult to find in a webshop nowadays and in the same price range than the famous [J-Link EDU probe](https://www.segger.com/products/debug-probes/j-link/models/j-link-edu/) (~60€ on RS/Farnell).
Main advantage of this probe is that this one is open source, maintained, and can be flashed on a cheap [Blue pill](https://www.ebay.com/itm/203775479156?hash=item2f71f70d74:g:BMcAAOSwDsVhzWZT) (~5€) even if you have clone.
In the next steps i will explain how you can flash a Blue Pill in order to obtain a "BMP".

[![bmpm_V2_1c_nocap_iso_1024x1024](../../../uploads/bmpm_V2_1c_nocap_iso_1024x1024.jpg)](../../../uploads/bmpm_V2_1c_nocap_iso_1024x1024.jpg)

### Pre-requisites
Here is what you will need in order to turn the Blue pill into a Black Magic Probe:
- Blue pill (or a red/black one) with a STM32F103C8T6
- STLink v2 (cheap clones are availables on eBay or Aliexpress)
- Jumper wires Female/Female (x4)

Note: If you dont have a STLink, you could follow another How-to which use a USB to Serial converter [\[1\]](https://paramaggarwal.medium.com/converting-an-stm32f103-board-to-a-black-magic-probe-c013cf2cc38c#.btn6lnwqe) or if you have a useless STLink clone, this one could be reflashed as a Black Magic Probe [\[2\]](http://blog.linuxbits.io/2016/02/15/cheap-chinese-st-link-v-2-programmer-converted-to-black-magic-probe-debugger/)

For the software part you will need the two binary files attached below:
- [STM32 STLink utility](http://remidebord.fr/blog/uploads/STM32_ST-LINK_Utility_v3.6.0.exe)
- [blackmagic_dfu.bin](http://remidebord.fr/blog/uploads/blackmagic_dfu.bin)
- [blackmagic.bin](http://remidebord.fr/blog/uploads/blackmagic.bin)

Note: even if it's not the latest version available it could be updated later via dfu.

TODO: explain how to get/build latest version.
### Wiring
No mystery here, we have to use the four pins availables (SWD + 3V3 + GND) on the Blue pill, and connect it to the STLink.

[![bluepill_converted_to_magic_prob](../../../uploads/bluepill_converted_to_magic_probe.jpg)](../../../uploads/bluepill_converted_to_magic_probe.jpg)

### Flashing
Open STLink utility, click on "Connect to the target" in order to see if the STLink is recognized and could access to STM32F103 memory.

[![stlink_stm32f103_connection](../../../uploads/stlink_stm32f103_connection.png)](../../../uploads/stlink_stm32f103_connection.png)

Next, go to "Target", "Program...", select the binary blakcmagic_dfu.bin, set the start address 0x08000000 and click on Start (after the flashing, a reset occur and LED on Blue pill should blink).

[![stlink_flash_blackmagic_dfu](../../../uploads/stlink_flash_blackmagic_dfu.png)](../../../uploads/stlink_flash_blackmagic_dfu.png)

Same thing for blackmagic.bin but the start address is 0x08002000.

[![stlink_flash_blackmagic](../../../uploads/stlink_flash_blackmagic.png)](../../../uploads/stlink_flash_blackmagic.png)

### Test (Smoky!)
Once done, remove jumper wires and plug the blue pill to the computer (via the micro USB port), the board will be recognized as a Black Magic Probe 1.6X.

If you look at the peripheral manager, two devices should appear.

[![bpm_peripheral_manager](../../../uploads/bpm_peripheral_manager.png)](../../../uploads/bpm_peripheral_manager.png)

Well done, and thanks to the Black Magic Probe authors, now you can use your Blue pill in order to debug almost any ARM chips. SWD pins are the same than the ones used in order to flash it.
JTAG is available on PA13 (JTMS), PA14 (JTCK), PA15 (JTDI) and PB3 (JTDO), see this [readme.md](https://github.com/blackmagic-debug/blackmagic/blob/master/src/platforms/swlink/README.md) for more details.

A next post will explain how to use this Black Magic Probe with Visual Studio code (and the well known Platform.io extension) on a SAMD21.

### References
Acknowledgments to Black Magic team and peoples who are sharing their knowledges.
- [blackmagic Public - In application debugger for ARM Cortex microcontrollers.](https://github.com/blackmagic-debug/blackmagic)
- [Converting an STM32F103 board to a Black Magic Probe.](https://paramaggarwal.medium.com/converting-an-stm32f103-board-to-a-black-magic-probe-c013cf2cc38c#.btn6lnwqe)
- [JeeLabs - Black Magic Probe.](https://jeelabs.org/202x/bmp/)
- [Black magic probe out of cheap STLink programmers (nice pics!).](https://ciesie.com/post/black_magic_probe_stlink/)
- [JTAG/SWD debugging via Black Magic Probe on an STM32 blue pill.](https://satoshinm.github.io/blog/171223_jtagswdpillblink_jtagswd_debugging_via_black_magic_probe_on_an_stm32_blue_pill_and_blinking_a_led_using_stm32cubemx_libopencm3_and_bare_metal_c.html)
