
let menuList = document.getElementById("links");
menuList.style.maxHeight = "0px";
function loadMenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "230px";
    } else {
        menuList.style.maxHeight = "0px";
    }
}