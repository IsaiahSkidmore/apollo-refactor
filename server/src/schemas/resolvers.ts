import { signToken, AuthenticationError } from "../services/auth";
import { UserContext } from "../models/User.js";
import { UserDocument } from "../models/User.js";
import { BookDocument } from "../models/Book.js"; 
import User from "../models/User.js";

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: UserContext): Promise<UserDocument | null> => {

            try {
                if (context.user) {
                    const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                    return userData;
                }
            } catch (err) {
                throw new AuthenticationError('Me Failed');
                
            }
            return null;

        },
    },

    Mutation: {

        login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: UserDocument }> => {  

                try {
                    const user = await User.findOne({ email });
                    if (!user || !(await user.isCorrectPassword(password))) {
                        throw new AuthenticationError('Invalid Credentials');
                    }

                    const token = signToken(user.username, user.password, user._id);
                    return { token, user };
                } catch (err) {
                    throw new AuthenticationError('Login failed');
                }

            },

        addUser: async (_parent: any, args: any): Promise<{ token: string; user: UserDocument }> => {

            try {
                const user = await User.create(args);
                if (!user) {
                    throw new Error('User creation failed');
                }
                const token = signToken(user.username, user.password, user._id);
                return { token, user };
            } catch (err) {
                throw new AuthenticationError('AddUser failed');
            }

        },

        saveBook: async (_parent: any, { bookData }: { bookData: BookDocument }, context: UserDocument): Promise<UserDocument | null> => {

            try {
                if (!context) {
                    throw new AuthenticationError('You need to be logged in!');
                }

                const updatedUser = await User.findByIdAndUpdate(
                    context._id,
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            } catch (err) {
                throw new AuthenticationError('SaveBook failed');
            }
            
        }, 

        removeBook: async (_parent: any, { bookId }: { bookId: BookDocument }, context: UserDocument): Promise<UserDocument | null> => {

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    context._id,
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                );

                return updatedUser;
            } catch (err) {
                throw new AuthenticationError('RemoveBook failed');
            }

        }
    }
}

export default resolvers;