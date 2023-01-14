import {getResourse} from "../services/requests";

const stocksItem = (linkTitle, title, container, titleLink)=>{

    try {
        getResourse("http://localhost:3000/itemId")
        .then(res => {
            let itemIdBlock = res[0].idItem
            getResourse("http://localhost:3000/stocksItem")
                .then(responce => {
                    let itemStocks = responce.filter(item=>
                        item.id === Number(itemIdBlock))
                        const linkTitleBlock = document.querySelector(linkTitle)
                        const titleBlock = document.querySelector(title)
                        const containerBlock = document.querySelector(container)
                        const leftContainerBlock = containerBlock.querySelector(".stocks__leftContainer ")
                        const rightContainerBlock = containerBlock.querySelector(".stocks__rightContainer ")
                        linkTitleBlock.innerHTML = `${itemStocks[0].title}`
                        titleBlock.innerHTML = `${itemStocks[0].title}`
                        
                        /* Левый блок контейнера */
                        leftContainerBlock.innerHTML = `${itemStocks[0].descr}`
                        
                        /* Правый блок container */
                        const imgBlock = document.createElement("img")

                        if(window.screen.width <= "768") {
                            imgBlock.setAttribute("src",`${itemStocks[0].src768}`)
                        } 
                        if(window.screen.width <= "320") {
                            imgBlock.setAttribute("src",`${itemStocks[0].src320}`)
                            const aboutUsTitle320 = document.querySelector(titleLink)
                            // const aboutUsTitle320 = aboutUsTitle.querySelector(".stocks__aboutUsTitle320")
                            aboutUsTitle320.innerHTML = `${itemStocks[0].title}`
                        } 
                        if (window.screen.width >= "769") {
                            imgBlock.setAttribute("src",`${itemStocks[0].src}`)
                        }
                        imgBlock.setAttribute("alt", "img")
                        rightContainerBlock.appendChild(imgBlock)
                } )

        })
    } catch (error) {
        
    }

}
export default stocksItem;