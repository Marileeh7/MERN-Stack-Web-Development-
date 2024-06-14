const environments = {
    development: "http://localhost:8080/api",
    production: "/api",
};

const baseURL = environments[process.env.NODE_ENV] || "";

export { baseURL };