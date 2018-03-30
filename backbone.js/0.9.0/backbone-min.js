// Backbone.js 0.9.0
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var i=this,r=i.Backbone,s=Array.prototype.slice,t=Array.prototype.splice,g;g=typeof exports!=="undefined"?exports:i.Backbone={};g.VERSION="0.9.0";var f=i._;!f&&typeof require!=="undefined"&&(f=require("underscore"));var h=i.jQuery||i.Zepto||i.ender;g.noConflict=function(){i.Backbone=r;return this};g.emulateHTTP=false;g.emulateJSON=false;g.Events={on:function(a,b,c){for(var d,a=a.split(/\s+/),e=this._callbacks||(this._callbacks={});d=a.shift();){d=e[d]||(e[d]={});var f=d.tail||(d.tail=
d.next={});f.callback=b;f.context=c;d.tail=f.next={}}return this},off:function(a,b,c){var d,e,f;if(a){if(e=this._callbacks)for(a=a.split(/\s+/);d=a.shift();)if(f=e[d],delete e[d],b&&f)for(;(f=f.next)&&f.next;)if(!(f.callback===b&&(!c||f.context===c)))this.on(d,f.callback,f.context)}else delete this._callbacks;return this},trigger:function(a){var b,c,d,e;if(!(d=this._callbacks))return this;e=d.all;for((a=a.split(/\s+/)).push(null);b=a.shift();)e&&a.push({next:e.next,tail:e.tail,event:b}),(c=d[b])&&
a.push({next:c.next,tail:c.tail});for(e=s.call(arguments,1);c=a.pop();){b=c.tail;for(d=c.event?[c.event].concat(e):e;(c=c.next)!==b;)c.callback.apply(c.context||this,d)}return this}};g.Events.bind=g.Events.on;g.Events.unbind=g.Events.off;g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=j(this,"defaults"))a=f.extend({},c,a);if(b&&b.collection)this.collection=b.collection;this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");this._changed={};if(!this.set(a,{silent:true}))throw Error("Can't create an invalid model");
this._changed={};this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(g.Model.prototype,g.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.attributes[a];return this._escapedAttributes[a]=f.escape(b==null?"":""+b)},has:function(a){return this.attributes[a]!=null},set:function(a,b,c){var d,
e;f.isObject(a)||a==null?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;if(d instanceof g.Model)d=d.attributes;if(c.unset)for(e in d)d[e]=void 0;if(this.validate&&!this._performValidation(d,c))return false;if(this.idAttribute in d)this.id=d[this.idAttribute];var b=this.attributes,k=this._escapedAttributes,n=this._previousAttributes||{},u=this._changing;this._changing=true;for(e in d)if(a=d[e],f.isEqual(b[e],a)||delete k[e],c.unset?delete b[e]:b[e]=a,delete this._changed[e],!f.isEqual(n[e],a)||
f.has(b,e)!=f.has(n,e))this._changed[e]=a;if(!u)!c.silent&&this.hasChanged()&&this.change(c),this._changing=false;return this},unset:function(a,b){(b||(b={})).unset=true;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=true;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return false;c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},
save:function(a,b,c){var d;f.isObject(a)||a==null?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};if(d&&!this[c.wait?"_performValidation":"set"](d,c))return false;var e=this,k=c.success;c.success=function(a,b,g){b=e.parse(a,g);c.wait&&(b=f.extend(d||{},b));if(!e.set(b,c))return false;k?k(e,a):e.trigger("sync",e,a,c)};c.error=g.wrapError(c.error,e,c);a=this.isNew()?"create":"update";return(this.sync||g.sync).call(this,a,this,c)},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",
b,b.collection,a)};if(this.isNew())return d();a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=j(this.collection,"url")||j(this,"urlRoot")||o();return this.isNew()?a:a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==
null},change:function(a){for(var b in this._changed)this.trigger("change:"+b,this,this._changed[b],a);this.trigger("change",this,a);this._previousAttributes=f.clone(this.attributes);this._changed={}},hasChanged:function(a){return a?f.has(this._changed,a):!f.isEmpty(this._changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this._changed):false;var b,c=false,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!a||
!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},_performValidation:function(a,b){var c=this.validate(f.extend({},this.attributes,a),b);return c?(b.error?b.error(this,c,b):this.trigger("error",this,c,b),false):true}});g.Collection=function(a,b){b||(b={});if(b.comparator)this.comparator=b.comparator;this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:true,parse:b.parse})};f.extend(g.Collection.prototype,
g.Events,{model:g.Model,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){var c,d,e,g,h,i={},j={};b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");if(i[g=e.cid]||this._byCid[g]||(h=e.id)!=null&&(j[h]||this._byId[h]))throw Error("Can't add the same model to a collection twice");i[g]=j[h]=e}for(c=0;c<d;c++)(e=a[c]).on("all",this._onModelEvent,
this),this._byCid[e.cid]=e,e.id!=null&&(this._byId[e.id]=e);this.length+=d;t.apply(this.models,[b.at!=null?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:true});if(b.silent)return this;for(c=0,d=this.models.length;c<d;c++)if(i[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c])){delete this._byId[g.id];delete this._byCid[g.cid];
e=this.indexOf(g);this.models.splice(e,1);this.length--;if(!b.silent)b.index=e,g.trigger("remove",g,this,b);this._removeReference(g)}return this},get:function(a){return a==null?null:this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);this.comparator.length==1?this.models=this.sortBy(b):this.models.sort(b);
a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,{silent:true,parse:b.parse});b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};if(a.parse===void 0)a.parse=true;var b=this,c=a.success;a.success=function(d,e,f){b[a.add?"add":"reset"](b.parse(d,
f),a);c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return false;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,
b){if(a instanceof g.Model){if(!a.collection)a.collection=this}else{var c;b.collection=this;a=new this.model(a,b);a.validate&&!a._performValidation(a.attributes,b)&&(a=false)}return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){(a=="add"||a=="remove")&&c!=this||(a=="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,
arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){g.Collection.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});g.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,arguments)};
var v=/:\w+/g,w=/\*\w+/g,x=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(g.Router.prototype,g.Events,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new g.History);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=
[],b;for(b in this.routes)a.unshift([b,this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(x,"\\$&").replace(v,"([^/]+)").replace(w,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")};var m=/^[#\/]/,y=/msie [\w.]+/,l=false;f.extend(g.History.prototype,g.Events,{interval:50,getFragment:function(a,b){if(a==null)if(this._hasPushState||
b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=window.location.hash;a=decodeURIComponent(a.replace(m,""));a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a},start:function(a){if(l)throw Error("Backbone.history has already been started");this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!window.history||
!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=y.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7))this.iframe=h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);if(this._hasPushState)h(window).bind("popstate",this.checkUrl);else if(this._wantsHashChange&&"onhashchange"in window&&!b)h(window).bind("hashchange",this.checkUrl);else if(this._wantsHashChange)this._checkUrlInterval=setInterval(this.checkUrl,this.interval);
this.fragment=a;l=true;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,true),window.location.replace(this.options.root+"#"+this.fragment),true;else if(this._wantsPushState&&this._hasPushState&&b&&a.hash)this.fragment=a.hash.replace(m,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment);if(!this.options.silent)return this.loadUrl()},
stop:function(){h(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);l=false},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.iframe.location.hash));if(a==this.fragment||a==decodeURIComponent(this.fragment))return false;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(window.location.hash)},loadUrl:function(a){var b=
this.fragment=this.getFragment(a);return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),true})},navigate:function(a,b){if(!l)return false;if(!b||b===true)b={trigger:b};var c=(a||"").replace(m,"");if(!(this.fragment==c||this.fragment==decodeURIComponent(c)))this._hasPushState?(c.indexOf(this.options.root)!=0&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,
c,b.replace),this.iframe&&c!=this.getFragment(this.iframe.location.hash)&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a)},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};
var z=/^(\S+)\s*(.*)$/,p="model,collection,el,id,attributes,className,tagName".split(",");f.extend(g.View.prototype,g.Events,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);b&&h(a).attr(b);c&&h(a).html(c);return a},setElement:function(a,b){this.$el=h(a);this.el=this.$el[0];b!==false&&this.delegateEvents()},delegateEvents:function(a){if(a||(a=
j(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Event "'+a[b]+'" does not exist');var d=b.match(z),e=d[1],d=d[2],c=f.bind(c,this);e+=".delegateEvents"+this.cid;d===""?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=p.length;b<c;b++){var d=p[b];a[d]&&(this[d]=a[d])}this.options=
a},_ensureElement:function(){if(this.el)this.setElement(this.el,false);else{var a=j(this,"attributes")||{};if(this.id)a.id=this.id;if(this.className)a["class"]=this.className;this.setElement(this.make(this.tagName,a),false)}}});g.Model.extend=g.Collection.extend=g.Router.extend=g.View.extend=function(a,b){var c=A(this,a,b);c.extend=this.extend;return c};var B={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=B[a],e={type:d,dataType:"json"};if(!c.url)e.url=j(b,
"url")||o();if(!c.data&&b&&(a=="create"||a=="update"))e.contentType="application/json",e.data=JSON.stringify(b.toJSON());if(g.emulateJSON)e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{};if(g.emulateHTTP&&(d==="PUT"||d==="DELETE")){if(g.emulateJSON)e.data._method=d;e.type="POST";e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)}}if(e.type!=="GET"&&!g.emulateJSON)e.processData=false;return h.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,
e){e=d===b?e:d;a?a(d,e,c):b.trigger("error",d,e,c)}};var q=function(){},A=function(a,b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);q.prototype=a.prototype;d.prototype=new q;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},j=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},o=function(){throw Error('A "url" property or function must be specified');}}).call(this);
