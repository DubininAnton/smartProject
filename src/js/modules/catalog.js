import {getResourse} from "../services/requests";
import cards from "./cards";

const catalog = (catalog) => {
    
    try {
      let newArray=[]; /* Массив данных при работе с фильтрами */
      let getThereArray=[]; /* Массив товаров полученный от сервера, используется для работы с фильтрами */
      let transformArray = []; /* Изененный фильтрами массив товаров (всеми кроме цены)*/
      let choiceIllumination = null; /* Выбор подсветки есть или нет */
      let choicePowerEngine = null; /* Выбор мощности двигателя */
      let choiceMaxSpeed = null; /* Выбор максимальной скорости */
      let maxPrice; /* Максимальная цена выбранных товаров */
      let filterationPrice = null;
      let selectionOrderFilters =[]; /* Массив с порядком выбора фильтров */

        /* Эта переменная из locslStorage :) */
        let click = localStorage.getItem("clickItem");

        const catalogBlock = document.querySelector(catalog)
        const catalogItem = catalogBlock.querySelector(".catalogMain__item")
        const blockA = catalogBlock.querySelector(".catalogBlock__aWrapper")

        /* Обрабатываю запрос с сервера */
        const showProduct = (res) => {
            let array = res.filter((item)=> item.class === click)
            getThereArray = array;
            catalogItem.innerHTML = array[0].title;
            filters(array) /* Делаем фильтры слева */
            transformArray = [...array];
            cards(".catalogBlock__d", array) /* Функция отрисовывает карточки товаров справа*/

        }

        /* Функция формирует фильтры (слева странице) */
        const filters = (array)=> {
            /* Добавляю аккордион в блок А */
            const accordion = document.createElement("div")
            accordion.setAttribute("class", "accordion")
            accordion.setAttribute("id", "accordionPanelsStayOpenExample")
            accordion.style.width = "100%"
            blockA.appendChild(accordion)

            const price = array.filter(item => item.newPrice) /* Массив товаров с ценами */
            const illumination = array.filter(item => item.illumination) /* Массив товаров с подсветкой */
            const enginePower = array.filter(item => item.enginePower) /* Массив товаров у которых есть характеристика про мощность двигателя */
            const maxSpeed = array.filter(item => item.maxSpeed) /* Массив товаров у которых есть характеристика "максимальная скорость" */

            /* Пункт раскрывающегося меню о цене */
            if(price.length !== 0) {
                /* Один Item раскрывающегося меню */
              const accordionItem  = document.createElement("div")
              accordionItem.setAttribute("class", "accordion-item")
                /* Header одного Item открывающегося меню */
              const accordionHeader = document.createElement("h2")
              accordionHeader.setAttribute("class", "accordion-header")
              accordionHeader.setAttribute("id","panelsStayOpen-headingOne")
                /* Кнопка одного Item открывающегося меню */
              const accordionButton = document.createElement("div")
              accordionButton.setAttribute("class", "accordion-button")
              accordionButton.setAttribute("type", "button")
              accordionButton.setAttribute("data-bs-toggle", "collapse")
              accordionButton.setAttribute("data-bs-target", `#panelsStayOpen-collapseOne`)
              accordionButton.setAttribute("aria-expanded", "true")
              accordionButton.setAttribute("aria-controls", `panelsStayOpen-collapseOne`)
              accordionButton.innerHTML = `Цена, ₽`
                /* Тело одного Item открывающегося меню */
              const accordionCollaps = document.createElement("div")
              accordionCollaps.setAttribute("class", "accordion-collapse collapse")
              accordionCollaps.setAttribute("aria-labelledby", `headingOne`)
              accordionCollaps.setAttribute("data-bs-parent", "#accordionExample")
              accordionCollaps.setAttribute("data-bs-target", `collapseOne`)
              accordionCollaps.setAttribute("id", `panelsStayOpen-collapseOne`)
              /* Элемент куда вставляется информация в открывающемся меню */
              const accordionBody = document.createElement("div")
              accordionBody.setAttribute("class", "accordion-body")
              /* Формирую первую строку в блоке цены */
              const rowOne = document.createElement("div")
              rowOne.setAttribute("class", "catalogBlock__a_rowOne")
              
              /* Формирую тег форм*/
              const formPrice = document.createElement("form")
              formPrice.setAttribute("class", "catalogBlock__form")
              
              /* Формирую тег инпут с минимальной ценой и его лейбл */
              const lowPriceLabel = document.createElement("label")
              lowPriceLabel.setAttribute("class","catalogBlock__lowPriceLabel")
              lowPriceLabel.innerHTML = "от"

              const lowPrice = document.createElement("input")
              lowPrice.setAttribute("class", "catalogBlock__lowPrice")
              lowPrice.setAttribute("value","0")

              /* Формирую тег инпут с максимальной ценой и его лейбл */
              const hightPriceLabel = document.createElement("label")
              hightPriceLabel.setAttribute("class","catalogBlock__hightPriceLabel")
              hightPriceLabel.innerHTML = "до"

              const hightPrice = document.createElement("input")
              hightPrice.setAttribute("class", "catalogBlock__hightPrice")

              /* Формирую полосу прокрутки цены */
              const rangePrice = document.createElement("input")
              rangePrice.setAttribute("class", "catalogBlock__rangePrice")
              rangePrice.setAttribute("type", "range")
              rangePrice.setAttribute("min", "0")
              rangePrice.setAttribute("max", "")

              /* Формирую кнопку */
              const buttonPrice = document.createElement("button")
              buttonPrice.setAttribute("class", "catalogBlock__buttonPrice") 
              buttonPrice.innerHTML = "Применить"

              formPrice.appendChild(lowPriceLabel)
              formPrice.appendChild(lowPrice)
              formPrice.appendChild(hightPriceLabel)
              formPrice.appendChild(hightPrice)
              rowOne.appendChild(formPrice)
              formPrice.appendChild(rangePrice)
              formPrice.appendChild(buttonPrice)
              accordionBody.appendChild(rowOne)

              accordionCollaps.appendChild(accordionBody)
              accordionHeader.appendChild(accordionButton)
              accordionItem.appendChild(accordionHeader)
              accordion.appendChild(accordionItem)
              accordionItem.appendChild(accordionCollaps)
            }
            
              /* Вычисляем максимальную цену во всех товарах данного сегмента */
              let maxPriceString = array.map(item =>item.newPrice) /* Массив значений цены в виде строк */
              let maxPriceNumber = maxPriceString.map(item => parseInt(item)) /* Массив значений цен в виде чисел */
              maxPrice = Math.max(...maxPriceNumber) /* Максимальная цена */
              const inputMaxPrice = document.querySelector(".catalogBlock__hightPrice")
              const rangePrice = document.querySelector(".catalogBlock__rangePrice")
              inputMaxPrice.value = maxPrice /* Ставлю первоначальное значение максимальной цены */
              rangePrice.value = maxPrice /* Ставлю максимальное значение на ползунок */

              /* Управления значениями в input максимальной цены в зависимости от положения ползунка*/
              rangePrice.addEventListener("change", (e)=>{
                inputMaxPrice.value = maxPrice*e.target.value/100
              })
              /* Управление значением input range в зависимости от введенного значения в input максимальной цены */
              inputMaxPrice.addEventListener("blur", ()=>{
                rangePrice.value = Math.round(inputMaxPrice.value/maxPrice*100)
              })

              /* Сортирую карточки по цене */
              const formPrice = document.querySelector(".catalogBlock__form")
              formPrice.addEventListener("submit", (e)=> {
                e.preventDefault();
                let newArray = getThereArray.filter(item => item.myPrice <= inputMaxPrice.value)
                transformArray = [];
                transformArray = [...newArray];
                funcSelectionOrderFilters("changePrice")
                preparationArray() /* Запускаю функцию подготовки массива */
                filterOnTop() /* Функция вывода выбранных фильтров */
              })

              /* ПУНКТ РАСКРЫВАЮЩЕГОСЯ МЕНЮ "подсветка" */
              if(illumination.length !== 0) {
                  /* Один Item раскрывающегося меню */
              const accordionItem  = document.createElement("div")
              accordionItem.setAttribute("class", "accordion-item")
                /* Header одного Item открывающегося меню */
              const accordionHeader = document.createElement("h2")
              accordionHeader.setAttribute("class", "accordion-header")
              accordionHeader.setAttribute("id","panelsStayOpen-headingTwo")
                /* Кнопка одного Item открывающегося меню */
              const accordionButton = document.createElement("div")
              accordionButton.setAttribute("class", "accordion-button")
              accordionButton.setAttribute("type", "button")
              accordionButton.setAttribute("data-bs-toggle", "collapse")
              accordionButton.setAttribute("data-bs-target", `#panelsStayOpen-collapseTwo`)
              accordionButton.setAttribute("aria-expanded", "true")
              accordionButton.setAttribute("aria-controls", `panelsStayOpen-collapseTwo`)
              accordionButton.innerHTML = `Подсветка`
                /* Тело одного Item открывающегося меню */
              const accordionCollaps = document.createElement("div")
              accordionCollaps.setAttribute("class", "accordion-collapse collapse")
              accordionCollaps.setAttribute("aria-labelledby", `headingTwo`)
              accordionCollaps.setAttribute("data-bs-parent", "#accordionExample")
              accordionCollaps.setAttribute("data-bs-target", `collapseTwo`)
              accordionCollaps.setAttribute("id", `panelsStayOpen-collapseTwo`)
              /* Элемент куда вставляется информация в открывающемся меню */
              const accordionBody = document.createElement("div")
              accordionBody.setAttribute("class", "accordion-body")
              /* Пункты меню "есть" или "нет" подсветки */
              const illuminationForm = document.createElement("form")
              illuminationForm.setAttribute("class", "catalogBlock__illumination")
              /* Галочка "есть" в "подсветке" */
              const illuminationRowOne = document.createElement("div")
              illuminationRowOne.setAttribute("class", "catalogBlock__illuminationRowOne")
              const illuminationTrue = document.createElement("input")
              illuminationTrue.setAttribute("class", "catalogBlock__illuninationTrue")
              illuminationTrue.setAttribute("type", "checkbox")
              illuminationTrue.setAttribute("name", "IlluminationTrue")
              const illuminationTrueLabel = document.createElement("label")
              illuminationTrueLabel.setAttribute("class", "catalogBlock__illuninationTrueLabel")
              illuminationTrueLabel.innerHTML = "Есть"
                /* Галочка "нет" в "подсветке" */
              const illuminationRowTwo = document.createElement("div")
              illuminationRowTwo.setAttribute("class", "catalogBlock__illuminationRowTwo")
              const illuminationFalse = document.createElement("input")
              illuminationFalse.setAttribute("class", "catalogBlock__illuninationFalse")
              illuminationFalse.setAttribute("type", "checkbox")
              illuminationFalse.setAttribute("name", "IlluminationFalse")
              const illuminationFalseLabel = document.createElement("label")
              illuminationFalseLabel.setAttribute("class", "catalogBlock__illuninationFalseLabel")
              illuminationFalseLabel.innerHTML = "Нет"

              
              illuminationRowOne.appendChild(illuminationTrue)
              illuminationRowOne.appendChild(illuminationTrueLabel)
              illuminationForm.appendChild(illuminationRowOne)
              illuminationRowTwo.appendChild(illuminationFalse)
              illuminationRowTwo.appendChild(illuminationFalseLabel)
              illuminationForm.appendChild(illuminationRowTwo)
              accordionBody.appendChild(illuminationForm)

              accordionCollaps.appendChild(accordionBody)
              accordionHeader.appendChild(accordionButton)
              accordionItem.appendChild(accordionHeader)
              accordion.appendChild(accordionItem)
              accordionItem.appendChild(accordionCollaps)

              /* Переключаю checkbox чтобы был нажат только Есть или Нет */
                const checkbox = () => {
                  const checkboxTrue = document.querySelector(".catalogBlock__illuninationTrue")
                  const checkboxFalse = document.querySelector(".catalogBlock__illuninationFalse")
                  checkboxTrue.addEventListener("click", ()=> {
                    
                    if(checkboxTrue.checked === true) {
                      choiceIllumination = true;
                      checkboxFalse.checked = false;
                      funcSelectionOrderFilters("choiceIllumination")
                      preparationArray()
                      filterOnTop() 
                    }
                    if(checkboxTrue.checked !== true) {
                      choiceIllumination = null;
                      funcSelectionOrderFilters("choiceIllumination")
                      checkboxFalse.checked = false;
                      preparationArray()
                      filterOnTop()
                    }
                  })
                  checkboxFalse.addEventListener("click", ()=> {
                    if(checkboxFalse.checked === true) {
                      choiceIllumination = false;
                      checkboxTrue.checked = false;
                      funcSelectionOrderFilters("choiceIllumination")
                      preparationArray()
                      filterOnTop()
                    }
                    if(checkboxFalse.checked !== true) {
                      choiceIllumination = null;
                      checkboxTrue.checked = false;
                      funcSelectionOrderFilters("choiceIllumination")
                      preparationArray()
                      filterOnTop()
                    }
                  })
  
                }
              checkbox()
              }
              /* НИСПОДАЮЩЕЕ МЕНЮ "мощность двигателя" */
              if(enginePower.length !== 0) {
                /* Один Item раскрывающегося меню */
              const accordionItem  = document.createElement("div")
              accordionItem.setAttribute("class", "accordion-item")
                /* Header одного Item открывающегося меню */
              const accordionHeader = document.createElement("h2")
              accordionHeader.setAttribute("class", "accordion-header")
              accordionHeader.setAttribute("id","panelsStayOpen-headingThree")
                /* Кнопка одного Item открывающегося меню */
              const accordionButton = document.createElement("div")
              accordionButton.setAttribute("class", "accordion-button")
              accordionButton.setAttribute("type", "button")
              accordionButton.setAttribute("data-bs-toggle", "collapse")
              accordionButton.setAttribute("data-bs-target", `#panelsStayOpen-collapseThree`)
              accordionButton.setAttribute("aria-expanded", "true")
              accordionButton.setAttribute("aria-controls", `panelsStayOpen-collapseThree`)
              accordionButton.innerHTML = `Мощность двигателя, Вт`
                /* Тело одного Item открывающегося меню */
              const accordionCollaps = document.createElement("div")
              accordionCollaps.setAttribute("class", "accordion-collapse collapse")
              accordionCollaps.setAttribute("aria-labelledby", `headingThree`)
              accordionCollaps.setAttribute("data-bs-parent", "#accordionExample")
              accordionCollaps.setAttribute("data-bs-target", `collapseThree`)
              accordionCollaps.setAttribute("id", `panelsStayOpen-collapseThree`)
              /* Элемент куда вставляется информация в открывающемся меню */
              const accordionBody = document.createElement("div")
              accordionBody.setAttribute("class", "accordion-body")
              /* Форма с возможными вариантами мощности двигателя */
              const powerEngineForm = document.createElement("form")
              powerEngineForm.setAttribute("class", "catalogBlock__powerEngine")
              /* Возможные варианты мощности двигателя */
              let powerEngineArray = enginePower.map(item => item.enginePower) /* Массив мощностей двигателя */
              let noDublicatePowerEngineArray = powerEngineArray.filter((x, i) => powerEngineArray.indexOf(x) === i); /* Из массива убраны повторяющиеся значения мощностей */
              let sortNoDublicatePowerEngineArray = noDublicatePowerEngineArray.sort((a, b) => a - b) /* Элементы в массиве расставленв в порядке возрастания */
              /* Перебираю массив и формирую input */
              sortNoDublicatePowerEngineArray.forEach(item => {
                const powerEngineRowOne = document.createElement("div")
                powerEngineRowOne.setAttribute("class", "catalogBlock__powerEngineRowOne")
                const powerEngineElement = document.createElement("input")
                powerEngineElement.setAttribute("class", "catalogBlock__powerEngineElement")
                powerEngineElement.setAttribute("type", "checkbox")
                powerEngineElement.setAttribute("name", "powerEngineElement")
                const powerEngineElementLabel = document.createElement("label")
                powerEngineElementLabel.setAttribute("class", "catalogBlock__powerEngineElementLabel")
                powerEngineElementLabel.innerHTML = `${item}`
                const powerEngineElementCount = document.createElement("span")
                powerEngineElementCount.innerHTML = `(${powerEngineArray.filter(product => product === item).length})`
                /* На строчку выше в границах <span> определяется количество товаров с данной мощностью двигателя */


                powerEngineRowOne.appendChild(powerEngineElement)
                powerEngineRowOne.appendChild(powerEngineElementLabel)
                powerEngineRowOne.appendChild(powerEngineElementCount)
                powerEngineForm.appendChild(powerEngineRowOne)
              })
              
              accordionBody.appendChild(powerEngineForm)

              accordionCollaps.appendChild(accordionBody)
              accordionHeader.appendChild(accordionButton)
              accordionItem.appendChild(accordionHeader)
              accordion.appendChild(accordionItem)
              accordionItem.appendChild(accordionCollaps)
            }

              /* Навешиваю слушетели на элементы нисподающего меню "Мощность двигателя" */
              const selectedPowerEngine = document.querySelectorAll(".catalogBlock__powerEngineElement")
              selectedPowerEngine.forEach(item => {
                item.addEventListener("click", (e)=> {
                  selectedPowerEngine.forEach(point => {
                    if(point !== e.target) {
                      point.checked = false
                    }
                  })
                  if(e.target.checked === true) {
                    choicePowerEngine = e.target.nextSibling.textContent
                  } else {
                    choicePowerEngine = null
                  }
                  funcSelectionOrderFilters("choicePowerEngine")
                  preparationArray()
                  filterOnTop()
                })
              })

              /* НИСПОДАЮЩЕЕ МЕНЮ "максимальная скорость" */
              if(maxSpeed.length !== 0) {
                /* Один Item раскрывающегося меню */
              const accordionItem  = document.createElement("div")
              accordionItem.setAttribute("class", "accordion-item")
                /* Header одного Item открывающегося меню */
              const accordionHeader = document.createElement("h2")
              accordionHeader.setAttribute("class", "accordion-header")
              accordionHeader.setAttribute("id","panelsStayOpen-headingFour")
                /* Кнопка одного Item открывающегося меню */
              const accordionButton = document.createElement("div")
              accordionButton.setAttribute("class", "accordion-button")
              accordionButton.setAttribute("type", "button")
              accordionButton.setAttribute("data-bs-toggle", "collapse")
              accordionButton.setAttribute("data-bs-target", `#panelsStayOpen-collapseFour`)
              accordionButton.setAttribute("aria-expanded", "true")
              accordionButton.setAttribute("aria-controls", `panelsStayOpen-collapseFour`)
              accordionButton.innerHTML = `Максимальная скорость (км/ч)`
                /* Тело одного Item открывающегося меню */
              const accordionCollaps = document.createElement("div")
              accordionCollaps.setAttribute("class", "accordion-collapse collapse")
              accordionCollaps.setAttribute("aria-labelledby", `headingFour`)
              accordionCollaps.setAttribute("data-bs-parent", "#accordionExample")
              accordionCollaps.setAttribute("data-bs-target", `collapseFour`)
              accordionCollaps.setAttribute("id", `panelsStayOpen-collapseFour`)
              /* Элемент куда вставляется информация в открывающемся меню */
              const accordionBody = document.createElement("div")
              accordionBody.setAttribute("class", "accordion-body")
              /* Форма с возможными вариантами характеристик "максимальная скорость" */
              const maxSpeedForm = document.createElement("form")
              maxSpeedForm.setAttribute("class", "catalogBlock__maxSpeed")
              /* Возможные варианты мощности двигателя */
              let maxSpeedArray = enginePower.map(item => item.maxSpeed) /* Массив "максимальная скорость" */
              let noDublicateMaxSpeedArray = maxSpeedArray.filter((x, i) => maxSpeedArray.indexOf(x) === i); /* Из массива убраны повторяющиеся значения максимальных скоростей */
              let sortNoDublicateMaxSpeedArray = noDublicateMaxSpeedArray.sort((a, b) => a - b) /* Элементы в массиве расставленв в порядке возрастания */
              /* Перебираю массив и формирую input */
              sortNoDublicateMaxSpeedArray.forEach(item => {
                const powerEngineRowOne = document.createElement("div")
                powerEngineRowOne.setAttribute("class", "catalogBlock__maxSpeedRowOne")
                const maxSpeedElement = document.createElement("input")
                maxSpeedElement.setAttribute("class", "catalogBlock__maxSpeedElement")
                maxSpeedElement.setAttribute("type", "checkbox")
                maxSpeedElement.setAttribute("name", "maxSpeedElement")
                const maxSpeedElementLabel = document.createElement("label")
                maxSpeedElementLabel.setAttribute("class", "catalogBlock__maxSpeedElementLabel")
                maxSpeedElementLabel.innerHTML = `${item}`
                const maxSpeedElementCount = document.createElement("span")
                maxSpeedElementCount.innerHTML = `(${maxSpeedArray.filter(product => product === item).length})`
                /* На строчку выше в границах <span> определяется количество товаров с данной мощностью двигателя */


                powerEngineRowOne.appendChild(maxSpeedElement)
                powerEngineRowOne.appendChild(maxSpeedElementLabel)
                powerEngineRowOne.appendChild(maxSpeedElementCount)
                maxSpeedForm.appendChild(powerEngineRowOne)
              })
              
              accordionBody.appendChild(maxSpeedForm)

              accordionCollaps.appendChild(accordionBody)
              accordionHeader.appendChild(accordionButton)
              accordionItem.appendChild(accordionHeader)
              accordion.appendChild(accordionItem)
              accordionItem.appendChild(accordionCollaps)
            }

              /* Навешиваю слушетели на элементы нисподающего меню "Максимальная скорость" */
              const selectedMaxSpeed = document.querySelectorAll(".catalogBlock__maxSpeedElement")
              selectedMaxSpeed.forEach(item => {
                item.addEventListener("click", (e)=> {
                  selectedMaxSpeed.forEach(point => {
                    if(point !== e.target) {
                      point.checked = false
                    }
                  })
                  if(e.target.checked === true) {
                    choiceMaxSpeed = e.target.nextSibling.textContent
                  } else {
                    choiceMaxSpeed = null
                  }
                  funcSelectionOrderFilters("choiceMaxSpeed")
                  preparationArray()
                  filterOnTop()
                })
              })
              /* Меню выбора типа сортировки по цене в правом верхнем углу */
              const btnDropdown = document.querySelector(".btn.dropdown-toggle")
              const itemDropdown = document.querySelectorAll(".dropdown-item")
              itemDropdown.forEach(item => {
                item.addEventListener("click", (e)=> {
                  btnDropdown.innerHTML = `${e.target.textContent}`
                  if(e.target.textContent === "Сначала дорогие") {
                    filterationPrice = "expensive"
                    preparationArray()
                  }
                  if(e.target.textContent === "Сначала недорогие") {
                    filterationPrice = "cheap"
                    preparationArray()
                  }
                })
              })

        }

    /* Функция расстановки порядка выбора фильтров по порядку, необходима для сортировки массива с выбранными товарами*/

    const funcSelectionOrderFilters = (filter) => {
      const inputMaxPrice = document.querySelector(".catalogBlock__hightPrice")
        switch (filter) {
          case "choiceIllumination":
            if(selectionOrderFilters.indexOf("choiceIllumination") == -1) {
              selectionOrderFilters.push("choiceIllumination")
            }
            if(choiceIllumination === null) {
              selectionOrderFilters.splice(selectionOrderFilters.indexOf("choiceIllumination"), 1)
            }
            break;

            case "choicePowerEngine": 
            if(selectionOrderFilters.indexOf("choicePowerEngine") == -1) {
              selectionOrderFilters.push("choicePowerEngine")
            }
              if(choicePowerEngine === null) {
                selectionOrderFilters.splice(selectionOrderFilters.indexOf("choicePowerEngine"), 1)
              } 
            break;
            
            case "choiceMaxSpeed": 
            if(selectionOrderFilters.indexOf("choiceMaxSpeed") == -1) {
              selectionOrderFilters.push("choiceMaxSpeed")
            }
              if(choiceMaxSpeed === null) {
                selectionOrderFilters.splice(selectionOrderFilters.indexOf("choiceMaxSpeed"), 1)
              } 
            break;
            case "changePrice": 
              if(selectionOrderFilters.indexOf("changePrice") == -1) {
                selectionOrderFilters.push("changePrice")
              }
              if(inputMaxPrice.value == maxPrice) {
                selectionOrderFilters.splice(selectionOrderFilters.indexOf("changePrice"), 1)
              } 
            break;
            case "deletePrice": 
              selectionOrderFilters.splice(selectionOrderFilters.indexOf("changePrice"), 1)
            break;
            
          default:
            break;
        }
        console.log(selectionOrderFilters)
      }

         /* ОЧЕНЬ МНОГО УСЛОВИЯ ДЛЯ ФИЛЬТРАЦИИ. ВИДИМО ЭТО ДОЛЖНО РЕАЛИЗОВЫВАТЬС ПО-ДРУГОМУ, ВИДИМО ЧЕРЕЗ BACKEND!!!  */
          /* Функция подготовливает массив согласно выбранным фильтрам перед его отрисовкой */
        const preparationArray = () => {
          const blockD = document.querySelector(".catalogBlock__d")
          blockD.innerHTML=""
          /* ВАРИАНТ №2 РАБОТАЕТ*/
          if(selectionOrderFilters.length !== 0) {
            selectionOrderFilters.forEach((item, key) => {
              if(key === 0) {
                if(item === "changePrice") {
                  newArray = transformArray
                }
                if(item === "choiceIllumination") {
                  if(choiceIllumination === true) {
                    newArray = transformArray.filter(item => item.illumination === true)
                  }
                  if(choiceIllumination === false) {
                    newArray = transformArray.filter(item => item.illumination === false)
                  }
                }
                if(item === "choicePowerEngine") {
                  newArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
                }
                if(item === "choiceMaxSpeed") {
                  newArray = transformArray.filter(item => item.maxSpeed == choiceMaxSpeed)
                }
              }
              if(key === 1) {
                if(item === "changePrice") {
                  const inputMaxPrice = document.querySelector(".catalogBlock__hightPrice")
                  newArray = newArray.filter(item => item.myPrice <= inputMaxPrice.value)
                }
                if(item === "choiceIllumination") {
                  if(choiceIllumination === true) {
                    newArray = newArray.filter(item => item.illumination === true)
                  }
                  if(choiceIllumination === false) {
                    newArray = newArray.filter(item => item.illumination === false)
                  }
                }
                if(item === "choicePowerEngine") {
                  newArray = newArray.filter(item => item.enginePower == choicePowerEngine)
                }
                if(item === "choiceMaxSpeed") {
                  newArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
                }
              }
              if(key === 2) {
                if(item === "changePrice") {
                  const inputMaxPrice = document.querySelector(".catalogBlock__hightPrice")
                  newArray = newArray.filter(item => item.myPrice <= inputMaxPrice.value)
                }
                if(item === "choiceIllumination") {
                  if(choiceIllumination === true) {
                    newArray = newArray.filter(item => item.illumination === true)
                  }
                  if(choiceIllumination === false) {
                    newArray = newArray.filter(item => item.illumination === false)
                  }
                }
                if(item === "choicePowerEngine") {
                  newArray = newArray.filter(item => item.enginePower == choicePowerEngine)
                }
                if(item === "choiceMaxSpeed") {
                  newArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
                }
              }
              if(key === 3) {
                if(item === "changePrice") {
                  const inputMaxPrice = document.querySelector(".catalogBlock__hightPrice")
                  newArray = newArray.filter(item => item.myPrice <= inputMaxPrice.value)
                }
                if(item === "choiceIllumination") {
                  if(choiceIllumination === true) {
                    newArray = newArray.filter(item => item.illumination === true)
                  }
                  if(choiceIllumination === false) {
                    newArray = newArray.filter(item => item.illumination === false)
                  }
                }
                if(item === "choicePowerEngine") {
                  newArray = newArray.filter(item => item.enginePower == choicePowerEngine)
                }
                if(item === "choiceMaxSpeed") {
                  newArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
                }
              }
            }) 
            if(filterationPrice == "cheap") {
                newArray = newArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
              }
              if(filterationPrice == "expensive") {
                newArray = newArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
              }
              if(filterationPrice === null) {
                newArray = newArray
              }
            
          } else {
            newArray = getThereArray
            if(filterationPrice == "cheap") {
              newArray = newArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
            }
            if(filterationPrice == "expensive") {
              newArray = newArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
            }
            if(filterationPrice === null) {
              newArray = newArray
            }
          }
          cards(".catalogBlock__d", newArray) /* Функция отрисовывает карточки товаров справа*/

          /* ВАРИАНТ №1 НЕ РАБОТАЕТ*/
          // if(transformArray.length !== 0) {
          //   if(choiceIllumination === true) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.illumination === true)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.illumination === true)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //     if(filterationPrice === null) {
          //       newArray = transformArray.filter(item => item.illumination === true)
          //     }
          //   }
          //   if(choiceIllumination === false) {
          //     if(filterationPrice == "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.illumination === false)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice == "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.illumination === false)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //     if(filterationPrice === null) {
          //       newArray = transformArray.filter(item => item.illumination === false)
          //     }
          //   }

          //   if(choicePowerEngine !== null && choiceIllumination === null && choiceMaxSpeed === null) {
          //     if(filterationPrice === null) {
          //       newArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //     }
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
          //   if(choicePowerEngine !== null && choiceIllumination !== null && choiceMaxSpeed !== null) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
          //   if(choicePowerEngine !== null && choiceIllumination === null && choiceMaxSpeed !== null) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
          //   if(choicePowerEngine !== null && choiceIllumination !== null && choiceMaxSpeed === null) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = transformArray.filter(item => item.enginePower == choicePowerEngine)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
            
          //   if(choiceMaxSpeed !== null && choicePowerEngine === null && choiceIllumination === null ) {
          //     if(filterationPrice === null) {
          //       newArray = transformArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //     }
          //   }
          //   if(choiceMaxSpeed !== null && choicePowerEngine !== null && choiceIllumination !== null) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
              
          //   }
          //   if(choiceMaxSpeed !== null && choicePowerEngine === null && choiceIllumination !== null ) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
          //   if(choiceMaxSpeed !== null && choicePowerEngine !== null && choiceIllumination === null ) {
          //     if(filterationPrice === "cheap") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //     }
          //     if(filterationPrice === "expensive") {
          //       let intermediateArray = newArray.filter(item => item.maxSpeed == choiceMaxSpeed)
          //       newArray = intermediateArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //     }
          //   }
          //   if(filterationPrice === "cheap") {
          //     transformArray.sort((prev, next)=>{return prev.myPrice - next.myPrice})
          //   }
          //   if(filterationPrice === "expensive") {
          //     transformArray.sort((prev, next)=>{return prev.myPrice - next.myPrice}).reverse()
          //   }

          //   if(choiceIllumination !== null || choicePowerEngine !== null || choiceMaxSpeed !== null) {
          //     cards(".catalogBlock__d", newArray) /* Функция отрисовывает карточки товаров справа*/
          //   } else {
          //     cards(".catalogBlock__d", transformArray) /* Функция отрисовывает карточки товаров справа*/
          //   }
          // } else {
          //   blockD.innerHTML="Упс... Кажется у нас нет такого товара:)"
          // }
        }
        /* Создаем список с товарами с выбранными фильтрами */
       const filterOnTop = () => {
        const blockB = document.querySelector(".catalogBlock__b")
        blockB.replaceChildren() /* Удаляю всех потомков из блока Б */
        /* Подсветка */
        if(choiceIllumination !==null) {
          const filterIllumination = document.createElement("div")
          filterIllumination.setAttribute("class", "catalogBlock__filterIllumination")
          choiceIllumination === true ? filterIllumination.innerHTML = "Подсветка: есть" : filterIllumination.innerHTML = "Подсветка: нет"
          const cross = document.createElement("div")
          cross.setAttribute("class", "catalogBlock__filterIlluminationCross")
          
          filterIllumination.appendChild(cross)
          blockB.appendChild(filterIllumination)
          eraseIllumination()
        }
        /* Цена */
        const choicePrice = document.querySelector(".catalogBlock__hightPrice")

        if(choicePrice.value != maxPrice) {
          const filterPrice = document.createElement("div")
          filterPrice.setAttribute("class", "catalogBlock__filterPrice")
          filterPrice.innerHTML = `Цена: ${choicePrice.value} Р`
          const cross = document.createElement("div")
          cross.setAttribute("class", "catalogBlock__filterPriceCross")

          filterPrice.appendChild(cross)
          blockB.appendChild(filterPrice)
          erasePrice()
        }

        /* Максимальная мощность двигателя */
        if(choicePowerEngine !== null) {
          const filterPower = document.createElement("div")
          filterPower.setAttribute("class", "catalogBlock__filterPower")
          filterPower.innerHTML = `Мощность двигателя: ${choicePowerEngine} Вт`
          const cross = document.createElement("div")
          cross.setAttribute("class", "catalogBlock__filterPowerCross")

          filterPower.appendChild(cross)
          blockB.appendChild(filterPower)
          erasePower()
        }

        /* Максимальная скорость */
        if(choiceMaxSpeed !== null) {
          const filterSpeed = document.createElement("div")
          filterSpeed.setAttribute("class", "catalogBlock__filterSpeed")
          filterSpeed.innerHTML = `Максимальная скорость: ${choiceMaxSpeed} км/ч`
          const cross = document.createElement("div")
          cross.setAttribute("class", "catalogBlock__filterSpeedCross")

          filterSpeed.appendChild(cross)
          blockB.appendChild(filterSpeed)
          eraseSpeed()
        }

        
          /* Общая кнопка удаления всех фильтров */
        if(choiceIllumination !==null || choicePrice.value != maxPrice || choicePowerEngine !== null || choiceMaxSpeed !== null) {
          const eraseAllFilter = document.createElement("div")
          eraseAllFilter.setAttribute("class", "catalogBlock__eraseAllFilter")
          eraseAllFilter.innerHTML = `Очистить фильтры`
          blockB.appendChild(eraseAllFilter)
          buttonEraseAllFilter()
        }

       } 
        /* Навешиваю на кнопку "Очистить фильтры" удаление всех выбранных фильтров */
        const buttonEraseAllFilter = ()=> {
          const eraseAll = document.querySelector(".catalogBlock__eraseAllFilter")             

          eraseAll.addEventListener("click", ()=> {

            const choicePrice = document.querySelector(".catalogBlock__hightPrice")
            if(choiceIllumination !== null) {
              document.querySelector(".catalogBlock__filterIlluminationCross").click()
            }
            if(choicePrice.value != maxPrice) {
              document.querySelector(".catalogBlock__filterPriceCross").click()
            }
            if(choicePowerEngine !== null) {
              document.querySelector(".catalogBlock__filterPowerCross").click()
            }
            if(choiceMaxSpeed !== null) {
              document.querySelector(".catalogBlock__filterSpeedCross").click()
            }
            try {
              document.querySelector(".catalogBlock__eraseAllFilter").remove()
            } catch (error) {
              
            }
            transformArray = getThereArray
            preparationArray()
            selectionOrderFilters = []
          })
          
        }
       
        /* Функция удаления кнопки "Очистить фильтры" если убраны все фильтры*/
        const eraseButtonAll = () => {
          const choicePrice = document.querySelector(".catalogBlock__hightPrice")
          try {
            if(choiceIllumination === null && choicePrice.value == maxPrice && choicePowerEngine === null && choiceMaxSpeed === null) {
              document.querySelector(".catalogBlock__eraseAllFilter").remove() 
            } 
          } catch (error) {
            
          }
        }
       /* Навешиваю на крестик "подсветки" удаление */
        const eraseIllumination = () => {
          const crossIlluination = document.querySelector(".catalogBlock__filterIlluminationCross")
          const checkboxTrue = document.querySelector(".catalogBlock__illuninationTrue")
          const checkboxFalse = document.querySelector(".catalogBlock__illuninationFalse")
           
          crossIlluination.addEventListener("click", ()=> {
            const filterIllumination = document.querySelector(".catalogBlock__filterIllumination");
            filterIllumination.remove();
            choiceIllumination = null;
            checkboxFalse.checked = false;
            checkboxTrue.checked = false;
            funcSelectionOrderFilters("choiceIllumination")
            eraseButtonAll();
            preparationArray();
          }) 

        }

        /* Навешиваю на крестик "стоимости" удаление */
        const erasePrice = () => {
          const crossPrice = document.querySelector(".catalogBlock__filterPriceCross")
           
          crossPrice.addEventListener("click", ()=> {
            const filterPrice = document.querySelector(".catalogBlock__filterPrice");
            filterPrice.remove();
            const choicePrice = document.querySelector(".catalogBlock__hightPrice")
            choicePrice.value = maxPrice
            const rangePrice = document.querySelector(".catalogBlock__rangePrice")
            rangePrice.value = maxPrice
            eraseButtonAll();
            if(choiceIllumination === null && choicePowerEngine === null && choiceMaxSpeed === null) {
              transformArray = getThereArray 
            }
            funcSelectionOrderFilters("deletePrice")
            preparationArray();
          }) 
        }

        /* Навешиваю на крестик "Мощности двигателя" удаление */
        const erasePower = () => {
          const crossPower = document.querySelector(".catalogBlock__filterPowerCross")
           
          crossPower.addEventListener("click", ()=> {
            const filterPower = document.querySelector(".catalogBlock__filterPower");
            filterPower.remove();
            choicePowerEngine = null;
            const selectedPowerEngine = document.querySelectorAll(".catalogBlock__powerEngineElement")
            selectedPowerEngine.forEach(item => {
              item.checked = null
            })
            funcSelectionOrderFilters("choicePowerEngine")
            eraseButtonAll();
            preparationArray();
          }) 
        }

        /* Навешиваю на крестик "Максимальной скорости" удаление */
        const eraseSpeed = () => {
          const crossSpeed = document.querySelector(".catalogBlock__filterSpeedCross")
           
          crossSpeed.addEventListener("click", ()=> {
            const filterSpeed = document.querySelector(".catalogBlock__filterSpeed");
            filterSpeed.remove();
            choiceMaxSpeed = null;
            const selectedSpeed = document.querySelectorAll(".catalogBlock__maxSpeedElement")
            selectedSpeed.forEach(item => {
              item.checked = null
            })
            funcSelectionOrderFilters("choiceMaxSpeed")
            eraseButtonAll();
            preparationArray();
          }) 
        }
        
        
        
        /* Запрос на сервер для получения */
        getResourse("http://localhost:3000/topSales")
        .then(res => showProduct(res))

    } catch (error) {
        
    }
}
export default catalog;