import {getResourse} from "../services/requests";

const accordion = (accordion) => {
    try {
      const accordionBlock = document.querySelector(accordion);
      let collapsIndex="";
      let headingIndex="";
      
      const getBlockVacancy = (res) => {
          res.forEach((vacancy, key) => {
            
            switch (key) {
              case 0:
                  collapsIndex = "collapseOne";
                  headingIndex = "headingOne"
                break;
                case 1:
                  collapsIndex = "collapseTwo"
                  headingIndex = "headingTwo"
                break;
                case 2:
                  collapsIndex = "collapseThree"
                  headingIndex = "headingThree"
                break;
                case 3:
                  collapsIndex = "collapseFour"
                  headingIndex = "headingFour"
                break;
                case 4:
                  collapsIndex = "collapseFive"
                  headingIndex = "headingFive"
                break;
            
              default:
                break;
            }

              const accordionItem  = document.createElement("div")
              accordionItem.setAttribute("class", "accordion-item")

              const accordionHeader = document.createElement("h2")
              accordionHeader.setAttribute("class", "accordion-header")
              accordionHeader.setAttribute("id","headingOne")

              const accordionButton = document.createElement("div")
              accordionButton.setAttribute("class", "accordion-button")
              accordionButton.setAttribute("type", "button")
              accordionButton.setAttribute("data-bs-toggle", "collapse")
              accordionButton.setAttribute("data-bs-target", `#${collapsIndex}`)
              accordionButton.setAttribute("aria-expanded", "true")
              accordionButton.setAttribute("aria-controls", `${collapsIndex}`)
              accordionButton.innerHTML = `${vacancy.nameVacancy}`

              const accordionCollaps = document.createElement("div")
              accordionCollaps.setAttribute("class", "accordion-collapse collapse show")
              accordionCollaps.setAttribute("aria-labelledby", `${headingIndex}`)
              accordionCollaps.setAttribute("data-bs-parent", "#accordionExample")
              accordionCollaps.setAttribute("data-bs-target", `#${collapsIndex}`)
              accordionCollaps.setAttribute("id", `${collapsIndex}`)
              
              const accordionBody = document.createElement("div")
              accordionBody.setAttribute("class", "accordion-body")
              /* General info `Мы ищем тех, кто` */
              const generalTitleBlock = document.createElement("h2")
              generalTitleBlock.innerHTML = vacancy.generalTitle
              accordionBody.appendChild(generalTitleBlock)
              for(let i = 0; i < `${vacancy.generalDescr.length}`; i++) {
                const generalDescrItem = document.createElement("li")
                generalDescrItem.innerHTML = `${vacancy.generalDescr[i]}`
                accordionBody.appendChild(generalDescrItem)
              }
              /* Требования */
              const requirementsTitleBlock = document.createElement("h2")
              requirementsTitleBlock.innerHTML = vacancy.requirementsTitle
              accordionBody.appendChild(requirementsTitleBlock)
              for(let i = 0; i < `${vacancy.requirements.length}`; i++) {
                const requirementsDescrItem = document.createElement("li")
                requirementsDescrItem.innerHTML = `${vacancy.requirements[i]}`
                accordionBody.appendChild(requirementsDescrItem)
              }
              /* Условия */
              const conditionsTitleBlock = document.createElement("h2")
              conditionsTitleBlock.innerHTML = vacancy.conditionsTitle
              accordionBody.appendChild(conditionsTitleBlock)
              for(let i = 0; i < `${vacancy.requirements.length}`; i++) {
                const conditionsDescrItem = document.createElement("li")
                conditionsDescrItem.innerHTML = `${vacancy.conditions[i]}`
                accordionBody.appendChild(conditionsDescrItem)
              }




              
              


              accordionCollaps.appendChild(accordionBody)
              accordionHeader.appendChild(accordionButton)
              accordionItem.appendChild(accordionHeader)
              accordionItem.appendChild(accordionCollaps)
              accordionBlock.appendChild(accordionItem)
              


          })
      }


    getResourse("http://localhost:3000/vacancy")
        .then(res => getBlockVacancy(res))
    } catch (error) {
      
    }


}
export default accordion;

{/* <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true"           aria-controls="collapseOne">
          Accordion Item #1
      </button>
    </h2>
<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
  <div class="accordion-body">
    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
  </div>
  </div>
  </div> */}