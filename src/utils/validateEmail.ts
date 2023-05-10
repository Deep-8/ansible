export const validateEmail=(email:string)=> {
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const emailValidator = (rule:any, values:any, callback:any) => {
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const invalidInputs = values.filter((value:any) => !value.match(emailRegex));
        if(invalidInputs.length === 0){
            callback()
        } else if(invalidInputs.length === 1){
            callback(invalidInputs.join('') + ' is not a valid email');
        } else {
            callback(invalidInputs.slice(0,-1).join(', ') + ' and ' + invalidInputs.slice(-1) + ' are not valid emails');
        }
  }