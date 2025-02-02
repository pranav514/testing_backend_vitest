export interface User{
    name : string,
    gender  : string,
    email  : string,
    password : string,
    phone_number : string
}

export interface UserUpdate{
    name : string,
    password : string,
    phone_number  : string,
    userId : string,
}