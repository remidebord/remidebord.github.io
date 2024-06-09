---
layout: post
title: "Remote machine configuration"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
Configuration of the Thinkpad T470p laptop for a remote use.

### Update GRUB settings

Install grub-customizer (not the best way, but do the job).
```shell
sudo add-apt-repository ppa:danielrichter2007/grub-customizer
sudo apt-get update
sudo apt-get install grub-customizer
```

Open grub-cutomizer, change the boot order and set a timeout of 3 seconds.

### Power management (lid closure)

Open logind.conf.
```shell
sudo vim /etc/systemd/logind.conf
```

Uncomment `HandleLidSwitch` and `HandleLidSwitchExternalPower` and set it to `ignore`.
```shell
...
#HandleHibernateKey=hibernate
#HandleHibernateKeyLongPress=ignore
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
#HandleLidSwitchDocked=ignore
#PowerKeyIgnoreInhibited=no
...
```

### Install SSH server

Install `openssh-server` and reboot (i didn't found sshd.service).

```shell
sudo apt install openssh-server
reboot
```

On the client side, generate the SSH key and copy it to the `turtle` remote machine (will ask for password)
```shell
ssh-keygen -t rsa
ssh-copy-id turtle
```

Check if the SSH connection is asking again for a password.
```shell
ssh turtle
```

### References
- [How do i change the grub boot order](https://askubuntu.com/questions/100232/how-do-i-change-the-grub-boot-order)
- [Change lid close behavior in Ubuntu](https://ubuntuhandbook.org/index.php/2020/05/lid-close-behavior-ubuntu-20-04/)
- [Serveur OpenSSH](https://guide.ubuntu-fr.org/server/openssh-server.html)