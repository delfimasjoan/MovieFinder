// View Password
const eye=document.querySelector("#eye-button");

eye.addEventListener("click", (e) =>{
    var pas= document.getElementById("password");
    var view=pas.getAttribute('type');
    if (view=='password'){
        pas.setAttribute('type','text');
    } else{
        pas.setAttribute('type','password');
    }
})

//Log in
let regExp_p= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/gm;
let regExp_m= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
let submit=document.querySelector("#submi");


function testMail(m_input){
    let test= regExp_m.test(m_input);
    if (test==true){
        console.log(test);
        return (true);
    }
    else{
        alert ('Your email is invalid');
        console.log(test)
        return (false);
    }
}
function testPassword(p_input){
    if (regExp_p.test(p_input)){
        return (true);
    } 
    else{
        alert('Your password is invalid, it should be 8 to 20 characters long, including at least 1 letter, 1 number and 1 special character');
        return (false);
    }
}

submit.addEventListener("click", function(e){
    e.preventDefault();
    let mail=document.getElementById("mail");
    let password=document.getElementById("password");
    if (testMail(mail.value)&&testPassword(password.value)){
        window.location="HomeGrid.html";
    }
    else{
        console.log("Something went wrong.")
    }

})

const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
app.listen(3000)