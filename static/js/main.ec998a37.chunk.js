(this["webpackJsonpeducator-webapp"]=this["webpackJsonpeducator-webapp"]||[]).push([[0],{152:function(e,t,a){e.exports=a(227)},157:function(e,t,a){},158:function(e,t,a){},227:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(65),s=a.n(c),o=(a(157),a(158),a(66)),i=a(12),l=a.n(i),u=a(20),m=a(29),p=a(30),d=a(32),h=a(31),f=a(33),g="https://api.ithnain.com";function v(e){return e.map((function(e){return JSON.parse(e)}))}function E(e){var t=[],a={};for(var n in e){var r=e[n];a[n]=v(r),t.push(v(r))}return a}var b=function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(g,"/educator?get=all")).then((function(e){return e.json()})).then((function(e){var t={};return e.forEach((function(e){var a=JSON.parse(e),n=a.name,r=a.id;t[r]={name:n,id:r}})),t})).catch((function(e){return console.log("error getting ids: ",e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:t=e.sent,e.t0=l.a.keys(t);case 4:if((e.t1=e.t0()).done){e.next=12;break}return a=e.t1.value,e.next=8,x(t[a].id);case 8:(n=e.sent)&&(t[a].chats=n,t[a].count=n.length),e.next=4;break;case 12:return e.abrupt("return",t);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(g,"/chat?educatorId=").concat(t)).then((function(e){return e.json()})).then((function(e){if(!e.error)return e.map((function(e){return JSON.parse(e)}))})).catch((function(e){return console.log(e)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:t=e.sent,e.t0=l.a.keys(t);case 4:if((e.t1=e.t0()).done){e.next=15;break}return a=e.t1.value,e.next=8,k(t[a].id);case 8:n=e.sent,r=n.chats,c=n.appointments,r&&(t[a].chats=r,t[a].count=r.length),c&&(t[a].appointments=c),e.next=4;break;case 15:return console.log(t),e.abrupt("return",t);case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"chats,appointments,educator,all",e.next=3,fetch("".concat(g,"/educator?id=").concat(t,"&get=").concat("chats,appointments,educator,all")).then((function(e){return e.json()})).then((function(e){delete e.educator;var t=E(e),a=t.appointments;return{chats:t.chats,appointments:a}})).catch((function(e){return console.log(e)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=r.a.createContext(),j=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).saveData=function(e,t,n){t=a.filterAppointments(t),a.setState({educatorId:e,appointments:t,chats:n}),"8bd3c7e1-c6ec-48bf-8ac8-80bf1f013eef"==e&&a.getEducatorData()},a.getEducatorChats=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({loading:!0}),e.next=3,y();case 3:if(!(t=e.sent)){e.next=9;break}return a.setState({educators:t,loading:!1}),e.abrupt("return",t);case 9:a.setState({loading:!1});case 10:case"end":return e.stop()}}),e)}))),a.getEducatorData=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({loading:!0}),e.next=3,w();case 3:if(!(t=e.sent)){e.next=9;break}return a.setState({educators:t,loading:!1}),e.abrupt("return",t);case 9:a.setState({loading:!1});case 10:case"end":return e.stop()}}),e)}))),a.setEducatorId=function(e){var t=a.filterAppointments(a.state.educators[e].appointments);a.setState({educatorId:e,chats:a.state.educators[e].chats,appointments:t})},a.setChats=function(e){return a.setState({chats:e})},a.state={educatorId:"",loading:!1,appointments:{},educators:{},chats:[{id:"1234",patientName:"w"}]},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"filterAppointments",value:function(e){if(e){var t={};return e.forEach((function(e){"string"==typeof e&&(e=JSON.parse(e));var a=e.date.split("T")[0];t[a]?t[a].push(e):t[a]=[e]})),t}return e}},{key:"render",value:function(){return r.a.createElement(C.Provider,{value:Object(o.a)({},this.state,{saveData:this.saveData,getEducatorChats:this.getEducatorChats,setEducatorId:this.setEducatorId,setChats:this.setChats})},this.props.children)}}]),t}(n.Component),O=(C.Consumer,a(53)),S=a(40),L=a(50),I=a(235),B=a(236),D=a(128),P=a(240),G=a(237),N=a(238),T=a(244),A=function(e){function t(){return Object(m.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement(T.a,{style:{width:this.props.width,flexDirection:this.props.direction,backgroundColor:"rgba(247,247,247,1)",padding:this.props.padding,marginBottom:this.props.marginB,marginTop:this.props.marginT,borderRadius:25}},this.props.children)}}]),t}(n.Component),R=a(44),F=a.n(R),H=a(88),M=a.n(H),J=a(127),K=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,e.next=3,s=n,Object(J.sha256)(s);case 3:return r=e.sent,c={id:a,password:r},e.abrupt("return",M.a.post("".concat(g,"/login"),c));case 6:case"end":return e.stop()}var s}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(u.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M.a.get("".concat(g,"/message?chatId=").concat(t),{timeout:1e4});case 3:return a=e.sent,e.abrupt("return",a);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),_=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",loading:!1},a.handleChang=function(e){a.setState(Object(L.a)({},e.target.name,e.target.value))},a.onSubmit=function(){a.setState({loading:!0}),K(a.state).then((function(e){a.setState({loading:!1}),a.context.saveData(e.data.educatorId,e.data.appointments,e.data.chats),a.props.history.push("showpatients")})).catch((function(e){console.log(e),a.setState({loading:!1})}))},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password,c=t.loading;return r.a.createElement(I.a,{fluid:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#0a122a"}},r.a.createElement(B.a,null,r.a.createElement(D.a,{sm:12,lg:4,style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("img",{src:F.a,style:{width:"50%",marginBottom:"4%"}})),r.a.createElement(D.a,{sm:12,lg:6,style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(A,{width:"80%",padding:30},r.a.createElement(P.a,{style:{display:"flex",flexDirection:"column"}},r.a.createElement(P.a.Group,{controlId:"formBasicEmail"},r.a.createElement(P.a.Label,null,"Username"),r.a.createElement(P.a.Control,{type:"text",placeholder:"Enter username",value:a,name:"username",onChange:function(t){return e.handleChang(t)}})),r.a.createElement(P.a.Group,{controlId:"formBasicPassword"},r.a.createElement(P.a.Label,null,"Password"),r.a.createElement(P.a.Control,{type:"password",placeholder:"Password",value:n,name:"password",onChange:function(t){return e.handleChang(t)}})),c?r.a.createElement(G.a,{style:{alignSelf:"center",marginBottom:10},animation:"border"}):null,r.a.createElement(N.a,{variant:"primary",onClick:this.onSubmit},"Submit"))))))}}]),t}(r.a.Component);_.contextType=C;var z=_,Y=a(241),U=a(239),V=a(245),X=a(242),$=a(243),q=function(e){var t=Object(n.useContext)(C),a=t.educators,c=t.setEducatorId,s=t.loading;return r.a.createElement(X.a,{bg:"secondary",variant:"dark",collapseOnSelect:!0,expand:"lg"},r.a.createElement(X.a.Brand,null,r.a.createElement("img",{alt:"",src:F.a,width:"80",height:"40",className:"d-inline-block align-top"})," "),r.a.createElement(X.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(X.a.Collapse,{id:"responsive-navbar-nav"},Object.keys(a).length?Object.keys(a).map((function(e){return r.a.createElement($.a.Link,{key:a[e].id},r.a.createElement(O.b,{style:{color:"#FFF"},onClick:function(){return c(a[e].id)}},a[e].name)," ")})):s?r.a.createElement(G.a,{animation:"border"}):r.a.createElement($.a,{className:"mr-auto"},r.a.createElement($.a.Link,null,r.a.createElement(O.b,{style:{color:"#FFF"},to:"/"},"Home")," "),r.a.createElement($.a.Link,null,r.a.createElement(O.b,{style:{color:"#FFF"},to:"/showpatients"},"Login")))))},Q=function(){return r.a.createElement(X.a,{bg:"secondary",variant:"dark",style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement("img",{alt:"",src:F.a,width:"100",height:"50",className:"d-inline-block align-top"}))},Z=(a(182),a(78)),ee=["png","jpg","jpeg","gif"],te=["pdf","doc","docx"],ae=["mp3","3gp","caf","wav","wave","m4a"],ne=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(c)))).state={messages:[]},a.messagesEnd=r.a.createRef(),a.scrollToBottom=function(){a.messagesEnd.scrollIntoView({behavior:"smooth"})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"1234",this.setState({loading:!0}),e.next=4,W(this.props.chatId).then((function(e){var a=e.data;if(!a)return t.setState({loading:!1}),[];var n=a.map((function(e){return JSON.parse(e)})),r=t.formatMessages(n);t.setState({messages:r,loading:!1})})).catch((function(e){t.setState({loading:!1}),console.log("ERROR GETTING MESSAGES",e)}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"formatMessages",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[];for(var a in e){var n=e[a],r=parseInt(n.user._id)-1;if(n.media){var c=n.media.split("."),s=c[c.length-1],o=ee.includes(s),i=te.includes(s),l=ae.includes(s);o?(n.message={image:n.media},delete n.media):i?(n.message={text:n.text,file:n.media},delete n.media):l?(n.media=n.media.replace("vnd.wave","wav"),n.message={audio:n.media},delete n.media):n.message={text:""}}else n.text?n.message={text:n.text}:n.message={text:""};n.message.createdOn=n.createdOn;var u=new Z.Message({id:r,message:n.message});t.push(u)}return t}},{key:"onSend",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.setState((function(t){return{messages:t.messages.append(e)}}))}},{key:"getTimeStamp",value:function(e){var t=new Date(e);return"".concat(t.getHours(),":").concat(t.getMinutes()," - ").concat(t.getMonth()+1,"/").concat(t.getDate())}},{key:"bubble",value:function(e){var t,a,n=e.message;return 0==n.id?(a=re.senderBubble,t=re.senderContainer):(a=re.receiverBubble,t=re.receiverContainer),n.message?r.a.createElement("div",{style:t},r.a.createElement("div",{style:Object(o.a)({},re.bubble,{},a)},n.message.image?r.a.createElement("img",{src:n.message.image}):n.message.file?r.a.createElement("a",{href:n.message.file,target:"_blank"},n.message.text):n.message.text?n.message.text:null,r.a.createElement("br",null),this.getTimeStamp(n.message.createdOn))):null}},{key:"render",value:function(){var e=this,t=this.state,a=t.loading,n=t.messages;return r.a.createElement("div",{style:{paddingLeft:0,paddingRight:0,marginLeft:0,marginRight:0,width:"100vh",maxHeight:"80vh",overflowY:"auto"}},a?r.a.createElement(G.a,{animation:"border"}):n.length?null:r.a.createElement("div",null,"\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u0641\u0627\u0631\u063a\u0629 "),r.a.createElement(Z.ChatFeed,Object(L.a)({messages:n,isTyping:this.state.is_typing,hasInputField:!1,showSenderName:!0,bubblesCentered:!1,chatBubble:Z.ChatBubble},"chatBubble",this.bubble.bind(this))),r.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}}))}}]),t}(r.a.Component),re={bubble:{borderRadius:15,padding:20,backgroundColor:"#3680E5",display:"inline-block",color:"white"},senderBubble:{backgroundColor:"#3680E5",color:"white"},receiverBubble:{backgroundColor:"#D8D8D8",color:"black"},senderContainer:{display:"flex",justifyContent:"flex-end",marginBottom:5},receiverContainer:{display:"flex",justifyContent:"flex-start",marginBottom:5}},ce=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:"",showPatient:!1,activeList:""},a.setActiveList=function(e){a.setState({activeList:e})},a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){""==this.context.educatorId&&this.props.history.goBack()}},{key:"componentDidMount",value:function(){var e=this.context,t=e.chats,a=e.educators;this.context.chats[0].id||(t=v(this.context.chats),this.context.setChats(t));var n=[];for(var r in a){a[r];n.push({})}}},{key:"renderPatientInfo",value:function(){var e=this,t=this.context.chats;return t?t.map((function(t){if(!t.medicalProfile)return null;var a=t.medicalProfile,n=a.years,c=a.age,s=a.weight,o=a.height,i=a.hba1c,l=a.medications,u=(a.patientName,a.notes),m=a.disease,p=a.sex,d=a.whoIsPatient,h=a.surgery,f=a.otherDiseases,g=a.haveTakenDiet;return r.a.createElement(Y.a.Pane,{key:t.id,eventKey:t.id},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},r.a.createElement("a",{style:{color:"#3581b8",fontSize:26},onClick:function(){return e.setState({showPatient:!1})}},"\u0641\u062a\u062d \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629"),r.a.createElement("h3",null,t.id),r.a.createElement(P.a,{style:{width:"100vh",maxHeight:"80vh",overflowY:"auto",overflowX:"hidden"}},r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"disease"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:m}))),r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"years"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:n})))),r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Hba1C"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:i}))),r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"age"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:c})))),r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"sex"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:p}))),r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Patient Type"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:d})))),r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"medications"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:l}))),r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"otherDiseases"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:f})))),r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Weight"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:s}))),r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Height"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:o})))),r.a.createElement(P.a.Row,null,r.a.createElement(P.a.Group,{as:D.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Diet Taken"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:g}))),r.a.createElement(P.a.Group,{as:B.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Past Surgeries"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"text",value:h})))),r.a.createElement(P.a.Group,{as:B.a},r.a.createElement(P.a.Label,{column:!0,sm:"10"},"Notes"),r.a.createElement(D.a,{sm:"10"},r.a.createElement(P.a.Control,{type:"textarea",value:u}))))))})):null}},{key:"renderChat",value:function(){var e=this,t=this.context.chats;return t?t.map((function(t){return r.a.createElement(Y.a.Pane,{key:t.id,eventKey:t.id},r.a.createElement("div",null,r.a.createElement("a",{style:{color:"#3581b8"},onClick:function(){return e.setState({showPatient:!0})}},"\u0645\u0634\u0627\u0647\u062f\u0629 \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064a\u0644")),r.a.createElement(ne,{chatId:t.id}))})):null}},{key:"renderAppointments",value:function(){var e=this.context.appointments;return!e||e&&!Object.keys(e).length?null:Object.keys(e).map((function(t){var a=e[t];return r.a.createElement(Y.a.Pane,{key:t,eventKey:t},r.a.createElement("div",{style:{width:"100vh",maxHeight:"80vh"}},r.a.createElement("div",{style:{fontWeight:"600",marginBottom:10,textAlign:"center",fontSize:20}},t),r.a.createElement(U.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Time"),r.a.createElement("th",null,"Patient Name"))),r.a.createElement("tbody",null,a.map((function(e){var t=e.appointmentId,a=e.time,n=e.name,c=parseInt(a.split(":")[0]),s=a.split(":")[1],o=c>12?"".concat(c-12,":").concat(s):"".concat(c,":").concat(s);return r.a.createElement("tr",{key:t},r.a.createElement("td",null,o),r.a.createElement("td",null,n))}))))))}))}},{key:"renderAppointmentsList",value:function(){var e=this.context.appointments;return console.log("appointments render:",e),!e||e&&!Object.keys(e).length?null:Object.keys(e).map((function(e){return r.a.createElement(V.a.Item,{key:e,eventKey:e},e)}))}},{key:"renderPatientsList",value:function(){var e=this.context.chats;return e?e.map((function(e){return r.a.createElement(V.a.Item,{key:e.id,eventKey:e.id},e.patientName)})):null}},{key:"renderListHeader",value:function(){var e,t,a=this;return"appointments"==this.state.activeList?(e="dark",t="primary"):(e="primary",t="dark"),r.a.createElement("div",{style:{display:"block",backgroundColor:"white",textAlign:"center",padding:10}},r.a.createElement(N.a,{variant:e,onClick:function(){return a.setActiveList("patients")},style:{marginRight:5}},"\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0627\u062a"),r.a.createElement(N.a,{variant:t,onClick:function(){return a.setActiveList("appointments")}},"\u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f"))}},{key:"render",value:function(){var e=this.state,t=e.activeList,a=e.showPatient;return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null),r.a.createElement(I.a,{fluid:!0,style:{display:"flex",flexDirection:"row",justifyContent:"center",height:"100vh",backgroundColor:"#0a122a"}},r.a.createElement(A,{width:"80%",direction:"row",padding:10,marginT:40,marginB:40},r.a.createElement(Y.a.Container,{id:"left-tabs-example"},r.a.createElement("div",{className:"left-col"},this.renderListHeader(),"appointments"==t?r.a.createElement(V.a,null,this.renderAppointmentsList()):r.a.createElement(V.a,null,this.renderPatientsList())),r.a.createElement("div",{className:"right-col"},r.a.createElement(Y.a.Content,null,"appointments"==t?this.renderAppointments():a?this.renderPatientInfo():this.renderChat()))))),r.a.createElement(Q,null))}}]),t}(r.a.Component);ce.contextType=C;var se=ce;var oe=function(){return r.a.createElement(j,null,r.a.createElement(O.a,{basename:"."},r.a.createElement(S.c,null,r.a.createElement(S.a,{exact:!0,path:"/",component:z}),r.a.createElement(S.a,{exact:!0,path:"/showpatients",component:se}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(oe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},44:function(e,t,a){e.exports=a.p+"static/media/ithnain.287167eb.png"}},[[152,1,2]]]);
//# sourceMappingURL=main.ec998a37.chunk.js.map