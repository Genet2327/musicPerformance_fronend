module.exports = {
  devServer: {
    host: "localhost",
    port: 8081,
  },
  publicPath:
    process.env.NODE_ENV === "development" ? "/" : "/performance/t6/",
  transpileDependencies: ["vuetify"],
};
