// Warn user if leaving page
window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = '';
});
