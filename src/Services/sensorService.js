export default class SensorService {
    static getSensors(data) {
        return fetch("http://localhost:3000/sensor/allsensors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
    }

}