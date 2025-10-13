import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const api = axios.create({
});

const mock = new AxiosMockAdapter(api, { delayResponse: 1000 });

// Mock POST /submit
mock.onPost("/submit").reply((config) => {
const data = JSON.parse(config.data);
console.log("📨 Mock received:", data);
return [200, { message: "Form submitted successfully!", data }];
});
