---
layout: post
title: "Yocto cheatsheet"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---

### poky
Download
```bash
git clone git://git.yoctoproject.org/poky.git

# or with a specific version/branch (ex: hardknott)
git clone -b hardknott git://git.yoctoproject.org/poky.git

# if you miss the branch selection at download
cd poky
git checkout hardknott
```
List of Yocto versions is available at [Yocto Project releases](https://wiki.yoctoproject.org/wiki/Releases).

You might need to install some packages for build
```bash
sudo apt update
sudo apt install gawk wget git diffstat unzip texinfo gcc build-essential chrpath socat cpio python3 python3-pip python3-pexpect xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev pylint3 xterm python3-subunit mesa-common-dev zstd liblz4-tool
```

Build environment setup
```bash
cd poky
source oe-init-build-env
```
Note: it will create a ./build directory with a configuration file (local.conf) and set many environment variables.

Now let's build the distro
```bash
bitbake core-image-minimal
```
If we need a SDK for software development
```bash
bitbake core-image-minimal -c populate-sdk
```
If kernel sources are required (e.g: drivers development), add the following to your local.conf
```bash
# Add kernel sources to SDK
TOOLCHAIN_TARGET_TASK_append = " kernel-devsrc"
```
Note: by default, images, sdk, will be present in ./tmp/deploy/images and ./tmp/deploy/sdk.

Install the sdk in a specific location (ex: ~/distribution/hardknott/sdk/)
```bash
./tmp/deploy/sdk/poky-glibc-x86_64-core-image-minimal-cortexa57-qemuarm64-toolchain-3.3.6.sh -d ~/distribution/hardknott/sdk/ 
```
Source SDK
```bash
. ~/distribution/hardknott/sdk/environment-setup-cortexa57-poky-linux
```
For linux kernel driver development you will need to prepare the kernel in the SDK folder
```bash
# Go to kernel sources in the SDK install directory
cd ~/distribution/hardknott/sdk/sysroots/cortexa57-poky-linux/usr/src/kernel/
# Start generation of configuration and header files
make modules_prepare
```
### bitbake
Add a layer
```bash
bitbake-layers add-layer [layer_path]

# examples:
bitbake-layers add-layer ../meta-openembedded/meta-oe/
bitbake-layers add-layer ../meta-openembedded/meta-python/
bitbake-layers add-layer ../meta-openembedded/meta-networking/
bitbake-layers add-layer ../meta-openembedded/meta-security/
```
Show layers (it will display the content of bblayers.conf)
```bash
bitbake-layers show-layers
```
Show available recipes
```bash
bitbake-layers show-recipes
```
Start a start from a recipe
```bash
bitbake [recipe] -c [task]

# examples
bitbake virtual/kernel -c menuconfig
bitbake devmem2 -c build
bitbake python3 -c cleansstate
```
List tasks from a given recipe
```bash
bitbake [recipe] -c listtasks
```
Most knowns tasks are: fetch, configure, build, install, cleansstate.

Remove output files, sstate-cache
```bash
bitbake [recipe] -c cleansstate
```
cleansstate should be prefered to cleanall, as it don't remove the downloaded content (which avoid to fetch again, and spend time to download sources).

Launch recipe devshell (useful for debugging a recipe, when you got an error to a specific task, or just check the location of the source files).
```bash
bitbake [recipe] -c devshell 
```
Note: recipe logs are stored in the ./tmp directory of the recipe build directory (like bash scripts for configure, build, install, ...).

### recipetool
A convenient tool for layer and recipe.

Create a layer
```bash
bitbake-layers create-layer ../meta-red
```
Append an existing recipe (ex: virtual/kernel) in our own layer (ex: meta-red)
```bash
recipetool newappend ../meta-red virtual/kernel
```
Append an existing recipe (ex: busybox) in our own layer (ex: meta-red) and add automatically a fragment, patch or any file (ex: fragment.cfg).
```bash
recipetool appendsrcfile -w ../meta-red/ busybox ~/fragment.cfg
```
Note: file added will be included to the SRC_URI of the recipe.

Usually i use appendsrcfile when i want to set different options/features for the linux kernel
```bash
# Open kernel configuration menu, add/remove features and SAVE!
bitbake virtual/kernel -c menuconfig

# Generate a config file that will contain the features added and/or removed (ex: fragment.cfg)
bitbake virtual/kernel -c diffconfig

# Append the linux kernel recipe and add our configuration file
recipetool appendsrcfile -w ../meta-red/ virtual/kernel ~/fragment.cfg
```
### References
- [Yocto Project documentation](https://docs.yoctoproject.org/)
- [Linux embarqué avec Yocto Project](https://www.blaess.fr/christophe/yocto-lab/files/)
- [Xilinx Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto)
- [OpenEmbedded layers](https://layers.openembedded.org)
- [Embedded Linux Wiki](https://elinux.org/Bitbake_Cheat_Sheet)