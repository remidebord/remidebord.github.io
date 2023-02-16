---
layout: post
title: "Eagle and 3D PCB"
author: 'Rémi Debord'
comments: true
---

Years ago i was looking for a solution of 3D rendering for [Eagle CAD](https://www.autodesk.com/products/eagle/overview) in order to check visually how a PCB could fit into a specific box or if it could be optimized.
[Altium](https://www.altium.com/), [Cadence](https://www.cadence.com/), [Proteus](https://www.labcenter.com/), and many others were proposing those solutions, but Eagle was free as long as you don't want gigantic PCB, easy to use, and very popular (used by [Adafruit](https://www.adafruit.com/), [Sparkfun](https://www.sparkfun.com/), [Snootlab](https://web.archive.org/web/20150107073446/http://snootlab.fr/), ...).

[Jerome Lamy](jerome.lamy@gmail.com) worked on solution which permit to get the PCB 3D rendering in Sketchup based on some Eagle information export.
This solution is named EagleUp and still available for free, even if now Kicad is doing the job.

As I have always trouble with the installation, this page will serve as a note for the future (and yes, Eagle 7.4 and Sketchup 8 are still doing the job nicely in 2023).

### Download

List of files to download:
- [Eagle 7.4.0](../../../uploads/Eagle.7z)
- [Sketchup 8](../../../uploads/Sketchup.7z)
- [ImageMagick 6.9.2 4 Q8](../../../uploads/ImageMagick.7z)
- [EagleUp 4.5](../../../uploads/EagleUp4.5.7z)

### Installation

Start to install Eagle, Sketchup and ImageMagick (avoid spaces in ImageMagick install path).

Now we can focus on EagleUp:
- Decompress the archive and copy/paste the Eagle plugin (eagleUp_export.ulp) in C:\EAGLE-7.4.0\ulp.
- Open Sketchup, go to Windows > Preferences and install the extension eagleUp_import.rbz.
- Put the /models folder in C:\EAGLE-7.4.0\models (recommended).

Important: after the ImageMagick install, you may need to restart the computer in order to refresh paths, else you could get some irritating errors at Sketchup import, like: NoMethodError gsub! ... .

### Test

Open the demo board file (demo3d.brd) with Eagle, go to File > Run ULP ..., and select the eagleUp_export.ulp

[![eagleup_ulp](../../../uploads/run_eaglup_ulp.png)](../../../uploads/run_eaglup_ulp.png)

Configure the following fields as above (export folder will be created in your hardware design folder), click on OK, and wait for the export completed popup.

[![eagleup_export](../../../uploads/eagleup_export.png)](../../../uploads/eagleup_export.png)

Now, open Sketchup and import the demo3d.eup file via Plugins > Import EagleUp v4.5

[![sketchup_import](../../../uploads/sketchup_import.png)](../../../uploads/sketchup_import.png)

Sketchup, may ask you to resize some components, say yes, and enjoy.

More 3D packages are avalaibles on [3D Warehouse](https://3dwarehouse.sketchup.com/search/?q=%23eagleup&searchTab=model) and [Dangerous Prototypes](https://github.com/DangerousPrototypes/Eagle_Part_Library/tree/master/SketchUp_Part_Models) repo. 

### Rendering with Maxwell

For a nice rendering, you can use the [maxwell plugin](../../../uploads/maxwell_for_sketchup8-2.6.10-sa-win.zip), basically you have to install it via the setup (it will require [Silverlight 4](../../../uploads/4.0.60831.0_SilverlightDeveloper4.0.60831.0.exe))

Once your 3D design opened, go to Plugins > Maxwell > Maxwell Fire

[![maxwell_fire](../../../uploads/maxwell_fire.png)](../../../uploads/maxwell_fire.png)

### References
- [EagleUp official website](https://eagleup.wordpress.com/installation-and-setup/)
- [EagleUP 3D models repo](https://github.com/eagleUp/eagleUp)
- [3D Warehouse](https://3dwarehouse.sketchup.com/search/?q=%23eagleup&searchTab=model)
- [HOW-TO: Build 3D models from Eagle files](http://dangerousprototypes.com/blog/2012/03/20/how-to-build-3d-models-from-eagle-files-wiki-page/)