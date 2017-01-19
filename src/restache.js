const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Handlebars = require('handlebars');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');

const r2s = ReactDOMServer.renderToString;
const RElt = React.createElement;

let context = {name: 'Max', age: 3};
let source = `
<div id="hi" class="mom" data-stuff="data" custom="blah">
  <h1 class="title">Title</h1>
  {{name}} is {{age}} years old.
</div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, facilis vero culpa ipsam! Debitis animi sapiente ex provident aliquid, odio vitae consequuntur magnam fuga suscipit, sit hic voluptate laboriosam perspiciatis!</p>`;
let template = Handlebars.compile(source);
let html = template(context);

let outer = elt => elt.clone().wrap('<p>').parent().html();

let $ = cheerio.load(html);
// let logme = $('div').contents().toArray().map(x => x.attributes);
// let logme = Object.keys($('div').prop('myProp', 'set')[0]);

let onopentag = function(name, attribs) {
  console.log(`TAG OPENED\nname: ${name}\nattribs: ${"none" && JSON.stringify(attribs)}\n`);
}

let onclosetag = function(tagname) {
  console.log(`TAG CLOSED:\n${tagname}\n`);
}

let ontext = function(text) {
  console.log(`TEXT\n${text}`);
}


// let parser = new htmlparser.Parser({onopentag, onclosetag, ontext}, {decodeEntitles: true});
// parser.write(html);
// parser.end();

// console.log(logme);

var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error)
       console.log(error) 
    else
        console.log(this);
});

var parser = new htmlparser.Parser(handler);
parser.write(html)
parser.done();

console.log("\n\n\n\n\n\n");
console.log(handler.dom.map( o => (o.type == 'text') ? o.data : o.name));