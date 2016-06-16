aws s3 cp dist/mapzen.min.js s3://static-$1.mapzen.com/js/0.0.0/mapzen.min.js
aws s3 cp dist/mapzen.js s3://static-$1.mapzen.com/js/0.0.0/mapzen.js
aws s3 cp dist/css/mapzen.css s3://static-$1.mapzen.com/js/0.0.0/mapzen.css
aws s3 cp --recursive dist/css/images s3://static-$1.mapzen.com/js/0.0.0/images