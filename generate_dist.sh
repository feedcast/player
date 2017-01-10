#!/bin/bash

rm -rf dist/css
rm -rf dist/js
cp -Rfp build/static/css dist/css
cp -Rfp build/static/js dist/js
mv dist/js/main.*.js dist/js/feedcast-player.min.js
mv dist/css/main.*.css dist/css/feedcast-player.min.css