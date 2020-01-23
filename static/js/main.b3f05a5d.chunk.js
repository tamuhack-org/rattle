(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{103:function(e,t,a){e.exports=a.p+"static/media/arrowleft.05e4d747.svg"},104:function(e,t,a){e.exports=a.p+"static/media/arrowright.354874ba.svg"},105:function(e,t,a){e.exports=a.p+"static/media/isymbol.3c20c3ff.svg"},106:function(e,t,a){e.exports=a.p+"static/media/logout.354874ba.svg"},107:function(e,t,a){e.exports=a.p+"static/media/magnifying.0874efde.svg"},112:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(19),o=a.n(i),s=a(7),c=a(8),l=a(9),u=a(10),d=a(11),p=a(30),h=a(27),m=a(12),g=a(1),b=a(24),f=a(17),v=a(25),E=a.n(v),C=(a(36),{position:"bottom-center",autoClose:1500,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),S=a(6),y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).emailHandler=function(e){a.setState({email:e.target.value})},a.passwordHandler=function(e){a.setState({password:e.target.value})},a.emailHandler=a.emailHandler.bind(Object(g.a)(a)),a.passwordHandler=a.passwordHandler.bind(Object(g.a)(a)),a.state={email:"",password:"",submitColor:"#FF7C93",redirectToSelection:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"login",value:function(){var e=this;this.props.login(this.state.email,this.state.password).then((function(){e.props.error?S.b.error("Login Failed",C):S.b.success("Login Successful",Object(m.a)({},C,{onClose:function(){return e.setState({redirectToSelection:!0})}}))}))}},{key:"render",value:function(){var e=this;return this.state.redirectToSelection?r.a.createElement(h.a,{to:"/select"}):r.a.createElement("div",{style:k.pageContainer},r.a.createElement("form",{style:k.formContainer},r.a.createElement("div",{style:k.titleContainer},r.a.createElement("img",{style:k.logoContainer,src:a(56)}),r.a.createElement("p",{style:{fontSize:"18px"}},"by tamuhack")),r.a.createElement("input",{type:"text",placeholder:"Email",value:this.state.email,onChange:this.emailHandler,style:k.inputContainer}),r.a.createElement("input",{type:"password",placeholder:"Password",value:this.state.password,onChange:this.passwordHandler,style:k.inputContainer}),r.a.createElement(b.a,{onClick:function(){return e.login()},style:Object(m.a)({},k.submitContainer,{backgroundColor:this.state.submitColor})},"Login"),r.a.createElement(S.a,{autoClose:1500})))}}]),t}(r.a.PureComponent),k={logoContainer:{display:"flex",marginLeft:"-10px",height:"56px"},pageContainer:{display:"flex",height:"100vh",width:"100vw",alignItems:"center"},titleContainer:{marginTop:"27vh",marginBottom:"40px",width:"80vw"},formContainer:{display:"flex",flexDirection:"column",alignItems:"center",width:"100vw",paddingLeft:"10vw",paddingRight:"10vw",height:"100vh"},inputContainer:{height:"57px",width:"80vw",paddingLeft:"4%",marginBottom:"3vh",fontSize:17,outline:"none"},submitContainer:{height:"57px",width:"80vw",marginTop:"3vh",color:"white",fontSize:20,border:0}},O=Object(f.b)((function(e){return{isLoggedIn:e.auth.isLoggedIn,isLoading:e.auth.isLoading,userData:e.auth.userData,error:e.auth.error}}),(function(e){return{login:function(t,a){return e(function(e,t){return function(a){return E.a.post("https://register.tamuhack.com/api/volunteer/login",{email:e,password:t},{headers:{"content-type":"application/json"}}).then((function(e){a({type:"LOGIN_SUCCESS",userData:e})})).catch((function(e){a(function(e){return{type:"LOGIN_FAILED",error:e}}(e))}))}}(t,a))}}}))(y),w=a(16),x=a.n(w),D=a(63),j=a.n(D),R=a(44),I=a(65),N=a.n(I),L=(a(57),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).getRegisteredStatus=function(e){var t,n,r,i;return x.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:if(t=!1,n="None",r="",a.props.modalVisible){o.next=5;break}return o.abrupt("return",{registeredStatus:t,foodRestrictions:n,applicationStatus:r});case 5:return i="https://register.tamuhack.com/api/volunteer/summary?email="+e,o.next=8,x.a.awrap(E.a.get(i,{headers:{"content-type":"application/json",authorization:"Token "+a.props.userData.data.token}}).then((function(e){S.b.dismiss(),e.data.checked_in||"checked_in"==a.props.event||S.b.warn("User is not checked in.",Object(m.a)({},C,{autoClose:4e3})),"checked_in"==a.props.event&&"I"!=e.data.status&&"C"!=e.data.status&&S.b.warn("User status not authorized.",Object(m.a)({},C,{autoClose:4e3})),"checked_in"!=a.props.event&&"WorkshopEvent"!=a.props.event&&a.props.attribute.toLowerCase()!=e.data.restrictions.toLowerCase()&&S.b.warn("Food restrictions do not match.",Object(m.a)({},C,{autoClose:4e3,position:"top-center"})),t=e.data.checked_in,n=e.data.restrictions,r=e.data.status})).catch((function(e){S.b.error(e,Object(m.a)({},C,{autoClose:3e3}))})));case 8:return o.abrupt("return",{registeredStatus:t,foodRestrictions:n,applicationStatus:r});case 9:case"end":return o.stop()}}))},a.registerFood=function(){return x.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://register.tamuhack.com/api/volunteer/food",e.next=3,x.a.awrap(E.a.post("https://register.tamuhack.com/api/volunteer/food",{email:a.props.qrData.email,meal:a.props.event,restrictions:a.props.attribute},{headers:{authorization:"Token "+a.props.userData.data.token,"content-type":"application/json"}}).then((function(e){S.b.success("User scan successful.",C)})).catch((function(e){S.b.error(e,Object(m.a)({},C,{autoClose:3e3}))})));case 3:case"end":return e.stop()}}))},a.registerWorkshop=function(){return x.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://register.tamuhack.com/api/volunteer/workshops",e.next=3,x.a.awrap(E.a.post("https://register.tamuhack.com/api/volunteer/workshops",{email:a.props.qrData.email},{headers:{authorization:"Token "+a.props.userData.data.token,"content-type":"application/json"}}).then((function(e){S.b.success("User scan successful.",C)})).catch((function(e){S.b.error(e,Object(m.a)({},C,{autoClose:3e3}))})));case 3:case"end":return e.stop()}}))},a.checkInUser=function(){return x.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://register.tamuhack.com/api/volunteer/checkin",e.next=3,x.a.awrap(E.a.post("https://register.tamuhack.com/api/volunteer/checkin",{email:a.props.qrData.email},{headers:{authorization:"Token "+a.props.userData.data.token,"content-type":"application/json"}}).then((function(e){S.b.success("User scan successful.",C),a.setState({participantRegistered:!0})})).catch((function(e){S.b.error(e,Object(m.a)({},C,{autoClose:3e3})),a.setState({participantRegistered:!1})})));case 3:case"end":return e.stop()}}))},a.checkInEvent=function(){var e;return x.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if("checked_in"!==(e=a.props.event)){t.next=6;break}return t.next=4,x.a.awrap(a.checkInUser());case 4:t.next=13;break;case 6:if("WorkshopEvent"!==e){t.next=11;break}return t.next=9,x.a.awrap(a.registerWorkshop());case 9:t.next=13;break;case 11:return t.next=13,x.a.awrap(a.registerFood());case 13:case"end":return t.stop()}}))},a.disableSubmit=function(){return"checked_in"===a.props.event?a.state.participantRegistered:!a.state.participantRegistered},a.state={participantRegistered:!1,foodRestrictions:"None",applicationStatus:""},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){var e,t,a,n;return x.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,x.a.awrap(this.getRegisteredStatus(this.props.qrData.email));case 2:e=r.sent,t=e.registeredStatus,a=e.foodRestrictions,n=e.applicationStatus,this.setState({participantRegistered:t,foodRestrictions:a,applicationStatus:n});case 7:case"end":return r.stop()}}),null,this)}},{key:"render",value:function(){var e=this.disableSubmit(),t=this.props.event,a=this.state.foodRestrictions,n="Scan";"checked_in"===this.props.event?(t="Check In",a="No Attribute",n="Check In"):"WorkshopEvent"===this.props.event&&(t="Workshop",a="No Attribute");return r.a.createElement("div",{style:T.modalContainer},r.a.createElement(N.a,{visible:this.props.modalVisible,onClose:this.props.closeModal,animation:"slideUp",width:"70vw",height:350,customStyles:{marginBottom:0,justifyContent:"flex-end",paddingLeft:25,paddingRight:25}},r.a.createElement("div",{style:T.badgeContainer},r.a.createElement(R.a,{style:{marginRight:15,padding:10,backgroundColor:"#FFD9D9",fontSize:15}},t),r.a.createElement(R.a,{style:{padding:10,backgroundColor:"#D9EFFF",fontSize:15}},a)),r.a.createElement("div",null,r.a.createElement("p",{style:{display:"flex",fontSize:23,fontWeight:"bold"}},this.props.qrData.first_name," ",this.props.qrData.last_name)),r.a.createElement("div",{style:T.emailRow},r.a.createElement("p",{style:{fontSize:16,fontWeight:"bold",margin:0,paddingLeft:0}},"Email"),r.a.createElement("p",{style:{fontSize:14,margin:0}},this.props.qrData.email)),r.a.createElement("div",{style:Object(m.a)({},T.checkInStatusRow,{borderColor:this.state.participantRegistered?"#5CD059":"#FFBFBF",fontSize:20})},r.a.createElement("p",{style:{display:"flex",margin:0,padding:0}},{P:"PENDING",R:"REJECTED",A:"ADMITTED",C:"NOT CHECKED IN",X:"DECLINED",I:"CHECKED IN",E:"EXPIRED"}[this.state.applicationStatus])),r.a.createElement(b.a,{block:!0,style:T.confirmButton,disabled:e,onClick:this.checkInEvent},n)),r.a.createElement(S.a,{autoClose:1500}))}}]),t}(r.a.PureComponent)),T={modalContainer:{display:"flex",backgroundColor:"white",height:350,padding:30},checkInStatusRow:{display:"flex",justifyContent:"center",alignItems:"center",borderWidth:"5px",borderStyle:"solid",marginBottom:50,paddingTop:5,paddingBottom:5},emailRow:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:0,paddingBottom:10,marginBottom:20,borderBottom:"1px #DEDEDE solid"},confirmButton:{justifyContent:"center",width:"100%",height:"60px",backgroundColor:"#FF7C93",border:"0",fontSize:"18px"},badgeContainer:{display:"flex",flexDirection:"row",paddingBottom:0,marginBottom:15}},_=Object(f.b)((function(e){return{event:e.selection.event,attribute:e.selection.attribute,userData:e.auth.userData}}))(L),A=function(e,t){return function(a){a(function(e,t){return{type:"SELECTION_SUCCESS",event:e,attribute:t}}(e,t))}},F=a(29),B=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).redirect=function(e){return"/"===e&&a.props.logout(),r.a.createElement(h.a,{to:e})},a.onLeftPress=function(){a.setState({leftRedirect:!0})},a.onRightPress=function(){a.setState({rightRedirect:!0})},a.state={leftRedirect:!1,rightRedirect:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.leftIconSrc,n=e.rightIconSrc,i=(e.leftRedirectRoute,e.rightRedirectRoute,t?r.a.createElement("img",{alt:"",src:a(58)("./".concat(t,".svg")),width:"30",height:"30",className:"d-inline-block align-top"}):void 0),o=n?r.a.createElement("img",{alt:"",src:a(58)("./".concat(n,".svg")),width:"30",height:"30",className:"d-inline-block align-top"}):void 0;return this.state.leftRedirect&&void 0!==this.props.leftRedirectRoute?this.redirect(this.props.leftRedirectRoute):this.state.rightRedirect&&void 0!==this.props.rightRedirectRoute?this.redirect(this.props.rightRedirectRoute):r.a.createElement("div",null,r.a.createElement(F.a,{style:H.navSpacing},r.a.createElement(F.a,{style:H.navSpacing},r.a.createElement(F.a.Brand,{onClick:this.onLeftPress,style:H.logoContainer},i)),r.a.createElement(F.a,{style:H.navSpacing},r.a.createElement(F.a.Brand,{href:"/#/select",style:H.logoContainer},r.a.createElement("img",{alt:"",src:a(59),width:"30",height:"30",className:"d-inline-block align-top"}))),r.a.createElement(F.a,{style:H.navSpacing},r.a.createElement(F.a.Brand,{onClick:this.onRightPress,style:H.logoContainer},o))))}}]),t}(r.a.PureComponent),H={logoContainer:{marginRight:"0px",width:"30px"},navSpacing:{justifyContent:"space-between"}},G=Object(f.b)((function(e){return{isLoggedIn:e.auth.isLoggedIn}}),(function(e){return{logout:function(){return e((function(e){e({type:"LOGOUT"})}))}}}))(B),V=a(33),z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleScan=function(e){var t;return x.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(null!==e&&!a.state.confirmVisible){n.next=2;break}return n.abrupt("return");case 2:try{t=JSON.parse(e),Object.prototype.hasOwnProperty.call(t,"email")&&Object.prototype.hasOwnProperty.call(t,"first_name")&&Object.prototype.hasOwnProperty.call(t,"last_name")?a.setState({qrData:t,confirmVisible:!0}):S.b.success("QR scan successful.",C)}catch(r){S.b.error(r,Object(m.a)({},C,{autoClose:3e3}))}case 3:case"end":return n.stop()}}))},a.switchCamera=function(){a.setState({frontCamera:!a.state.frontCamera})},a.show=function(){a.setState({confirmVisible:!0})},a.hide=function(){a.setState({confirmVisible:!1})},a.eventSelectChange=function(e,t){var n=e?e.value:"";""!==n&&a.props.updateSelection(n,"NONE"),a.setState({event:n,attribute:"NONE"})},a.attributeSelectChange=function(e,t){var n=e?e.value:"";""!==n&&a.props.updateSelection(a.props.event,n),a.setState({attribute:n})},a.determineAttributes=function(){var e=[{value:"NONE",label:"None"},{value:"VEGAN",label:"Vegan"},{value:"VEGETARIAN",label:"Vegetarian"},{value:"HALAL",label:"Halal"},{value:"KOSHER",label:"Kosher"},{value:"GLUTEN_FREE",label:"Gluten-free"},{value:"FOOD_ALLERGY",label:"Food allergy"},{value:"DIETARY_RESTRICTION_OTHER",label:"Other"}];if(a.state.event){var t={checked_in:[{value:"NONE",label:"N/A"}],BREAKFAST:e,LUNCH:e,DINNER:e,MIDNIGHT_SNACK:e,WorkshopEvent:[{value:"NONE",label:"N/A"}]};return a.state.event in t?t[a.state.event]:void 0}},a.state={qrData:{first_name:"",last_name:"",email:""},event:a.props.event,attribute:a.props.attribute,delay:500,frontCamera:!0,confirmVisible:!1,redirectToLogin:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;void 0==this.props.userData&&S.b.error("Not Logged In",Object(m.a)({},C,{onClose:function(){return e.setState({redirectToLogin:!0})}}))}},{key:"render",value:function(){var e=this.state,t=e.event,a=e.attribute;if(e.redirectToLogin)return r.a.createElement(h.a,{to:"/"});var n=this.state.frontCamera?"user":"environment",i=[{value:"checked_in",label:"Check In"},{value:"BREAKFAST",label:"Breakfast"},{value:"LUNCH",label:"Lunch"},{value:"DINNER",label:"Dinner"},{value:"MIDNIGHT_SNACK",label:"Midnight Snack"},{value:"WorkshopEvent",label:"Workshop"}],o=this.determineAttributes(),s=function(e){return r.a.createElement("div",{style:U.groupStyles},r.a.createElement("span",null,e.label),r.a.createElement("span",{style:U.groupBadgeStyles},e.options.length))};return r.a.createElement("div",null,r.a.createElement(G,{leftIconSrc:"arrowleft",rightIconSrc:"magnifying",leftRedirectRoute:"/select",rightRedirectRoute:"/search"}),r.a.createElement("div",{style:U.pageContainer},r.a.createElement("div",{style:U.selectionContainer},r.a.createElement("div",{style:U.halfContainer},r.a.createElement(V.a,{options:i,formatGroupLabel:s,placeholder:"Event",isClearable:!0,isSearchable:!1,styles:{menu:function(e){return Object(m.a)({},e,{zIndex:9999})}},defaultValue:""==t?void 0:i.filter((function(e){return e.value==t}))[0],onChange:this.eventSelectChange})),r.a.createElement("div",{style:U.halfContainer},r.a.createElement(V.a,{options:o,formatGroupLabel:s,placeholder:"Attribute",isClearable:!0,isDisabled:""==t||"checked_in"==t||"WorkshopEvent"==t,value:""==a||void 0==o?void 0:o.filter((function(e){return e.value==a}))[0],styles:{menu:function(e){return Object(m.a)({},e,{zIndex:9999})}},onChange:this.attributeSelectChange,isSearchable:!1}))),r.a.createElement("div",null,r.a.createElement(j.a,{style:{width:"100%",marginBottom:20,alignItems:"center",alignSelf:"center",justifyContent:"center"},delay:this.state.delay,onScan:this.handleScan,facingMode:n}),r.a.createElement(b.a,{style:U.switchCameraContainer,onClick:this.switchCamera},"Switch Camera")),r.a.createElement(_,{qrData:this.state.qrData,modalVisible:this.state.confirmVisible,closeModal:this.hide})),r.a.createElement(S.a,{autoClose:1500}))}}]),t}(r.a.PureComponent),U={pageContainer:{display:"flex",height:"calc(100vh - 72px)",width:"100vw",alignItems:"center",flexDirection:"column",backgroundColor:"white"},selectionContainer:{padding:"30px 10px",marginBottom:"10px",backgroundColor:"#FF7C93",width:"100vw"},switchCameraContainer:{width:"80vw",height:"56px",backgroundColor:"#FF7C93",border:0,outline:0},modalContainer:{display:"flex",backgroundColor:"white",height:350,padding:30},checkInStatusRow:{display:"flex",justifyContent:"center",alignItems:"center",border:"5px solid #5CD059",marginBottom:50,paddingTop:5,paddingBottom:5},emailRow:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10,paddingTop:0,marginBottom:20,borderBottom:"1px #DEDEDE solid"},groupBadgeStyles:{backgroundColor:"#EBECF0",borderRadius:"2em",color:"#172B4D",display:"inline-block",fontSize:12,fontWeight:"normal",lineHeight:"1",minWidth:1,width:"200px;",padding:"0.16666666666667em 0.5em",textAlign:"center"},groupStyles:{display:"flex",alignItems:"center",justifyContent:"space-between"},halfContainer:{width:"50%",padding:"0px 5px",display:"inline-block"}},P=Object(f.b)((function(e){return{event:e.selection.event,attribute:e.selection.attribute,userData:e.auth.userData}}),(function(e){return{updateSelection:function(t,a){return e(A(t,a))}}}))(z),W=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).eventSelectChange=function(e,t){var n=e?e.value:"";a.setState({event:n,attribute:"NONE"})},a.attributeSelectChange=function(e,t){var n=e?e.value:"";a.setState({attribute:n})},a.determineAttributes=function(){var e=[{value:"NONE",label:"None"},{value:"VEGAN",label:"Vegan"},{value:"VEGETARIAN",label:"Vegetarian"},{value:"HALAL",label:"Halal"},{value:"KOSHER",label:"Kosher"},{value:"GLUTEN_FREE",label:"Gluten-free"},{value:"FOOD_ALLERGY",label:"Food allergy"},{value:"DIETARY_RESTRICTION_OTHER",label:"Other"}];if(a.state.event){var t={checked_in:[{value:"NONE",label:"N/A"}],BREAKFAST:e,LUNCH:e,DINNER:e,MIDNIGHT_SNACK:e,WorkshopEvent:[{value:"NONE",label:"N/A"}]};return a.state.event in t?t[a.state.event]:void 0}},a.handleScanSubmit=function(){a.props.updateSelection(a.state.event,a.state.attribute),a.setState({redirectToScan:!0})},a.isDisabled=function(){},a.state={event:a.props.event,attribute:a.props.attribute,redirectToScan:!1,redirectToLogin:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;void 0==this.props.userData&&S.b.error("Not Logged In",Object(m.a)({},C,{onClose:function(){return e.setState({redirectToLogin:!0})}}))}},{key:"render",value:function(){var e=this.state,t=e.event,a=e.attribute,n=e.redirectToScan;if(e.redirectToLogin)return r.a.createElement(h.a,{to:"/"});if(n)return r.a.createElement(h.a,{to:"/scan"});var i=[{value:"checked_in",label:"Check In"},{value:"BREAKFAST",label:"Breakfast"},{value:"LUNCH",label:"Lunch"},{value:"DINNER",label:"Dinner"},{value:"MIDNIGHT_SNACK",label:"Midnight Snack"},{value:"WorkshopEvent",label:"Workshop"}],o=this.determineAttributes(),s=function(e){return r.a.createElement("div",{style:M.groupStyles},r.a.createElement("span",null,e.label),r.a.createElement("span",{style:M.groupBadgeStyles},e.options.length))};return r.a.createElement("div",null,r.a.createElement(G,{leftIconSrc:"isymbol",rightIconSrc:"logout",leftRedirectRoute:"/info",rightRedirectRoute:"/"}),r.a.createElement("div",{style:M.pageContainer},r.a.createElement("h2",{style:{fontSize:"36px",color:"#FF7C93",marginBottom:"40px"}},"Select a scan..."),r.a.createElement(V.a,{options:i,formatGroupLabel:s,placeholder:"Event",isClearable:!0,isSearchable:!1,defaultValue:""==t?void 0:i.filter((function(e){return e.value==t}))[0],onChange:this.eventSelectChange}),r.a.createElement("br",null),r.a.createElement(V.a,{options:o,formatGroupLabel:s,placeholder:"Attribute",isClearable:!0,isDisabled:""==t||"checked_in"==t||"WorkshopEvent"==t,value:""==a||void 0==o?void 0:o.filter((function(e){return e.value==a}))[0],onChange:this.attributeSelectChange,isSearchable:!1}),r.a.createElement("br",null),r.a.createElement(b.a,{block:!0,style:{border:"1px solid #FF7C93",backgroundColor:"#FF7C93"},onClick:this.handleScanSubmit,disabled:!(t&&a)},"Start Scanning")),r.a.createElement(S.a,{autoClose:1500}))}}]),t}(r.a.PureComponent),M={pageContainer:{padding:"20px",marginTop:"12vh",width:"100vw"},groupBadgeStyles:{backgroundColor:"#EBECF0",borderRadius:"2em",color:"#172B4D",display:"inline-block",fontSize:12,fontWeight:"normal",lineHeight:"1",minWidth:1,width:"200px;",padding:"0.16666666666667em 0.5em",textAlign:"center"},groupStyles:{display:"flex",alignItems:"center",justifyContent:"space-between"}},K=Object(f.b)((function(e){return{event:e.selection.event,attribute:e.selection.attribute,userData:e.auth.userData}}),(function(e){return{updateSelection:function(t,a){return e(A(t,a))}}}))(W),q=a(66),J=a(70),Y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).showModal=function(){a.setState({modalVisible:!0})},a.closeModal=function(){a.setState({modalVisible:!1})},a.setParticipantData=function(e){a.setState({participantData:e},(function(){a.setState({modalVisible:!0})}))},a.nameHandler=function(e){a.setState({name:e.target.value})},a.handleSearchSubmit=function(){var e=a.state,t=e.name,n=(e.event,e.attribute,a.props.userData.data.token);if(t&&n)return E.a.get("https://register.tamuhack.com/api/volunteer/search?q=".concat(t),{headers:{Authorization:"Token ".concat(n)}}).then((function(e){var t=e.data.results;0==t.length?S.b.warn("Search found no users.",C):S.b.success("Search found ".concat(t.length," user").concat(1==t.length?"":"s","."),C),a.setState({users:t})})).catch((function(e){S.b.error("Invalid API Call",Object(m.a)({},C,{autoClose:3e3}))}));S.b.error("Invalid API Call",Object(m.a)({},C,{autoClose:3e3}))},a.state={event:"",attribute:"",name:"",displayUsers:!1,users:[],modalVisible:!1,participantData:{email:"",first_name:"",last_name:""},redirectToLogin:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;void 0==this.props.userData&&S.b.error("Not Logged In",Object(m.a)({},C,{onClose:function(){return e.setState({redirectToLogin:!0})}}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.name,n=t.users;return t.redirectToLogin?r.a.createElement(h.a,{to:"/"}):(void 0===this.props.userData&&(console.log("ERROR"),S.b.error("Not Logged In",Object(m.a)({},C,{onClose:function(){return e.setState({redirectToLogin:!0})}}))),r.a.createElement("div",null,r.a.createElement(G,{leftIconSrc:"arrowleft",leftRedirectRoute:"/scan"}),r.a.createElement("div",{style:X.pageContainer},r.a.createElement(q.a,{className:"mb-3"},r.a.createElement(J.a,{style:{fontSize:"18px"},placeholder:"Search User",onChange:this.nameHandler})),r.a.createElement(b.a,{block:!0,style:{border:"1px solid #FF7C93",backgroundColor:"#FF7C93"},onClick:this.handleSearchSubmit,disabled:!a,size:"lg"}," Search "),r.a.createElement("div",{style:{marginTop:"10px"}},n.map((function(t,a){return r.a.createElement("div",{onClick:function(){return e.setParticipantData(t)},style:{borderTop:"1px solid black",padding:"5px 0px 5px 0px"},key:a},r.a.createElement("h5",{style:{margin:"0px"}},t.first_name," ",t.last_name,r.a.createElement("span",{style:{float:"right",marginTop:"4px"}},r.a.createElement("svg",{style:{width:"40px",height:"40px"},viewBox:"0 0 24 24"},r.a.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),r.a.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})))),r.a.createElement("p",{style:{margin:"0px"}},t.email))}))),r.a.createElement(_,{qrData:this.state.participantData,modalVisible:this.state.modalVisible,closeModal:this.closeModal}),r.a.createElement(S.a,{autoClose:1500}))))}}]),t}(r.a.PureComponent),X={pageContainer:{padding:"20px",marginTop:"20px",width:"100vw"}},Q=Object(f.b)((function(e){return{userData:e.auth.userData}}),(function(e){return{}}))(Y),$=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,{basename:"/"},r.a.createElement(h.d,null,r.a.createElement(h.b,{path:"/scan",component:P}),r.a.createElement(h.b,{path:"/select",component:K}),r.a.createElement(h.b,{path:"/search",component:Q}),r.a.createElement(h.b,{path:"/",component:O})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z=a(22),ee=a(45),te=a(67),ae=a.n(te),ne=a(68),re={isLoggedIn:!1,isLoading:!1,userData:void 0,error:void 0};var ie={event:"",attribute:""};var oe=Object(Z.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_ATTEMPT":return Object(m.a)({},e,{isLoading:!0,isLoggedIn:!1});case"LOGIN_SUCCESS":return Object(m.a)({},e,{isLoading:!1,isLoggedIn:!0,userData:t.userData,error:void 0});case"LOGIN_FAILED":return Object(m.a)({},e,{isLoading:!1,isLoggedIn:!1,error:t.error});case"LOGOUT":return{userData:void 0,isLoading:!1,isLoggedIn:!1,error:void 0};default:return e}},selection:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SELECTION_SUCCESS":return{event:t.event,attribute:t.attribute};default:return e}}}),se={key:"root",storage:ae.a},ce=Object(ee.a)(se,oe),le=[ne.a],ue=Object(Z.e)(ce,void 0,Object(Z.d)(Z.a.apply(void 0,le))),de=Object(ee.b)(ue),pe=a(69);a(111);o.a.render(r.a.createElement((function(){return r.a.createElement(f.a,{store:ue},r.a.createElement(pe.PersistGate,{loading:null,persistor:de},r.a.createElement($,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,t,a){e.exports=a.p+"static/media/hiss_full_logo.d26ff6ed.svg"},58:function(e,t,a){var n={"./arrowleft.svg":103,"./arrowright.svg":104,"./hiss.svg":59,"./hiss_full_logo.svg":56,"./isymbol.svg":105,"./logout.svg":106,"./magnifying.svg":107};function r(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=58},59:function(e,t,a){e.exports=a.p+"static/media/hiss.225cb576.svg"},71:function(e,t,a){e.exports=a(112)}},[[71,1,2]]]);
//# sourceMappingURL=main.b3f05a5d.chunk.js.map