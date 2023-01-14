const catalog768 =()=>{
    if(window.screen.width <=768) {
        const catalockBlock = document.querySelector(".catalogBlock")
        catalockBlock.style.gridTemplateAreas = '"A C" "D D"'
        catalockBlock.style.width = '728px'

        const catalockBlockD = document.querySelector(".catalogBlock__d")
        catalockBlockD.style.gridTemplateColumns = "repeat(2, 365px)";

        const catalockBlockB = document.querySelector(".catalogBlock__b")
        catalockBlockB.style.display = "none"

        const catalockBlockWrapper = document.querySelector(".catalogMain__wrapper")
        catalockBlockWrapper.style.width = "768px"

        const catalockBlocC = document.querySelector(".catalogBlock__c")
        catalockBlocC.style.width = "100%"
        catalockBlocC.style.marginRight = "0px"

        const catalockBlockABtn = document.querySelector(".catalogBlockA__btn")
        catalockBlockABtn.style.display = "block"
 
        const modalWindow = ()=> {
            const catalogBlockA = document.querySelector(".catalogBlock__aWrapper")
            catalogBlockA.style.display = "flex"
            catalogBlockA.style.flexDirection = "column"
            catalogBlockA.style.alignItems = "center"
            catalogBlockA.style.width = "350px"
            

            const filterText = document.createElement("div")
            filterText.setAttribute("class", "catalogBlockA__filterText")
            filterText.innerHTML = "Фильтр"

            const filterClose = document.createElement("img")
            filterClose.setAttribute("class", "catalogBlockA__filterClose")
                        
            const titleAccordion = document.createElement("div")
            titleAccordion.setAttribute("class", "catalogBlock__titleAccordion")

            titleAccordion.appendChild(filterText)
            titleAccordion.appendChild(filterClose)
            catalogBlockA.prepend(titleAccordion)

            
            catalockBlockABtn.addEventListener("click", ()=> {
                catalogBlockA.classList.add("catalogBlock__aWrapper_active")
                document.body.style.backgroundColor = 'gray';
                /* Теги img и footer не захотели затемнятся с помощью кода написанного на строчку выше, пришлось добавить код ниже */
                const cart = document.querySelectorAll("img")
                cart.forEach(item => {
                    item.style.filter= "brightness(0.5)"
                })
                const myFooter =document.querySelector(".footer")
                myFooter.style.filter= "brightness(0.5)"
                

            })

            const closeBtn = document.querySelector(".catalogBlockA__filterClose")
            closeBtn.addEventListener("click", ()=> {
                catalogBlockA.classList.remove("catalogBlock__aWrapper_active")
                document.body.style.backgroundColor = '';
                const cart = document.querySelectorAll("img")
                cart.forEach(item => {
                    item.style.filter= "brightness(1)"
                })
                const myFooter =document.querySelector(".footer")
                myFooter.style.filter= "brightness(1)"
            })
            
            
        
        }
        modalWindow()


        if(window.screen.width <=320) {
            const catalockBlock = document.querySelector(".catalogBlock")
            catalockBlock.style.gridTemplateAreas = '"A" "C" "D'
            catalockBlock.style.width = '280px'

            const catalockBlockD = document.querySelector(".catalogBlock__d")
            catalockBlockD.style.gridTemplateColumns = "repeat(1, 280px)";

            const catalockBlockC = document.querySelector(".catalogBlock__c")
            catalockBlockC.style.display = "none"

            const catalockBlockWrapper = document.querySelector(".catalogMain__wrapper")
            catalockBlockWrapper.style.width = "280px"
            catalockBlockWrapper.style.paddingTop = "0px"

            const catalockBlocA = document.querySelector(".catalogBlock__a")
            catalockBlocA.style.width = "280px"

            const catalockBlocAWrapper = document.querySelector(".catalogBlock__aWrapper")
            catalockBlocAWrapper.style.width = "280px"

            const catalockBlocABtn = document.querySelector(".catalogBlockA__btn")
            catalockBlocABtn.style.width = "280px"

            const catalockBlocC = document.querySelector(".catalogBlock__c")
            catalockBlocC.style.display = "block"
            catalockBlocC.style.width = "280px"

            const catalockBlocBtn = document.querySelector(".btn.dropdown-toggle")
            catalockBlocBtn.style.width = "280px"

            const catalockBlocAccordion = document.querySelector(".accordion")
            catalockBlocAccordion.style.width = "280px"

            
             
        }
    }
}
export default catalog768;