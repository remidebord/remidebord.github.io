---
layout: post
title: "Bad redirection [WampServer]"
---

When you have just installed WampServer and start a new project (`/www` repertory), the project can be reach by use this kind of URL localhost/myProject. But, with newer version of WampServer, localhost redirection is removed.
So, in order to fix it quickly, we have to modify the index.php file (``):
```
C:\wamp\www\index.php
```
and change value of $suppress_localhost to false.
```
$suppress_localhost = false;
```
