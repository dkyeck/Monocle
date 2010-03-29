/* FRAMER
 *
 * Loads a reader into a dynamically generated iframe.
 *
 */

Monocle.Framer = function () {
  if (Monocle == this) { return new Monocle.Framer(); }

  var k = {
    scripts: [
      "../../src/monocle.js",
      "../../src/compat.js",
      "../../src/reader.js",
      "../../src/book.js",
      "../../src/component.js",
      "../../src/place.js",
      "../../src/styles.js",
      "../../src/flippers/slider.js",
      "../../src/flippers/legacy.js"
    ],
    documentStylesheet:
      "body { margin: 0; padding: 0; border: 0; }" +
      "#rdr { width: 100%; height: 100%; position: absolute; }"
  }

  var p = {
  }

  var API = {
    constructor: Monocle.Framer,
    properties: p,
    constants: k
  }


  function initialize() {
  }


  function newReader(node, bookData, options) {
    p.node = typeof(node) == "string" ? document.getElementById(node) : node;
    p.bookData = bookData;
    p.readerOptions = options;
    p.frame = document.createElement("IFRAME");
    p.frame.src = "javascript: null;";
    p.frame.style.cssText = Monocle.Styles.ruleText('framer');
    p.node.appendChild(p.frame);
    p.cWin = p.frame.contentWindow;
    var html = '<html><head>';
    for (var i = 0; i < k.scripts.length; ++i) {
      html += '<script type="text/javascript" src="'+k.scripts[i]+'"></script>';
    }
    html += '<script type="text/javascript">' +
      'Monocle.addListener(window, "load", function () {' +
        'window.framer.frameLoaded();' +
      '});</script>';
    html += '<style type="text/css">'+k.documentStylesheet+'</style>';
    html += '</head><body><div id="rdr"></div></body></html>';

    doc = p.cWin.document;
    doc.open();
    doc.write(html);
    p.cWin.framer = API;
    doc.close();
  }


  function frameLoaded() {
    p.cWin.reader = p.cWin.Monocle.Reader('rdr', p.bookData, p.readerOptions);
  }


  initialize();

  API.newReader = newReader;
  API.frameLoaded = frameLoaded;

  return API;
}


Monocle.Styles.framer = {
  "width": "100%",
  "height": "100%",
  "border": "0",
  "display": "block"
}
