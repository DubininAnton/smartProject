
const navbar = (wrapper)=> {
    const navbarWrapper = document.querySelector(wrapper);
    const navbarIcon = navbarWrapper.querySelector(".navbar__icon");
    const navbarTel1 = navbarWrapper.querySelector(".navbar__tel1");
    const navbarTel2 = navbarWrapper.querySelector(".navbar__tel2");
    const navbarSchedule = navbarWrapper.querySelector(".navbar__schedule");
    const navbarInputBlock = navbarWrapper.querySelector(".navbar__input");
    const navbarSearch = navbarWrapper.querySelector(".navbar__search");
    const navbarInput = navbarWrapper.querySelector("input");
    const navbarEye = navbarWrapper.querySelector(".navbar__eye");
    const navbarLike = navbarWrapper.querySelector(".navbar__like");
    const navbarCompare = navbarWrapper.querySelector(".navbar__compare");
    const navbarCart = navbarWrapper.querySelector(".navbar__cart");
    const navbarBtnEnter = navbarWrapper.querySelector(".navbar__btnEnter");
    const navbarExit = navbarWrapper.querySelector(".navbar__exit");
    const form = navbarWrapper.querySelector("form");
    const inputBlock = [navbarSearch, navbarInput]
    let formInput = "small"
    
    inputBlock.forEach(element => {
        element.addEventListener("click", ()=> {
            if(formInput === "small") {
                navbarIcon.style.display = "none";
                navbarTel1.style.display = "none";
                navbarTel2.style.display = "none";
                navbarSchedule.style.display = "none";
                navbarSearch.style.display = "none";
                navbarEye.style.display = "none";
                navbarLike.style.display = "none";
                navbarCompare.style.display = "none";
                navbarCart.style.display = "none";
                navbarBtnEnter.style.display = "none";
                navbarExit.style.display ="block";
                navbarInputBlock.classList.add("navbar__input_allWindow");
                navbarInput.setAttribute("placeholder", "Введите запрос, например «Smart balance");
                formInput = "big"
            }
            
        })
    });
    
    const exitInput = () => {
        navbarInputBlock.classList.remove("navbar__input_allWindow")
        setTimeout(()=>{
            navbarIcon.style.display = "block";
            navbarTel1.style.display = "block";
            navbarTel2.style.display = "block";
            navbarSchedule.style.display = "block";
        }, 200)
        navbarSearch.style.display = "block";
        navbarEye.style.display = "block";
        navbarLike.style.display = "block";
        navbarCompare.style.display = "block";
        navbarCart.style.display = "block";
        navbarBtnEnter.style.display = "flex";
        navbarExit.style.display ="none";   
        navbarInput.setAttribute("placeholder", "Поиск");
        navbarInput.value="";
        formInput = "small"
    }
    navbarExit.addEventListener("click", ()=> {
        exitInput()
    })

   

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        console.log(navbarInput.value)
        exitInput()
    })
    
}

export default navbar;