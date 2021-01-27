const userData = "userData";

let storageData;
let sessionData;

const AuthService = {
  setUserDataToLocalStorage(data) {
    localStorage.setItem(userData, JSON.stringify(data));
  },
  removeUserDataFromLocalStorage() {
    localStorage.removeItem(userData);
  },
  setUserDataToSessionStorage(data) {
    window.sessionStorage.setItem(userData, JSON.stringify(data));
  },
  removeUserDataFromSessionStorage() {
    window.sessionStorage.removeItem(userData);
  },

  setStudentSession(data) {
    window.sessionStorage.setItem("student", JSON.stringify(data));
  },
  removeStudentSession() {
    window.sessionStorage.removeItem("student");
  },
  getStudentData(){
    return window.sessionStorage.getItem("student");
  },
  getUserData() {
    getStorageData();
    const data = storageData ? storageData : sessionData;
    if (!data) return {};

    return JSON.parse(data);
  },
  isAthenticated() {
    getStorageData();
    return storageData || (sessionData && sessionData.length);
  },
  removeUserData() {
    getStorageData();
    localStorage.removeItem(userData);
    window.sessionStorage.removeItem(userData);
    return true;
  },
};

const getStorageData = () => {
  storageData = localStorage.getItem(userData);
  sessionData = window.sessionStorage.getItem(userData);
};

export default AuthService;
