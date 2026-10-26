(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-icons/components/uni-icons/uni-icons"],{"088a":function(t,e,n){"use strict";var i=n("a762"),s=n.n(i);s.a},a762:function(t,e,n){},e4b8:function(t,e,n){"use strict";var i;n.r(e);var s=function(){var t=this,e=t.$createElement;t._self._c},c=[],o=(n("e9f5"),n("f665"),n("3a15"));const u=t=>{const e=/^[0-9]*$/g;return"number"===typeof t||e.test(t)?t+"px":t};var a,r={name:"UniIcons",emits:["click"],props:{type:{type:String,default:""},color:{type:String,default:"#333333"},size:{type:[Number,String],default:16},customPrefix:{type:String,default:""}},data(){return{icons:o["a"].glyphs}},computed:{unicode(){let t=this.icons.find(t=>t.font_class===this.type);return t?unescape("%u"+t.unicode):""},iconSize(){return u(this.size)}},methods:{_onClick(){this.$emit("click")}}},l=r,p=(n("088a"),n("f0c5")),f=Object(p["a"])(l,s,c,!1,null,null,null,!1,i,a);e["default"]=f.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-icons/components/uni-icons/uni-icons-create-component',
    {
        'uni_modules/uni-icons/components/uni-icons/uni-icons-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e4b8"))
        })
    },
    [['uni_modules/uni-icons/components/uni-icons/uni-icons-create-component']]
]);
