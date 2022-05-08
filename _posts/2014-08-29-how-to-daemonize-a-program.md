---
layout: post
---

On Linux, there are "two" ways to daemonize a program. The old way which is the most standard and can be applied to every distributions, with using [start-stop-daemon](http://manpages.ubuntu.com/manpages/lucid/fr/man8/start-stop-daemon.8.html). And a more recent way using [Upstart](http://upstart.ubuntu.com/) which is a replacement for System V init, available on Ubuntu, and which provide a lot of interesting features (like respawn and events).
## First method: start-stop-daemon
Open a text editor.
```bash
nano /home/user/myService
```
Then, paste this code and adapt if for your needs, by modifying these four fields, DAEMON, DEAMON_OPT, DAEMON_USER and DEAMON_NAME.
```bash
#! /bin/sh -e

DAEMON="/programDirectory/myProgram" # Program command line
DEAMON_OPT="-n -d"  # Command line arguments (options)
DAEMONUSER="user" # Program user
DEAMON_NAME="myProgram" #Program name (Same as the executable)

PATH="/sbin:/bin:/usr/sbin:/usr/bin"

test -x $DAEMON || exit 0

. /lib/lsb/init-functions

d_start () {
        log_daemon_msg "Starting system $DEAMON_NAME Daemon"
 start-stop-daemon --background --name $DEAMON_NAME --start --quiet --chuid $DAEMONUSER --exec $DAEMON -- $DEAMON_OPT
        log_end_msg $?
}

d_stop () {
        log_daemon_msg "Stopping system $DEAMON_NAME Daemon"
        start-stop-daemon --name $DEAMON_NAME --stop --retry 5 --quiet --name $DEAMON_NAME
 log_end_msg $?
}

case "$1" in

        start|stop)
                d_${1}
                ;;

        restart|reload|force-reload)
                        d_stop
                        d_start
                ;;

        force-stop)
               d_stop
                killall -q $DEAMON_NAME || true
                sleep 2
                killall -q -9 $DEAMON_NAME || true
                ;;

        status)
                status_of_proc "$DEAMON_NAME" "$DAEMON" "system-wide $DEAMON_NAME" &amp;&amp; exit 0 || exit $?
                ;;
        *)
                echo "Usage: /etc/init.d/$DEAMON_NAME {start|stop|force-stop|restart|reload|force-reload|status}"
                exit 1
                ;;
esac
exit 0
```
Once done, save it, and copy it in the init.d directory.
```bash
sudo cp /home/user/myService /etc/init.d/
```
Then change the access permissions.
```bash
sudo chmod +x /etc/init.d/myService
```
That's all !
We can test our service (daemon) by using manually commands (start, stop or restart).
```bash
sudo /etc/init.d/myService start
* Starting system myProgram Daemon
sudo /etc/init.d/myService stop
* Stopping system myProgram Daemon
```
If you want to launch your service at startup, you have just to create some init scripts by using this command.
```bash
sudo update-rc.d myService defaults
 Adding system startup for /etc/init.d/myService ...
   /etc/rc0.d/K20myService -&gt; ../init.d/myService 
   /etc/rc1.d/K20myService -&gt; ../init.d/myService
   /etc/rc6.d/K20myService -&gt; ../init.d/myService
   /etc/rc2.d/S20myService -&gt; ../init.d/myService
   /etc/rc3.d/S20myService -&gt; ../init.d/myService
   /etc/rc4.d/S20myService -&gt; ../init.d/myService
   /etc/rc5.d/S20myService -&gt; ../init.d/myService</pre>
```
## Second method: Upstart
In order to prevent any access permissions problems we use a copy of an existing script, the most common is rcS.conf.
```bash
sudo cp /etc/init/rcS.conf /etc/init/myService.conf
```
Then open it,
```bash
sudo nano /etc/init/myService.conf
```
and replace all the code by this skeleton.
```
# Upstart script skeleton
description "myService daemon"
author "Name Firstname name.firstname[at]domain.com"

# Launch the service at boot
start on runlevel [2345]

script
# Launch the program
exec /home/user/programDirectory/myProgram
end script

# Relaunch the program if it die
respawn

# Relaunch forever
respawn limit unlimited
```
Adapt the program path, save it, that's all !
The service can be start or stop manually with these commands.
```bash
sudo start myService
 myService start/running, process 1972

sudo stop myService
 myService stop/waiting
```
If you want to know the status of your service just run this.
```bash
initctl list | grep myService
```
Note: by default the standard outputs stream (stdout and stderr) of the program are put in a log file which have the name of the service and situate in:
```bash
/var/log/upstart/myService.log
```
