## How to run

```
sudo npm install webpack -g
npm install
bower install
NODE_ENV=production webpack -p
```
if you are getting error at this step, try install webpack locally
```
npm install webpack
```
to run dev server
```
npm run dev
```
go to `localhost:8080`

to see production version
```
cd dist
python -m SimpleHTTPServer (or whatever local server you prefer)
```
go to `localhost:8000` on browser (or other port you opened)