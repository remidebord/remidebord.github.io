---
layout: post
title: "Disable hibernate and reduce virtual memory [Windows]"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
After a fresh install of Windows on a SSD, here is some tips which permit to earn some disk space and permit to not voids the [warranty](http://www.makeuseof.com/tag/disable-hibernate-ssd-warranty-purposes/).

First, disable the hibernate mode (by using the command prompt) :
```
powercfg -h off
```
Next, reduce or disable the virtual memory (which is equal to your amount of RAM !) by following these [steps](https://support.microsoft.com/en-us/help/15055/windows-7-optimize-windows-better-performance#1TC=windows-7).

These two tips permit to free up a lot of drive space (20GB on my configuration !).
