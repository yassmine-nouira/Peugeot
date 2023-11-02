export class GlobalConstants{

    //message
    public static genericError: string = "Something went wrong. Please try again later";

    public static unauthorized:string = "You are not authorized to access this page"

    //regex
    public static nameRegex: string = "[a-zA-Z0-9 ]*";

    public static fullnameRegex: string = "[a-zA-Z ]*";

    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static contactNumberRegex: string = "^[e0-9]{9,9}$";

    public static telRegex: string = "^[0-9]{8}$";

    //variable
    public static error: string = "error";
}