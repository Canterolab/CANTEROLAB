/** Script inline que aplica o tema salvo antes da primeira pintura (tema padrão: escuro). */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
