#!/bin/bash

cd dist
rm *.zip
for i in */; do ditto -ck --rsrc --sequesterRsrc --keepParent "$i" "${i%/}.zip"; done
