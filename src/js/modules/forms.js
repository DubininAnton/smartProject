import { postData } from "../services/requests"

const forms =()=> {
    try {
        const formsBlock = document.querySelectorAll("form")

    formsBlock.forEach(item => {
        /* Общие данные со свсех форм */
        const myButton = item.querySelectorAll("button") 
        const myInputs = item.querySelectorAll("input")
        /* Данные со страницы контакты */
        let textarea;
        let clientName;
        let myNumber;
        let myText;
        let politicsBtn;
        /* Плюс данные со страницы Вакансии */
        let clientSurname;
        let clientPetronomyc;
        let clientFile;
        
        if(item.getAttribute("class")==="installment__form") {
            clientName = item.querySelector(".installment__nameInput")
            myNumber = item.querySelector(".installment__phoneInput")   
        }
        if(item.getAttribute("class")==="contacts__form") {
            textarea = item.querySelector("textarea")
            clientName = item.querySelector(".contacts__nameInput")
            myNumber = item.querySelector(".contacts__phoneInput")
            myText = item.querySelector(".contacts__textInput")
            politicsBtn = item.querySelector(".contacts__potitics")   
        }
        if(item.getAttribute("class")==="opt__form") {
            textarea = item.querySelector("textarea")
            clientName = item.querySelector(".opt__nameInput")
            myNumber = item.querySelector(".opt__phoneInput")
            myText = item.querySelector(".opt__textInput")
            politicsBtn = item.querySelector(".opt__potitics")   
        }
        
        if( item.getAttribute("class")==="drop__form") {
            textarea = item.querySelector("textarea")
            clientName = item.querySelector(".drop__nameInput")
            myNumber = item.querySelector(".drop__phoneInput")
            myText = item.querySelector(".drop__textInput")
            politicsBtn = item.querySelector(".drop__potitics")   
        }
        if( item.getAttribute("class")==="vacancy__form" || item.getAttribute("class")==="vacancy__form768") {
            textarea = item.querySelector("textarea")
            clientName = item.querySelector(".vacancy__nameInput")
            clientSurname = item.querySelector(".vacancy__surnameInput")
            clientPetronomyc = item.querySelector(".vacancy__patronymicInput")
            myNumber = item.querySelector(".vacancy__phoneInput")
            clientFile = item.querySelector(".vacancy__fileInput")
            myText = item.querySelector(".vacancy__textInput")
            politicsBtn = item.querySelector(".vacancy__potitics")   
        }

       

        // /* Данные со страницы ОПТ */
        // const textareaOpt = item.querySelector("textarea")
        // const clientNameOpt = item.querySelector(".opt__nameInput")
        // const myNumberOpt = item.querySelector(".opt__phoneInput")
        // const myTextOpt = item.querySelector(".opt__textInput")
        // const politicsBtnOpt = item.querySelector(".opt__potitics")

        /* Данные со страницы рассрочка */
        // const clientNameInstallment = item.querySelector(".installment__nameInput")
        // const myNumberInstallment = item.querySelector(".installment__phoneInput")

        item.addEventListener("submit", (e)=>{
            e.preventDefault();
            let api;
            /* Форма со страницы контакты и ОПТ*/
            if(item.getAttribute("class")==="contacts__form" || item.getAttribute("class")==="opt__form" || item.getAttribute("class")==="drop__form" || item.getAttribute("class")==="vacancy__form" || item.getAttribute("class")==="vacancy__form768") {
               if(clientName.value !== '' && myNumber.value !== '' && myText.value !== '' && politicsBtn.checked === true) {
                    api = "http://localhost:3000/formData"; 
                    const formSend = new FormData(item);
                    contactsForm(api, formSend, myButton, myInputs, textarea)
               } else {
                myButton.forEach(btn => {
                    btn.textContent = "Введены не все данные"
                    btn.setAttribute('style','background-color:red')
                    setTimeout(()=> {
                        btn.textContent = "Отправить"
                        btn.setAttribute('style','background-color: #4878A6')  
                    }, 2000)
                })   
            }   
            }
            /* Форма со страницы рассрочка */
            if(item.getAttribute("class") === "installment__form") {
                if(clientName.value !== '' && myNumber.value !== '') {
                    api = "http://localhost:3000/installmentForm";
                    const formSend = new FormData(item);
                    contactsForm(api, formSend, myButton, myInputs)
               } else {
                myButton.forEach(btn => {
                    btn.textContent = "Введены не все данные"
                    btn.setAttribute('style','background-color:red')
                    setTimeout(()=> {
                        btn.textContent = "Отправить"
                        btn.setAttribute('style','background-color: #4878A6')  
                    }, 2000)
                })   
            }    
            }
        })
    })

    /* Функция отправки данных на сервер */
    const contactsForm = (api, formSend, myButton, myInputs, textarea = null) => {

        let collectionInformation ={}
        for (var [key, value] of formSend.entries()) { 
            collectionInformation[key] = value;
          }
          /* Пришлось вытащить данные из new FormData записать их в collectionInformation и отправить т.к. formSend отправлялся пустым*/
          postData(api, collectionInformation)
            .then(res => {
                if(res.ok) {
                    myButton.forEach(btn => {
                        btn.textContent = "Данные отправлены"
                        btn.setAttribute('style','color: green')
                            setTimeout(()=> {
                                btn.textContent = "Отправить"
                                btn.setAttribute('style','color: #fffff')  
                            }, 2000)
                    })
                    
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                myInputs.forEach(item => {
                    item.value = null;
                    if(item.getAttribute("type")==="checkbox") {
                        item.checked = false
                    }
                })
                if(textarea) {
                    textarea.value = null;
                }
                alert("Все данные отправляются в файл db.json")
            })
          
    }
    } catch (error) {
        
    }
}

export default forms;