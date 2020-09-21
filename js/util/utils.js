export class Utils{
    //Returns the value of the checked option from a set of radio buttons 
    //or undefined if there's no checked option
    static getSelectedOption(nameOfForm,nameOfRadios){
        let val;
        let form;
        let radios;    
    
        form=document.querySelector(`#${nameOfForm}`);
        radios =Array.from(form.querySelectorAll(`input[name=${nameOfRadios}]`));
    
        val=radios.find(element=>element.checked);
    
        return val===undefined?  val: val.value;
    }

    static fillForm(cookieName){
        let values=JSON.parse(localStorage.getItem(cookieName));
    
        if(values!==null){
            values.forEach(element => {
                if(element.type==="radio"){
                    document.querySelector(`#${element.value}`).checked=element.checked;
                }else{
                    document.querySelector(`#${element.id}`).value=element.value;
                }
            });
        }
    }

    static saveFormValues(cookieName){
        let values=[];
    
        let inputs=document.querySelectorAll("input");
        inputs.forEach(element=>{
            if(element.type==="radio"){
                values.push({"type":"radio","id":element.name,"value":element.value,"checked":element.checked});
            }else{            
                values.push({"type":element.type,"id":element.id,"value":element.value});
            }
        });
    
        localStorage.setItem(cookieName,JSON.stringify(values));
    
        return values;
    }
}

// module.exports=Utils;