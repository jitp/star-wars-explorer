"use strict";(self.webpackChunkstar_wars_explorer=self.webpackChunkstar_wars_explorer||[]).push([[950],{8950:(R,h,a)=>{a.r(h),a.d(h,{MoviesModule:()=>B});var c=a(4655),e=a(7716),y=a(8002),v=a(1049),d=a(3190),f=a(8939),A=a(2340),D=a(1841);let m=(()=>{class t{constructor(s){this.http=s,this.baseUrl=A.N.starWarsApi.baseUrl}list(s=null){let i=`${this.baseUrl}/films`;return s&&(i=s),this.http.get(i)}getMovie(s){return this.http.get(`${this.baseUrl}/films/${s}`)}}return t.\u0275fac=function(s){return new(s||t)(e.LFG(D.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})(),M=(()=>{class t extends v.m1{constructor(s){super({movie:null,loading:!1}),this.movieService=s,this.movie$=this.select(({movie:i})=>i),this.loading$=this.select(({loading:i})=>i),this.setMovie=this.updater((i,o)=>Object.assign(Object.assign({},i),{movie:o})),this.setLoading=this.updater((i,o)=>Object.assign(Object.assign({},i),{loading:o})),this.getMovie=this.effect(i=>i.pipe((0,d.w)(o=>(this.setLoading(!0),this.movieService.getMovie(o).pipe((0,f.x)(()=>this.setLoading(!1)),(0,v._b)(r=>this.setMovie(r),r=>this.setMovie(null)))))))}}return t.\u0275fac=function(s){return new(s||t)(e.LFG(m))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})();var l=a(8583),g=a(8295),Z=a(9983);let O=(()=>{class t{constructor(){this.movie=null}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-details-presentational"]],inputs:{movie:"movie"},decls:18,vars:4,consts:[[1,"c-movie-details__fields"],["matInput","","readonly","",3,"value"]],template:function(s,i){1&s&&(e.TgZ(0,"h1"),e._uU(1),e.qZA(),e.TgZ(2,"div",0),e.TgZ(3,"div"),e.TgZ(4,"mat-form-field"),e.TgZ(5,"mat-label"),e._uU(6,"Director"),e.qZA(),e._UZ(7,"input",1),e.qZA(),e.qZA(),e.TgZ(8,"div"),e.TgZ(9,"mat-form-field"),e.TgZ(10,"mat-label"),e._uU(11,"Producer"),e.qZA(),e._UZ(12,"input",1),e.qZA(),e.qZA(),e.TgZ(13,"div"),e.TgZ(14,"mat-form-field"),e.TgZ(15,"mat-label"),e._uU(16,"Release date"),e.qZA(),e._UZ(17,"input",1),e.qZA(),e.qZA(),e.qZA()),2&s&&(e.xp6(1),e.Oqu(null==i.movie?null:i.movie.title),e.xp6(6),e.Q6J("value",null==i.movie?null:i.movie.director),e.xp6(5),e.Q6J("value",null==i.movie?null:i.movie.producer),e.xp6(5),e.Q6J("value",null==i.movie?null:i.movie.release_date))},directives:[g.KE,g.hX,Z.Nt],styles:[""],changeDetection:0}),t})();var u=a(4885);function b(t,n){1&t&&e._UZ(0,"mat-spinner",2),2&t&&e.Q6J("diameter",32)}let S=(()=>{class t{constructor(s,i){this.store=s,this.activatedRoute=i,this.movie$=this.store.movie$,this.loading$=this.store.loading$}ngOnInit(){this.store.getMovie(this.activatedRoute.paramMap.pipe((0,y.U)(s=>s.get("id"))))}}return t.\u0275fac=function(s){return new(s||t)(e.Y36(M),e.Y36(c.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-details-container"]],features:[e._Bn([M])],decls:4,vars:6,consts:[[3,"diameter",4,"ngIf"],[3,"movie"],[3,"diameter"]],template:function(s,i){1&s&&(e.YNc(0,b,1,1,"mat-spinner",0),e.ALo(1,"async"),e._UZ(2,"app-movie-details-presentational",1),e.ALo(3,"async")),2&s&&(e.Q6J("ngIf",e.lcZ(1,2,i.loading$)),e.xp6(2),e.Q6J("movie",e.lcZ(3,4,i.movie$)))},directives:[l.O5,O,u.$g],pipes:[l.Ov],styles:[""],changeDetection:0}),t})(),F=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-details-page"]],decls:3,vars:0,consts:[[1,"container","h-100"],[1,"pt-4","h-100"]],template:function(s,i){1&s&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"app-movie-details-container"),e.qZA(),e.qZA())},directives:[S],styles:[""],changeDetection:0}),t})();var C=a(7057),P=a(5435),T=a(3342);let L=(()=>{class t extends v.m1{constructor(s){super({movies:[],total:0,nextPage:null,previousPage:null,paginatorDisabled:!1,loading:!1}),this.movieService=s,this.movies$=this.select(({movies:i})=>i),this.total$=this.select(({total:i})=>i),this.nextPage$=this.select(({nextPage:i})=>i),this.previousPage$=this.select(({previousPage:i})=>i),this.paginatorDisabled$=this.select(({paginatorDisabled:i})=>i),this.loading$=this.select(({loading:i})=>i),this.setMovies=this.updater((i,o)=>Object.assign(Object.assign({},i),{movies:o})),this.setTotal=this.updater((i,o)=>Object.assign(Object.assign({},i),{total:o})),this.setPreviousPage=this.updater((i,o)=>Object.assign(Object.assign({},i),{previousPage:o})),this.setNextPage=this.updater((i,o)=>Object.assign(Object.assign({},i),{nextPage:o})),this.setPaginatorDisabled=this.updater((i,o)=>Object.assign(Object.assign({},i),{paginatorDisabled:o})),this.setLoading=this.updater((i,o)=>Object.assign(Object.assign({},i),{loading:o})),this.loadMovies=this.effect(i=>i.pipe((0,d.w)(o=>(this.setLoading(!0),this.movieService.list(null!=o?o:null).pipe((0,f.x)(()=>{this.setLoading(!1),this.setPaginatorDisabled(!1)}),(0,v._b)(r=>{this.setMovies(r.results),this.setTotal(r.count),this.setNextPage(r.next),this.setPreviousPage(r.previous)},r=>{this.setMovies([]),this.setTotal(0),this.setNextPage(null),this.setPreviousPage(null)})))))),this.nextPage=this.effect(i=>i.pipe((0,C.M)(this.nextPage$),(0,P.h)(([,o])=>null!==o),(0,T.b)({next:([,o])=>{this.setPaginatorDisabled(!0),o&&this.loadMovies(o)}}))),this.previousPage=this.effect(i=>i.pipe((0,C.M)(this.previousPage$),(0,P.h)(([,o])=>null!==o),(0,T.b)({next:([,o])=>{this.setPaginatorDisabled(!0),o&&this.loadMovies(o)}})))}}return t.\u0275fac=function(s){return new(s||t)(e.LFG(m))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),t})();var p=a(9992),j=a(2458);function J(t,n){if(1&t){const s=e.EpF();e.TgZ(0,"mat-list-item",2),e.NdJ("click",function(){const r=e.CHM(s).$implicit;return e.oxw().clickedMovie.emit(r)}),e._UZ(1,"img",3),e.TgZ(2,"h3",4),e._uU(3),e.qZA(),e.qZA()}if(2&t){const s=n.$implicit;e.xp6(3),e.Oqu(null==s?null:s.title)}}let N=(()=>{class t{constructor(){this.movies=[],this.clickedMovie=new e.vpe}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-list-presentational"]],inputs:{movies:"movies"},outputs:{clickedMovie:"movie"},decls:2,vars:1,consts:[[1,"c-list"],["class","c-list__item",3,"click",4,"ngFor","ngForOf"],[1,"c-list__item",3,"click"],["matListAvatar","","alt","avatar","src","./assets/images/avatar.png"],["matLine",""]],template:function(s,i){1&s&&(e.TgZ(0,"mat-list",0),e.YNc(1,J,4,1,"mat-list-item",1),e.qZA()),2&s&&(e.xp6(1),e.Q6J("ngForOf",i.movies))},directives:[p.i$,l.sg,p.Tg,p.eA,j.X2],styles:[""],changeDetection:0}),t})();var $=a(7082);function z(t,n){1&t&&(e.TgZ(0,"div",5),e._UZ(1,"mat-spinner",6),e.qZA()),2&t&&(e.xp6(1),e.Q6J("diameter",32))}let Q=(()=>{class t{constructor(s,i){this.store=s,this.router=i,this.movies$=this.store.movies$,this.total$=this.store.total$,this.paginatorDisabled$=this.store.paginatorDisabled$,this.loading$=this.store.loading$}ngOnInit(){this.store.loadMovies()}onPageChange(s){Number(s.previousPageIndex)>s.pageIndex?this.store.previousPage():this.store.nextPage()}onMovie(s){const i=/.*\/(\d+)\/$/.exec(s.url);this.router.navigate(["movies",i[1]])}}return t.\u0275fac=function(s){return new(s||t)(e.Y36(L),e.Y36(c.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-list-container"]],features:[e._Bn([L])],decls:9,vars:14,consts:[[1,"h-100","d-flex","flex-column"],[1,"flex-grow",3,"movies","movie"],[1,"c-paginator"],["class","c-paginator__spinner",4,"ngIf"],[1,"c-paginator__paginator",3,"hidePageSize","pageSize","length","disabled","page"],[1,"c-paginator__spinner"],[3,"diameter"]],template:function(s,i){1&s&&(e.TgZ(0,"div",0),e.TgZ(1,"app-movie-list-presentational",1),e.NdJ("movie",function(r){return i.onMovie(r)}),e.ALo(2,"async"),e.qZA(),e.TgZ(3,"div",2),e.YNc(4,z,2,1,"div",3),e.ALo(5,"async"),e.TgZ(6,"mat-paginator",4),e.NdJ("page",function(r){return i.onPageChange(r)}),e.ALo(7,"async"),e.ALo(8,"async"),e.qZA(),e.qZA(),e.qZA()),2&s&&(e.xp6(1),e.Q6J("movies",e.lcZ(2,6,i.movies$)),e.xp6(3),e.Q6J("ngIf",e.lcZ(5,8,i.loading$)),e.xp6(2),e.Q6J("hidePageSize",!0)("pageSize",10)("length",e.lcZ(7,10,i.total$))("disabled",e.lcZ(8,12,i.paginatorDisabled$)))},directives:[N,l.O5,$.NW,u.$g],pipes:[l.Ov],styles:[""],changeDetection:0}),t})();const Y=[{path:"",component:(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-movie-list-page"]],decls:3,vars:0,consts:[[1,"container","h-100"],[1,"pt-4","h-100"]],template:function(s,i){1&s&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"app-movie-list-container"),e.qZA(),e.qZA())},directives:[Q],styles:[""],changeDetection:0}),t})()},{path:":id",component:F}];let I=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[c.Bz.forChild(Y)],c.Bz]}),t})();var X=a(4466);const q=[p.ie,$.TU,g.lN,Z.c,u.Cq];let B=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[m],imports:[[X.m,...q,I]]}),t})()}}]);