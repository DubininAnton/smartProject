
const subnavbar = (catalogMenu)=> {
    try {
    /* Внутри нисподающего меню */
    const catalog = document.querySelector(catalogMenu);
    const catalogTitle = catalog.querySelector(".subnavbar__title");
    const catalogItem = catalog.querySelector(".subnavbar__catalogItem");
    const catalogLi = catalogItem.querySelectorAll("li")

    /* Функция открывает и закрывает нисподающее меню */
    const openCloseMenu = () => {
        catalogItem.classList.toggle("subnavbar__catalogItem_open")
    }
    
    /* Навишиваем обработчик события на открытие и закрытие нисподаюзего меню */
    catalogTitle.addEventListener("click", ()=> {
        openCloseMenu()
    })
    

    /* Функция открывает блок с товарами при нажатии на определенный товар в нисподающем меню */
    catalogLi.forEach(item=> {
        item.addEventListener("click", (e)=> {
            catalogLi.forEach(item=>{
                item.style.fontWeight = "normal"
            })
            /* Ничего умнее не придумал как сохранить в localStorage класс нажатой ссылки 
            чтобы получить его в функции catalog  */
            localStorage.setItem("clickItem", e.target.getAttribute("class"));
            window.location.href = "catalog.html"
            e.target.style.fontWeight ="bold"
            openCloseMenu() 
            
        })
      
    })

} catch (error) {
        
}
}
/* Функция работает с разрешением экрана гаджета 768px и 320px*/

const subnavbar768 = (triggers, catalog, more, search, formDta)=> {
    const triggersBlok = document.querySelector(triggers) /* Кнопки на меню */
    const catalogBlock = document.querySelector(catalog) /* Блок каталога */
    const moreBlock = document.querySelector(more) /* Блок еще */
    const searchBlock = document.querySelector(search) /* Блок поисковой строки */
    const formDataBlock = document.querySelector(formDta) /* Форма */
    
    /* Закрываю все блоки на всякий случай */
    catalogBlock.style.display = "none"
    moreBlock.style.display = "none"
    searchBlock.style.display = "none"

    /* Навешиваю слушатели событий на кнопки меню */
    triggersBlok.addEventListener("click", (e)=> {
        if(e.target && e.target.getAttribute("class") === "subnavbar768__main") {
            searchBlock.style.display = "none"
            catalogBlock.style.display = "none"
            moreBlock.style.display = "none"
            document.location.href = "index.html"
        }
        if(e.target && e.target.getAttribute("class") === "subnavbar768__catalog") {
            moreBlock.style.display = "none"
            searchBlock.style.display = "none"
            catalogBlock.style.display = "block"
        }
        if(e.target && e.target.getAttribute("class") === "subnavbar768__more") {
            catalogBlock.style.display = "none"
            searchBlock.style.display = "none"
            moreBlock.style.display = "block"
        }
        if(e.target && e.target.getAttribute("class") === "subnavbar768__search") {
            catalogBlock.style.display = "none"
            moreBlock.style.display = "none"
            searchBlock.style.display = "block"
        }

    })

    /* Работа с блоком каталога */
    catalogBlock.addEventListener("click", (e)=>{
        switch (e.target.getAttribute("class")) {
            case "catalog__x":
                catalogBlock.style.display = "none"
                break;
            case "gyroscooter":
                catalogBlock.style.display = "none"
                localStorage.setItem("clickItem", "subnavbar__gir"); /* С самаго начала не продумал, помещаем сюда класс li из файла header */
                window.location.href = "catalog.html" 
                break;
            case "scooter":
                catalogBlock.style.display = "none"
                catalogBlock.style.display = "none"
                localStorage.setItem("clickItem", "subnavbar__ele");
                window.location.href = "catalog.html"
                break;
            case "mono":
                catalogBlock.style.display = "none"
                break;
            case "sigway":
                catalogBlock.style.display = "none"
                break;
            case "electroscooter":
                catalogBlock.style.display = "none"
                break;
            case "electrobicycle":
                catalogBlock.style.display = "none"
                break;
            case "electroavtomobile":
                catalogBlock.style.display = "none"
                break;
            case "electroskeit":
                catalogBlock.style.display = "none"
                break;
            case "accessories":
                catalogBlock.style.display = "none"
                break;
            case "smartToys":
                catalogBlock.style.display = "none"
                break;
            case "smartWatch":
                catalogBlock.style.display = "none"
                break;
            default:
                break;
        }
    })
    /* Работа с блоком еще */
    moreBlock.addEventListener("click", (e)=>{
        switch (e.target.getAttribute("class")) {
            case "more__x":
                moreBlock.style.display = "none"
                break;
            case "more__aboutCompany":
                document.location.href = "aboutCompany.html"
                moreBlock.style.display = "none"
                break;
            case "more__actions":
                document.location.href = "stocks.html"
                moreBlock.style.display = "none"
                break;
            case "more__0012":
                moreBlock.style.display = "none"
                break;
            case "more__service":
                moreBlock.style.display = "none"
                break;
            case "more__opt":
                moreBlock.style.display = "none"
                break;
            case "more__contacts":
                moreBlock.style.display = "none"
                break;
            default:
                break;
        }
    })
    /* Работа с блоком поисковой строки */
    searchBlock.addEventListener("click", (e)=> {
        switch (e.target.getAttribute("class")) {
            case "search__x":
                searchBlock.style.display = "none"
                break;
            default:
                break;
        }
    }) 
    /* Работа с блоком формы */
    formDataBlock.addEventListener("submit", (e)=> {
        e.preventDefault()
        const inputData = formDataBlock.querySelector("[name=info]")
        alert(inputData.value)
        inputData.value = ""
        searchBlock.style.display = "none"
    })


}





export {subnavbar768}
export default subnavbar;

