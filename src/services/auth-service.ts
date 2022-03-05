import bcrypt from 'bcrypt';
import userDao from '../daos/user-dao';
import { UnauthorizedError } from '../shared/errors';
import jwtUtil from '../util/jwt-util';
import isUser from '../services/user-service';
import { User } from '../entity/User';


/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async function login(email: string, password: string): Promise<string> {
    // Fetch user
    // const user = await userDao.getOne(email);
    const user = await User.findOne({login: email});
    console.log(user);
    
    if (!user) {
        throw new UnauthorizedError();
    }
    // Check password
    // const pwdPassed = await bcrypt.compare(password, user.password);
    // if (!pwdPassed) {
    //     throw new UnauthorizedError();
    // }
    // Setup Admin Cookie
    return jwtUtil.sign({
        id: user.id,
        login: user.login,
        role: 1,
    });
}


// Export default
export default {
    login,
} as const;
