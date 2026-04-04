import axios from "axios"


export default class profile {
    static getProfile = async () => {
        try {
            const user = await axios.get(`${import.meta.env.VITE_API_URL}/user/getprofile`, {
                withCredentials: true
            }
            )
            // console.log("class Profile:",user)
            return user;
        } catch (error) {
            console.error("Error fetching profile:", error);
       }
    }

        static updateProfile=async(formdata)=>{
             try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/user/updateProfile`,formdata, {
                withCredentials: true
            }
            )
            console.log("class Profile:",data.user)
            return data.user;
        } catch (error) {
            console.error("Error fetching profile:", error);
       }

       }

    
};