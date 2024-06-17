// Arrays que almacenan la información que se debe mostrar en los menús
// denámicos en las portadas

// Menú dinámico portada pantallas > 768px
let presentationSection = [
    {
        title: 'ultimas noticias',
    },
    {
        title: 'conoce mago de oz',
    },
    {
        title: 'proximos conciertos',
    },
];

// Menú dinámico portada pantallas < 768px
let news = [
    {
        title: 'Zeta no continua con la banda',
        sectionIntro: 'después de meses luchando Zeta ha decidido no continuar aunque deja la puerta abierta',
        href: './detalle.html'
    },
    {
        title: 'entrevista para los 40 principales',
        sectionIntro: 'en esta entrevista la banda repasa las últimas participaciones españolas en Eurovisión',
        href: ''
    },
    {
        title: 'Presentación gira 2024',
        sectionIntro: 'Mago de Oz inicia su gira en Madrid en una mañana repleta de rock y letras reivindicativas',
        href: ''
    },
    {
        title: 'Presentación en Veracruz',
        sectionIntro: 'Se acerca la presentación de Mägo de Oz en Veracruz no te pierdas la fecha y la sede',
        href: ''
    }
];

// Variables para el control del elemento mostrado en los menús dinámicos.
let currentCategory = 0;
let currentNew = 0;
let currentOption = 0;

// Función que abre y cierra el header mostrando el menú de la web cuando estamos
// en pantallas de móvil o tablets.
function menu(event, showHide) {
    let headerMenu = document.querySelector(".header__menu");
    let menuOptions = document.getElementById("menu-options");
    let menuBtn = document.getElementById("menu-btn");
    let header = document.getElementById("header");
    let body = document.getElementsByTagName("body")[0];
    let footer = document.getElementsByTagName("footer")[0];

    if (menuOptions.className.search('hide') != -1 && showHide == undefined) {
        window.scrollTo(0, 0);
        menuOptions.className = "menu__options-menu show";
        footer.style.visibility = "visible";
        footer.style.bottom = 0;
        header.style.height = "100vh";
        body.style.overflow = "hidden";
        menuBtn.textContent = "cerrar menú";
        headerMenu.style.height = "60dvh";
        headerMenu.style.overflowX = "hidden";
        headerMenu.style.overflowY = "hidden";
    }
    else if (showHide == 'hide' || showHide == undefined) {
        menuOptions.className = "menu__options-menu hide";
        header.style.height = "auto";
        body.style.overflowX = "hidden";
        body.style.overflowY = "auto";
        menuBtn.textContent = "menú";
        headerMenu.style.height = "inherit"; footer.style.visibility = "hidden";
        footer.style.bottom = 0;
    }
}

// Función que muestra el nuevo elemento en las ventanas de:
// 1. categorías en la vista para pantallas grandes
// 2. categorías en la vista para pantallas pequeñas
function next(event) {
    let sectionEltoId = event.srcElement.parentElement.parentNode.parentElement.id;
    let portadaMainElto = document.querySelector("#" + sectionEltoId + ' > .portada__main');
    let sectionTitle = document.querySelector("#" + sectionEltoId + " > h1 > .section__title");
    let sectionIntro = document.querySelector("#" + sectionEltoId + " > .section__intro");
    let groupPagesEltos = event.srcElement.parentElement.children;
    let nextClickedBtn = event.target;
    let nextClickedBtnId = event.target.id.split('-')[3];
    let mainTitleElto = portadaMainElto.firstElementChild;
    let imagesEltos = document.querySelectorAll("#" + sectionEltoId + " > ." + portadaMainElto.className + " > figure > img");

    for (let numNextElto = 0; numNextElto < groupPagesEltos.length; numNextElto++) {
        groupPagesEltos[numNextElto].classList.remove('active');
    }

    for (let numNextImg = 0; numNextImg < imagesEltos.length; numNextImg++) {
        imagesEltos[numNextImg].className = "portada__image hide"
    }

    if (sectionTitle != null) {
        sectionIntro.textContent = news[nextClickedBtnId].sectionIntro;
        mainTitleElto.firstElementChild.textContent = news[nextClickedBtnId].title;
        mainTitleElto.firstElementChild.href = news[nextClickedBtnId].href;
    }
    else {
        mainTitleElto.firstElementChild.textContent = presentationSection[nextClickedBtnId].title;
    }

    nextClickedBtn.classList.add('active');
    imagesEltos[nextClickedBtnId].classList.remove('hide');
    imagesEltos[nextClickedBtnId].classList.add('show');

    currentCategory = sectionEltoId == "presentation-section" ? nextClickedBtnId : currentCategory;
    currentNew = sectionEltoId == "news-section" ? nextClickedBtnId : currentNew;
}

// Función que cada 5 seg cambia el elemnto monstrado en las ventanas de:
// 1. categorías en la vista para pantallas grandes
// 2. categorías en la vista para pantallas pequeñas
function nextAutomatic(sectionEltoId, currentElto) {
    let portadaMainElto = document.querySelector("#" + sectionEltoId + ' > .portada__main');

    if (portadaMainElto == null) return;

    let sectionTitle = document.querySelector("#" + sectionEltoId + " > h1 > .section__title");
    let sectionIntro = document.querySelector("#" + sectionEltoId + " > .section__intro");
    let groupPagesEltos = document.querySelectorAll("#" + sectionEltoId + "> .portada__main > .main__group-pages > div");
    let mainTitleElto = portadaMainElto.firstElementChild;
    let imagesEltos = document.querySelectorAll("#" + sectionEltoId + " > ." + portadaMainElto.className + " > figure > img");

    for (let numNextElto = 0; numNextElto < groupPagesEltos.length; numNextElto++) {
        groupPagesEltos[numNextElto].classList.remove('active');
    }

    for (let numNextImg = 0; numNextImg < imagesEltos.length; numNextImg++) {
        imagesEltos[numNextImg].className = "portada__image hide"
    }

    if (sectionTitle != null) {
        sectionIntro.textContent = news[currentElto].sectionIntro;
        mainTitleElto.firstElementChild.textContent = news[currentElto].title;
        mainTitleElto.firstElementChild.href = news[currentElto].href;
    }
    else {
        mainTitleElto.firstElementChild.textContent = presentationSection[currentElto].title;
    }

    groupPagesEltos[currentElto].classList.add('active');
    imagesEltos[currentElto].classList.remove('hide');
    imagesEltos[currentElto].classList.add('show');
}

// Función para cambiar el elemento mostrado en el menú de presentación
// cuando se clica en los iconos
function nextPresentationMenu(event) {

    let iconsMenu = document.querySelectorAll(".content__menu > img");
    let iconClicked = event.target;
    let iconClickedId = event.target.id;
    let articles = document.querySelectorAll(".content__info > article");

    for (let numIcon = 0; numIcon < iconsMenu.length; numIcon++) {
        iconsMenu[numIcon].className = "menu__icon";
    }

    for (let numArticle = 0; numArticle < articles.length; numArticle++) {
        articles[numArticle].className = "info__block hide";
    }

    iconClicked.classList.add("icon-active");
    articles[iconClickedId].className = "info__block";

    currentOption = iconClickedId;
}

// Función para cambiar cada 5 seg el elemento mostrado en el menú de presentación
function nextPresentationMenuAutomatic(currentElto) {

    let iconsMenu = document.querySelectorAll(".content__menu > img");
    let articles = document.querySelectorAll(".content__info > article");

    if (articles.length == 0) return;

    for (let numIcon = 0; numIcon < iconsMenu.length; numIcon++) {
        iconsMenu[numIcon].className = "menu__icon";
    }

    for (let numArticle = 0; numArticle < articles.length; numArticle++) {
        articles[numArticle].className = "info__block hide";
    }

    articles[currentElto].className = "info__block";
    iconsMenu[currentElto].className = "menu__icon icon-active";
}

// Temporizadores que controlan el cambio de elemento en los menús 
// automáticos en las vistas de presentación y portada
setInterval(function () {
    nextPresentationMenuAutomatic(currentOption);
    if (currentOption < 7) {
        currentOption++;
    }
    else {
        currentOption = 0;
    }
}, 5000);

setInterval(function () {
    nextAutomatic("presentation-section", currentCategory);
    if (currentCategory < 2) {
        currentCategory++;
    }
    else {
        currentCategory = 0;
    }
}, 5000);

setInterval(function () {
    nextAutomatic("news-section", currentNew);
    if (currentNew < 3) {
        currentNew++;
    }
    else {
        currentNew = 0;
    }
}, 5000);

// Función para marcar como seleccionado el elemento del header menu correspondiente
function headerMenuOption(event) {

    let optionClicked = event.target;
    let headerMenuOptions = document.querySelectorAll(".options-menu__elto > a");

    for (let numOption = 0; numOption < headerMenuOptions.length; numOption++) {
        headerMenuOptions[numOption].className = "elto__link";
    }

    optionClicked.className = "elto__link menu-active";
}

// Función para mostrar la tarjeta con la imagen de cada uno de los cantantes
// cuando el usuario clica sobre el en la imagen del grupo completo en la página principal
function openSingerCard(event) {

    let clipPathTargetId = event.currentTarget.id;
    let singerCardId = "singer-" + clipPathTargetId;
    let singerCardElto = document.getElementById(singerCardId);

    if (document.querySelector(".header").clientWidth > 768) {
        window.scrollTo(0, document.querySelector(".header").clientHeight);
    }

    singerCardEltos.forEach(singerCard => {
        singerCard.style.opacity = 0;
        singerCard.style.visibility = "hidden";
    });

    clipPathEltos.forEach(clipPath => {

        if (document.querySelector("body").clientWidth > 768) {
            clipPath.classList.add("small-polygon-" + clipPath.id);
        }

        clipPath.classList.remove("hide");
        clipPath.classList.remove("opaciticy-off");

        if (clipPath.id == clipPathTargetId) {
            clipPath.classList.add("hide");
            clipPath.classList.add("opaciticy-off");
        }
    });

    singerCardElto.style.left = "0%";
    singerCardElto.style.visibility = "visible";
    singerCardElto.style.opacity = 1;
    singerCardElto.style.filter = "brightness(120%)";
}

// Función paa cerrar la tarjeta del cantante abierta cuando el usuario clica sobre ella
// o en cualquier punto de la imagen del grupo.
function closeSingerCard(event) {

    clipPathEltos.forEach(clipPath => {

        clipPath.classList.remove("not-hover-state");
        if (clipPath.id != "ten" && clipPath.id != "eleven") {
            clipPath.classList.remove("hide");
            clipPath.classList.remove("opaciticy-off");
        }
        else if (clipPath.id == "ten" && document.querySelector(".header").clientWidth > 768) {
            clipPath.classList.add("translate-center");
            clipPath.classList.remove("translate-right");
        }
        else if (clipPath.id == "eleven" && document.querySelector(".header").clientWidth > 768) {
            clipPath.classList.add("translate-center");
            clipPath.classList.remove("translate-left");
        }
    });

    clipPathEltos.forEach(clipPath => {
        clipPath.classList.remove("small-polygon-" + clipPath.id);
    });

    singerCardEltos.forEach(singerCard => {
        singerCard.style.opacity = 0;
        singerCard.style.visibility = "hidden";
    });
}

function hideGridCompose() {

    clipPathEltos.forEach(clipPath => {
        clipPath.classList.remove("small-polygon-" + clipPath.id);
    });
}

document.getElementById("menu-btn").addEventListener("click", menu);
let nextBtnPresentationSection = document.querySelectorAll("#presentation-section > .portada__main > .main__group-pages > div");
let nextBtnNewsSection = document.querySelectorAll("#news-section > .portada__main > .main__group-pages > div");
let iconBtn = document.querySelectorAll(".content__menu > img");
let headerMenuOptions = document.querySelectorAll(".options-menu__elto > a");
let clipPathEltos = document.querySelectorAll(".presentation-image__shape");
let singerCardEltos = document.querySelectorAll(".presentation-image__singer-card");
let presentationContainer = document.querySelector(".portada__presentation-image");

nextBtnPresentationSection.forEach(nextBtn => {
    nextBtn.addEventListener("click", next);
});

nextBtnNewsSection.forEach(nextBtn => {
    nextBtn.addEventListener("click", next);
});

headerMenuOptions.forEach(option => {
    option.addEventListener("click", headerMenuOption);
    option.className = "elto__link";
});

iconBtn.forEach(nextBtn1 => {
    nextBtn1.addEventListener("click", nextPresentationMenu);
});

clipPathEltos.forEach(clipPath => {
    clipPath.addEventListener("click", openSingerCard);
});

singerCardEltos.forEach(singerCard => {
    singerCard.addEventListener("click", closeSingerCard);
});


if (document.querySelector(".header").clientWidth > 768) {
    window.scrollTo(0, document.querySelector(".header").clientHeight);
}
// Condicionales para el control del footer. El footer debe mostrarse en la parte baja
// de la pantalla cuando la vista seleccionada no es la portada y además estamos en pantallas
// que nos son ni teléfonos móviles ni tablets.
if (document.querySelector(".presentacion") && document.querySelector(".presentacion").clientWidth > 768) {
    headerMenuOptions[0].className = "elto__link menu-active";
}

if (document.querySelector(".enlaces") && document.querySelector(".enlaces").clientWidth > 768) {
    headerMenuOptions[1].className = "elto__link menu-active";
}

window.addEventListener("resize", function () {

    let headerMenu = document.querySelector(".header__menu");

    if (document.querySelector(".header").clientWidth < 768) {
        menu(undefined, 'hide');
    }
    else if (document.querySelector(".portada") && document.querySelector(".header").clientWidth > 992) {
        headerMenu.style.height = "inherit";
        headerMenu.style.overflowX = "hidden";
        headerMenu.style.overflowY = "hidden";
        footer.style.visibility = "visible";
        footer.style.bottom = 0;
    }
    else {
        headerMenu.style.height = "inherit";
        headerMenu.style.overflowX = "hidden";
        headerMenu.style.overflowY = "hidden";
        footer.style.visibility = "visible";
        footer.style.bottom = 0;
    }

    singerCardEltos.forEach(singerCard => {
        singerCard.style.opacity = 0;
        singerCard.style.visibility = "hidden";
    });

    clipPathEltos.forEach(clipPath => {
        clipPath.classList.remove("not-hover-state");
        clipPath.classList.remove("hide");
        clipPath.classList.remove("opaciticy-off");
        clipPath.classList.remove("small-polygon-" + clipPath.id);
    });
});


