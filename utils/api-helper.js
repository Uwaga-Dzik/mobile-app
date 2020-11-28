import Axios from "axios";

class ApiClass {

    constructor() {
        this.baseUrl = "http://dev.api.uwagadzik.pl";
        this.token = "";

        this.axios = Axios.create({
            baseURL: this.baseUrl
        });
    }

    setupToken() {
        Axios.post("http://dev.api.uwagadzik.pl/auth/login", {
            nickname: "user",
            password: "user"
        }).then((res) => {
            this.token = res.data.data.access_token;
            this.axios.defaults.headers.common["Authorization"] = this.token;

        }).catch((e) => {
            console.log(e);
        })
    }

    request(url) {
        return this.axios.request(url);
    }

    get(url, config) {
        return this.axios.get(url, config);
    }

    delete(url, config) {
        return this.axios.delete(url, config);
    }

    head(url, config) {
        return this.axios.head(url, config);
    }

    options(url, config) {
        return this.axios.options(url, config);
    }

    post(url, params, config) {
        return this.axios.post(url, params, config);
    }

    put(url, params, config) {
        params = params || {};
        if (params instanceof FormData) {
            params.append("_method", "PUT");
        } else {
            params._method = "PUT";
        }
        return this.axios.post(url, params, config);
    }

    patch(url, params, config) {
        return this.axios.patch(url, params, config);
    }

    download(url, onProgress) {
        return this.axios
            .get(url, {
                responseType: "blob",
                onDownloadProgress: onProgress
            })
            .then(response => {
                if (response.headers["content-type"] === "application/json") {
                    let reader = new FileReader();
                    reader.onload = function() {
                        response.data = JSON.parse(reader.result);
                    };
                    reader.readAsText(response.data);

                    return Promise.resolve(response);
                } else {
                    let filename = "file";

                    if (response.headers["content-disposition"]) {
                        let content_disposition = response.headers[
                            "content-disposition"
                            ].split(" ");
                        for (let i = 0; i < content_disposition.length; i++) {
                            if (
                                content_disposition[i].indexOf("filename") > -1
                            ) {
                                filename = content_disposition[i].split("=")[1];
                            }
                        }
                    }

                    let blob = new Blob([response.data], {
                        type:
                            response.headers["content-type"] ||
                            "application/octet-stream"
                    });
                    if (typeof window.navigator.msSaveBlob !== "undefined") {
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        var blobURL = window.URL.createObjectURL(blob);
                        var tempLink = document.createElement("a");
                        tempLink.style.display = "none";
                        tempLink.href = blobURL;
                        tempLink.setAttribute("download", filename);

                        if (typeof tempLink.download === "undefined") {
                            tempLink.setAttribute("target", "_blank");
                        }

                        document.body.appendChild(tempLink);
                        tempLink.click();
                        document.body.removeChild(tempLink);
                        window.URL.revokeObjectURL(blobURL);
                    }
                }
            });
    }

    objectToFormData(obj, rootName, ignoreList) {
        var formData = new FormData();

        function appendFormData(data, root) {
            if (!ignore(root)) {
                root = root || "";
                if (data instanceof File) {
                    formData.append(root, data);
                } else if (Array.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        appendFormData(data[i], root + "[" + i + "]");
                    }
                } else if (typeof data === "object" && data) {
                    for (var key in data) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (data.hasOwnProperty(key)) {
                            if (root === "") {
                                appendFormData(data[key], key);
                            } else {
                                appendFormData(
                                    data[key],
                                    root + "[" + key + "]"
                                );
                            }
                        }
                    }
                } else {
                    if (data !== null && typeof data !== "undefined") {
                        formData.append(root, data);
                    }
                }
            }
        }

        function ignore(root) {
            return (
                Array.isArray(ignoreList) &&
                ignoreList.some(function(x) {
                    return x === root;
                })
            );
        }

        appendFormData(obj, rootName);

        return formData;
    }

}

export const API = new ApiClass();