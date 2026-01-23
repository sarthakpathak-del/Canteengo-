import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export type SignInResult =
  | { success: true; userInfo: any }
  | { success: false; error: { message: string; code?: any } };

export const signIn = async (): Promise<SignInResult> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const isSuccess = userInfo &&
      userInfo.data !== null &&
      userInfo.data?.user !== undefined;
    if (isSuccess) {
      return { success: true, userInfo };
    } else {
      return {
        success: false,
        error: { message: 'Sign in was cancelled or incomplete' }
      };
    }
  }
   catch (error: any) {
    let errorMessage = 'Unknown error during sign in';
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        errorMessage = 'Sign in cancelled by user';
        break;
      case statusCodes.IN_PROGRESS:
        errorMessage = 'Sign in already in progress';
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        errorMessage = 'Play services not available or outdated';
        break;
      case statusCodes.SIGN_IN_REQUIRED:
        errorMessage = 'User needs to sign in';
        break;
      default:
        errorMessage = error.message || 'Unknown error during sign in';
    }
    return { success: false, error: { message: errorMessage, code: error.code } };
  }
};