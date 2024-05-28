// import axios from 'axios'


// export enum Service {
//   Auth = 'http://127.0.0.1:80/api',
//   Bike = 'http://127.0.0.1:81/api'
// }

// export function get(service: Service, url: string, options?: any): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${service}${url}`, {
//         ...options,
//         timeout: 3000,
//         headers: {
//           Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//           'Content-Type': 'application/json',
//         }
//       })
//       .then((res) => {
//         resolve(res.data.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }

// export function put(service: Service, url: string, data: any): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios
//       .put(`${service}${url}`, data, {
//         timeout: 3000,
//         headers: {
//           Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//           'Content-Type': 'application/json',
//         }
//       })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// export function post(service: Service, url: string, data: any): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios.post(`${service}${url}`, data, {
//       timeout: 3000,
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//         'Content-Type': 'application/json',
//       }
//     }).then((res) => {
//       resolve(res.data)
//     }).catch((err) => {
//       reject(err)
//     })
//   })
// }

// export function del(service: Service, url: string, data?: any): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios.delete(`${service}${url}`, {
//       data: data,
//       timeout: 3000,
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       });
//   });
// }
// export function postFormData(service: Service, url: string, data: FormData): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios.post(`${service}${url}`, data, {
//       timeout: 3000,
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }

// export function putFormData(service: Service, url: string, data: FormData): Promise<any> {
//   return new Promise((resolve, reject) => {
//     axios.put(`${service}${url}`, data, {
//       timeout: 3000,
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }