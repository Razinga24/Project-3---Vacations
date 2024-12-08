import { Store } from "react-notifications-component";


class NotifyService{

    public success( message:string ){
        Store.addNotification({
            title: "Success!",
            message,
            type: "success",
            insert: "top",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,              
            }
          });
    }

    public error( error:any ){
        const message = this.extractMessage(error);
        Store.addNotification({
            title: "Error!",
            message,
            type: "danger",
            insert: "top",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,              
            }
          });
    }


    private extractMessage( error:any ):string{

        // Front: throw "Error!":
        if(typeof error === "string" ) return error;

        // Back: throw string:
        if(typeof error.response?.data === "string") return error.response.data;

        // Back: throw [] validation:
        if(Array.isArray(error.response?.data)) return error.response.data[0];

        // Front: throw new Error("Some Error..."):
        if(typeof error.message === "string") return error.message;

        // else:
        return "Something went wrong...";

    }



}

const notifyService = new NotifyService();
export default notifyService