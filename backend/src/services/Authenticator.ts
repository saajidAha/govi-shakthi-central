import bcrypt from "bcrypt";

export class Authenticator{
    /**
     * Hashes password with 10 salt rounds
     */
    public static async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    /**
     *  Compares plaintext password with hashed pass to ensure it matches
     */
    public static async compareHashes(plainPassword: string,  hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

 }

