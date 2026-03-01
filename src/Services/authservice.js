const BASE_URL = import.meta.env.VITE_API_URL;




export default class AuthService {
  static signup(userData) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",  
      body: JSON.stringify(userData)
    })
  }

  static login(userData) {
    return fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",  
      body: JSON.stringify(userData)
    })
  }
 
  static currentUser() {
    return fetch(`${BASE_URL}/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"  
    })
  }
  static logout() {
    return fetch(`${BASE_URL}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"  
    })  
  }


}
