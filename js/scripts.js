let button = document.querySelector(".nav__icon");
let item = document.querySelectorAll(".nav__link");
let navList = document.querySelector(".nav__list");
let btnStyle = window.getComputedStyle(button, null);



button.addEventListener("click", function() {
    
    navList.classList.toggle("nav__list--show");
	
    if(navList.classList.contains("nav__list--show")){
	button.classList.add("nav__icon--active");
	}

	else{
		button.classList.remove("nav__icon--active");
	}

});




for (var i = 0; i < item.length; i++) {
    
        
    item[i].addEventListener("click", function() {
        
        if (btnStyle.getPropertyValue("display") == "block") {
        
           navList.classList.remove("nav__list--show");

				button.classList.remove("nav__icon--active");
			
        }
		
        
        return true;
    });
}
     
    window.addEventListener("resize", function() {
        
        if (btnStyle.getPropertyValue("display") === "none") {
            navList.classList.remove("nav__list--show"); 
				
			button.classList.remove("nav__icon--active");
	}
        
});

