import { CustomError, InvalidEmail, InvalidName, InvalidPassword, UserNotFound } from "../error/CustomError";
import { ILoginDTO, Iuser, IuserDTO, IuserFeed } from "../model/user";
import { IUserRepository } from "../repository/userRepository";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";


export class UserBusiness {
  constructor(
    private userDataBase: IUserRepository,
    private hashManger: HashManager,
    private authenticator: Authenticator
  ) { }

  async signup(input: IuserDTO): Promise<string> {
    try {
      const { name, email, password } = input;

      if (!name || !email || !password) {
        throw new CustomError("Preencha os campos 'name', 'email', 'password'", 400)
      }

      if (name.length < 4) {
        throw new InvalidName()
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const hashPassword = await this.hashManger.generateHash(password)

      const id: string = IdGenerator()

      const user: Iuser = {
        id,
        name,
        email,
        password: hashPassword
      }

      await this.userDataBase.sinupUser(user)

      const token = this.authenticator.generateToken({ id })
      return token
    } catch (error: any) {
      throw new CustomError(error.message, 400)
    }
  }

  async login(input: ILoginDTO): Promise<string> {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError("Preencha os campos 'email', 'password'", 400)
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const user = await this.userDataBase.findUserByEmail(email)

      if (!user) {
        throw new UserNotFound()
      }

      const hashPassword = await this.hashManger.compareHash(password, user.password)

      if (!hashPassword) {
        throw new InvalidPassword()
      }

      const id = user.id as string

      const token = this.authenticator.generateToken({ id })
      return token
    } catch (error: any) {
      throw new CustomError(error.message, 400)
    }
  }

  public getProfiller = async (token: string) => {
    try {
      const ProfileId = this.authenticator.getTokenData(token)
      const id: string = ProfileId.id

      const profile = await this.userDataBase.findUserById(id)

      if (!profile) {
        throw new UserNotFound()
      }

      return { id: profile.id, name: profile.name, email: profile.email }
    } catch (error: any) {
      throw new CustomError(error.message, 400)
    }
  }

  public getUserById = async (token: string, id: string) => {
    try {
      const ProfileId = this.authenticator.getTokenData(token)

      const profile = await this.userDataBase.findUserById(ProfileId.id)
      const user = await this.userDataBase.findUserById(id)

      if (!profile) {
        throw new UserNotFound()
      }
      if (!user) {
        throw new CustomError("Usuário não encontrado!", 400)
      }

      return { id: user.id, name: user.name, email: user.email }

    } catch (error: any) {
      throw new CustomError(error.message, 400)
    }
  }

  public getFeed = async (token: string): Promise<IuserFeed[]> => {
    try {

      const user = this.authenticator.getTokenData(token)

      if (!user.id) {
        throw new UserNotFound()
      }

      const feed = await this.userDataBase.getFeed(user.id)

      if (feed.length === 0) {
        throw new CustomError("Sem publicação de receita", 400)
      }


      return feed

    } catch (error: any) {
      throw new CustomError(error.message, 400)
    }
  }
}