console.log('Ad blocker version 1');

// See http://pgl.yoyo.org/as/serverlist.php?showintro=0;hostformat=hosts
// for many more ad network hostnames
var AD_NETWORK_HOSTS = [
  'adimages',
  'admonitor',
  'advertising',
  'amazingmedia',
  'amazon-adsystem',
  'clickagents',
  'commission-junction',
  'doubleclick',
  'go2net',
  'infospace',
  'linksynergy',
  'moatads',
  'msads',
  'outbrain',
  'powerlinks',
  'qksrv',
  'yimg',
  'zedo'
];

function blockAds(details) {
  if (details.url.indexOf('http') !== 0) {
    return;
  }

  var host = getLocation(details.url).host;
  console.log('checking host:',host);

  for (var i = 0; i < AD_NETWORK_HOSTS.length; i++) {
    if (host.indexOf(AD_NETWORK_HOSTS[i]) !== -1) {
      console.log(`%cblocking script: ${details.url}`, 'color: red; font-weight: bold; background-color: lightpink;');
      return { cancel: true };
    }
  }

  var subdomain = host.split('.')[0];
  if (subdomain === 'ad' || subdomain === 'ads') {
    console.log('blocking script',details.url);
    return { cancel: true };
  }
}

chrome.webRequest.onBeforeRequest.addListener(blockAds, {
  urls: ['<all_urls>'],
  types: ['script']
}, ['blocking']);

// see http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}
