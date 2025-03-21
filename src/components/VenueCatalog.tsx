import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({venuesJson}:{venuesJson:VenueJson}){
    // const venuesJson = await venuesJson    
    return(
        <>
        Explore {venuesJson.count} models in our catalog
        
        <div style={{margin:"20px",display:"flex",
                flexDirection:"row",alignContent:"space-around",
                justifyContent:"space-around",flexWrap:"wrap"
            }}>

                {     
                    venuesJson.data.map((venueItem:VenueItem)=>(
                        <Link href={`/venue/${venueItem.id}`}
                        className="w-1/5">
                        <Card 
                            venueName={venueItem.name} 
                            imgSrc={venueItem.picture}
                        />
                        </Link>
                     ))      

               }
                
               
            </div>
        
        </>
    )
}