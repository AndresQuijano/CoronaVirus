import {Validator} from "../validations/validator.js"

document.addEventListener("DOMContentLoaded",addListeners);

function addListeners(){
    document.querySelector("#btnAddContact").addEventListener("click",addContact);

    // document.querySelector("#btn-back").addEventListener("click",goBack);
}

function goBack(){
    console.log("Ejecuta");
    window.history.back();
}

function loadPluginIti(){
    var input = document.querySelector("#phone");
    window.intlTelInput(input, {
        preferredCountries: [ "co", "pe","ar","ec","cl","es"],
        separateDialCode: true});
    
    // document.querySelector("body").classList.remove("iti-mobile");
}

class Person{
    constructor(name,phonePrefix,phone,genre,status){
        this.name=name;
        this.phonePrefix=phonePrefix;
        this.phone=phone;
        this.genre=genre;
        this.status=status;
    }
}

function addContact(e){
    e.preventDefault();

    let validator=new Validator();

    if(validator.validateForm(e.target.form.id)){
        
        // let form=document.querySelector(#form-social);
        let name;
        let phonePrefix;
        let phone;
        let genre;
        let status;

        name=document.querySelector("#inName").value;
        // phonePrefix=document.querySelector(".iti__selected-dial-code").innerHTML;
        phone=document.querySelector("#phone").value;
        genre=getSelectedOption("form-social","gender");
        status=getSelectedOption("form-social","status");

        let contact=new Person(name,phonePrefix,phone,genre,status);

        appContact(contact);

        document.querySelector(`#form-social`).reset();
    }
}

//Returns the value of the checked option from a set of radio buttons 
//or undefined if there's no checked option
function getSelectedOption(nameOfForm,nameOfRadios){
    let val;
    let form;
    let radios;    

    form=document.querySelector(`#${nameOfForm}`);
    radios =Array.from(form.querySelectorAll(`input[name=${nameOfRadios}]`));

    val=radios.find(element=>element.checked);

    return val===undefined?  val: val.value;
}

function appContact(contact){
    let btnRemove;
    let tr=document.createElement("tr");
    let td=document.createElement("td");

    btnRemove=document.createElement("button");
    btnRemove.innerHTML=`X`;
    btnRemove.classList.add("btn-remove");

    if(contact.status!=="notInfected")
        tr.innerHTML=`<td>${contact.name}<span class="sp-infected">*<span></td>`;
    else
        tr.innerHTML=`<td>${contact.name}`;
     
    // tr.innerHTML+=`<td>${contact.phonePrefix} ${contact.phone}</td>`;
    tr.innerHTML+=`<td>${contact.phone}</td>`;

    td.appendChild(btnRemove);
    tr.appendChild(td);

    document.querySelector("table").appendChild(tr);

    btnRemove.addEventListener("click",deleteContact);
}

function deleteContact(evt){
    let bnClick=evt.target;
    bnClick.parentElement.parentElement.remove();
}