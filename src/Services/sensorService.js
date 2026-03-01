export default class SensorService {
    static getSensors(data) {
        return fetch(`${import.meta.env.VITE_API_URL}/sensor/allsensors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
    }

}