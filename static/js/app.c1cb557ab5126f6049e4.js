webpackJsonp([5],{NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("/5sW"),a={name:"App",computed:{currentTheme:{get:function(){return this.$store.state.currentTheme},set:function(e){this.$store.dispatch("changeTheme",e)}}},methods:{autoChooseTheme:function(){switch((new Date).getMonth()){case 11:case 0:case 1:this.currentTheme="winter";break;case 2:case 3:case 4:this.currentTheme="spring";break;case 5:case 6:case 7:this.currentTheme="summer";break;case 8:case 9:case 10:this.currentTheme="autumn"}}},created:function(){this.currentTheme||this.autoChooseTheme()}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{class:this.currentTheme+"-theme",attrs:{id:"app"}},[t("transition",{attrs:{name:"fade"}},[t("router-view")],1)],1)},staticRenderFns:[]};var i=n("VU/8")(a,c,!1,function(e){n("VirI")},null,null).exports,u=n("/ocq");r.a.use(u.a);var s=new u.a({routes:[{path:"/",name:"Users",component:function(){return n.e(1).then(n.bind(null,"v+uL"))}},{path:"/new",name:"NewUser",component:function(){return n.e(0).then(n.bind(null,"cws4"))}},{path:"/edit/:id",name:"EditUser",component:function(){return n.e(2).then(n.bind(null,"erk9"))}},{path:"/themes",name:"Themes",component:function(){return n.e(3).then(n.bind(null,"VVU5"))}}]}),o=n("NYxO"),h=n("424j");r.a.use(o.a);var m=new o.a.Store({plugins:[Object(h.a)()],state:{currentPage:1,currentLimit:1,showModal:!1,currentTheme:null},mutations:{changePage:function(e,t){e.currentPage=t},changeLimit:function(e,t){e.currentLimit=t},changeTheme:function(e,t){e.currentTheme=t}},actions:{changePage:function(e,t){(0,e.commit)("changePage",t)},changeLimit:function(e,t){(0,e.commit)("changeLimit",t)},changeTheme:function(e,t){(0,e.commit)("changeTheme",t)}}}),p=n("mtWM"),f=n.n(p),l="Client-ID e166be57661b6b8";f.a.defaults.baseURL="https://json-users-api.herokuapp.com",f.a.interceptors.request.use(function(e){return e.url.match("https://api.imgur.com/3/image")&&(e.headers={Authorization:l}),e});var d=n("ESwS"),g=n.n(d),T=n("ujXI"),b=n.n(T);r.a.use(b.a),r.a.config.productionTip=!1,r.a.use(g.a),new r.a({el:"#app",router:s,store:m,render:function(e){return e(i)}})},VirI:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c1cb557ab5126f6049e4.js.map