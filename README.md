# WinMimic

A simple Firefox extension that will replace the OS part of the Firefox User-Agent header to mimic the Windows version of Firefox.

The intention is to only replace the OS related portion of the User-Agent so version information remains intact. This is useful for Linux users where some websites (*cough* Shopify *cough*) will not function correctly when presented with the Linux Firefox User-Agent.

For example `Mozilla/5.0 (X11; Linux i686; rv:134.0) Gecko/20100101 Firefox/134.0` would become `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0.`
