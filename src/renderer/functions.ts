import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { AppContext } from './App';
import { useContext, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase_config';
import firebase from 'firebase/compat';
import FirestoreError = firebase.firestore.FirestoreError;

export { updatePassword, updateEmail, updatePhoneNumber, updateProfile };

type UserArgs = {
  email: string;
  password: string;
  name?: string;
};

export const registerUser = async (user: UserArgs) => {
  try {
    const u = (
      await createUserWithEmailAndPassword(getAuth(), user.email, user.password)
    ).user;

    if (u && user.name) {
      await updateProfile(u, {
        displayName: user.name,
      });

      await setDoc(doc(db, 'users', u.uid), {
        name: user.name,
        email: user.email,
        uid: u.uid,
      });
    }

    return u;
  } catch (e: any) {
    alert(e.code);
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

export const loginUser = async (args: UserArgs) => {
  try {
    const auth = getAuth();

    const { user } = await signInWithEmailAndPassword(
      auth,
      args.email,
      args.password,
    );

    return user;
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

export const logOut = async () => {
  await signOut(getAuth());
  window.location.href = '/';
};

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

export const useAppStyle = () => {
  const { appStyle, setAppStyle, titlebarStyle, setTitlebarStyle } =
    useContext(AppContext);

  const resetAppStyle = () => {
    setAppStyle({});
  };

  const resetTitlebarStyle = () => {
    setTitlebarStyle({
      title: 'Code Zone',
      backgroundColor: 'transparent',
      foregroundColor: 'white',
    });
  };

  return {
    appStyle,
    setAppStyle,
    resetAppStyle,
    titlebarStyle,
    setTitlebarStyle,
    resetTitlebarStyle,
  };
};

export type TaskProps = {
  title: string;
  description: string;
  testData?: { [key: string]: string };
  startDate?: Date;
  dueDate?: Date;
  dateCreated?: Date;
};

export const taskExists = async (title: string) => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }

  const q = query(
    collection(db, `users/${user.uid}/tasks`),
    where('title', '==', title),
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.size > 0;
};

export const createTask = async (task: TaskProps) => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }

  if (await taskExists(task.title)) {
    throw new Error('Task already exists');
  }

  await setDoc(doc(db, `users/${user.uid}/tasks/${task.title}`), {
    ...task,
    dateCreated: task.dateCreated ?? new Date(),
  });
};

export const deleteTask = async (title: string) => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }

  await deleteDoc(doc(db, `users/${user.uid}/tasks/${title}`));
};

export const getTasks = async () => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }

  const q = query(collection(db, `users/${user.uid}/tasks`));

  const querySnapshot = await getDocs(q);

  const tasks: TaskProps[] = [];

  querySnapshot.forEach((doc) => {
    tasks.push(doc.data() as TaskProps);
  });

  return tasks;
};

export const taskListener = (
  callback: (tasks: TaskProps[]) => void,
  onError?: (e: FirestoreError) => void,
) => {
  const user = getCurrentUser();

  if (!user) {
    throw new Error('No user found');
  }

  const q = query(collection(db, `users/${user.uid}/tasks`));

  return onSnapshot(
    q,
    (querySnapshot) => {
      const tasks: TaskProps[] = [];

      querySnapshot.forEach((doc) => {
        tasks.push(doc.data() as TaskProps);
      });

      callback(tasks);
    },
    (e) => {
      if (onError) onError(e);
    },
  );
};

export const isMaximized = (): boolean => {
  return window.electron.ipcRenderer.sendWindowMessageSync('check_maximized');
};

export const removeUndefined = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
};
