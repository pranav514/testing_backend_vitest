import { any } from "vitest-mock-extended";
import { CreateListing as CreateListingInterface, Pagination, UpdateListing } from "../interface/listingInterface";
import { Count, Create, deleteListing, findMany, findUnique, getAll, Update } from "../repositories/listing";

export const CreateListing = async ({title , description, images , rent , prefered_gender , address , location_city , userId} : CreateListingInterface) => {
    try {

 
          if (!title || !description || !address || !location_city) {
            return {
                message : "some fields are missing",
                status : 402
            }
          }
          const lisiting = await Create({title , description, images , rent , prefered_gender , address , location_city , userId})
          return {
            message : "listing added succesfully",
            status : 200,
            data : lisiting
          }
        } catch (error) {
          return {
            message : "error occured while creating the listing",
            status : 411
          }
        }

}

export const UpdateListings  = async ({title,
    description,
    images,
    rent,
    prefered_gender,
    address,
    location_city,
    listingId,
    userId,} : UpdateListing) => {
        try{
            console.log(listingId);
            console.log(userId);
            const listing = await Update({
              title,
              description,
              images,
              rent,
              prefered_gender,
              address,
              location_city,
              listingId,
              userId,
            });
            console.log(listing);
            return {
                message : "listing updated succesfully",
                status  : 200,
            }
          }
        
         catch (error) {
            return {
                message : "error occured while updating the listings",
                status : 411
            }
          }
}


export const DeleteListing = async ({listingId , userId} : any) => {
    try{
        const listing  = await deleteListing({listingId , userId})
            return {
                message : "listing deleted succesfully",
                status  : 200,
            }
    }catch(error){
        return { 
            message  :"cannot delete the listing",
            status : 411
        }
    }
}

export const GetAll = async({skip , limit , page} :any ) => {
    try {

    
        const listing = await getAll({ skip, limit });
        const totalCount = await Count();
        const totalPage = Math.ceil(totalCount / limit);
        return {
            message : "all listings fetched successfully",
            status : 200,
            listing : listing,
            pagination : {
                currentPage: page,
                totalPage: totalPage,
                totalItems: totalCount,
                itemsPerPage: limit
            }
        }
      } catch (error) {
        return {
            message : "cannot fetched all the blogs",
            status : 411
        }
      }
}

export const SpecificListing  = async(listingId : string) => {
  try {
        const listing = await findUnique(listingId);
        console.log(listing);
        return {
          message : "fetched the specific listing",
          status : 200,
          listing
        }
      } catch (error) {
        return {
          message : "cannot fetched the listing",
          status  : 411,
        }
      }
}

export const GetUserSpecific = async(userId : string) => {
    try {
        console.log("userId", userId);
        const listing = await findMany(userId);
        console.log(listing);
        return {
            message :  `fetched the blog of the user ${userId}`,
            status  :200,
            listing
        }
      } catch (error) {
        return {
            message : "cannot fetched the blog",
            status : 411,
        }
      }
}