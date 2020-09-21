// let Utils=require("../util/utils");

import {Utils} from "../util/utils.js";

export class Validator {
    constructor(){

    }

    validateForm (formId) {
        let form = document.querySelector(`#${formId}`);
        let arrInputs = form.querySelectorAll("input");
        let nameRadio;//To avoid validating every radio on a same group. We'll just validate the first one.
        let valid=true;
        let validTotal=true;
        let len=arrInputs.length;
        let i=0;

        arrInputs.forEach(input=>{
            let type = input.type;

            if (type === "text" || type === "number" || type == "tel") {
                valid=this.validateText(input);
            } else if (type == "radio" && input.name!==nameRadio) {
                valid=this.validateRadio(input);
                nameRadio=input.name;
            }

            if(!valid){
                validTotal=valid;
            }

            i++;
        });

        return validTotal;
    }

    executeValidateText(evt) {
        this.validateText(evt.target);
    }

    validateText(input) {
        let valid;

        if (input.getAttribute("required")) {
            valid = this.validateRequired(input);
        }

        if (input.getAttribute("pattern") && valid) {
            valid=this.validatePattern(input);
        }
        
        if(input.getAttribute("type") === "number" && valid) {
            valid=this.validateType(input);
        }

        if((input.getAttribute("min") || input.getAttribute("max")) && valid){
            valid=this.validateRange(input);
        }

        return valid;
    }

    validateRequired(input) {
        let label = input.parentElement.querySelector("label");

        if (input.validity.valueMissing) {
            if (input.className.indexOf("invalid-field") === -1) {
                input.classList.add("invalid-field");
                label.innerHTML = `${label.textContent} <span class="error-label">(Requerido)</span>`;
            }
            return false;
        } else {
            if (input.className.indexOf("invalid-field") !== -1) {
                input.classList.remove("invalid-field");
                let span = label.querySelector("span");
                label.removeChild(span);
            }
            return true;
        }
    }

    validatePattern (input) {
        let label = input.parentElement.querySelector("label");

        if (input.validity.patternMismatch) {
            if (input.className.indexOf("invalid-field") === -1) {
                input.classList.add("invalid-field");
                label.innerHTML = `${label.textContent} <span class="error-label">(Revisa este dato)</span>`;
            }
            return false;
        } else {
            if (input.className.indexOf("invalid-field") !== -1) {
                input.classList.remove("invalid-field");
                let span = label.querySelector("span");
                label.removeChild(span);
            }
            return true;
        }
    }

    validateType (input) {
        let label = input.parentElement.querySelector("label");

        if (!Number.isInteger(parseInt(input.value))) {
            console.log("if de validity");
            if (input.className.indexOf("invalid-field") === -1) {
                input.classList.add("invalid-field");
                label.innerHTML = `${label.textContent} <span class="error-label">(Ingresa un número)</span>`;
            }
            return false;
        } else {
            if (input.className.indexOf("invalid-field") !== -1) {
                input.classList.remove("invalid-field");
                let span = label.querySelector("span");
                label.removeChild(span);
            }
            return true;
        }
    }

    validateRange (input) {
        let label = input.parentElement.querySelector("label");

        if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
            if (input.className.indexOf("invalid-field") === -1) {
                input.classList.add("invalid-field");
                label.innerHTML = `${label.textContent} <span class="error-label">(Revisa este dato)</span>`;
            }
            return false;
        } else {
            if (input.className.indexOf("invalid-field") !== -1) {
                input.classList.remove("invalid-field");
                let span = label.querySelector("span");
                label.removeChild(span);
            }
            return true;
        }
    }
    
    //The target is the div that contains all the radios
    executeValidateRadio(evt){
        let target=evt.target;

        if(target instanceof HTMLInputElement && target.type === "radio"){
            this.validateRadio(target);
        }
    }

    validateRadio(radio) {
        let valid;

        if (radio.getAttribute("required")) {
            valid = this.validateChecked(radio);
        }

        return valid;
    }

    validateChecked(input) {
        let nameOfRadios = input.getAttribute("name");
        let paragraph = input.parentElement.parentElement.querySelector("p");

        if(paragraph===null)
            paragraph=input.parentElement.parentElement.parentElement.querySelector("p");

        let nameOfForm = input.form.getAttribute("id");

        if (Utils.getSelectedOption(nameOfForm, nameOfRadios) === undefined) {
            if (paragraph.className.indexOf("invalid-field") === -1) {
                paragraph.classList.add("invalid-field");
                paragraph.innerHTML = `${paragraph.textContent} <span class="error-label">(Selecciona)</span>`;
            }
            return false;
        } else {
            if (paragraph.className.indexOf("invalid-field") !== -1) {
                paragraph.classList.remove("invalid-field");
                let span = paragraph.querySelector("span");
                paragraph.removeChild(span);
            }
            return true;
        }
    }
}

// modules.export=Validator;