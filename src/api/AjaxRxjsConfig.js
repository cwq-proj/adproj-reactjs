import { ajax } from 'rxjs/ajax';

export class AjaxRxjs { // Export the class
    constructor() {
        this.baseURL = "http://localhost:8000";
    }

    getMethod(additionalURL) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'GET'
        });
        return users;
    }

    postMethod(additionalURL, requestData) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'POST',
            body: requestData // Corrected format
        });
        return users;
    }    

    putMethod(additionalURL, requestData) { 
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'PUT',
            body: requestData
        });
        return users;
        
    }

    deleteMethod(additionalURL) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'DELETE'
        });
        return users;
    }
}
