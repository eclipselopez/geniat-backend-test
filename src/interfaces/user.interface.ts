export default interface IUser {
    id?: number
    name: string,
    lastname: string,
    email: string,
    password: string,
    salt?: string,
    role: string
}