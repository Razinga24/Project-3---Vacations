class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;

    public static firstNameValidation = {
        required: { value: true, message: "Missing First Name" },
        minLength: { value: 2, message: "First Name too short" },
        maxLength: { value: 30, message: "First Name too long" }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Missing Last Name" },
        minLength: { value: 2, message: "Last Name too short" },
        maxLength: { value: 60, message: "Last Name too long" }
    }

    public static emailValidation = {
        required: { value: true, message: "Missing Email" },
        pattern: { value: /^[\w.]+@[\w.-]+[.][a-zA-Z]{2,}$/, message: "Not Valid Email" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing Password" },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 20, message: "Password too long" }
    }
    followedVacations: any[];
}

export default UserModel;