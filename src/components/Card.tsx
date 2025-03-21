'use client'
import styles from './card.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card({ 
    venueName, 
    imgSrc, 
    rating, 
    onRatingChange 
}: { 
    venueName: string, 
    imgSrc: string, 
    rating?: number, 
    onRatingChange?: (newRating: number) => void 
}) {
    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image 
                    src={imgSrc}
                    alt='Product Picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
           
            <div className="w-full h-[15%] p-[10px]">
                <p className="text-lg font-semibold text-gray-800"> {venueName} </p>
            </div>

            <div>
                {
                    onRatingChange ? <Rating
                    className=' h-[10%]  mx-2 px-1 py-5'
                    id={`${venueName} Rating`}
                    name={`${venueName} Rating`}
                    data-testid={`${venueName} Rating`}
                    value={rating}
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                            
                            onRatingChange(newValue);
                        }
                    }}
                    onClick={(e)=>{e.stopPropagation();}}/> :''
                }
                
            </div>
        </InteractiveCard>
    );
}
