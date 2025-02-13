export interface CreateListing{
    title : string,
    description  :string,
    images : string,
    rent : string,
    prefered_gender : string,
    address : string,
    location_city  : string,
    userId : string,
    }

export interface UpdateListing{
    title  : string,
    description : string,
    images : string,
    rent : string,
    prefered_gender : string,
    address : string,
    location_city : string,
    listingId : string,
    userId : string,
}

export interface Pagination{
    skip : Number,
    limit : Number
}

export interface Getall extends Pagination{
    page : Number,
}