---
layout: post
title: "Add an extension to PHP [WampServer]"
---

For an ongoing project, i need to add an extension (timezonedb) to PHP. The First thing to do, is to get the extension already built (.dll), in my case i use this [link](https://pecl.php.net/package/timezonedb/2016.1/windows) and i choose the one which match with my configuration (PHP 5.5, Thread Safety enabled, 32bits x86). You can find your configuration with `phpinfo()`.
Once this step done, you have to paste this file in the right repertory:
```
C:\wamp\bin\php\php5.5.12\ext
```
Next, we have to add this extension to the php.ini file, which can be found in:
```
C:\wamp\bin\apache\apache2.4.9\bin
```
Example (php_timezonedb.dll):
```
...
;extension=php_pdo_odbc.dll
;extension=php_pdo_pgsql.dll
extension=php_pdo_sqlite.dll
;extension=php_pgsql.dll
extension=php_shmop.dll
extension=php_timezonedb.dll
...
```
Next <u>start/restart Wampserver</u> and you can see the addition of your extension with a `phpinfo()` or in WampServer menu (PHP > PHP extensions).