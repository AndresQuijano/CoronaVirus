import { Validator } from "../util/validator.js";
import {Person} from "../util/person.js";
import {Utils} from "../util/utils.js";

let contacts=[];
init();

function init(){
    let validator=new Validator();

    document.querySelector("#inName").addEventListener("blur",(evt)=>validator.executeValidateText(evt));
    document.querySelector("#phone").addEventListener("blur",(evt)=>validator.executeValidateText(evt));
    document.querySelector("#radio-gender").addEventListener("click",(evt)=>validator.executeValidateRadio(evt));
    document.querySelector("#radio-status").addEventListener("click",(evt)=>validator.executeValidateRadio(evt));
    document.querySelector("#btn-add-contact").addEventListener("click",addContact);
    document.querySelector("#btn-back").addEventListener("click",(evt)=>{
        evt.preventDefault();
        back();
    });    
    document.querySelector("#btn-next").addEventListener("click",(evt)=>{
        evt.preventDefault();
        next(evt.target)
    });
    document.addEventListener("DOMContentLoaded",fillForm());
}

function fillForm(){
    Utils.fillForm("form2");

    contacts=JSON.parse(localStorage.getItem('contacts'));

    if(contacts){
        contacts.forEach(element=>{
            showContact(element);
        });
    }else{
        contacts=[];
    }
}

function back(){
    localStorage.setItem("contacts",JSON.stringify(contacts));
    Utils.saveFormValues("form2");
    window.location.assign("/personalInfo");
}

function addContact(e){
    e.preventDefault();

    let validator=new Validator();

    if(validator.validateForm(e.target.form.id)){
        
        // let form=document.querySelector(#form-social);
        let name;
        // let phonePrefix;
        let phone;
        let genre;
        let status;

        name=document.querySelector("#inName").value;
        // phonePrefix=document.querySelector(".iti__selected-dial-code").innerHTML;
        phone=document.querySelector("#phone").value;
        genre=Utils.getSelectedOption("form-social","gender");
        status=Utils.getSelectedOption("form-social","status");

        let contact=new Person(name,/*phonePrefix,*/phone,genre,status);

        contacts.push(contact);

        showContact(contact);

        document.querySelector(`#form-social`).reset();
    }
}

function showContact(contact){
    let btnRemove;
    let tr=document.createElement("tr");
    let td=document.createElement("td");

    btnRemove=document.createElement("button");
    btnRemove.innerHTML=`X`;
    btnRemove.classList.add("btn-remove");

    if(contact.status!=="unknown" && contact.status!=="uninfected")
        tr.innerHTML=`<td>${contact.name}<span class="sp-infected">*<span></td>`;
    else
        tr.innerHTML=`<td>${contact.name}`;
     
    // tr.innerHTML+=`<td>${contact.phonePrefix} ${contact.phone}</td>`;
    tr.innerHTML+=`<td class="contact-phone">${contact.phone}</td>`;

    td.appendChild(btnRemove);
    tr.appendChild(td);

    document.querySelector("table").appendChild(tr);

    btnRemove.addEventListener("click",deleteContact);
}

function deleteContact(evt){
    let bnClick=evt.target;
    let row=bnClick.parentElement.parentElement;
    let phoneNumber=row.querySelector(".contact-phone").innerHTML;

    for( var i = 0; i < contacts.length; i++){ 
        if ( /*contacts[i].phonePrefix + */contacts[i].phone===phoneNumber) { 
            contacts.splice(i, 1);
            break; 
        }
    }

    row.remove();
}

function next(button){
    localStorage.setItem("contacts",JSON.stringify(contacts));
    Utils.saveFormValues("form2");
    insertUsers();
    // window.location.assign("/html/socialCircle.html");
}

function insertUsers(){
    let form1=JSON.parse(localStorage.getItem('form1'));
    let arrPeople=[];
    let principal=new Person();

    principal.name=getValueFromArray(form1,"name");
    principal.phone=getValueFromArray(form1,"phone");
    principal.gender=getValueFromArray(form1,"gender");
    principal.age=getValueFromArray(form1,"age");
    principal.status=getValueFromArray(form1,"status");

    arrPeople.push(principal);

    // console.log(contacts);

    let len=contacts.length;
    let friendsPrincipal=[];

    for(let i=0;i<len;i++){
        let contact=new Person();
        
        contact.name=contacts[i].name;
        contact.phone=contacts[i].phone;
        contact.gender=contacts[i].gender;
        contact.status=contacts[i].status;

        arrPeople.push(contact);

        friendsPrincipal.push(contact.phone);
    }

    principal.friends=friendsPrincipal;
    arrPeople[0]=principal;

    let dao=new PeopleDAO();
    dao.insertUsers(arrPeople);
}

function getValueFromArray(arr,id){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            return arr[i].value;
        }else if (arr[i].groupName===id && arr[i].checked===true){
            return arr[i].value;
        }
    }
}