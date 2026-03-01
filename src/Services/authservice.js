
export default class AuthService {
  static signup(userData) {
    return fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",  
      body: JSON.stringify(userData)
    })
  }

  static login(userData) {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",  
      body: JSON.stringify(userData)
    })
  }
 
  static currentUser() {
    return fetch("http://localhost:3000/current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"  
    })
  }
  static logout() {
    return fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"  
    })  
  }


}
