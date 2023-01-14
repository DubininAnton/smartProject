import {getResourse} from "../services/requests";
import {postData} from "../services/requests";


const stocks = (wrapper, btn) => {
    
    try {
        const wrapperBlock = document.querySelector(wrapper)
        const btnBlock = document.querySelector(btn)
        const prevArrow = btnBlock.querySelector(".stocks__prevArrow")
        const nextArroy = btnBlock.querySelector(".stocks__nextArrow")
        const itemOne = btnBlock.querySelector(".stocks__itemOne")
        const itemTwo = btnBlock.querySelector(".stocks__itemTwo")
        const itemThree = btnBlock.querySelector(".stocks__itemThree")
        const itemLast = btnBlock.querySelector(".stocks__itemLast")
    
 
    let viewPage = 1;
    let numberPage = 1;
    const results = [];


    /* Выщитывает количество полей и расставляет цифры в панель с количеством страниц */
    const activePage = () => {
        itemOne.innerHTML = viewPage;
        itemTwo.innerHTML = viewPage+1;
        itemThree.innerHTML = viewPage+2;
        if(results.length % 8 > 0) {
            itemLast.innerHTML = Math.floor(results.length / 8) + 1 
        }
        if(results.length % 8 === 0) {
            itemLast.innerHTML = Math.floor(results.length / 8) 
        }
        hightlighting()
    }
    /* Получает информацию с сервера и записывает в results*/
    const getResourseFunction = async () => {
        await getResourse("http://localhost:3000/stocks")
        .then(res => results.push(...res))
        .then(()=>activePage())
        .then(()=>setItemBlock(0,8))
        .then(()=>innerWrapper())
    } 

    /* Заполняет mainBlock при первой загрузке и нажатии кнопки страницы */
    const setItemBlock = (start, end)=> {
        wrapperBlock.innerHTML=""
        results.slice(start, end).forEach(itemBlock=> {
            const itemElement = document.createElement("img")
            itemElement.setAttribute("src",`${itemBlock.src}`)
            itemElement.setAttribute("alt","img")
            itemElement.setAttribute("id",`${itemBlock.id}`)
            itemElement.setAttribute("class","stocks__itemImg")
            wrapperBlock.appendChild(itemElement)    
        });
        hightlighting()
    }
    
    /* Закрашивает номер активной страницы */

    const hightlighting = ()=> {
        [itemOne, itemTwo, itemThree, itemLast].forEach(item=> {
            item.style.backgroundColor = "white"
            item.style.color = "black"
            if(item.innerHTML == numberPage) {
                item.style.backgroundColor = "#4878A6"
                item.style.color = "white"
            }
        })
    }

    /* Переключаем информацию в mainBblock при выборе страницы */

    
        [itemOne, itemTwo, itemThree, itemLast].forEach(item=> {
            item.addEventListener("click", ()=> {
                if(item.innerHTML == 1) {
                    numberPage = item.innerHTML;
                    setItemBlock(0, 8)
                } else {
                    let start = (item.textContent-1)*8
                    let end = item.textContent*8;
                    numberPage = item.innerHTML; /* Номер страницы */
                    setItemBlock(start, end) 
                }
                
            })
        })

        prevArrow.addEventListener("click", ()=> {
            prevArrow.style.backgroundColor = "#4878A6"
            setTimeout(()=>{
                prevArrow.style.backgroundColor = "white"   
            },300)
            if(viewPage >1) {
                viewPage = viewPage - 1
                activePage()
                hightlighting()
            }
        })
    
        nextArroy.addEventListener("click", ()=> {
            nextArroy.style.backgroundColor = "#4878A6"
            setTimeout(()=>{
                nextArroy.style.backgroundColor = "white"   
            },300)
            if(itemLast.textContent-itemThree.textContent !==1) {
                viewPage = viewPage + 1
                activePage()
                hightlighting()
            }
        })
        getResourseFunction()

        /* При клике на определенную акцию на странице акций происходит переход на страницу конкретной акции и передача на сервер id выбранной акции для получения необходимой информации*/
    const innerWrapper = () => {
        const imgBlock = wrapperBlock.querySelectorAll(".stocks__itemImg")
        imgBlock.forEach(item => {
            item.addEventListener("click", ()=> {
                const itemId = `${item.id}`
                fetch("http://localhost:3000/itemId/1", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                })
                .then(()=>postData("http://localhost:3000/itemId/", {"idItem":`${itemId}`}))
                .then(()=>document.location.href = "stocksItem.html")
            })
        })
    }

    } catch (error) {
        
    }

}


export default stocks;