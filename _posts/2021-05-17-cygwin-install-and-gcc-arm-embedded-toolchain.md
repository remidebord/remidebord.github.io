---
layout: post
title: "Cygwin install and GCC ARM embedded toolchain"
author: 'Rémi Debord'
comments: true
---
### Install Cygwin
Get the Cygwin installer from [cygwin.com/install.html](https://cygwin.com/install.html) ([mirror](http://remidebord.fr/blog/uploads/setup-x86_64.exe) ), open a prompt and install cygwin with the following packages:
```
setup-x86_64.exe -q -P  autoconf,autoconf2.5,autogen,automake,automake1.15,libtool,make,gcc-g++,mingw64-x86_64-gcc-core,mingw64-x86_64-gcc-g++,python37,python37-devel,python3-configobj,wget,zlib-devel,git,chere
```
If some packages that you usually used are missing and you don't know the exact name, please start again the installer and search for packages.

![cygwin_packages](../../../uploads/cygwin_packages.jpg)

Once installed, start Cygwin as admin and enter the command below:
```bash
chere -i -t mintty -s bash
```
It will permit to start Cygwin direclty from a specific folder, with the famous "bash prompt here".
![bash_prompt_here](../../../uploads/bash_prompt_here.jpg)

### Install GCC ARM embedded toolchain
Now that Cygwin is installed, we can focus on the GCC ARM Embedded toolchain, which can found [here](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads) ( [mirror](http://remidebord.fr/blog/uploads/gcc-arm-none-eabi-10-2020-q4-major-win32.exe) ).

Start the installer, select a path WITHOUT SPACES and continue the install process.

![gcc_arm_embedded_toolchain](../../../uploads/gcc_arm_embedded_toolchain.jpg)

### Import GCC ARM embedded toolchain to Cygwin
The ARM toolchain can now be added to Cygwin by editing the bash.rc file located in Cygwin directory (example: `C:\cygwin64\home\Red`).

![bashrc](../../../uploads/bashrc.jpg)

Check if the toolchain is available and we are done:

![cygwin_with_arm_toolchain](../../../uploads/cygwin_with_arm_toolchain.png)

### Real-Life Test
Get a project like [dapboot](https://github.com/devanlai/dapboot) and start a build:
```bash
git clone https://github.com/devanlai/dapboot.git
cd dapboot/src
make
```
![dapboot_build](../../../uploads/dapboot_build.png)

If everything went well, the output should be similar to the one above.
