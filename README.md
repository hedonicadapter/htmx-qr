## go (använder templating inte htmx-json):
http://localhost:3000/theme/dark or light
använder style-tag, behövs ingen cache busting AFAIK

## node-handlebars branch:
http://localhost:3000/templating/dark
 
## node main (saknar SSR stylesheets, välj en templating engine eller htmx-json):
http://localhost:3000/templating
http://localhost:3000/htmx-json

## analysis paralysis:

htmx-json är med i official htmx-repot men verkar bara vara utvecklat och maintained av en person så client-side-templates är att föredra

mustache är unmaintained i think
handlebars vs nunjucks är analysis paralysis och det går att byta när man vill
