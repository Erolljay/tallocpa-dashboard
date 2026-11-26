/*
 * BoardUI flips its tokens with a `.dark` class on <html>. Run in <head> by both
 * root layouts (the app's and the website's) before first paint: apply the saved
 * choice from the theme toggle, or follow the device when the user has not picked
 * one, so there is no light flash in dark mode.
 */
export const themeScript = `try{var t=localStorage.getItem("boardui:theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;
