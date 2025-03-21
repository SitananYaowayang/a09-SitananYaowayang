import DateReserve from "@/components/DateReserve";
import { MenuItem, Select, TextField } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions"; 
export default async function bookings(){

    const session = await getServerSession(authOptions)
    if(!session||!session.user.token)return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4  p-5">
            
            <div className="w-[80%] bg-white shadow-lg rounded-2xl p-6 border border-gray-200 items-center flex flex-col">
            <div className="text-2xl">User Profile</div>
            <table className="table-auto border-seperate border-spacing-2"><tbody>
                <tr><td>Name</td><td>{profile.data.name}</td></tr>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody>

            </table>
            </div>
            

            <div className="w-[60%] bg-white shadow-lg rounded-2xl p-3 border border-gray-200 items-center flex flex-col">
            <div className="text-xl font-medium">New Booking</div>
            <div className="text-md text-left text-gray-600">
            ชื่อและนามสกุลผู้จอง
            </div>
            <TextField variant="standard" name="Name-Lastname" label="Name-Lastname"></TextField>
            <div className="text-md text-left text-gray-600">
            หมายเลขติดต่อ
            </div>
            <TextField variant="standard" name=" Contact-Number" label="Contact-Number"></TextField>
            <div className="text-md text-left text-gray-600">
            ประเภท Venue
            </div>
            <Select variant="standard" id="value" className="h-[2em] w-[200px]">
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable"> The Grand Table</MenuItem>
            </Select>

            
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">
                วันที่ต้องกำรจัดงาน
                </div>
                <DateReserve/>

            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white" name="Book Venue">
            Book Venue
            </button>
            </div>
            
        </main>
    );
}