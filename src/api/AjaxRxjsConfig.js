import { ajax } from 'rxjs/ajax';

export class AjaxRxjs {
    constructor() {
        // this.baseURL = "http://localhost:8000";
        this.baseURL = "http://20.239.74.208:8000";
    }

    // Helper function to set headers
    setHeaders() {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            };
        } else {
            return {
                'Content-Type': 'application/json'
            };
        }
    }

    getMethod(additionalURL) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'GET',
            headers: this.setHeaders() // Set headers
        });
        return users;
    }

    postMethod(additionalURL, requestData) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'POST',
            body: requestData,
            headers: this.setHeaders() // Set headers
        });
        return users;
    }    

    putMethod(additionalURL, requestData) { 
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'PUT',
            body: requestData,
            headers: this.setHeaders() // Set headers
        });
        return users;
    }

    deleteMethod(additionalURL) {
        const users = ajax({
            url: this.baseURL + additionalURL,
            method: 'DELETE',
            headers: this.setHeaders() // Set headers
        });
        return users;
    }
}
