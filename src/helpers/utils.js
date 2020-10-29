export function getFormBody(params){
    let formBody=[];

    for(let property in params){
         let encodedKey=encodeURIComponent(property); //'user nam   
         let encodedValue=encodeURIComponent(params[property]);

         formBody(encodedKey+ '= '+encodedValue);


    }
    return formBody.join('&'); //
}