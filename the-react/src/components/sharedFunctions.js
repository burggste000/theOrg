export const updateMans=empAr=>{
    for(let element of empAr){
        const managerr=empAr.find(e=>e.id===element.managerId);
        if(managerr){
            element.manager=managerr;
            if (!managerr.directs) {
                managerr.directs = [];
            }
            managerr.directs.push(element);
        }
        else{
            element.manager=null;
        }
        if (!element.directs) {
            element.directs = [];
        }
    }
}    
