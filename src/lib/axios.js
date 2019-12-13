import axios from "axios";
export default async params => {
    axios.defaults.withCredentials = true;

    // 请求拦截器
    axios.interceptors.request.use(req => {
        return req
    }, error => {
        // 请求出错时处理
        return Promise.reject(error)
    })

    if (params.method) {
        params.method = params.method.toUpperCase(); // 小写转城大写
        if (params.method === 'POST')
            params.header = {
                ...params.header,
                // "content-type": "application/x-www-form-urlencoded"
            }
    }
    params.method = params.method || 'GET';
    const { status, data } = await axios(params);
    return new Promise(async (resolve, reject) => {
        if (status === 200) {
            resolve(data)
        } else {
            console.warn('进入异常接口');
            reject()
            //TODO 错误处理
        }
    })

}