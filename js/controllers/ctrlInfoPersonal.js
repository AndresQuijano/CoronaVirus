import { Validator } from "../util/validator.js";
import {Utils} from "../util/utils.js"

addListeners();

function addListeners(){    
    let validator=new Validator();

    document.querySelector("#name").addEventListener("blur",(evt)=>validator.executeValidateText(evt));
    document.querySelector("#phone").addEventListener("blur",(evt)=>validator.executeValidateText(evt));
    document.querySelector("#age").addEventListener("blur",(evt)=>validator.executeValidateText(evt));
    document.querySelector("#radio-gender").addEventListener("click",(evt)=>validator.executeValidateRadio(evt));
    document.querySelector("#radio-status").addEventListener("click",(evt)=>validator.executeValidateRadio(evt));
    document.querySelector("#btn-next").addEventListener("click",(evt)=>{
        evt.preventDefault();
        next(evt.target)
    });
    document.querySelector("#btn-back").addEventListener("click",(evt)=>{
        evt.preventDefault();
        back(evt.target)
    });
    document.addEventListener("DOMContentLoaded",Utils.fillForm("form1"));
}

function next(button){
    let validator=new Validator();
    if(validator.validateForm(button.form.id)){
        Utils.saveFormValues("form1");
        window.location.assign("/socialCircle");
    }
}

function back(){
    Utils.saveFormValues("form1");
    window.location.assign("/");
}
