import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';

const axios = require('axios')
const UNAUTHORIZED = 401
const BADREQUEST = 400
const OK = 200
const CREATED = 201
const NOTFOUND = 404
const FORBIDDEN = 403
const INTERNALSERVER = 500
const SERVICE_UNAVAILABLE = 503
const flatten = require('flat').flatten;

class ApiEngine {
    //
    // For centralized error handling
    //
    apiEngine = (getResponse, url, method, headers, body, httpClient, httpClientInterceptors) => {
        //
        // If there is a bearer token in the header check for expiry
        //
        if (headers.Authorization !== undefined) {
            return this.sessionHandler(url, method, headers, body)
                .then(() => {
                    return this.apiCaller(getResponse, url, method, headers, body, httpClient, httpClientInterceptors)
                })
        }
        else
            return this.apiCaller(getResponse, url, method, headers, body, httpClient, httpClientInterceptors)
    }

    apiCaller(getResponse, url, method, headers, body, httpClient, httpClientInterceptors) {
        return this.httpClient(url, method, headers, body, httpClient, httpClientInterceptors)
            .then((response) => {
                if (getResponse) { //If the method wants to get the response
                    return response
                }
                else { // If method wants to show the message directly
                    if (response.status === UNAUTHORIZED) {
                        response.json()
                            .then((findResponse) => {
                                Object.entries(flatten(findResponse)).map(([key, value]) => {
                                    toast.error(value, {
                                        autoClose: parseInt(process.env.REACT_APP_TOAST_DURATION)
                                    });
                                    return
                                });
                                return
                            })
                        return
                    }
                    else if (response.status === FORBIDDEN) {
                        return response
                    }
                    else if (response.status === BADREQUEST) {
                        response.json()
                            .then((findResponse) => {
                                Object.entries(flatten(findResponse)).map(([key, value]) => {
                                    toast.error(value, {
                                        autoClose: parseInt(process.env.REACT_APP_TOAST_DURATION)
                                    });
                                    return
                                });
                                return
                            })
                        return
                    }
                    else if (response.status === CREATED) {
                        return response
                    }
                    else if (response.status === OK) {
                        return response
                    }
                    else if (response.status === NOTFOUND) {
                        response.json()
                            .then((findResponse) => {
                                Object.entries(flatten(findResponse)).map(([key, value]) => {
                                    toast.error(value, {
                                        autoClose: parseInt(process.env.REACT_APP_TOAST_DURATION)
                                    })
                                    return
                                });
                                return
                            });
                    }
                    else if (response.status === INTERNALSERVER) {
                        response.json()
                            .then((findResponse) => {
                                Object.entries(flatten(findResponse)).map(([key, value]) => {
                                    toast.error(value, {
                                        autoClose: parseInt(process.env.REACT_APP_TOAST_DURATION)
                                    })
                                    return
                                });
                                return
                            });
                    }
                    else if (response.status === SERVICE_UNAVAILABLE) {
                        response.json()
                            .then((findResponse) => {
                                Object.entries(flatten(findResponse)).map(([key, value]) => {
                                    toast.error(value, {
                                        autoClose: parseInt(process.env.REACT_APP_TOAST_DURATION)
                                    })
                                    return
                                });
                                return
                            });
                    }
                }
                return
            })
            .catch((exception) => {
                if (exception.response) { // if http client is axios the bad requests are caught in here
                    if (exception.response.status === BADREQUEST) {
                        Object.entries(flatten(exception.response.data)).map(([key, value]) => {
                            console.log("Bad Request")
                            return
                        });
                        return
                    }
                }
                // let error = exception
                // if (error.message !== "Operation canceled by user") {
                //     swal("Oops!", "Network connectivity lost, please check after some time!", "error");
                //     swal({
                //         title: "Oops!",
                //         text: "Network connectivity lost, please check after some time!",
                //         icon: "error"
                //     })
                //         .then(() => {
                //             window.location.reload(false);
                //         });
                // }
            });
    }

    httpClient = (url, method, headers, body, httpClient, httpClientInterceptors) => {

        if (httpClient === 'axios') {
            return axios({
                method: 'post',
                url: url,
                data: body,
                headers: headers,
                cancelToken: httpClientInterceptors.requestId,
                onUploadProgress: (p) => {
                    if (httpClientInterceptors.progressEvent) {
                        httpClientInterceptors.progressEvent(p)
                    }
                    //this.setState({
                    //fileprogress: p.loaded / p.total
                    //})
                }
            })
        }
        else {
            return fetch(url, {
                method: method,
                body: body,
                headers: headers
            })
        }
    }

    //
    // get new accessToken
    //
    getAccTokenWithRefresh = () => {
        let url = process.env.REACT_APP_API_URL + '/login/refresh/'
        let method = 'post'
        let headers = {
            'Content-Type': 'application/json',
        }
        let body = {
            'refresh': localStorage.getItem('refreshToken')
        }
        body = JSON.stringify(body)
        return fetch(url, {
            method: method,
            body: body,
            headers: headers
        })
            .then((response) => response.json())
            .then((findResponse) => {
                if (findResponse) {
                    //decode new access token
                    let decodedtoken = jwt_decode(findResponse.access)
                    //store new access token values in localstorage
                    localStorage.setItem('accessToken', findResponse.access)
                    localStorage.setItem('accessExp', decodedtoken.exp)
                }
            })
            .catch(error => {
                // console.log('>>>>> ', error)
            });
    }

    //
    // Checks expiration of refresh and access token
    //
    checkSession = () => {
        let refreshTokenExp = localStorage.getItem('refreshExp')
        //
        //Check if refreshToken is expired
        //
        if (Date.now() >= refreshTokenExp * 1000) {
            //
            // Clear the values stored in localstorage and reload the browser
            //
            localStorage.clear()
            window.location.reload(true) // `true` represents refresh without cache
            return
        }

        let accessTokenExpiry = localStorage.getItem('accessExp')
        //
        //Check if accessToken is expired
        //
        if (Date.now() >= accessTokenExpiry * 1000) {
            return true
        }
        else return new Promise(resolve => {
            resolve('No need of access token')
        })
    }

    //
    // ApiEngine caller with token expiration check
    //
    sessionHandler = (url, method, headers, body) => {
        if (this.checkSession() === true) {
            return this.getAccTokenWithRefresh()
                .then(() => {
                    if (headers.Authorization) {
                        headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
                    }
                    return
                })
        }
        else {
            return new Promise(resolve => {
                resolve('No need of access token')
            })
        }
    }
}

export default ApiEngine
