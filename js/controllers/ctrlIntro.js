export class CtrlIntro{
    constructor(){
        // CtrlGeneral.init();
        this.init();
    }

    init(){
        let btnNext=document.querySelector("#btn-next");
        btnNext.addEventListener("click",(evt)=>{
            evt.preventDefault();
            location.href="/personalInfo";
        });
    }
}

let ctrlIntro=new CtrlIntro();