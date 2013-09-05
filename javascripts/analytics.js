var hostname = location.hostname == 'localhost' ? 'none' : location.hostname;
console.log(hostname);
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-43788424-1']);
_gaq.push(['_setDomainName', hostname]);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript';
  ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
  'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();