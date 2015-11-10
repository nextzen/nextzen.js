## How to run


```
sudo npm install webpack -g
npm install
bower install
npm run dev
```
go to `localhost:3000`.
if you are getting error at this step, try install webpack locally
```
npm install webpack
```

There are some asset path issue here, so if you want to see production version on local you should

```
npm run localbuild
```

then 

```
ls maps
python -m simpleHTTPServer
```
go to `localhost:8000`, you should be able to see the production version.