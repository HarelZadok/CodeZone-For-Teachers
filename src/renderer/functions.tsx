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
  verifyPasswordResetCode,
  parseActionCodeURL,
} from 'firebase/auth';
import { useEffect } from 'react';
import firebase from 'firebase/compat';
import ActionCodeURL = firebase.auth.ActionCodeURL;

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

export const sendPasswordResetCode = async (email: string) => {
  try {
    await sendPasswordResetEmail(getAuth(), email, {
      url: 'http://localhost:3000/reset-password',
      handleCodeInApp: true,
    });
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

export const sendResetCode = async (email: string) => {
  const URL = parseActionCodeURL(
    'http://localhost:3000/reset-password',
  ) as ActionCodeURL;

  try {
    await sendPasswordResetEmail(getAuth(), email, {
      url: URL.code,
      handleCodeInApp: true,
    });
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

export const verifyResetCode = async (code: string) => {
  try {
    await verifyPasswordResetCode(getAuth(), code);
  } catch (e: any) {
    switch (e.code) {
      case 'auth/expired-action-code':
        throw new Error('Expired code');
      case 'auth/invalid-action-code':
        throw new Error('Invalid code');
      case 'auth/user-disabled':
        throw new Error('User disabled');
      case 'auth/user-not-found':
        throw new Error('User not found');
      default:
        throw new Error('Unknown error');
    }
  }
};

export const logOut = signOut(getAuth());

// eslint-disable-next-line no-undef
export function useListener<K extends keyof WindowEventMap>(
  event: K,
  // eslint-disable-next-line no-undef
  callback: (e: WindowEventMap[K]) => void,
) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => {
      window.removeEventListener(event, callback);
    };
  }, [callback, event]);
}

export const setDelay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
