#!/bin/bash
set -e

if [ $# -ne 2 ]; then
    echo "Usage: $0 {directory name} {S3 bucket}"
    exit 1
fi

DIR="${1}"
BUCKET="${2}"

aws s3 cp dist/docs.tar.gz s3://${BUCKET}/${DIR}/docs.tar.gz
aws s3 cp dist/mapzen.min.js s3://${BUCKET}/${DIR}/mapzen.min.js
aws s3 cp dist/mapzen.js s3://${BUCKET}/${DIR}/mapzen.js
aws s3 cp dist/mapzen.css s3://${BUCKET}/${DIR}/mapzen.css
aws s3 cp dist/mapzen.standalone.min.js s3://${BUCKET}/${DIR}/mapzen.standalone.min.js
aws s3 cp dist/mapzen.standalone.js s3://${BUCKET}/${DIR}/mapzen.standalone.js
aws s3 cp dist/mapzen.standalone.css s3://${BUCKET}/${DIR}/mapzen.standalone.css
aws s3 cp --recursive dist/images s3://${BUCKET}/${DIR}/images
