import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
  getAuth,
} from 'firebase/auth';

export { updatePassword, updateEmail, updatePhoneNumber, updateProfile };

type userArgs = {
  email: string;
  password: string;
  name?: string;
};

export const registerUser = async (user: userArgs) => {
  try {
    const u = (
      await createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    ).user;

    if (u && user.name) {
      await updateProfile(u, {
        displayName: user.name,
      });
    }

    return u;
  } catch (e: any) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        throw new Error('Email already in use');
      case 'auth/invalid-email':
        throw new Error('Invalid email');
      case 'auth/operation-not-allowed':
        throw new Error('Operation not allowed');
      case 'auth/weak-password':
        throw new Error('Weak password');
      default:
        throw new Error('Unknown error');
    }
  }
};

export const loginUser = async (args: userArgs) => {
  try {
    return (
      await signInWithEmailAndPassword(getAuth(), args.email, args.password)
    ).user;
  } catch (e: any) {
    switch (e.code) {
      case 'auth/invalid-email':
        throw new Error('Invalid email');
      case 'auth/user-disabled':
        throw new Error('User disabled');
      case 'auth/invalid-credential':
        throw new Error('Wrong email or password');
      default:
        throw new Error('Unknown error');
    }
  }
};

export const emailResetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(getAuth(), email);
  } catch (e: any) {
    switch (e.code) {
      case 'auth/invalid-email':
        throw new Error('Invalid email');
      case 'auth/user-not-found':
        throw new Error('User not found');
      default:
        throw new Error('Unknown error');
    }
  }
};

export const getCurrentUser = () => {
  const { currentUser } = getAuth();

  if (currentUser) {
    return currentUser;
  }
  return null;
};

export const emailVerification = async () => {
  const user = getCurrentUser();

  if (user) {
    try {
      await sendEmailVerification(user);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-email':
          throw new Error('Invalid email');
        case 'auth/user-not-found':
          throw new Error('User not found');
        default:
          throw new Error('Unknown error');
      }
    }
  }
  throw new Error('No user found');
};

export const logOut = signOut(getAuth());
