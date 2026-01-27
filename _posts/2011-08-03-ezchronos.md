---
layout: post
title: "Program an eZChronos under Ubuntu"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
I received this watch several month ago, and after many program, i have decided to flash the eZChronos watch with the custom firmware "[OpenChronos](https://github.com/poelzi/OpenChronos/)". But under windows the size of the code send to the msp430 (CCS) are limited T_T.

The other way which permit to program the watch is to use msp430-gcc and mspdebug available in linux. I spend 4 days to understand "how to install and use msp430-gcc and mspdebug", and this post is made in order to help anyone who want to program the watch without code size limitation.

Make sure you are connected to internet before installation.

First we have to install git.

```sh
$ sudo apt-get install git
```

Now we can install mspdebug (more easiest than msp430-gcc).

```sh
$ sudo apt-get install mspdebug
```

The next step consist to prepare the development environment.

```sh
$ sudo su
$ apt-get install texinfo
$ git clone git://mspgcc4.git.sourceforge.net/gitroot/mspgcc4/mspgcc4

$ cd mspgcc4 && perl buildgcc.pl
```

Select the default choice (Between the bracket [..]), and after a long time you can found the toolchain installed in the default path: `/opt/msp430-gcc-4.4.5`

Get the OpenChronos from Github.

```sh
$ git clone https://github.com/poelzi/OpenChronos.git
```

Export the msp430 toolchain PATH, which permit to the terminal to find msp430-gcc.

```sh
$ export PATH=$PATH:/opt/msp430-gcc-4.4.5/bin/
```

Go to Openchronos directory (cd), choose the modules for the firmware and build it.

```sh
$ make config
$ make
```

After you can found two files inside "build".

```sh
eZChronos.elf
eZChronos.txt
```

Now we can use mspdebug.

```sh
$ sudo mspdebug rf2500
```

Program the watch with the .elf or the .txt.

```sh
(mspdebug) prog eZChronos.elf
```

Wait a moment and after we can unplug and replug the watch, it works !!!