(this["webpackJsonpeducator-webapp"]=this["webpackJsonpeducator-webapp"]||[]).push([[0],{152:function(e,t,a){e.exports=a(227)},157:function(e,t,a){},158:function(e,t,a){},227:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(65),o=a.n(c),s=(a(157),a(158),a(66)),l=a(15),i=a.n(l),u=a(27),m=a(29),d=a(30),h=a(33),p=a(31),f=a(32),g="https://api.ithnain.com",E=function(){var e=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(g,"/educator?get=all")).then((function(e){return e.json()})).then((function(e){var t={};return e.forEach((function(e){var a=JSON.parse(e),n=a.name,r=a.id;t[r]={name:n,id:r}})),t})).catch((function(e){return console.log("error getting ids: ",e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(u.a)(i.a.mark((function e(){var t,a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:t=e.sent,e.t0=i.a.keys(t);case 4:if((e.t1=e.t0()).done){e.next=12;break}return a=e.t1.value,e.next=8,v(t[a].id);case 8:(n=e.sent)&&(t[a].chats=n,t[a].count=n.length),e.next=4;break;case 12:return console.log(t),e.abrupt("return",t);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(g,"/chat?educatorId=").concat(t)).then((function(e){return e.json()})).then((function(e){if(!e.error)return e.map((function(e){return JSON.parse(e)}))})).catch((function(e){return console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=r.a.createContext(),x=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).saveData=function(e,t,n){a.setState({educatorId:e,appointments:t,chats:n}),"8bd3c7e1-c6ec-48bf-8ac8-80bf1f013eef"==e&&a.getEducatorChats()},a.getEducatorChats=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({loading:!0}),e.next=3,b();case 3:if(!(t=e.sent)){e.next=9;break}return a.setState({educators:t,loading:!1}),e.abrupt("return",t);case 9:a.setState({loading:!1});case 10:case"end":return e.stop()}}),e)}))),a.setEducatorId=function(e){a.setState({educatorId:e,chats:a.state.educators[e].chats})},a.setChats=function(e){return a.setState({chats:e})},a.state={test:"contex works",educatorId:"",loading:!1,appointments:[],educators:{},chats:[{id:1,patientName:"w"}]},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement(y.Provider,{value:Object(s.a)({},this.state,{saveData:this.saveData,getEducatorChats:this.getEducatorChats,setEducatorId:this.setEducatorId,setChats:this.setChats})},this.props.children)}}]),t}(n.Component),w=(y.Consumer,a(53)),C=a(40),k=a(50),j=a(235),O=a(236),S=a(128),I=a(239),L=a(237),B=a(238),D=a(242),P=function(e){function t(){return Object(m.a)(this,t),Object(h.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement(D.a,{style:{width:this.props.width,flexDirection:this.props.direction,backgroundColor:"rgba(247,247,247,1)",padding:this.props.padding,marginBottom:this.props.marginB,marginTop:this.props.marginT,borderRadius:25}},this.props.children)}}]),t}(n.Component),G=a(44),N=a.n(G),T=a(88),R=a.n(T),F=a(127),M=function(){var e=Object(u.a)(i.a.mark((function e(t){var a,n,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,e.next=3,o=n,Object(F.sha256)(o);case 3:return r=e.sent,c={id:a,password:r},e.abrupt("return",R.a.post("".concat(g,"/login"),c));case 6:case"end":return e.stop()}var o}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R.a.get("".concat(g,"/message?chatId=").concat(t),{timeout:1e4});case 3:return a=e.sent,e.abrupt("return",a);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),J=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",loading:!1},a.handleChang=function(e){a.setState(Object(k.a)({},e.target.name,e.target.value))},a.onSubmit=function(){a.setState({loading:!0}),M(a.state).then((function(e){a.setState({loading:!1}),a.context.saveData(e.data.educatorId,e.data.appointments,e.data.chats),a.props.history.push("showpatients")})).catch((function(e){console.log(e),a.setState({loading:!1})}))},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password,c=t.loading;return r.a.createElement(j.a,{fluid:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#0a122a"}},r.a.createElement(O.a,null,r.a.createElement(S.a,{sm:12,lg:4,style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("img",{src:N.a,style:{width:"50%",marginBottom:"4%"}})),r.a.createElement(S.a,{sm:12,lg:6,style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(P,{width:"80%",padding:30},r.a.createElement(I.a,{style:{display:"flex",flexDirection:"column"}},r.a.createElement(I.a.Group,{controlId:"formBasicEmail"},r.a.createElement(I.a.Label,null,"Username"),r.a.createElement(I.a.Control,{type:"text",placeholder:"Enter username",value:a,name:"username",onChange:function(t){return e.handleChang(t)}})),r.a.createElement(I.a.Group,{controlId:"formBasicPassword"},r.a.createElement(I.a.Label,null,"Password"),r.a.createElement(I.a.Control,{type:"password",placeholder:"Password",value:n,name:"password",onChange:function(t){return e.handleChang(t)}})),c?r.a.createElement(L.a,{style:{alignSelf:"center",marginBottom:10},animation:"border"}):null,r.a.createElement(B.a,{variant:"primary",onClick:this.onSubmit},"Submit"))))))}}]),t}(r.a.Component);J.contextType=y;var A=J,W=a(240),K=a(244);function _(e){return e.map((function(e){return JSON.parse(e)}))}var Y=a(241),z=a(243),U=function(e){var t=Object(n.useContext)(y),a=t.educators,c=t.setEducatorId,o=t.loading;return r.a.createElement(Y.a,{bg:"secondary",variant:"dark",collapseOnSelect:!0,expand:"lg"},r.a.createElement(Y.a.Brand,null,r.a.createElement("img",{alt:"",src:N.a,width:"80",height:"40",className:"d-inline-block align-top"})," "),r.a.createElement(Y.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(Y.a.Collapse,{id:"responsive-navbar-nav"},Object.keys(a).length?Object.keys(a).map((function(e){return r.a.createElement(z.a.Link,{key:a[e].id},r.a.createElement(w.b,{style:{color:"#FFF"},onClick:function(){return c(a[e].id)}},a[e].name)," ")})):o?r.a.createElement(L.a,{animation:"border"}):r.a.createElement(z.a,{className:"mr-auto"},r.a.createElement(z.a.Link,null,r.a.createElement(w.b,{style:{color:"#FFF"},to:"/"},"Home")," "),r.a.createElement(z.a.Link,null,r.a.createElement(w.b,{style:{color:"#FFF"},to:"/showpatients"},"Login")))))},V=function(){return r.a.createElement(Y.a,{bg:"secondary",variant:"dark",style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("img",{alt:"",src:N.a,width:"100",height:"50",className:"d-inline-block align-top"}))},X=(a(182),a(78)),$=["png","jpg","jpeg","gif"],q=["pdf","doc","docx"],Q=["mp3","3gp","caf","wav","wave","m4a"],Z=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(c)))).state={messages:[]},a.messagesEnd=r.a.createRef(),a.scrollToBottom=function(){a.messagesEnd.scrollIntoView({behavior:"smooth"})},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(i.a.mark((function e(){var t=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"1234",this.setState({loading:!0}),e.next=4,H(this.props.chatId).then((function(e){var a=e.data;if(!a)return t.setState({loading:!1}),[];var n=a.map((function(e){return JSON.parse(e)})),r=t.formatMessages(n);t.setState({messages:r,loading:!1})})).catch((function(e){t.setState({loading:!1}),console.log("ERROR GETTING MESSAGES",e)}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"formatMessages",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[];for(var a in e){var n=e[a],r=parseInt(n.user._id)-1;if(n.media){var c=n.media.split("."),o=c[c.length-1],s=$.includes(o),l=q.includes(o),i=Q.includes(o);s?(n.message={image:n.media},delete n.media):l?(n.message={text:n.text,file:n.media},delete n.media):i?(n.media=n.media.replace("vnd.wave","wav"),n.message={audio:n.media},delete n.media):n.message={text:""}}else n.text?n.message={text:n.text}:n.message={text:""};n.message.createdOn=n.createdOn;var u=new X.Message({id:r,message:n.message});t.push(u)}return t}},{key:"onSend",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.setState((function(t){return{messages:t.messages.append(e)}}))}},{key:"getTimeStamp",value:function(e){var t=new Date(e);return"".concat(t.getHours(),":").concat(t.getMinutes()," - ").concat(t.getMonth()+1,"/").concat(t.getDate())}},{key:"bubble",value:function(e){var t,a,n=e.message;return 0==n.id?(a=ee.senderBubble,t=ee.senderContainer):(a=ee.receiverBubble,t=ee.receiverContainer),n.message?r.a.createElement("div",{style:t},r.a.createElement("div",{style:Object(s.a)({},ee.bubble,{},a)},n.message.image?r.a.createElement("img",{src:n.message.image}):n.message.file?r.a.createElement("a",{href:n.message.file,target:"_blank"},n.message.text):n.message.text?n.message.text:null,r.a.createElement("br",null),this.getTimeStamp(n.message.createdOn))):null}},{key:"render",value:function(){var e=this,t=this.state,a=t.loading,n=t.messages;return r.a.createElement("div",{style:{paddingLeft:0,paddingRight:0,marginLeft:0,marginRight:0,width:"100vh",maxHeight:"80vh",overflowY:"auto"}},a?r.a.createElement(L.a,{animation:"border"}):n.length?null:r.a.createElement("div",null,"\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u0641\u0627\u0631\u063a\u0629 "),r.a.createElement(X.ChatFeed,Object(k.a)({messages:n,isTyping:this.state.is_typing,hasInputField:!1,showSenderName:!0,bubblesCentered:!1,chatBubble:X.ChatBubble},"chatBubble",this.bubble.bind(this))),r.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}}))}}]),t}(r.a.Component),ee={bubble:{borderRadius:15,padding:20,backgroundColor:"#3680E5",display:"inline-block",color:"white"},senderBubble:{backgroundColor:"#3680E5",color:"white"},receiverBubble:{backgroundColor:"#D8D8D8",color:"black"},senderContainer:{display:"flex",justifyContent:"flex-end",marginBottom:5},receiverContainer:{display:"flex",justifyContent:"flex-start",marginBottom:5}},te=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",showPatient:!1},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentWillMount",value:function(){""==this.context.educatorId&&this.props.history.goBack()}},{key:"componentDidMount",value:function(){var e=this.context,t=e.chats,a=e.educators;this.context.chats[0].id||(t=_(this.context.chats),this.context.setChats(t));var n=[];for(var r in a){a[r];n.push({})}}},{key:"renderPatientInfo",value:function(){var e=this,t=this.context.chats;return t?t.map((function(t){if(!t.medicalProfile)return null;var a=t.medicalProfile,n=a.years,c=a.age,o=a.weight,s=a.height,l=a.hba1c,i=a.medications,u=(a.patientName,a.notes),m=a.disease,d=a.sex,h=a.whoIsPatient,p=a.surgery,f=a.otherDiseases,g=a.haveTakenDiet;return r.a.createElement(W.a.Pane,{key:t.id,eventKey:t.id},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},r.a.createElement("a",{style:{color:"#3581b8",fontSize:26},onClick:function(){return e.setState({showPatient:!1})}},"\u0641\u062a\u062d \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629"),r.a.createElement("h3",null,t.id),r.a.createElement(I.a,{style:{width:"100vh",maxHeight:"80vh",overflowY:"auto",overflowX:"hidden"}},r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"disease"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:m}))),r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"years"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:n})))),r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Hba1C"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:l}))),r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"age"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:c})))),r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"sex"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:d}))),r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Patient Type"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:h})))),r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"medications"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:i}))),r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"otherDiseases"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:f})))),r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Weight"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:o}))),r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Height"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:s})))),r.a.createElement(I.a.Row,null,r.a.createElement(I.a.Group,{as:S.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Diet Taken"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:g}))),r.a.createElement(I.a.Group,{as:O.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Past Surgeries"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"text",value:p})))),r.a.createElement(I.a.Group,{as:O.a},r.a.createElement(I.a.Label,{column:!0,sm:"10"},"Notes"),r.a.createElement(S.a,{sm:"10"},r.a.createElement(I.a.Control,{type:"textarea",value:u}))))))})):null}},{key:"renderChat",value:function(){var e=this,t=this.context.chats;return t?t.map((function(t){return r.a.createElement(W.a.Pane,{key:t.id,eventKey:t.id},r.a.createElement("div",null,r.a.createElement("a",{style:{color:"#3581b8"},onClick:function(){return e.setState({showPatient:!0})}},"\u0645\u0634\u0627\u0647\u062f\u0629 \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064a\u0644")),r.a.createElement(Z,{chatId:t.id}))})):null}},{key:"renderPatientsList",value:function(){var e=this.context.chats;return e?e.map((function(e){return r.a.createElement(K.a.Item,{key:e.id,eventKey:e.id},e.patientName)})):null}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(U,null),r.a.createElement(j.a,{fluid:!0,style:{display:"flex",flexDirection:"row",justifyContent:"center",height:"100vh",backgroundColor:"#0a122a"}},r.a.createElement(P,{width:"80%",direction:"row",padding:10,marginT:40,marginB:40},r.a.createElement(W.a.Container,{id:"left-tabs-example"},r.a.createElement("div",{className:"left-col"},r.a.createElement(K.a,null,this.renderPatientsList())),r.a.createElement("div",{className:"right-col"},r.a.createElement(W.a.Content,null,this.state.showPatient?this.renderPatientInfo():this.renderChat()))))),r.a.createElement(V,null))}}]),t}(r.a.Component);te.contextType=y;var ae=te;var ne=function(){return r.a.createElement(x,null,r.a.createElement(w.a,null,r.a.createElement(C.d,null,r.a.createElement(C.b,{exact:!0,path:"/",component:A}),r.a.createElement(C.a,{from:"/educator-webapp",exact:!0,to:"/"}),r.a.createElement(C.b,{exact:!0,path:"/showpatients",component:ae}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},44:function(e,t,a){e.exports=a.p+"static/media/ithnain.287167eb.png"}},[[152,1,2]]]);
//# sourceMappingURL=main.a2909c68.chunk.js.map