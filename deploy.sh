#!/bin/bash
set -e

BUCKET="${1}"
VPATCH=`cut -d. -f1,2,3 VERSION`
VMINOR=`cut -d. -f1,2 VERSION`
VMAJOR=`cut -d. -f1 VERSION`

for DIR in "js/${VPATCH}" "js/${VMINOR}" "js/${VMAJOR}" "js"; do
    aws s3 cp dist/mapzen.min.js s3://${BUCKET}/${DIR}/mapzen.min.js
    aws s3 cp dist/mapzen.js s3://${BUCKET}/${DIR}/mapzen.js
    aws s3 cp dist/mapzen.css s3://${BUCKET}/${DIR}/mapzen.css
    aws s3 cp --recursive dist/images s3://${BUCKET}/${DIR}/images
done
