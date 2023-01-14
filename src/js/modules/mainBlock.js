import {getResourse} from "../services/requests";
import cards from "./cards";


/* Очень неудачный вариант, но для тренировки самое то!!! 
НАДО БЫЛО ИЗНАЧАЛЬНО ДЕЛАТЬ САЙТ КАК REACT ПРИЛОЖЕНИЕ*/
const mainBlock = (bestsalesCard) => {
    // const bestsalesBlock = document.querySelectorAll(bestsalesCard);


    const getBlockTopSales = (topsales) => {
  
        // bestsalesBlock.forEach(itemBlock=>{
        //     topsales.forEach(item => {
        //         const card = document.createElement("div")
        //         card.setAttribute("class", "bestsalesCard__item")
    
        //         const blockinfo = document.createElement("div")
        //         blockinfo.setAttribute("class", "blockinfo")
        //         card.appendChild(blockinfo)
    
        //         const newitem = document.createElement("img")
        //         newitem.setAttribute("src", `${item.newitem}`)
        //         newitem.setAttribute("alt", "newitem")
        //         newitem.setAttribute("class", "blockinfo__newitem")
        //         blockinfo.appendChild(newitem)
    
        //         const topitem = document.createElement("img")
        //         topitem.setAttribute("src", `${item.topsales}`)
        //         topitem.setAttribute("alt", "topsales")
        //         topitem.setAttribute("class", "blockinfo__topsales")
        //         blockinfo.appendChild(topitem)
    
        //         const imgProduct = document.createElement("img")
        //         imgProduct.setAttribute("src", `${item.img}`)
        //         imgProduct.setAttribute("alt", "img")
        //         imgProduct.setAttribute("class", "bestsalesCard__img")
        //         card.appendChild(imgProduct)
    
        //         const titleProduct = document.createElement("div")
        //         titleProduct.innerHTML= `${item.title}`
        //         titleProduct.setAttribute("class", "bestsalesCard__title")
        //         card.appendChild(titleProduct)
    
        //         const descrProduct = document.createElement("div")
        //         descrProduct.innerHTML= `${item.descr}`
        //         descrProduct.setAttribute("class", "bestsalesCard__descr")
        //         card.appendChild(descrProduct)
    
        //         const starBlock = document.createElement("div")
        //         starBlock.setAttribute("class", "bestsalesCard__star")
        //         card.appendChild(starBlock)
    
        //         const star01 = document.createElement("img")
        //         star01.setAttribute("src", `${item.star}`)
        //         star01.setAttribute("alt", "star")
        //         star01.setAttribute("class", "starItem")
        //         starBlock.appendChild(star01)
    
    
        //         const star02 = document.createElement("img")
        //         star02.setAttribute("src", `${item.star}`)
        //         star02.setAttribute("alt", "star")
        //         star02.setAttribute("class", "starItem")
        //         starBlock.appendChild(star02)
    
        //         const star03 = document.createElement("img")
        //         star03.setAttribute("src", `${item.star}`)
        //         star03.setAttribute("alt", "star")
        //         star03.setAttribute("class", "starItem")
        //         starBlock.appendChild(star03)
    
        //         const star04 = document.createElement("img")
        //         star04.setAttribute("src", `${item.star}`)
        //         star04.setAttribute("alt", "star")
        //         star04.setAttribute("class", "starItem")
        //         starBlock.appendChild(star04)
    
        //         const star05 = document.createElement("img")
        //         star05.setAttribute("src", `${item.star}`)
        //         star05.setAttribute("alt", "star")
        //         star05.setAttribute("class", "starItem")
        //         starBlock.appendChild(star05)
    
        //         const notice = document.createElement("img")
        //         notice.setAttribute("src", `${item.notice}`)
        //         notice.setAttribute("id", `${item.id}`)
        //         notice.setAttribute("alt", "notice")
        //         notice.setAttribute("class", "notice")
        //         starBlock.appendChild(notice)
    
        //         const counterNotice = document.createElement("div")
        //         counterNotice.innerHTML= `${item.counterNotice}`
        //         starBlock.appendChild(counterNotice)
    
        //         const priceBlock = document.createElement("div")
        //         priceBlock.setAttribute("class", "bestsalesCard__price")
        //         card.appendChild(priceBlock)
    
        //         const itemPrice = document.createElement("div")
        //         itemPrice.setAttribute("class", "price")
        //         priceBlock.appendChild(itemPrice)
    
        //         const oldPrice = document.createElement("div")
        //         oldPrice.setAttribute("class", "price__old")
        //         oldPrice.innerHTML= `${item.oldPrice}`
        //         itemPrice.appendChild(oldPrice)
    
        //         const newPrice = document.createElement("div")
        //         newPrice.setAttribute("class", "price__new")
        //         newPrice.innerHTML= `${item.newPrice}`
        //         itemPrice.appendChild(newPrice)
    
        //         const likeCompare = document.createElement("div")
        //         likeCompare.setAttribute("class", "likeCompare")
        //         priceBlock.appendChild(likeCompare)
    
        //         const like = document.createElement("img")
        //         like.setAttribute("src", `${item.like}`)
        //         like.setAttribute("id", `${item.dataLike}`)
        //         like.setAttribute("alt", "like")
        //         like.setAttribute("class", "like")
        //         likeCompare.appendChild(like)
    
        //         const compare = document.createElement("img")
        //         compare.setAttribute("src", `${item.compare}`)
        //         compare.setAttribute("id", `${item.dataCompare}`)
        //         compare.setAttribute("alt", "compare")
        //         compare.setAttribute("class", "like")
        //         likeCompare.appendChild(compare)
                
        //         const btnBlock = document.createElement("div")
        //         btnBlock.setAttribute("class", "bestsalesCard__btn")
        //         card.appendChild(btnBlock)
                
        //         const oneClick = document.createElement("div")
        //         oneClick.setAttribute("class", "oneClick")
        //         oneClick.innerHTML = `${item.oneClick}`
        //         btnBlock.appendChild(oneClick)
    
        //         const cart = document.createElement("img")
        //         cart.setAttribute("src", `${item.cart}`)
        //         cart.setAttribute("alt", "cart")
        //         cart.setAttribute("class", "cart")
        //         btnBlock.appendChild(cart)
    
    
    
        //         itemBlock.appendChild(card)
    
        //      })
        // })
}
    
    getResourse("http://localhost:3000/topSales")
        // .then(res => getBlockTopSales(res))
        .then(res => cards(bestsalesCard, res))
        
    


}

export default mainBlock;