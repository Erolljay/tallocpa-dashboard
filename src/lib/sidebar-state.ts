/*
 * Staff sidebar collapse state, remembered per browser in a cookie.
 *
 * The server never reads it: under Cache Components, cookies() in the app
 * layout would make every /app segment block on request data. Instead the
 * inline script below (run in <head> by the root layout, before first paint)
 * copies the cookie onto <html data-sidebar>, and the sidebar's CSS keys off
 * that attribute through the `sidebar-collapsed` variant (src/app/(platform)/globals.css).
 * So the prerendered shell stays static and there is no layout flash.
 */
export const SIDEBAR_COOKIE = "tallo-sidebar";
export const SIDEBAR_ATTRIBUTE = "data-sidebar";

export const sidebarScript = `try{if(/(?:^|; )${SIDEBAR_COOKIE}=collapsed(?:;|$)/.test(document.cookie))document.documentElement.setAttribute("${SIDEBAR_ATTRIBUTE}","collapsed")}catch(e){}`;
