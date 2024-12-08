import { signToken, AuthenticationError } from "../services/auth";
import User from "../models/User.js";
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            try {
                if (context.user) {
                    const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                    return userData;
                }
            }
            catch (err) {
                throw new AuthenticationError('Me Failed');
            }
            return null;
        },
    },
    Mutation: {
        login: async (_parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !(await user.isCorrectPassword(password))) {
                    throw new AuthenticationError('Invalid Credentials');
                }
                const token = signToken(user.username, user.password, user._id);
                return { token, user };
            }
            catch (err) {
                throw new AuthenticationError('Login failed');
            }
        },
        addUser: async (_parent, args) => {
            try {
                const user = await User.create(args);
                if (!user) {
                    throw new Error('User creation failed');
                }
                const token = signToken(user.username, user.password, user._id);
                return { token, user };
            }
            catch (err) {
                throw new AuthenticationError('AddUser failed');
            }
        },
        saveBook: async (_parent, { bookData }, context) => {
            try {
                if (!context) {
                    throw new AuthenticationError('You need to be logged in!');
                }
                const updatedUser = await User.findByIdAndUpdate(context._id, { $addToSet: { savedBooks: bookData } }, { new: true });
                return updatedUser;
            }
            catch (err) {
                throw new AuthenticationError('SaveBook failed');
            }
        },
        removeBook: async (_parent, { bookId }, context) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(context._id, { $pull: { savedBooks: bookId } }, { new: true });
                return updatedUser;
            }
            catch (err) {
                throw new AuthenticationError('RemoveBook failed');
            }
        }
    }
};
export default resolvers;
