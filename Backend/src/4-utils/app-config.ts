class AppConfig{
    public port = 4000;
    public serverUrl = "http://localhost:" + this.port;
    public imagesUrl = this.serverUrl + "/api/vacations/images/";
    public mySqlHost = "localhost";
    public mySqlDataBase = "booking2";
    public mySqlUser = "root";
    public mySqlPassword = "";
}

const appConfig = new AppConfig();
export default appConfig;