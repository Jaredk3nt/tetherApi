webpackJsonp([0],{"+6zb":function(t,e){},0:function(t,e){},"0dCh":function(t,e){},E9IR:function(t,e){},"G/UF":function(t,e){},I8kB:function(t,e){},JmUT:function(t,e){},KlRP:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("7+uW"),n=s("8+8L"),i=s("K/Lq"),r=s.n(i),a=s("/ocq"),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{class:this.className,attrs:{width:this.width,height:this.height}},[e("use",{attrs:{"xlink:href":"#"+this.glyph}})])},staticRenderFns:[]};var l=s("VU/8")({name:"icon",props:["className","glyph","width","height"]},c,!1,function(t){s("dAJE")},"data-v-374ae4ee",null).exports,u=s("Wc9H"),d=s.n(u),h=s("IaZV"),p=s.n(h),v=new d.a({id:"heart",use:"heart-usage",viewBox:"0 0 8 8",content:'<symbol viewBox="0 0 8 8" id="heart">\n  <path d="M2 0c-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0 .55.23 1.04.59 1.41l3.41 3.41 3.41-3.41c.36-.36.59-.85.59-1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59-.55 0-1.04.23-1.41.59-.36.36-.59.85-.59 1.41 0-.55-.23-1.04-.59-1.41-.36-.36-.85-.59-1.41-.59z" transform="translate(0 1)" />\n</symbol>'}),g=(p.a.add(v),new d.a({id:"link-intact",use:"link-intact-usage",viewBox:"0 0 8 8",content:'<symbol viewBox="0 0 8 8" id="link-intact">\n  <path d="M5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47-.26-.01-.41-.13-.41-.13a.5.5 0 1 0-.5.88s.34.22.84.25c.5.03 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0-.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44.28.01.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z" />\n</symbol>'})),m=(p.a.add(g),{name:"story",props:["story"],components:{Icon:l},computed:{liked:function(){if(void 0!==this.story){return this.story.likeUsers.indexOf(this.$store.getters.userid)>-1}},heartColor:function(){return this.liked?"red":"light-grey"}},mounted:function(){},methods:{goToStory:function(){this.$router.push({name:"Story",params:{user:this.story.author,story_id:this.story._id,story:this.story}})},spawnChild:function(){this.$store.commit("start_writing",this.story._id)},likeStory:function(){this.$http.post(this.$api+"like/"+this.story._id).then(t=>{if(!0===this.liked){let t=this.story.likeUsers.indexOf(this.$store.getters.userid);t>-1&&this.story.likeUsers.splice(t,1)}else this.story.likeUsers.push(this.$store.getters.userid);this.story.likes=t.body.likes}).catch(t=>{console.log(t)})},authorProfile:function(){this.$router.push({name:"Profile",params:{username:this.story.author}})}}}),f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card-container"},[s("div",{staticClass:"story-container",on:{click:t.goToStory}},[s("div",{staticClass:"author"},[s("p",{on:{click:function(e){e.stopPropagation(),t.authorProfile(e)}}},[t._v(t._s(t.story.author?t.story.author:" "))])]),t._v(" "),s("p",[t._v(t._s(t.story.body?t.story.body:" "))])]),t._v(" "),s("div",{staticClass:"story-actions"},[s("div",{staticClass:"action fav",class:{liked:t.liked},on:{click:t.likeStory}},[s("icon",{attrs:{className:t.heartColor,width:"15",height:"15",glyph:"heart"}}),t._v(" "),s("p",[t._v(t._s(t.story.likes))])],1),t._v(" "),s("div",{staticClass:"action tether",on:{click:t.spawnChild}},[s("icon",{attrs:{width:"15",height:"15",glyph:"link-intact"}}),t._v(" "),s("p",[t._v(t._s(t.story.children.length))])],1)])])},staticRenderFns:[]};var _=s("VU/8")(m,f,!1,function(t){s("KlRP")},"data-v-0c226f1c",null).exports,w={name:"Home",data:()=>({stories:[],currentPage:0}),methods:{fetchStories:function(){this.$emit("loading",!0),this.$http.get(this.$api+"stories",{params:{page:this.currentPage}}).then(t=>{this.$emit("loading",!1),this.stories=this.stories.concat(t.body)},t=>{console.log("on no error")})},nextPage:function(){this.currentPage++,this.fetchStories()}},computed:{showButton:function(){return this.stories.length>50}},mounted(){this.fetchStories()},components:{Story:_}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("router-view"),t._v(" "),s("div",{staticClass:"homepage"},[s("div",{staticClass:"story-list"},[t._l(t.stories,function(t){return s("story",{key:t._id,attrs:{story:t}})}),t._v(" "),t.showButton?s("div",{staticClass:"load-button-wrapper"},[s("button",{staticClass:"load-button",on:{click:t.nextPage}},[t._v("Load More")])]):t._e()],2)])],1)},staticRenderFns:[]};var b=s("VU/8")(w,y,!1,function(t){s("mzls")},"data-v-aab291fe",null).exports,C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"back-button",on:{click:this.back}},[this._v("Back")])])},staticRenderFns:[]};var k=s("VU/8")({name:"toolbar",methods:{back:function(){this.$router.go(-1)}}},C,!1,function(t){s("E9IR")},"data-v-379a0746",null).exports,$={render:function(){var t=this.$createElement,e=this._self._c||t;return this.message?e("div",{staticClass:"error-container",on:{click:this.closeError}},[e("p",[this._v(this._s(this.message))])]):this._e()},staticRenderFns:[]};var U=s("VU/8")({name:"error-popup",props:["message"],methods:{closeError:function(){this.message=""}}},$,!1,function(t){s("I8kB")},null,null).exports,P={name:"login",components:{Toolbar:k,ErrorPopup:U},data:function(){return{hasAccount:!0,username:"",password:"",email:"",password2:"",error:""}},methods:{back:function(){this.$router.go(-1)},toggleSignOn:function(){this.hasAccount=!this.hasAccount},login:function(){this.$store.dispatch("login",{username:this.username,password:this.password}).then(t=>{this.$router.go(-1)},t=>{this.showError("Username or Password incorrect")})},signup:function(){this.password===this.password2?this.$store.dispatch("createUser",{email:this.email,username:this.username,password:this.password}).then(t=>{this.$router.go(-1)},t=>{this.showError("Error: could not create account - "+t.body.message)}):this.showError("Passwords do not match")},showError:function(t){this.error=t,setTimeout(()=>{this.error=""},3e3)}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page"},[s("error-popup",{attrs:{message:t.error}}),t._v(" "),s("h1",[t._v("tethered")]),t._v(" "),s("div",{staticClass:"login-field"},[t.hasAccount?s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{placeholder:"Password",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.login}},[t._v("Login")])]):s("div",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{placeholder:"Email Address",type:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{placeholder:"Username"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{placeholder:"Password",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password2,expression:"password2"}],attrs:{placeholder:"Re-type password",type:"password"},domProps:{value:t.password2},on:{input:function(e){e.target.composing||(t.password2=e.target.value)}}}),t._v(" "),s("button",{on:{click:t.signup}},[t._v("Sign up now")])])]),t._v(" "),t.hasAccount?s("div",{staticClass:"link-text"},[s("p",{on:{click:t.toggleSignOn}},[t._v("New here? Create an account")])]):s("div",{staticClass:"link-text"},[s("p",{on:{click:t.toggleSignOn}},[t._v("Already have an account? Log in here")])]),t._v(" "),s("div",{staticClass:"link-text"},[s("p",{on:{click:t.back}},[t._v("Maybe later, I just want to read.")])])],1)},staticRenderFns:[]};var x=s("VU/8")(P,E,!1,function(t){s("JmUT")},"data-v-04b1cd5a",null).exports,S={name:"story-view",props:["username","story_id","story"],components:{Story:_,Toolbar:k},data:function(){return{children:[]}},mounted:function(){void 0===this.story&&this.getStory(this.story_id),this.getChildren(this.story_id)},beforeRouteUpdate(t,e,s){this.children=[],this.getChildren(t.params.story_id),s()},methods:{getStory:function(t){this.$http.get(this.$api+"story/"+t).then(t=>{},t=>{console.log(t)})},getChildren:function(t){this.$http.get(this.$api+"children/"+t).then(t=>{this.children=t.body},t=>{console.log(t)})}}},O={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"outer-container"},[e("div",{staticClass:"inner-container"},[e("div",{staticClass:"task-bar"},[e("toolbar")],1),this._v(" "),e("div",{staticClass:"story-card-container"},[e("story",{attrs:{story:this.story}})],1),this._v(" "),e("div",{staticClass:"children-container"},this._l(this.children,function(t){return e("story",{key:t._id,attrs:{story:t}})}))])])},staticRenderFns:[]};var L=s("VU/8")(S,O,!1,function(t){s("urey")},null,null).exports,N={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("h3",[this._v(this._s(this.value))]),this._v(" "),e("p",[this._v(this._s(this.title))])])},staticRenderFns:[]};var R=s("VU/8")({name:"title-number",props:["title","value"]},N,!1,function(t){s("tGJG")},"data-v-15dc994f",null).exports,I={render:function(){var t=this.$createElement,e=this._self._c||t;return this.isUser?this._e():e("div",{staticClass:"wrapper"},[this.followed?e("button",{staticClass:"follow-button followed"},[this._v("Following")]):e("button",{staticClass:"follow-button",on:{click:this.followUser}},[this._v("Follow")])])},staticRenderFns:[]};var T=s("VU/8")({name:"follow-button",props:["user"],computed:{isUser:function(){return this.$store.getters.userid===this.user._id},followed:function(){for(let t of this.user.followers)if(t.userid===this.$store.getters.userid)return!0;return!1}},methods:{followUser:function(){this.$http.post(this.$api+"follow/"+this.user._id).then(t=>{this.$emit("followed")}).catch(t=>{})}}},I,!1,function(t){s("0dCh")},"data-v-06f74cb8",null).exports,F={name:"user-controls",methods:{logout:function(){console.log("logout"),this.$http.post(this.$api+"logout").then(t=>{this.$store.dispatch("logout"),this.$router.push("/")}).catch(t=>{console.log("error logging out")})}}},V={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"controls-modal"},[e("ul",[e("li",{staticClass:"controls-item",on:{click:this.logout}},[e("button",[this._v("Log Out")])])])])},staticRenderFns:[]};var B=s("VU/8")(F,V,!1,function(t){s("NYoc")},"data-v-484cbe82",null).exports,A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("button",{staticClass:"t-button",class:{off:this.off},on:{click:this.click}},[this._t("default")],2)])},staticRenderFns:[]};var G=s("VU/8")({name:"t-button",props:["clickAction","off"],methods:{click:function(){this.$emit(this.clickAction)}}},A,!1,function(t){s("Qr4+")},"data-v-9cc12c96",null).exports,H=new d.a({id:"cog",use:"cog-usage",viewBox:"0 0 8 8",content:'<symbol viewBox="0 0 8 8" id="cog">\n  <path d="M3.5 0l-.5 1.19c-.1.03-.19.08-.28.13l-1.19-.5-.72.72.5 1.19c-.05.1-.09.18-.13.28l-1.19.5v1l1.19.5c.04.1.08.18.13.28l-.5 1.19.72.72 1.19-.5c.09.04.18.09.28.13l.5 1.19h1l.5-1.19c.09-.04.19-.08.28-.13l1.19.5.72-.72-.5-1.19c.04-.09.09-.19.13-.28l1.19-.5v-1l-1.19-.5c-.03-.09-.08-.19-.13-.28l.5-1.19-.72-.72-1.19.5c-.09-.04-.19-.09-.28-.13l-.5-1.19h-1zm.5 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />\n</symbol>'}),z=(p.a.add(H),{name:"profile",props:["username"],components:{titleNumber:R,Story:_,FollowButton:T,UserControls:B,TButton:G,Icon:l},data:function(){return{user:"",settingsOpen:!1}},beforeRouteUpdate:function(t,e,s){this.username=t.params.username,this.user="",this.getUserData(),s()},mounted:function(){this.getUserData()},computed:{isUser:function(){return this.$store.getters.userid===this.user._id},followers:function(){return this.user.followers.length},following:function(){return this.user.following.length}},methods:{getUserData:function(){this.$emit("loading",!0),this.$http.get(this.$api+"username/"+this.username).then(t=>{this.$emit("loading",!1),this.user=t.body}).catch(t=>{console.log(t)})},followedUser:function(t){this.user.followers.push({username:this.$store.getters.user,userid:this.$store.getters.userid})},toggleSettings:function(t){this.settingsOpen=!this.settingsOpen,console.log(t)},toggleEdit:function(){console.log(this.settingsOpen)}}}),J={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.user?s("div",{staticClass:"profile-container"},[s("div",{staticClass:"profile-card-container"},[s("div",{staticClass:"profile-info-container"},[t._m(0),s("div",{staticClass:"profile-header"},[s("h1",[t._v(t._s(t.user.username))]),t._v(" "),s("div",{staticClass:"follower-num"},[s("div",{staticClass:"title-num-wrapper"},[s("title-number",{attrs:{title:"Following",value:t.following}})],1),s("div",{staticClass:"title-num-wrapper"},[s("title-number",{attrs:{title:"Followers",value:t.followers}})],1)]),t._v(" "),s("div",{staticClass:"follow-button"},[s("follow-button",{attrs:{user:t.user},on:{followed:t.followedUser}})],1),t._v(" "),t.isUser?s("div",{staticClass:"user-buttons"},[s("div",{staticClass:"edit"},[s("t-button",{attrs:{off:!0,clickAction:"toggle-edit",text:"Edit profile"},on:{"toggle-edit":t.toggleEdit}},[t._v("\n                            Edit profile\n                        ")])],1),t._v(" "),s("div",{staticClass:"settings"},[s("t-button",{attrs:{clickAction:"toggle-settings",text:"V"},on:{"toggle-settings":t.toggleSettings}},[s("icon",{staticClass:"cog",attrs:{width:"12",height:"12",glyph:"cog"}})],1)],1)]):t._e()])]),t._v(" "),t.isUser&&t.settingsOpen?s("user-controls"):t._e()],1),t._v(" "),void 0!==t.user&&""!==t.user?s("div",{staticClass:"story-list"},t._l(t.user.stories,function(t){return s("story",{key:t._id,attrs:{story:t}})})):t._e()]):t._e()},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"profile-img"},[e("div",{staticClass:"img"})])}]};var D=s("VU/8")(z,J,!1,function(t){s("+6zb")},"data-v-3c3f40ac",null).exports,M={name:"post",props:["parent"],components:{ErrorPopup:U},data:()=>({story:"",parentOpen:!1,parentStories:"",error:""}),mounted:function(){void 0!==this.parent&&""!==this.parent&&this.fetchParent()},methods:{postStory:function(){this.story.length>600?(console.log("errror"),this.showError()):this.$store.dispatch("post",{story:this.story,parent:this.parent})},backButton:function(){this.$store.commit("stop_writing")},toggleParent:function(){this.parentOpen=!this.parentOpen},fetchParent:function(){this.$http.get(this.$api+"parents/"+this.parent).then(t=>{this.parentStories=t.body},t=>{console.log("on no error")})},onKeyDown:function(t){this.story.length>=this.$char_limit&&8!==t.keyCode&&46!==t.keyCode&&t.preventDefault()},showError:function(){this.error="Can't be over 600 char",setTimeout(()=>{this.error=""},3e3)}}},W={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desktop-container"},[s("error-popup",{attrs:{message:t.error}}),t._v(" "),s("div",{staticClass:"container",class:{open:t.parentOpen}},[s("div",{staticClass:"parent",class:{"parent-open":t.parentOpen}},t._l(t.parentStories,function(e){return s("div",{key:e._id},[s("div",{staticClass:"author"},[t._v(t._s(e.author))]),t._v(" "),s("p",[t._v(t._s(e.body))])])})),t._v(" "),s("div",{staticClass:"top-bar",class:{grey:t.parentOpen}},[t.parentOpen?t._e():s("div",{staticClass:"back-button",class:{grey:void 0===t.parent},on:{click:t.backButton}},[s("p",[t._v("Back")])]),t._v(" "),void 0!==t.parent&&""!==t.parent?s("div",{staticClass:"parent-button",on:{click:t.toggleParent}},[t.parentOpen?s("p",[t._v("Hide parent story")]):s("p",[t._v("View parent story")])]):t._e()]),t._v(" "),s("div",{staticClass:"post-container"},[s("div",{staticClass:"text-container"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.story,expression:"story"}],attrs:{"max-length":"600",placeholder:"Write a story!",autofocus:""},domProps:{value:t.story},on:{keydown:t.onKeyDown,input:function(e){e.target.composing||(t.story=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"bottom-bar"},[s("p",[t._v(t._s(t.story.length)+" / 600")]),t._v(" "),s("button",{staticClass:"text-button",on:{click:t.postStory}},[t._v("POST")])])])])],1)},staticRenderFns:[]};var K=s("VU/8")(M,W,!1,function(t){s("G/UF")},"data-v-16f24a5a",null).exports;o.a.use(a.a);var Q=new a.a({mode:"history",routes:[{path:"/",name:"Home",component:b},{path:"/login",name:"Login",component:x},{path:"/:user/:story_id",name:"Story",component:L,props:!0},{path:"/:username",name:"Profile",component:D,props:!0}]}),Y=s("NYxO");o.a.use(Y.a);const j="/api/",q={LOGIN(t){t.pending=!0},LOGIN_SUCCESS(t,e){t.isLoggedIn=!0,t.pending=!1,t.userid=e.userid,t.username=e.username},PERSISTENT_LOGIN(t,e){t.isLoggedIn=!0,t.userid=e.userid,t.username=e.username},LOGOUT(t){t.isLoggedIn=!1,t.userid="",t.username=""},start_writing(t,e){t.writing=!0,e&&(console.log(e),t.currentParent=e)},stop_writing(t){t.writing=!1,t.currentParent=""}},X={post:({commit:t,getters:e},s)=>new Promise((e,n)=>{o.a.http.post(j+"stories",{body:s.story,parent:s.parent}).then(o=>{console.log("posted: "+s.story),t("stop_writing"),e()},t=>{n()})}),login:({commit:t},e)=>(t("LOGIN"),new Promise((s,n)=>{o.a.http.post(j+"login",e).then(e=>{t("LOGIN_SUCCESS",{userid:e.body._id,username:e.body.username}),s()},t=>{console.log("on no error"),n()})})),logout({commit:t}){t("LOGOUT")},createUser:({commit:t},e)=>(t("LOGIN"),new Promise((s,n)=>{o.a.http.post(j+"users",e).then(e=>{t("LOGIN_SUCCESS",{userid:e.body._id}),s()},t=>{console.log("on no error"),n()})})),checkLogin({commit:t}){o.a.http.get(j+"login").then(e=>{console.log(e.body),t("PERSISTENT_LOGIN",e.body)}).catch(t=>{console.log(t)})}};var Z=new Y.a.Store({state:{isLoggedIn:!1,userid:"",username:"",writing:!1,currentParent:""},getters:{isPendingLogin:t=>t.pending,isLoggedIn:t=>t.isLoggedIn,user:t=>t.username,userid:t=>t.userid,writing:t=>t.writing,currentParent:t=>t.currentParent},mutations:q,actions:X}),tt={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.route?s("router-link",{staticClass:"nav-button",attrs:{to:{name:t.route}}},[s("div",{staticClass:"title"},[t._v(t._s(t.title))])]):s("div",{staticClass:"nav-button",on:{click:function(e){t.$emit("clicked")}}},[s("div",{staticClass:"title"},[t._v(t._s(t.title))])])],1)},staticRenderFns:[]};var et=s("VU/8")({name:"nav-button",props:["title","route"],methods:{dispatch:function(){this.$store.dispatch("test")}}},tt,!1,function(t){s("ol6e")},null,null).exports,st={name:"nav-bar",components:{NavButton:et},computed:{isLoggedIn:function(){return this.$store.getters.isLoggedIn}},methods:{login:function(){this.$router.push("login")},goToProfile:function(){console.log(this.$store.getters.user),this.$router.push("/"+this.$store.getters.user)},startWriting:function(){this.$store.commit("start_writing")}}},ot={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"nav-container",class:{hidden:t.$store.getters.writing}},[s("router-link",{staticClass:"nav-title",attrs:{to:{name:"Home"}}},[t._v("tethered")]),t._v(" "),s("div",{staticClass:"nav-actions"},[s("nav-button",{staticClass:"no-desktop",attrs:{title:"Read",route:"Home"}}),t._v(" "),s("nav-button",{attrs:{title:"Write"},on:{clicked:t.startWriting}}),t._v(" "),t.isLoggedIn?s("nav-button",{attrs:{title:"Profile"},on:{clicked:t.goToProfile}}):s("nav-button",{attrs:{title:"Login"},on:{clicked:t.login}})],1)],1)},staticRenderFns:[]};var nt={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loader-container"},[e("div",{staticClass:"loader"},[this._v("Loading...")])])}]};var it={name:"App",components:{NavBar:s("VU/8")(st,ot,!1,function(t){s("TR8X")},null,null).exports,Post:K,Loader:s("VU/8")({name:"loader"},nt,!1,function(t){s("sQ/T")},"data-v-62625720",null).exports},data:function(){return{loading:!1}},computed:{postOpen:function(){return this.$store.getters.writing},parent:function(){return this.$store.getters.currentParent},showNav:function(){return"/login"!==this.$route.path}},mounted:function(){console.log("production"),this.$store.dispatch("checkLogin")},methods:{loaderState:function(t){console.log("Loading: "+t),this.loading=t}}},rt={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:{"nav-hidden":!t.showNav},attrs:{id:"app"}},[t.postOpen?s("post",{attrs:{parent:t.parent}}):t._e(),t._v(" "),s("div",{staticClass:"page-body"},[t.loading?s("loader"):t._e(),t._v(" "),s("keep-alive",{attrs:{include:"Home, story-view"}},[s("router-view",{on:{loading:t.loaderState}})],1)],1),t._v(" "),t.showNav?s("nav-bar"):t._e()],1)},staticRenderFns:[]};var at=s("VU/8")(it,rt,!1,function(t){s("gfST")},null,null).exports;o.a.use(n.a),o.a.http.options.credentials=!0,o.a.use(r.a),o.a.config.productionTip=!1,o.a.prototype.$api="/api/",o.a.prototype.$char_limit=600,new o.a({el:"#app",router:Q,store:Z,components:{App:at,Home:b,NavButton:et},template:"<App/>"})},NYoc:function(t,e){},"Qr4+":function(t,e){},TR8X:function(t,e){},dAJE:function(t,e){},gfST:function(t,e){},mzls:function(t,e){},ol6e:function(t,e){},"sQ/T":function(t,e){},tGJG:function(t,e){},urey:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.975ae5e5468294c4a5bb.js.map