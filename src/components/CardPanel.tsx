'use client'
import Link from "next/link";
import Card from "./Card";
import { useReducer } from 'react';

export default function CardPanel() {
    const cardReducer = (
        venueList: Map<string, number>,
        action: { type: string; venueName: string; rating?: number }
    ) => {
        const newVenueList = new Map(venueList);
        switch (action.type) {
            
            case "setRating":
               
                newVenueList.set(action.venueName,action.rating??0);
                return newVenueList ;
            
            case "remove":
                
                newVenueList.delete(action.venueName);
                return newVenueList ;

            default:
                return venueList;
        }
    };

    let defaultVenue = new Map<string,number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const [venueRatings, dispatch] = useReducer(cardReducer, defaultVenue);


    const mockVenue = [{vid:"001",name:"The Bloom Pavilion",image:"/img/bloom.jpg"},
        {vid:"002",name:"Spark Space",image:"/img/sparkspace.jpg"},
        {vid:"003",name:"The Grand Table",image:"/img/grandtable.jpg"},
    ]   
  
    return (
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-around",
            justifyContent: "space-around",
            flexWrap: "wrap"
        }}>
            {
                 mockVenue.map((venueItem)=>(
                    <Link href={`/venue/${venueItem.vid}`}
                    className="w-1/5">
                    <Card 
                        venueName={venueItem.name} 
                        imgSrc={venueItem.image}
                        rating={venueRatings.get(venueItem.name) || 0}
                        onRatingChange={(newRating) => dispatch({ type: "setRating", venueName: venueItem.name, rating: newRating })}
            />
                    </Link>
                 ))
            }
          
            <div className="   w-full text-xl font-medium">
              Venue List with Ratings{venueRatings.size}
            </div>

            <div className="block   w-full">
            {Array.from(venueRatings).map(([venueName,rating])=>
                <div data-testid={venueName} onClick={()=>dispatch({type:'remove' , venueName:venueName ,rating:rating})}>
                    {venueName}:{rating}</div>)}

            </div>
            
        </div>
    );
}
