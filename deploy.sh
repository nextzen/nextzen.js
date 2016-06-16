#!/bin/bash

aws s3 cp dist/mapzen.min.js s3://$1/js/0.0.0/mapzen.min.js
aws s3 cp dist/mapzen.js s3://$1/js/0.0.0/mapzen.js
aws s3 cp dist/mapzen.css s3://$1/js/0.0.0/mapzen.css
aws s3 cp --recursive dist/images s3://$1/js/0.0.0/images
