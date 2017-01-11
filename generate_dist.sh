#!/bin/bash

# Copy css files
if [ -f build/static/css/feedcast-player.css ]
then
	cp -Rfp build/static/css/feedcast-player.css dist/css/feedcast-player.css
	cp -Rfp build/static/css/feedcast-player.css.map dist/css/feedcast-player.css.map
fi

if [ -f build/static/css/feedcast-player.min.css ]
then
	cp -Rfp build/static/css/feedcast-player.min.css dist/css/feedcast-player.min.css
	cp -Rfp build/static/css/feedcast-player.min.css.map dist/css/feedcast-player.min.css.map
fi

# Copy js files
if [ -f build/static/js/feedcast-player.js ]
then
	cp -Rfp build/static/js/feedcast-player.js dist/js/feedcast-player.js
	cp -Rfp build/static/js/feedcast-player.js.map dist/js/feedcast-player.js.map
fi

if [ -f build/static/js/feedcast-player.min.js ]
then
	cp -Rfp build/static/js/feedcast-player.min.js dist/js/feedcast-player.min.js
	cp -Rfp build/static/js/feedcast-player.min.js.map dist/js/feedcast-player.min.js.map
fi