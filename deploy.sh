#!/bin/bash
set -e

if [ $# -ne 2 ]; then
    echo "Usage: $0 {version number} {S3 bucket}"
    exit 1
fi

VPATCH=`echo ${1} | cut -d. -f1,2,3 -`
VMINOR=`echo ${1} | cut -d. -f1,2 -`
VMAJOR=`echo ${1} | cut -d. -f1 -`
BUCKET="${2}"

if aws s3 ls "s3://${BUCKET}/js/${VPATCH}/mapzen.min.js"; then
    echo "s3://${BUCKET}/js/${VPATCH}/mapzen.min.js already exits, checking diffs..."
    aws s3 cp --recursive --quiet "s3://static-prod.mapzen.com/js/${VPATCH}" "live-${VPATCH}"

    for NAME in mapzen.min.js mapzen.js mapzen.css images; do
        if diff -rq "dist/${NAME}" "live-${VPATCH}/${NAME}"; then
            echo "No differences between dist/${NAME} and live-${VPATCH}/${NAME}"
        else
            echo "Refusing to deploy due to a difference between dist/${NAME} and live-${VPATCH}/${NAME}"
            exit 0
        fi
    done
else
    echo "Nothing found at s3://${BUCKET}/js/${VPATCH}/mapzen.min.js"
fi

for DIR in "js/${VPATCH}" "js/${VMINOR}" "js/${VMAJOR}" "js"; do
    ./upload.sh ${DIR} ${BUCKET}
done
