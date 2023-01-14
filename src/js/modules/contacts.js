const contacts = (table, adressBlock, mapBlock)=> {
    try {
        /* Формируются блоки адресов и карты */
        if(window.screen.width <= "320") {
            const tableBlock = document.querySelector(table)
            
            const smallBlock = document.createElement("div")
            smallBlock.setAttribute("class", "smallBlock")

            const cart = document.createElement("div")
            cart.setAttribute("class", "contacts__cart")

            const adress = document.createElement("div")
            adress.setAttribute("class", "contacts__adress")

                const one = document.createElement("div")
                one.setAttribute("class", "contacts__one adress")
                one.setAttribute("id", "one")
                one.innerHTML = `
                    <p> СПб, Ул. Дыбенко д.23 к.1 </p>
                    <span> +7 (812) 509-23-43 </span>
                `
                const two = document.createElement("div")
                two.setAttribute("class", "contacts__two adress")
                two.setAttribute("id", "two")
                two.innerHTML = `
                    <p> СПб, Пр. Энгельса д.113 к.2 </p>
                    <span> +7 (812) 509-23-43 </span>
                `

                const three = document.createElement("div")
                three.setAttribute("class", "contacts__three adress")
                three.setAttribute("id", "three")
                three.innerHTML = `
                    <p> СПб, Ул. Ленсовета д.81 </p>
                    <span> +7 (812) 602-74-02 </span>
                `

                const four = document.createElement("div")
                four.setAttribute("class", "contacts__four adress")
                four.setAttribute("id", "four")
                four.innerHTML = `
                    <p> СПб, ул. Тарасова д.10 </p>
                    <span> +7 (967) 555-01-06 </span>
                `
                const line = document.createElement("div")
                line.setAttribute("class", "contacts__line")
                const link = document.createElement("a")
                link.setAttribute("class", "contacts__email")
                link.setAttribute("href", "mailto:smart-tekhnika@gmail.com")
                link.innerHTML = "smart-tekhnika@gmail.com"
                line.appendChild(link)

                const timeWork = document.createElement("div")
                timeWork.setAttribute("class", "contacts__timeWork")
                timeWork.innerHTML = "Режим работы"
                line.appendChild(timeWork)

                const time = document.createElement("div")
                time.setAttribute("class", "contacts__time")
                time.innerHTML = "Пн-вс с 10:00 до 21:00"
                line.appendChild(time)

            adress.appendChild(one)
            adress.appendChild(two)
            adress.appendChild(three)
            adress.appendChild(four)
            adress.appendChild(line)
            smallBlock.appendChild(cart)
            smallBlock.appendChild(adress)
            tableBlock.appendChild(smallBlock)

        }
        /* Формируются блоки адресов и карты */
        if(window.screen.width > "320") {
            const tableBlock = document.querySelector(table)
            
            const bigBlock = document.createElement("div")
            bigBlock.setAttribute("class", "bigBlock")

            const cart = document.createElement("div")
            cart.setAttribute("class", "contacts__cart")

            const adress = document.createElement("div")
            adress.setAttribute("class", "contacts__adress")

                const one = document.createElement("div")
                one.setAttribute("class", "contacts__one adress")
                one.setAttribute("id", "one")
                one.innerHTML = `
                    <p> СПб, Ул. Дыбенко д.23 к.1 </p>
                    <span> +7 (812) 509-23-43 </span>
                `
                const two = document.createElement("div")
                two.setAttribute("class", "contacts__two adress")
                two.setAttribute("id", "two")
                two.innerHTML = `
                    <p> СПб, Пр. Энгельса д.113 к.2 </p>
                    <span> +7 (812) 509-23-43 </span>
                `

                const three = document.createElement("div")
                three.setAttribute("class", "contacts__three adress")
                three.setAttribute("id", "three")
                three.innerHTML = `
                    <p> СПб, Ул. Ленсовета д.81 </p>
                    <span> +7 (812) 602-74-02 </span>
                `

                const four = document.createElement("div")
                four.setAttribute("class", "contacts__four adress")
                four.setAttribute("id", "four")
                four.innerHTML = `
                    <p> СПб, ул. Тарасова д.10 </p>
                    <span> +7 (967) 555-01-06 </span>
                `
                const line = document.createElement("div")
                line.setAttribute("class", "contacts__line")
                const link = document.createElement("a")
                link.setAttribute("class", "contacts__email")
                link.setAttribute("href", "mailto:smart-tekhnika@gmail.com")
                link.innerHTML = "smart-tekhnika@gmail.com"
                line.appendChild(link)

                const timeWork = document.createElement("div")
                timeWork.setAttribute("class", "contacts__timeWork")
                timeWork.innerHTML = "Режим работы"
                line.appendChild(timeWork)

                const time = document.createElement("div")
                time.setAttribute("class", "contacts__time")
                time.innerHTML = "Пн-вс с 10:00 до 21:00"
                line.appendChild(time)

            adress.appendChild(one)
            adress.appendChild(two)
            adress.appendChild(three)
            adress.appendChild(four)
            adress.appendChild(line)
            bigBlock.appendChild(adress)
            bigBlock.appendChild(cart)
            tableBlock.appendChild(bigBlock)

        }
        
        /* Блок с адресами */
        const myMapBlock = document.querySelector(mapBlock)
            const myAdressBlock = document.querySelector(adressBlock)
            const oneAdress = myAdressBlock.querySelector(".contacts__one")
            const twoAdress = myAdressBlock.querySelector(".contacts__two") 
            const threeAdress = myAdressBlock.querySelector(".contacts__three") 
            const fourAdress = myAdressBlock.querySelector(".contacts__four")  
            const blockAdress = [oneAdress, twoAdress, threeAdress, fourAdress]

    /* Переключение адресов на карте */
    
        blockAdress.forEach(item=> {
            item.addEventListener("click", (e)=> {
                const myClass = e.target.getAttribute("class")
                switch (myClass) {
                    case "contacts__one adress":
                        hide()
                        view(e)
                        myMapBlock.innerHTML = "Так для того чтобы разместить карту надо регистрироваться"
                        break;
                    case "contacts__two adress":
                        hide()
                        view(e)
                        myMapBlock.innerHTML = "получить API KEY"
                        break;
                    case "contacts__three adress":
                        hide()
                        view(e)
                        myMapBlock.innerHTML = "и только после этого"
                        break;
                    case "contacts__four adress":
                        hide()
                        view(e)
                        myMapBlock.innerHTML = "будет отображаться карта"
                        break;
                
                    default:
                        break;
                }
            })
        })

        /* Убираем все классы active у полей с адресами */
        const hide = ()=> {
            blockAdress.forEach(item=>{
                item.classList.remove("active")      
            })    
        }

        /* Добавляю класс активности на нажатое поле с адресом */
        const view = (e) => {
            e.target.classList.toggle("active")
        }

    } catch (error) {
        
    }
}

export default contacts;