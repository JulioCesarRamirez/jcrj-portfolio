/**
 * Inline script, runs in <head> before first paint.
 * 1. Applies a saved theme so the wrong palette never flashes.
 * 2. Delegates clicks on `[data-theme-toggle]`, so the toggle ships no React bundle.
 */
export const themeScript = `(function(){
var d=document.documentElement;
try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}
if(window.__themeToggle)return;window.__themeToggle=1;
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest&&e.target.closest("[data-theme-toggle]");
if(!b)return;
var c=d.dataset.theme||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
var n=c==="dark"?"light":"dark";
d.dataset.theme=n;
try{localStorage.setItem("theme",n)}catch(e){}
});
})();`;
