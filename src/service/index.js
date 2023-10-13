import axios from 'axios';
const API = "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

export const getData =async()=>{
    const res=await axios.get(API);
    return res.data;
}