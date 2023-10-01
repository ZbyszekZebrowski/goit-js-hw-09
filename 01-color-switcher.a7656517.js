!function(){let e;let t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]"),a=document.body;t.addEventListener("click",()=>{e||(e=setInterval(()=>{a.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`},1e3),t.disabled=!0,d.disabled=!1)}),d.addEventListener("click",()=>{e&&(clearInterval(e),e=null,t.disabled=!1,d.disabled=!0)})}();//# sourceMappingURL=01-color-switcher.a7656517.js.map

//# sourceMappingURL=01-color-switcher.a7656517.js.map
