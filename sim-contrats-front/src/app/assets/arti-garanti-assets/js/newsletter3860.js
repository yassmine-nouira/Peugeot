var form = document.getElementById("newsletterForm");

form.email.addEventListener("input", function(e){
    if(e.target.value){
        var emailParent = this.parentNode;
        emailParent.classList.remove("error");
    }
})

form.name_surname.addEventListener("input", function(e){
    if(e.target.value){
        var nameParent = this.parentNode;
        nameParent.classList.remove("error");
    }
})

form.addEventListener("submit", function(e){
    e.preventDefault();
    // NAME SURNAME
    if(e.target.name_surname.value == ""){
        var nameParent = e.target.name_surname.parentNode;
        var error = nameParent.childNodes[3]
        nameParent.classList.add("error");

        error.innerHTML = "Ad/Soyad boş bırakılamaz"
        return false
    }
    // EMAIL
    if(e.target.email.value == ""){
        var emailParent = e.target.email.parentNode;
        var error = emailParent.childNodes[3]
        emailParent.classList.add("error");

        error.innerHTML = "Email boş bırakılamaz"
        return false
    }else{
        // INPUT DOLUYSA -> EPOSTA ALANI REGEX YAPILABİLİR
    }
    // USER AGREEMENT
    if(!e.target.user_agreement.checked){
        var agreeParent = e.target.user_agreement.parentNode.parentNode.parentNode;
        var error = agreeParent.childNodes[3]
        agreeParent.classList.add("error")

        error.innerHTML = "Sözleşmeyi okuyup onaylamalısın."
        return false
    }

    var successMessage = document.getElementsByClassName("successMessage");
    successMessage[0].classList.add("showedmessage");

    setInterval(function(){
        successMessage[0].classList.remove("showedmessage");
    }, 4000)

})