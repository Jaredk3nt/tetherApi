webpackJsonp([0],{0:function(t,e){},"3brx":function(t,e){},E9IR:function(t,e){},"G/UF":function(t,e){},I8kB:function(t,e){},IydV:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("7+uW"),r=s("8+8L"),n=s("K/Lq"),i=s.n(n),a=s("/ocq"),c={name:"story",props:["story"],components:{},computed:{liked:function(){if(void 0!==this.story){let t=this.story.likeUsers.indexOf(this.$store.getters.user);return console.log(t),t>-1}}},mounted:function(){console.log(story)},methods:{goToStory:function(){this.$router.push({name:"Story",params:{user:this.story.author,story_id:this.story._id,story:this.story}})},spawnChild:function(){this.$store.commit("start_writing",this.story._id)},likeStory:function(){this.$http.post(this.$api+"like/"+this.story._id).then(t=>{this.story.likes=t.body.likes}).catch(t=>{console.log(t)})},authorProfile:function(){this.$router.push({name:"Profile",params:{userId:this.story.authorId}})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card-container"},[s("div",{staticClass:"story-container",on:{click:t.goToStory}},[s("div",{staticClass:"author"},[s("p",{on:{click:function(e){e.stopPropagation(),t.authorProfile(e)}}},[t._v(t._s(t.story.author?t.story.author:" "))])]),t._v(" "),s("p",[t._v(t._s(t.story.body?t.story.body:" "))])]),t._v(" "),s("div",{staticClass:"story-actions"},[s("div",{staticClass:"action fav",class:{liked:t.liked},on:{click:t.likeStory}},[s("div",{staticClass:"heart icon"}),s("p",[t._v(t._s(t.story.likes))])]),t._v(" "),s("div",{staticClass:"action tether",on:{click:t.spawnChild}},[s("div",{staticClass:"link icon"}),s("p",[t._v(t._s(t.story.children.length))])])])])},staticRenderFns:[]};var u=s("VU/8")(c,l,!1,function(t){s("gOKV")},"data-v-2cf49cb5",null).exports,d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.route?s("router-link",{staticClass:"nav-button",attrs:{to:{name:t.route}}},[s("div",{staticClass:"title"},[t._v(t._s(t.title))])]):s("div",{staticClass:"nav-button",on:{click:function(e){t.$emit("clicked")}}},[s("div",{staticClass:"title"},[t._v(t._s(t.title))])])],1)},staticRenderFns:[]};var p=s("VU/8")({name:"nav-button",props:["title","route"],methods:{dispatch:function(){this.$store.dispatch("test")}}},d,!1,function(t){s("ol6e")},null,null).exports,h={name:"nav-bar",components:{NavButton:p},computed:{isLoggedIn:function(){return this.$store.getters.isLoggedIn}},methods:{login:function(){this.$router.push("login")},goToProfile:function(){this.$router.push("/"+this.$store.getters.user)},startWriting:function(){this.$store.commit("start_writing")}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"nav-container",class:{hidden:t.$store.getters.writing}},[s("router-link",{staticClass:"nav-title",attrs:{to:{name:"Home"}}},[t._v("tethered")]),t._v(" "),s("div",{staticClass:"nav-actions"},[s("nav-button",{staticClass:"no-desktop",attrs:{title:"Read",route:"Home"}}),t._v(" "),s("nav-button",{attrs:{title:"Write"},on:{clicked:t.startWriting}}),t._v(" "),t.isLoggedIn?s("nav-button",{attrs:{title:"Profile"},on:{clicked:t.goToProfile}}):s("nav-button",{attrs:{title:"Login"},on:{clicked:t.login}})],1)],1)},staticRenderFns:[]};var m=s("VU/8")(h,v,!1,function(t){s("iKh6")},null,null).exports,g={name:"Home",data:()=>({stories:[],currentPage:0}),methods:{fetchStories:function(){this.$http.get(this.$api+"stories",{params:{page:this.currentPage}}).then(t=>{this.stories=this.stories.concat(t.body)},t=>{console.log("on no error")})},nextPage:function(){this.currentPage++,this.fetchStories()}},computed:{showButton:function(){return this.stories.length>50}},mounted(){this.fetchStories()},components:{Story:u,NavBar:m}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{},[s("router-view"),t._v(" "),s("div",{staticClass:"homepage"},[s("div",{staticClass:"story-list"},[t._l(t.stories,function(t){return s("story",{key:t._id,attrs:{story:t}})}),t._v(" "),t.showButton?s("div",{staticClass:"load-button-wrapper"},[s("button",{staticClass:"load-button",on:{click:t.nextPage}},[t._v("Load More")])]):t._e()],2)])],1)},staticRenderFns:[]};var f=s("VU/8")(g,_,!1,function(t){s("IydV")},"data-v-96c2673e",null).exports,y={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"back-button",on:{click:this.back}},[this._v("Back")])])},staticRenderFns:[]};var w=s("VU/8")({name:"toolbar",methods:{back:function(){this.$router.go(-1)}}},y,!1,function(t){s("E9IR")},"data-v-379a0746",null).exports,k={render:function(){var t=this.$createElement,e=this._self._c||t;return this.message?e("div",{staticClass:"error-container",on:{click:this.closeError}},[e("p",[this._v(this._s(this.message))])]):this._e()},staticRenderFns:[]};var b=s("VU/8")({name:"error-popup",props:["message"],methods:{closeError:function(){this.message=""}}},k,!1,function(t){s("I8kB")},null,null).exports,C={name:"login",components:{Toolbar:w,ErrorPopup:b},data:function(){return{hasAccount:!0,username:"",password:"",email:"",password2:"",error:""}},methods:{back:function(){this.$router.go(-1)},toggleSignOn:function(){this.hasAccount=!this.hasAccount},login:function(){this.$store.dispatch("login",{username:this.username,password:this.password}).then(t=>{this.$router.go(-1)},t=>{this.showError("Username or Password incorrect")})},signup:function(){this.password===this.password2?this.$store.dispatch("createUser",{email:this.email,username:this.username,password:this.password}).then(t=>{this.$router.go(-1)},t=>{this.showError("Error: could not create account - "+t)}):this.showError("Passwords do not match")},showError:function(t){this.error=t,setTimeout(()=>{this.error=""},3e3)}}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page"},[s("error-popup",{attrs:{message:t.error}}),t._v(" "),s("h1",[t._v("tethered")]),t._v(" "),s("div",{staticClass:"login-field"},[t.hasAccount?s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{placeholder:"Password",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.login}},[t._v("Login")])]):s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{placeholder:"Email Address",type:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{placeholder:"Password",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password2,expression:"password2"}],attrs:{placeholder:"Re-type password",type:"password"},domProps:{value:t.password2},on:{input:function(e){e.target.composing||(t.password2=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.signup}},[t._v("Sign up now")])])]),t._v(" "),t.hasAccount?s("div",{staticClass:"link-text"},[s("p",{on:{click:t.toggleSignOn}},[t._v("New here? Create an account")])]):s("div",{staticClass:"link-text"},[s("p",{on:{click:t.toggleSignOn}},[t._v("Already have an account? Log in here")])]),t._v(" "),s("div",{staticClass:"link-text"},[s("p",{on:{click:t.back}},[t._v("Maybe later, I just want to read.")])])],1)},staticRenderFns:[]};var P=s("VU/8")(C,$,!1,function(t){s("ZM8L")},"data-v-39b59910",null).exports,S={name:"story-view",props:["username","story_id","story"],components:{Story:u,Toolbar:w},data:function(){return{children:[]}},mounted:function(){void 0===this.story&&this.getStory(this.story_id),this.getChildren(this.story_id)},beforeRouteUpdate(t,e,s){this.children=[],this.getChildren(t.params.story_id),s()},methods:{getStory:function(t){this.$http.get(this.$api+"story/"+t).then(t=>{},t=>{console.log(t)})},getChildren:function(t){this.$http.get(this.$api+"children/"+t).then(t=>{this.children=t.body},t=>{console.log(t)})}}},E={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"outer-container"},[e("div",{staticClass:"inner-container"},[e("div",{staticClass:"task-bar"},[e("toolbar")],1),this._v(" "),e("div",{staticClass:"story-card-container"},[e("story",{attrs:{story:this.story}})],1),this._v(" "),e("div",{staticClass:"children-container"},this._l(this.children,function(t){return e("story",{key:t._id,attrs:{story:t}})}))])])},staticRenderFns:[]};var I=s("VU/8")(S,E,!1,function(t){s("urey")},null,null).exports,x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("p",[this._v(this._s(this.title))]),this._v(" "),e("h3",[this._v(this._s(this.value))])])},staticRenderFns:[]};var L={name:"profile",props:["userId"],data:function(){return{user:""}},mounted:function(){this.$http.get(this.$api+"user/"+this.userId).then(t=>{this.user=t.body}).catch(t=>{console.log(t)})},computed:{likes:function(){if(void 0!==this.user){console.log(this.user.stories);let t=0;for(let e of this.user.stories)t+=e.likes;return t}return-1}},methods:{getUserData:function(){this.$http.get(this.$api+"user/"+this.userId).then(t=>{this.user=t.body}).catch(t=>{console.log(t)})}},components:{titleNumber:s("VU/8")({name:"title-number",props:["title","value"]},x,!1,function(t){s("piNW")},"data-v-395962dd",null).exports,Story:u,NavBar:m}},N={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"profile-container"},[s("router-view"),t._v(" "),s("div",{staticClass:"profile-card-container"},[s("div",{staticClass:"profile-header"},[s("h1",[t._v(t._s(t.user.username))])]),t._v(" "),s("div",{staticClass:"profile-stats"},[s("title-number",{attrs:{title:"Followers",value:0}}),t._v(" "),s("title-number",{attrs:{title:"Stories",value:t.user.stories.length}}),t._v(" "),s("title-number",{attrs:{title:"Likes",value:t.likes}})],1)]),t._v(" "),void 0!==t.user&&""!==t.user?s("div",{staticClass:"story-list"},t._l(t.user.stories,function(t){return s("story",{key:t._id,attrs:{story:t}})})):t._e()],1)},staticRenderFns:[]};var O=s("VU/8")(L,N,!1,function(t){s("3brx")},"data-v-79ef6eae",null).exports,U={name:"post",props:["parent"],components:{ErrorPopup:b},data:()=>({story:"",parentOpen:!1,parentStories:"",error:""}),mounted:function(){void 0!==this.parent&&""!==this.parent&&this.fetchParent()},methods:{postStory:function(){this.story.length>600?(console.log("errror"),this.showError()):this.$store.dispatch("post",{story:this.story,parent:this.parent})},backButton:function(){this.$store.commit("stop_writing")},toggleParent:function(){this.parentOpen=!this.parentOpen},fetchParent:function(){this.$http.get(this.$api+"parents/"+this.parent).then(t=>{this.parentStories=t.body},t=>{console.log("on no error")})},onKeyDown:function(t){this.story.length>=this.$char_limit&&8!==t.keyCode&&46!==t.keyCode&&t.preventDefault()},showError:function(){this.error="Can't be over 600 char",setTimeout(()=>{this.error=""},3e3)}}},R={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desktop-container"},[s("error-popup",{attrs:{message:t.error}}),t._v(" "),s("div",{staticClass:"container",class:{open:t.parentOpen}},[s("div",{staticClass:"parent",class:{"parent-open":t.parentOpen}},t._l(t.parentStories,function(e){return s("div",{key:e._id},[s("div",{staticClass:"author"},[t._v(t._s(e.author))]),t._v(" "),s("p",[t._v(t._s(e.body))])])})),t._v(" "),s("div",{staticClass:"top-bar",class:{grey:t.parentOpen}},[t.parentOpen?t._e():s("div",{staticClass:"back-button",class:{grey:void 0===t.parent},on:{click:t.backButton}},[s("p",[t._v("Back")])]),t._v(" "),void 0!==t.parent&&""!==t.parent?s("div",{staticClass:"parent-button",on:{click:t.toggleParent}},[t.parentOpen?s("p",[t._v("Hide parent story")]):s("p",[t._v("View parent story")])]):t._e()]),t._v(" "),s("div",{staticClass:"post-container"},[s("div",{staticClass:"text-container"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.story,expression:"story"}],attrs:{"max-length":"600",placeholder:"Write a story!",autofocus:""},domProps:{value:t.story},on:{keydown:t.onKeyDown,input:function(e){e.target.composing||(t.story=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"bottom-bar"},[s("p",[t._v(t._s(t.story.length)+" / 600")]),t._v(" "),s("button",{staticClass:"text-button",on:{click:t.postStory}},[t._v("POST")])])])])],1)},staticRenderFns:[]};var V=s("VU/8")(U,R,!1,function(t){s("G/UF")},"data-v-16f24a5a",null).exports;o.a.use(a.a);var T=new a.a({mode:"history",routes:[{path:"/",name:"Home",component:f},{path:"/login",name:"Login",component:P},{path:"/:user/:story_id",name:"Story",component:I,props:!0},{path:"/:userId",name:"Profile",component:O,props:!0}]}),B=s("NYxO");o.a.use(B.a);const F="/api/",G={LOGIN(t){t.pending=!0},LOGIN_SUCCESS(t,e){console.log("in login succ"+e),t.isLoggedIn=!0,t.pending=!1,t.userid=e.userid},PERSISTENT_LOGIN(t,e){t.isLoggedIn=!0,t.userid=e.userid,t.username=e.username},LOGOUT(t){t.isLoggedIn=!1},start_writing(t,e){t.writing=!0,e&&(console.log(e),t.currentParent=e)},stop_writing(t){t.writing=!1,t.currentParent=""}},A={post:({commit:t,getters:e},s)=>new Promise((e,r)=>{o.a.http.post(F+"stories",{body:s.story,parent:s.parent}).then(o=>{console.log("posted: "+s.story),t("stop_writing"),e()},t=>{r()})}),login:({commit:t},e)=>(t("LOGIN"),new Promise((s,r)=>{o.a.http.post(F+"login",e).then(e=>{t("LOGIN_SUCCESS",{userid:e.body._id}),s()},t=>{console.log("on no error"),r()})})),logout({commit:t}){localStorage.removeItem("token"),t(LOGOUT)},createUser:({commit:t},e)=>(t("LOGIN"),new Promise((s,r)=>{o.a.http.post(F+"users",e).then(e=>{t("LOGIN_SUCCESS",{userid:e.body._id}),s()},t=>{console.log("on no error"),r()})})),checkLogin({commit:t}){o.a.http.get(F+"login").then(e=>{console.log(e.body),t("PERSISTENT_LOGIN",e.body)}).catch(t=>{console.log(t)})}};var H=new B.a.Store({state:{isLoggedIn:!1,userid:"",writing:!1,currentParent:""},getters:{isPendingLogin:t=>t.pending,isLoggedIn:t=>t.isLoggedIn,user:t=>t.userid,writing:t=>t.writing,currentParent:t=>t.currentParent},mutations:G,actions:A}),K={name:"App",components:{NavBar:m,Post:V},computed:{postOpen:function(){return this.$store.getters.writing},parent:function(){return this.$store.getters.currentParent},showNav:function(){return"/login"!==this.$route.path}},mounted:function(){console.log("production"),this.$store.dispatch("checkLogin")}},W={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{"nav-hidden":!t.showNav},attrs:{id:"app"}},[t.postOpen?s("post",{attrs:{parent:t.parent}}):t._e(),t._v(" "),s("div",{staticClass:"page-body"},[s("keep-alive",{attrs:{include:"Home, story-view"}},[s("router-view")],1)],1),t._v(" "),t.showNav?s("nav-bar"):t._e()],1)},staticRenderFns:[]};var M=s("VU/8")(K,W,!1,function(t){s("ubBR")},null,null).exports;o.a.use(r.a),o.a.http.options.credentials=!0,o.a.use(i.a),o.a.config.productionTip=!1,o.a.prototype.$api="/api/",o.a.prototype.$char_limit=600,new o.a({el:"#app",router:T,store:H,components:{App:M,Home:f,NavButton:p},template:"<App/>"})},ZM8L:function(t,e){},gOKV:function(t,e){},iKh6:function(t,e){},ol6e:function(t,e){},piNW:function(t,e){},ubBR:function(t,e){},urey:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.cdc356f558b90127c210.js.map