import axiosPrivate from "../axios/axiosPrivate"


export default class SensorService {
    static getSensors(data) {
        return axiosPrivate.post(`/sensor/allsensors`,data)
    }

}