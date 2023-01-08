---
layout: post
title: "WSL2 and Yocto"
author: 'Rémi Debord'
comments: true
---

### WSL2 and Ubuntu installation

First, install WSL and Windows terminal from Microsoft store.
Next, install Ubuntu in a specific location (with the export/import trick, as install is always on system disk location).
Open powershell and follow the instructions below:
```bash
# install Ubuntu
wsl --install -d Ubuntu

# export to expected location (E:\Linux\)
wsl --export Ubuntu E:\Linux\ubuntu.tar

# unregister (will unregister the machine and erase the virtual disk on system disk)
wsl --unregister Ubuntu

# import to expected location
wsl --import Ubuntu E:\Linux\ E:Linux\ubuntu.tar
```
You might want to resize the virtual disk, by default it can growx up to 256GB.

Open CMD prompt:
```bash
# (Optionnal) resize virtual hard disk (run cmd as admin)
diskpart
DISKPART> select vdisk file=E:\Linux\ext4.vhdx
DISKPART> detail vdisk
DISKPART> expand vdisk maximum=128000
DISKPART> detail vdisk
```
Ubuntu can be started via:
```bash
wsl
```
or directly by opening a tab in the Windows Terminal.

### Windows Terminal customization

We don't really want to be root each time Ubuntu is started, so lets start with a non super user account (e.g: red), go to Windows Terminal and specify the user in the wsl command line:
```bash
C:\WINDOWS\system32\wsl.exe -d Ubuntu --user red
``` 
The annoying bell sound could be disabled by unchecking the sound notification in the Advanced tab, and text could be automatically saved into the clipboard when selected, in Interaction enable auto copy.

### Build a distribution with Yocto

As mentionned in the Yocto documentation it will require some specific packages
```bash
sudo apt update
sudo apt install gawk wget git diffstat unzip texinfo gcc build-essential chrpath socat cpio python3 python3-pip python3-pexpect xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev pylint3 xterm python3-subunit mesa-common-dev zstd liblz4-tool
```
Now we can prepare the folders that will receive the downloaded packages needed for the build (/downloads) and start a generation for a qemuarm64 machine based on the hardknott release.
```bash
# prepare folders
mkdir downloads/
mkdir downloads/hardknott
mkdir distribution
mkdir distribution/quick

# get Poky
git clone git://git.yoctoproject.org/poky
git checkout hardknott

# source the environment
. oe-init-build-env
```
Edit conf/local.conf, add
```bash
# specify the packages download folder (in this way it could be reused for another builds)
DL_DIR ?= "/home/red/downloads/hardknott"

# set machine
MACHINE = "qemuarm64"

# add kernel sources to sdk
TOOLCHAIN_TARGET_TASK_append = " kernel-devsrc" 
```
Save and start the build.
```bash
bitbake core-image-minimal
```
It will take around 1h the first time (with 8 cores and 16GB of RAM).
Note: Images will be located in /build/tmp/deploy/images.

### Run distribution

Basically it could be started with QEMU like this:
```bash
/home/red/distribution/quick/poky/build/tmp/work/x86_64-linux/qemu-helper-native/1.0-r1/recipe-sysroot-native/usr/bin/qemu-system-aarch64 \
-device virtio-net-device,netdev=net0,mac=52:54:00:12:34:02 \
-netdev tap,id=net0,ifname=tap0,script=no,downscript=no \
-object rng-random,filename=/dev/urandom,id=rng0 \
-device virtio-rng-pci,rng=rng0 \
-drive id=disk0,file=/home/red/distribution/quick/poky/build/tmp/deploy/images/qemuarm64/core-image-minimal-qemuarm64-20221211211525.rootfs.ext4,if=none,format=raw \
-device virtio-blk-device,drive=disk0 \
-device qemu-xhci \
-machine virt \
-cpu cortex-a57 -m 256 \
-vga none -nographic \
-kernel /home/red/distribution/quick/poky/build/tmp/deploy/images/qemuarm64/Image--5.10.107+git0+24ab54209a_00684b441f-r0-qemuarm64-20221211211525.bin \
-append 'root=/dev/vda rw  mem=256M ip=192.168.7.2::192.168.7.1:255.255.255.0 console=ttyAMA0,115200 '
```

### SDK generation

As you expect to build user land software or maybe drivers it's necessary to generate a SDK that will contain all the tools needed for the cross compilation.
```bash
bitbake core-image-minimal -c populate_sdk
```
Once done, we can deploy it in a specific dir.
```bash
mkdir ~/sdk
mkdir ~/sdk/qemuarm64

./build/tmp/deploy/sdk/poky-glibc-x86_64-core-image-minimal-cortexa57-qemuarm64-toolchain-3.3.6.sh -d ~/sdk/qemuarm64/
```
For drivers build, few more steps are required.
```bash
# source the environment
. /home/red/sdk/qemuarm64/environment-setup-cortexa57-poky-linux

# get kernel sources path
echo $CC

# go to kernel sources
cd /home/red/sdk/qemuarm64/sysroots/cortexa57-poky-linux/usr/src/kernel/

# Generate necessary files
make modules_prepare
```
Before building your applications, environment source will be required:
```bash
. /home/red/sdk/qemuarm64/environment-setup-cortexa57-poky-linux
```
### Useful Git alias
```bash
git config --global alias.glt "log --graph --oneline"
git config --global alias.st status
```
### References
- [Yocto Project Quick build](https://docs.yoctoproject.org/brief-yoctoprojectqs/index.html)
- [System Requirements](https://docs.yoctoproject.org/ref-manual/system-requirements.html#required-packages-for-the-build-host)
- [Change the directory of WSL](https://dev.to/_mohanmurali/change-the-directory-of-wsl-36hg)
- [Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)