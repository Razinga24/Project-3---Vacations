class Config{

    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followsUrl = "http://localhost:4000/api/follows/";
    public vacationsByUserUrl = "http://localhost:4000/api/vacations-by-user/";
    public registerUrl = "http://localhost:4000/api/regiter/";
    public loginUrl = "http://localhost:4000/api/login/";

}
const appConfig = new Config();
export default appConfig;