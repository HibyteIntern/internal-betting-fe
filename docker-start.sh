#!/bin/bash
echo "(function (window) {window.__env = window.__env || {}; window.__env.production = $PRODUCTION; window.__env.api = '$API_URL';})(this);" > /usr/local/apache2/htdocs/env.js
httpd-foreground
