(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{121:function(e,t,a){},123:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(27),l=a.n(o),c=(a(83),a(4)),u=(a(84),a(77)),i=a(31),s=a(26),d=function(){return!!sessionStorage.getItem("sessionid")},m=a(7),p=a.n(m),E=a(9),f=(a(86),a(67)),b=a.n(f).a.create({baseURL:"http://10.24.26.47:8091"}),v=a(130),h=a(125),j=a(126),g=a(71),O=a(72);var C=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)([]),u=Object(c.a)(l,2),s=u[0],m=u[1],f=Object(i.g)();function C(){return(C=Object(E.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,b.post("/usuario",{email:a,senha:s});case 3:0!==(n=e.sent).data.length?(alert("Voc\xea est\xe1 logado "+n.data[0].nome),sessionStorage.setItem("nome",n.data[0].nome),sessionStorage.setItem("sessionid",n.data[0]._id),window.location.href="/home"):alert("Usu\xe1rio ou senha Inv\xe1lidos");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){d()&&(window.location.href="/home")}),[]),r.a.createElement("div",{className:"Login-form"},r.a.createElement(v.a,{onSubmit:function(e){return C.apply(this,arguments)}},r.a.createElement(v.a.Group,{controlId:"formBasicEmail"},r.a.createElement("p",{align:"left"},r.a.createElement(v.a.Label,null,"Email")),r.a.createElement(v.a.Control,{type:"email",placeholder:"Digite seu email cadastrado",onChange:function(e){return o(e.target.value)}}),r.a.createElement(v.a.Text,{className:"text-muted"})),r.a.createElement(v.a.Group,{controlId:"formBasicPassword"},r.a.createElement("p",{align:"left"},r.a.createElement(v.a.Label,null,"Senha")),r.a.createElement(v.a.Control,{type:"password",placeholder:"Digite a senha",onChange:function(e){return m(e.target.value)}})),r.a.createElement(h.a,null,r.a.createElement(j.a,null,r.a.createElement(g.a,{md:2},r.a.createElement(O.a,{variant:"primary",type:"button",styles:"margin-right: 10px",onClick:function(e){f.push("/cadastro-usuario")}},"Cadastrar")),r.a.createElement(g.a,{md:{span:4,offset:4}},r.a.createElement(O.a,{variant:"primary",type:"submit"},"Entrar"))))))};var y=function(e){return e.history,r.a.createElement("p",null,"Arquivos")};var S=function(e){return e.history,r.a.createElement("p",null,"Clientes")},w=a(18),_=a(21),x=a.n(_);var k=function(){var e=Object(i.g)(),t=Object(n.useState)(["Escolha..."]),a=Object(c.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)(""),s=Object(c.a)(u,2),d=s[0],m=s[1],f=Object(n.useState)(""),h=Object(c.a)(f,2),j=h[0],C=h[1],y=Object(n.useState)(""),S=Object(c.a)(y,2),_=S[0],k=S[1],I=Object(n.useState)(""),L=Object(c.a)(I,2),D=L[0],P=L[1],T=Object(n.useState)(0),G=Object(c.a)(T,2),q=G[0],F=G[1],z=Object(n.useState)("M\xe9dia"),B=Object(c.a)(z,2),M=B[0],R=B[1],H=Object(n.useState)("00/00/0000"),V=Object(c.a)(H,2),U=V[0],N=V[1],A=Object(n.useState)(""),J=Object(c.a)(A,2),Y=J[0],K=J[1],Q=Object(n.useState)(""),W=Object(c.a)(Q,2),X=W[0],Z=W[1],$=Object(n.useState)(["Escolha..."]),ee=Object(c.a)($,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(["Escolha..."]),re=Object(c.a)(ne,2),oe=re[0],le=re[1],ce=Object(n.useState)("00/00/0000"),ue=Object(c.a)(ce,2),ie=ue[0],se=ue[1],de=Object(n.useState)(""),me=Object(c.a)(de,2),pe=me[0],Ee=me[1],fe=Object(n.useState)(""),be=Object(c.a)(fe,2),ve=be[0],he=be[1],je=Object(n.useState)(""),ge=Object(c.a)(je,2),Oe=ge[0],Ce=ge[1],ye=Object(n.useState)(""),Se=Object(c.a)(ye,2),we=Se[0],_e=Se[1],xe=Object(n.useState)(""),ke=Object(c.a)(xe,2),Ie=ke[0],Le=ke[1],De=Object(n.useState)(""),Pe=Object(c.a)(De,2),Te=Pe[0],Ge=Pe[1],qe=Object(n.useState)(""),Fe=Object(c.a)(qe,2),ze=Fe[0],Be=Fe[1],Me=Object(n.useState)(""),Re=Object(c.a)(Me,2),He=Re[0],Ve=Re[1],Ue=Object(n.useState)(!1),Ne=Object(c.a)(Ue,2),Ae=Ne[0],Je=Ne[1];function Ye(){return(Ye=Object(E.a)(p.a.mark((function t(a){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1===(n=a.currentTarget).checkValidity()&&(a.preventDefault(),a.stopPropagation()),Je(!0),a.preventDefault(),r={_id:we,titulo:d,status_projeto:ve,cliente:Te,solicitante_cliente:_,funcional:He,horas:q,prioridade:M,inicio:ie,prazo:U,descricao:Y,pm:ze,observacoes:Oe},console.log({datasave:r}),!1===n.checkValidity()){t.next=15;break}if(void 0===Ie){t.next=12;break}return t.next=10,b.post("/update/projeto",r);case 10:t.next=14;break;case 12:return t.next=14,b.post("/cadastro/projeto",r);case 14:e.push("/lista-projetos");case 15:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Ke(e){return Qe.apply(this,arguments)}function Qe(){return(Qe=Object(E.a)(p.a.mark((function t(a){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.push("/tarefas?idBusca=".concat(Ie));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function We(){return we.length>10?r.a.createElement(O.a,{type:"button",name:"tarefa",onClick:Ke},"Tarefas"):""}function Xe(){return j?r.a.createElement("p",null,"Atualizar Projeto ",j):r.a.createElement("p",null,"Cadastro Projetos ")}return Object(n.useEffect)((function(){function e(){return(e=Object(E.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/clientes").then((function(e){l(e.data),Ge(void 0!==e.data[0]?e.data[0]._id:""),Z(void 0!==e.data[0]?e.data[0].nome:"")}));case 2:return e.next=4,b.post("/usuario",{}).then((function(e){var t=e.data.filter((function(e){return"Funcional"===e.funcao})),a=e.data.filter((function(e){return"PM"===e.funcao}));ae(t),le(a),Be(void 0!==a[0]?a[0]._id:""),Ee(void 0!==a[0]?a[0].nome:""),Ve(void 0!==t[0]?t[0]._id:""),P(void 0!==t[0]?t[0].nome:"")}));case 4:if(t=x.a.parse(window.location.search).idBusca,Le(t),!t){e.next=9;break}return e.next=9,b.get("/projeto/".concat(t)).then((function(e){m(e.data.titulo),he(e.data.status_projeto),Z(e.data.cliente),k(e.data.solicitante_cliente),P(e.data.funcional),F(e.data.horas),R(e.data.prioridade),se(e.data.inicio),N(e.data.prazo),K(e.data.descricao),Ee(e.data.pm),Ce(e.data.observacoes),C(e.data.projeto_id),_e(e.data._id),Be(null===e.data.pm||void 0===e.data.pm?"":e.data.pm._id),Ve(null===e.data.funcional||void 0===e.data.funcional?"":e.data.funcional._id),Ge(null===e.data.cliente||void 0===e.data.cliente?"":e.data.cliente._id),console.log(e.data.pm),console.log(e.data.funcional),console.log(e.data.cliente)}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(Xe,null)),r.a.createElement("div",null,r.a.createElement(v.a,{noValidate:!0,onSubmit:function(e){return Ye.apply(this,arguments)},validated:Ae},r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"titulo"},r.a.createElement(v.a.Label,null,"T\xedtulo"),r.a.createElement(v.a.Control,Object(w.a)({required:!0,type:"text",placeholder:"T\xedtulo do Projeto",value:d,onChange:function(e){return m(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Digite o T\xedtulo do Projeto")),r.a.createElement(v.a.Group,{as:g.a,controlId:"cliente"},r.a.createElement(v.a.Label,null,"Cliente"),r.a.createElement(v.a.Control,{as:"select",onChange:function(e){var t=o.filter((function(t){return t.nome.toLowerCase()===e.target.value.toLowerCase()}));console.log(t[0]._id),Z(e.target.value),Ge(t[0]._id)},value:X.nome,required:!0},r.a.createElement("option",null,"Escolha..."),o.map((function(e){return r.a.createElement("option",{key:e._id,name:e._id}," ",e.nome)}))),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Escolha o cliente")),r.a.createElement(v.a.Group,{as:g.a,controlId:"status_projeto"},r.a.createElement(v.a.Label,null,"Status"),r.a.createElement(v.a.Control,{as:"select",value:ve,onChange:function(e){return he(e.target.value)}},r.a.createElement("option",null,"Aprovado"),r.a.createElement("option",null,"Desenho"),r.a.createElement("option",null,"Desenvolvimento"),r.a.createElement("option",null,"Testes"),r.a.createElement("option",null,"Homologa\xe7\xe3o"),r.a.createElement("option",null,"P\xf3s Implanta\xe7\xe3o"),r.a.createElement("option",null,"Finalizado")))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"solicitante_cliente"},r.a.createElement(v.a.Label,null,"Cliente Solicitante"),r.a.createElement(v.a.Control,Object(w.a)({type:"text",placeholder:"Cliente Solicitante",required:!0,value:_,onChange:function(e){return k(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Informe o Cliente Solicitante")),r.a.createElement(v.a.Group,{as:g.a,controlId:"pm"},r.a.createElement(v.a.Label,null,"PM"),r.a.createElement(v.a.Control,{as:"select",onChange:function(e){var t=oe.filter((function(t){return t.nome.toLowerCase()===e.target.value.toLowerCase()}));console.log(t[0]._id),Ee(e.target.value),Be(t[0]._id)},value:pe.nome},r.a.createElement("option",null,"Escolha..."),oe.map((function(e){return r.a.createElement("option",{key:e._id,name:e._id}," ",e.nome)})))),r.a.createElement(v.a.Group,{as:g.a,controlId:"funcional"},r.a.createElement(v.a.Label,null,"Funcional"),r.a.createElement(v.a.Control,{as:"select",onChange:function(e){return function(e){var t=te.filter((function(t){return t.nome.toLowerCase()===e.target.value.toLowerCase()}));console.log(t[0]._id),P(e.target.value),Ve(t[0]._id)}(e)},value:D.nome},r.a.createElement("option",null,"Escolha..."),te.map((function(e){return r.a.createElement("option",{key:e._id,name:e._id}," ",e.nome)}))))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"horas"},r.a.createElement(v.a.Label,null,"Horas"),r.a.createElement(v.a.Control,{type:"text",placeholder:"Horas",required:!0,value:q,onChange:function(e){return F(e.target.value)}})),r.a.createElement(v.a.Group,{as:g.a,controlId:"prioridade"},r.a.createElement(v.a.Label,null,"Prioridade"),r.a.createElement(v.a.Control,{as:"select",value:M,onChange:function(e){return R(e.target.value)}},r.a.createElement("option",null,"Alta"),r.a.createElement("option",null,"M\xe9dia"),r.a.createElement("option",null,"Baixa")))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"inicio"},r.a.createElement(v.a.Label,null,"In\xedcio"),r.a.createElement(v.a.Control,Object(w.a)({type:"date",placeholder:"In\xedcio",required:!0,value:ie,onChange:function(e){return se(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Escolha a data in\xedcio")),r.a.createElement(v.a.Group,{as:g.a,controlId:"prazo"},r.a.createElement(v.a.Label,null,"Prazo"),r.a.createElement(v.a.Control,{type:"date",placeholder:"Prazo",required:!0,value:U,onChange:function(e){return N(e.target.value)}}))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"descricao"},r.a.createElement(v.a.Label,null,"Descri\xe7\xe3o"),r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:Y,onChange:function(e){return K(e.target.value)}}))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"observacoes"},r.a.createElement(v.a.Label,null,"Observa\xe7\xf5es"),r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:Oe,onChange:function(e){return Ce(e.target.value)}}))),r.a.createElement(g.a,{md:{span:6,offset:3}},r.a.createElement(O.a,{type:"submit"},"Salvar")),r.a.createElement("br",null),r.a.createElement(g.a,{md:{span:6,offset:3}},r.a.createElement(We,null)))))};var I=function(e){var t=e.onSubmit,a=Object(n.useState)(""),o=Object(c.a)(a,2),l=o[0],u=o[1],i=Object(n.useState)("Desenvolvedor"),s=Object(c.a)(i,2),d=s[0],m=s[1],f=Object(n.useState)(""),b=Object(c.a)(f,2),h=b[0],j=b[1],C=Object(n.useState)(0),y=Object(c.a)(C,2),S=y[0],_=y[1],x=Object(n.useState)(),k=Object(c.a)(x,2),I=k[0],L=k[1],D=Object(n.useState)(new Date),P=Object(c.a)(D,2),T=P[0],G=(P[1],Object(n.useState)(!1)),q=Object(c.a)(G,2),F=q[0],z=q[1];function B(){return(B=Object(E.a)(p.a.mark((function e(a){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1===(n=a.currentTarget).checkValidity()&&(a.preventDefault(),a.stopPropagation()),z(!0),a.preventDefault(),!1===n.checkValidity()){e.next=7;break}return e.next=7,t({nome:l,funcao:d,email:h,senha:S,habilidades:I,foto:T});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",null,r.a.createElement(v.a,{noValidate:!0,validated:F,onSubmit:function(e){return B.apply(this,arguments)}},r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,md:"6",controlId:"nome"},r.a.createElement(v.a.Label,null,"Nome"),r.a.createElement(v.a.Control,Object(w.a)({required:!0,type:"text",placeholder:"Nome",onChange:function(e){return u(e.target.value)}},"required",!0))),r.a.createElement(v.a.Group,{as:g.a,md:"6",controlId:"funcao"},r.a.createElement(v.a.Label,null,"Fun\xe7\xe3o"),r.a.createElement(v.a.Control,{as:"select",onChange:function(e){return m(e.target.value)},value:d,required:!0},r.a.createElement("option",null,"Desenvolvedor"),r.a.createElement("option",null,"PM"),r.a.createElement("option",null,"Funcional")),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Escolha a Fun\xe7\xe3o"))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,md:"6",controlId:"email"},r.a.createElement(v.a.Label,null,"Email"),r.a.createElement(v.a.Control,Object(w.a)({type:"email",placeholder:"Email",required:!0,onChange:function(e){return j(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Escreva o Email")),r.a.createElement(v.a.Group,{as:g.a,md:"3",controlId:"senha"},r.a.createElement(v.a.Label,null,"Senha"),r.a.createElement(v.a.Control,Object(w.a)({type:"password",placeholder:"Senha",required:!0,onChange:function(e){return _(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Digite a senha")),r.a.createElement(v.a.Group,{as:g.a,md:"3",controlId:"habilidades"},r.a.createElement(v.a.Label,null,"Habilidades"),r.a.createElement(v.a.Control,{type:"text",placeholder:"Habilidades",required:!0,onChange:function(e){return L(e.target.value)}}))),r.a.createElement(O.a,{type:"submit"},"Cadastrar")))};var L=function(){var e=Object(i.g)();function t(){return(t=Object(E.a)(p.a.mark((function t(a){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.post("/cadastro/usuario",a);case 2:n=t.sent,console.log(n.data),e.push("/home");case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("p",null,"Cadastro Usu\xe1rio")),r.a.createElement(I,{onSubmit:function(e){return t.apply(this,arguments)}}))},D=a(127);var P=function(){var e=Object(i.g)(),t=Object(n.useState)([{}]),a=Object(c.a)(t,2),o=a[0],l=a[1];return Object(n.useEffect)((function(){function e(){return(e=Object(E.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/projetos").then((function(e){l(e.data)}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement("div",{classname:"tabela-lista"},r.a.createElement("p",null,"Lista de Projetos"),r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0,responsive:"xl"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"Cliente"),r.a.createElement("th",null,"T\xedtulo"),r.a.createElement("th",null,"PM"),r.a.createElement("th",null,"Funcional"),r.a.createElement("th",null,"Prazo"),r.a.createElement("th",null,"Prioridade"),r.a.createElement("th",null,"Visualizar"))),r.a.createElement("tbody",null,o.map((function(t){return r.a.createElement("tr",{key:t._id},r.a.createElement("td",null,t.projeto_id),r.a.createElement("td",null,void 0===t.cliente||null===t.cliente?"":t.cliente.nome),r.a.createElement("td",null,t.titulo),r.a.createElement("td",null,void 0===t.pm||null===t.pm?"":t.pm.nome),r.a.createElement("td",null,void 0===t.funcional||null===t.funcional?"":t.funcional.nome),r.a.createElement("td",null,t.prazo),r.a.createElement("td",null,t.prioridade),r.a.createElement("td",null,r.a.createElement(O.a,{variant:"light",size:"sm",type:"button",name:t._id,onClick:function(){var a;void 0!==(a=t._id)&&e.push("/cadastro-projeto?idBusca=".concat(a))}},"Entrar")))})))),r.a.createElement(O.a,{type:"button",name:"tarefa",onClick:function(){e.push("/cadastro-projeto")}},"Cadastrar"))},T=a(128);var G=function(){var e=Object(i.g)(),t=Object(n.useState)(!1),a=Object(c.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)([]),s=Object(c.a)(u,2),d=s[0],m=s[1],f=Object(n.useState)([]),h=Object(c.a)(f,2),j=(h[0],h[1],Object(n.useState)("")),g=Object(c.a)(j,2),C=g[0],y=g[1],S=Object(n.useState)(""),w=Object(c.a)(S,2),_=w[0],k=w[1],I=Object(n.useState)(""),L=Object(c.a)(I,2),P=L[0],G=L[1],q=function(){return l(!1)};function F(){return(F=Object(E.a)(p.a.mark((function e(t){var a,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=d.filter((function(e){return t.target.name===e._id})),console.log("tarefa_id "+a[0]._id),n={_id:a[0]._id,projeto:a[0].projeto,observacoes:C,cliente:a[0].cliente,titulo:a[0].titulo,descricao:a[0].descricao,solicitante:a[0].solicitante_cliente,pm:a[0].pm,funcional:a[0].funcional,prazo:a[0].prazo,inicio:a[0].inicio,fim:a[0].fim,status:a[0].status,horas:a[0].horas,prioridade:a[0].prioridade,desenvolvedor:a[0].desenvolvedor},e.next=5,b.post("/update/tarefa",n);case 5:r=e.sent,console.log(r),console.log(n),l(!1),a[0].observacoes=C;case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e){l(!0),k(e.target.name),console.log("idselect: "+e.target.name);var t=d.filter((function(t){return t._id===e.target.name})),a=new Date,n=(a.getDate()<=9?"0"+a.getDate():a.getDate())+"/"+(a.getUTCMonth()+1<=9?"0"+(a.getUTCMonth()+1):a.getUTCMonth()+1)+"/"+a.getFullYear()+" - "+a.getHours()+":"+a.getMinutes();y(t[0].observacoes+"\n"+n+": ")}function B(t){console.log("idBusca2: "+P),console.log("idaTar: "+t),t.length>10?e.push("/cadastro-tarefa?idBusca=".concat(t,"&idProjeto=").concat(P)):e.push("/cadastro-tarefa?idProjeto=".concat(P))}return Object(n.useEffect)((function(){function t(){return(t=Object(E.a)(p.a.mark((function t(){var a,n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=x.a.parse(window.location.search).idBusca)||e.push("/lista-projetos"),G(a),console.log("idBusca: "+x.a.parse(window.location.search).idBusca),t.next=6,b.post("/tarefas",{projeto:a});case 6:n=t.sent,m(n.data),console.log(n.data),y(n.data.observacoes);case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),r.a.createElement("div",{classname:"tabela-lista"},r.a.createElement("p",null,"Tarefas"),r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0,responsive:"xl"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"T\xedtulo"),r.a.createElement("th",null,"Projeto"),r.a.createElement("th",null,"Desenvolvedor"),r.a.createElement("th",null,"In\xedcio"),r.a.createElement("th",null,"Status"),r.a.createElement("th",null,"Prioridade"),r.a.createElement("th",null,"Visualizar"),r.a.createElement("th",null,"Observa\xe7\xf5es"))),r.a.createElement("tbody",null,d.map((function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.tarefa_id),r.a.createElement("td",null,e.titulo),r.a.createElement("td",null,null===e.projeto?"":e.projeto.titulo),r.a.createElement("td",null,e.desenvolvedor.nome),r.a.createElement("td",null,e.inicio),r.a.createElement("td",null,e.status),r.a.createElement("td",null,e.prioridade),r.a.createElement("td",null,r.a.createElement(O.a,{variant:"light",size:"sm",type:"button",name:e._id,onClick:function(){return B(e._id)}},"Entrar")),r.a.createElement("td",null,r.a.createElement(O.a,{variant:"light",size:"sm",name:e._id,onClick:z},"Escrever")))})))),r.a.createElement(O.a,{type:"button",name:"tarefa",onClick:B},"Cadastrar"),r.a.createElement(T.a,{show:o,onHide:q},r.a.createElement(T.a.Header,{closeButton:!0},r.a.createElement(T.a.Title,null,"Observa\xe7\xf5es")),r.a.createElement(T.a.Body,null,"Escreva sua nota para a tarefa:"),r.a.createElement(T.a.Footer,null,r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:C,onChange:function(e){return y(e.target.value)}}),r.a.createElement(O.a,{variant:"secondary",onClick:q},"Fechar"),r.a.createElement(O.a,{variant:"primary",name:_,onClick:function(e){return F.apply(this,arguments)}},"Salvar"))))};var q=function(){var e=Object(i.g)(),t=Object(n.useState)(""),a=Object(c.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)(""),s=Object(c.a)(u,2),d=s[0],m=s[1],f=Object(n.useState)(""),h=Object(c.a)(f,2),j=h[0],C=h[1],y=Object(n.useState)(""),S=Object(c.a)(y,2),_=(S[0],S[1],Object(n.useState)(0)),k=Object(c.a)(_,2),I=k[0],L=k[1],D=Object(n.useState)("M\xe9dia"),P=Object(c.a)(D,2),T=P[0],G=P[1],q=Object(n.useState)(),F=Object(c.a)(q,2),z=F[0],B=F[1],M=Object(n.useState)(""),R=Object(c.a)(M,2),H=R[0],V=R[1],U=Object(n.useState)(""),N=Object(c.a)(U,2),A=N[0],J=N[1],Y=Object(n.useState)(),K=Object(c.a)(Y,2),Q=K[0],W=K[1],X=Object(n.useState)(""),Z=Object(c.a)(X,2),$=Z[0],ee=Z[1],te=Object(n.useState)("Desenho"),ae=Object(c.a)(te,2),ne=ae[0],re=ae[1],oe=Object(n.useState)(""),le=Object(c.a)(oe,2),ce=le[0],ue=le[1],ie=Object(n.useState)(""),se=Object(c.a)(ie,2),de=se[0],me=se[1],pe=Object(n.useState)(""),Ee=Object(c.a)(pe,2),fe=Ee[0],be=Ee[1],ve=Object(n.useState)(""),he=Object(c.a)(ve,2),je=he[0],ge=he[1],Oe=Object(n.useState)(["Escolha..."]),Ce=Object(c.a)(Oe,2),ye=Ce[0],Se=Ce[1],we=Object(n.useState)(!1),_e=Object(c.a)(we,2),xe=_e[0],ke=_e[1];function Ie(){return(Ie=Object(E.a)(p.a.mark((function t(a){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1===(n=a.currentTarget).checkValidity()&&(a.preventDefault(),a.stopPropagation()),ke(!0),a.preventDefault(),r={_id:ce,titulo:o,projeto:x.a.parse(window.location.search).idProjeto,solicitante:j,desenvolvedor:je,inicio:Q,fim:$,status:ne,prazo:z,horas:I,descricao:H,prioridade:T,observacoes:fe},console.log("data : "+r),console.log(r),!1===n.checkValidity()){t.next=16;break}if(void 0===x.a.parse(window.location.search).idBusca){t.next=13;break}return t.next=11,b.post("/update/tarefa",r);case 11:t.next=15;break;case 13:return t.next=15,b.post("/cadastro/tarefa",r);case 15:e.push("/tarefas?idBusca=".concat(x.a.parse(window.location.search).idProjeto));case 16:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Le(){return d?r.a.createElement("p",null,"Atualizar Tarefa ",d):r.a.createElement("p",null,"Cadastro Tarefa ")}return Object(n.useEffect)((function(){function e(){return(e=Object(E.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.post("/usuario",{}).then((function(e){Se(e.data.filter((function(e){return"Desenvolvedor"===e.funcao}))),console.log({devs:ye}),console.log(e.data.filter((function(e){return"Desenvolvedor"===e.funcao}))),ge(e.data[0]._id),J(e.data[0].nome)}));case 2:if(!(t=x.a.parse(window.location.search).idBusca)){e.next=24;break}return e.next=6,b.get("/tarefa/"+t);case 6:a=e.sent,m(a.data.tarefa_id),me(a.data.projeto.titulo),l(a.data.titulo),re(a.data.status),C(a.data.solicitante),L(a.data.horas),G(a.data.prioridade),W(a.data.inicio),B(a.data.prazo),ee(a.data.fim),V(a.data.descricao),ue(a.data._id),J(a.data.desenvolvedor),be(a.data.observacoes),console.log("update"),e.next=26;break;case 24:return e.next=26,b.get("/projeto/".concat(x.a.parse(window.location.search).idProjeto)).then((function(e){me(e.data.titulo)}));case 26:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(Le,null)),r.a.createElement("div",null,r.a.createElement(v.a,{noValidate:!0,onSubmit:function(e){return Ie.apply(this,arguments)},validated:xe},r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"titulo"},r.a.createElement(v.a.Label,null,"T\xedtulo"),r.a.createElement(v.a.Control,Object(w.a)({required:!0,type:"text",placeholder:"T\xedtulo da Tarefa",value:o,onChange:function(e){return l(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Digite o T\xedtulo da Tarefa")),r.a.createElement(v.a.Group,{as:g.a,controlId:"projeto"},r.a.createElement(v.a.Label,null,"Projeto"),r.a.createElement(v.a.Control,{type:"text",value:de})),r.a.createElement(v.a.Group,{as:g.a,controlId:"solicitante"},r.a.createElement(v.a.Label,null,"Solicitante"),r.a.createElement(v.a.Control,Object(w.a)({type:"text",placeholder:"Solicitante",required:!0,value:j,onChange:function(e){return C(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Informe o Solicitante"))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"desenvolvedor"},r.a.createElement(v.a.Label,null,"Desenvolvedor"),r.a.createElement(v.a.Control,{as:"select",onChange:function(e){console.log("target: "+e.target.value),console.log(ye);var t=ye.filter((function(t){return t.nome.toLowerCase()===e.target.value.toLowerCase()}));console.log(t[0]),J(e.target.value),ge(t[0]._id)},value:A.nome},ye.map((function(e){return r.a.createElement("option",{key:e._id,name:e._id}," ",e.nome)})))),r.a.createElement(v.a.Group,{as:g.a,controlId:"horas"},r.a.createElement(v.a.Label,null,"Horas"),r.a.createElement(v.a.Control,{type:"text",placeholder:"Horas",required:!0,value:I,onChange:function(e){return L(e.target.value)}})),r.a.createElement(v.a.Group,{as:g.a,controlId:"prioridade"},r.a.createElement(v.a.Label,null,"Prioridade"),r.a.createElement(v.a.Control,{as:"select",value:T,onChange:function(e){return G(e.target.value)}},r.a.createElement("option",null,"Alta"),r.a.createElement("option",null,"M\xe9dia"),r.a.createElement("option",null,"Baixa"))),r.a.createElement(v.a.Group,{as:g.a,controlId:"status"},r.a.createElement(v.a.Label,null,"Status"),r.a.createElement(v.a.Control,{as:"select",value:ne,onChange:function(e){return re(e.target.value)}},r.a.createElement("option",null,"Desenho"),r.a.createElement("option",null,"Aguardando GMUD"),r.a.createElement("option",null,"Desenvolvimento"),r.a.createElement("option",null,"Homologando"),r.a.createElement("option",null,"Finalizado")))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"inicio"},r.a.createElement(v.a.Label,null,"In\xedcio"),r.a.createElement(v.a.Control,Object(w.a)({type:"date",required:!0,value:Q,onChange:function(e){return W(e.target.value)}},"required",!0)),r.a.createElement(v.a.Control.Feedback,{type:"invalid"},"Defina a data de in\xedcio")),r.a.createElement(v.a.Group,{as:g.a,controlId:"fim"},r.a.createElement(v.a.Label,null,"Fim"),r.a.createElement(v.a.Control,{type:"date",required:!0,value:$,onChange:function(e){return ee(e.target.value)}})),r.a.createElement(v.a.Group,{as:g.a,controlId:"prazo"},r.a.createElement(v.a.Label,null,"Prazo"),r.a.createElement(v.a.Control,{type:"date",placeholder:"Prazo",required:!0,value:z,onChange:function(e){return B(e.target.value)}}))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"descricao"},r.a.createElement(v.a.Label,null,"Descri\xe7\xe3o"),r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:H,onChange:function(e){return V(e.target.value)}}))),r.a.createElement(v.a.Row,null,r.a.createElement(v.a.Group,{as:g.a,controlId:"observacoes"},r.a.createElement(v.a.Label,null,"Observa\xe7\xf5es"),r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:fe,onChange:function(e){return be(e.target.value)}}))),r.a.createElement(g.a,{md:{span:6,offset:3}},r.a.createElement(O.a,{type:"submit"},"Salvar")),r.a.createElement("br",null))))};a(133);a(121);var F=function(){var e=Object(i.g)(),t=Object(n.useState)([{_id:"",status:"",prioridade:"",tarefa_id:"",titulo:"",projeto:{titulo:""},desenvolvedor:{nome:""}}]),a=Object(c.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)(""),s=Object(c.a)(u,2),d=s[0],m=s[1],f=Object(n.useState)(!1),h=Object(c.a)(f,2),j=h[0],g=h[1],C=Object(n.useState)(""),y=Object(c.a)(C,2),S=y[0],w=y[1];function _(e){g(!0),w(e.target.name),o.map((function(t){e.target.name===t._id&&m(t.observacoes)}))}var x=function(){return g(!1)};function k(){return(k=Object(E.a)(p.a.mark((function e(t){var a,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.filter((function(e){return t.target.name===e._id})),console.log("tarefa_id "+a[0]._id),n={_id:a[0]._id,projeto:a[0].projeto,observacoes:d,cliente:a[0].cliente,titulo:a[0].titulo,descricao:a[0].descricao,solicitante:a[0].solicitante_cliente,pm:a[0].pm,funcional:a[0].funcional,prazo:a[0].prazo,inicio:a[0].inicio,fim:a[0].fim,status:a[0].status,horas:a[0].horas,prioridade:a[0].prioridade,desenvolvedor:a[0].desenvolvedor},e.next=5,b.post("/update/tarefa",n);case 5:r=e.sent,console.log(r),console.log(n),g(!1),a[0].observacoes=d;case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){g(!0),w(e.target.name),console.log("idselect: "+e.target.name);var t=o.filter((function(t){return t._id===e.target.name})),a=new Date,n=(a.getDate()<=9?"0"+a.getDate():a.getDate())+"/"+(a.getUTCMonth()+1<=9?"0"+(a.getUTCMonth()+1):a.getUTCMonth()+1)+"/"+a.getFullYear()+" - "+a.getHours()+":"+a.getMinutes();m(t[0].observacoes+"\n"+n+": ")}return Object(n.useEffect)((function(){function e(){return(e=Object(E.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=sessionStorage.getItem("sessionid"),e.next=3,b.post("/tarefas",{desenvolvedor:t});case 3:a=e.sent,l(a.data),a.data.map((function(e){return console.log(e._id)}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"tabela-lista"},r.a.createElement("p",null,"Tarefas Pendentes do Usu\xe1rio"),r.a.createElement(D.a,{striped:!0,bordered:!0,hover:!0,responsive:"xl"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"T\xedtulo"),r.a.createElement("th",null,"Projeto"),r.a.createElement("th",null,"Desenvolvedor"),r.a.createElement("th",null,"In\xedcio"),r.a.createElement("th",null,"Status"),r.a.createElement("th",null,"Prioridade"),r.a.createElement("th",null,"Visualizar"),r.a.createElement("th",null,"Observa\xe7\xf5es"))),r.a.createElement("tbody",null,o.map((function(t){return r.a.createElement("tr",{key:t._id},r.a.createElement("td",null,t.tarefa_id),r.a.createElement("td",null,t.titulo),r.a.createElement("td",null,t.projeto.titulo),r.a.createElement("td",null,t.desenvolvedor.nome),r.a.createElement("td",null,(a=t.inicio,new Date(a).toLocaleDateString("pt-BR"))),r.a.createElement("td",null,t.status),r.a.createElement("td",null,t.prioridade),r.a.createElement("td",null,r.a.createElement(O.a,{variant:"light",size:"sm",type:"button",name:t._id,onClick:function(){return a=t._id,n=t.projeto._id,console.log("idBusca2: "+n),console.log("idaTar: "+a),void(a.length>10?e.push("/cadastro-tarefa?idBusca=".concat(a,"&idProjeto=").concat(n)):e.push("/cadastro-tarefa?idProjeto=".concat(n)));var a,n}},"Entrar")),r.a.createElement("td",null,r.a.createElement(O.a,{variant:"light",size:"sm",name:t._id,onClick:_},"Escrever")));var a})))),r.a.createElement(T.a,{show:j,onHide:x},r.a.createElement(T.a.Header,{closeButton:!0},r.a.createElement(T.a.Title,null,"Observa\xe7\xf5es")),r.a.createElement(T.a.Body,null,"Escreva sua nota para a tarefa:"),r.a.createElement(T.a.Footer,null,r.a.createElement(v.a.Control,{as:"textarea",rows:"5",value:d,onChange:function(e){return m(e.target.value)}}),r.a.createElement(O.a,{variant:"secondary",onClick:x},"Fechar"),r.a.createElement(O.a,{variant:"primary",name:S,onClick:function(e){return k.apply(this,arguments)}},"Salvar")))))},z=function(e){var t=e.component,a=Object(u.a)(e,["component"]);return r.a.createElement(i.b,Object.assign({},a,{render:function(e){return d()?r.a.createElement(t,e):r.a.createElement(i.a,{to:{pathname:"/",state:{from:e.location}}})}}))},B=function(){return r.a.createElement(s.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/",component:C}),r.a.createElement(z,{path:"/arquivos",component:y}),r.a.createElement(z,{path:"/clientes",component:S}),r.a.createElement(i.b,{path:"/cadastro-usuario",component:L}),r.a.createElement(z,{path:"/cadastro-projeto",component:k}),r.a.createElement(z,{path:"/lista-projetos",component:P}),r.a.createElement(z,{path:"/projetos/:projeto_id",component:P}),r.a.createElement(z,{path:"/tarefas",component:G}),r.a.createElement(i.b,{path:"/cadastro-tarefa",component:q}),r.a.createElement(z,{path:"/home",component:F})))},M=a(131),R=a(132),H=a(129);var V=function(){var e=Object(n.useState)(""),t=Object(c.a)(e,2),a=t[0],o=t[1];function l(e){sessionStorage.removeItem("sessionid"),sessionStorage.removeItem("nome")}sessionStorage.getItem("nome"),Object(n.useEffect)((function(){o(sessionStorage.getItem("nome"))}),[]);var u=function(){return null!==a?r.a.createElement(r.a.Fragment,null,"Usu\xe1rio: ",r.a.createElement("a",{onClick:l,href:"/"},a)):""};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container"},r.a.createElement(M.a,{bg:"light",expand:"lg"},r.a.createElement(M.a.Brand,{href:"/home"},r.a.createElement("h3",null,"Acompanhamento de Projetos")),r.a.createElement(M.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(M.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(R.a,{className:"mr-auto"},r.a.createElement(R.a.Link,{href:"/home"},"In\xedcio"),r.a.createElement(H.a,{title:"Projetos",id:"basic-nav-dropdown"},r.a.createElement(H.a.Item,{href:"/cadastro-projeto"},"Novo Projeto"),r.a.createElement(H.a.Item,{href:"/lista-projetos"},"Lista Projetos")),r.a.createElement(R.a.Link,{href:"/arquivos"},"Arquivos")),r.a.createElement(M.a.Toggle,null),r.a.createElement(M.a.Collapse,{className:"justify-content-end"},r.a.createElement(M.a.Text,null,r.a.createElement(u,null))))),r.a.createElement("div",{className:"content"},r.a.createElement(B,null))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(V,null)),document.getElementById("root"))},78:function(e,t,a){e.exports=a(123)},83:function(e,t,a){},84:function(e,t,a){},86:function(e,t,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.109abbdd.chunk.js.map