import { observer } from "mobx-react-lite";
// services
import { AuthService } from "@/services/auth.service";

// hooks
import useToast from "@/hooks/use-toast";

// components
import { GitHubSignInButton } from "./github-sign-in";
import { GoogleSignInButton } from "./google-sign-in";


type Props = {
  handleSignInRedirection?: () => Promise<void>;
};

// services
const authService = new AuthService();

export const OAuthOptions: React.FC<Props> = observer((props) => {
  const { handleSignInRedirection } = props;
  // toast alert
  const { setToastAlert } = useToast();

  //   const { data: envConfig } = useSWR("APP_CONFIG", () => appConfig.envConfig());
  const envConfig = {
    github_client_id: process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID,
    google_client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  };

  const handleGoogleSignIn = async ({ clientId, credential }: any) => {
    try {
      if (clientId && credential) {
        const socialAuthPayload = {
          medium: "google",
          credential,
          clientId,
        };
       window.location.href = 'http://localhost:8000/api/v1/auth/google';
      } else throw Error("Cant find credentials");
    } catch (err: any) {
      console.log("ERRPR", err)
      setToastAlert({
        title: "Error signing in!",
        type: "error",
        message:
          err?.error ||
          "Something went wrong. Please try again later or contact the support team.",
      });
    }
  };

  const handleGitHubSignIn = async (credential: string) => {
    try {
      if (envConfig && envConfig.github_client_id && credential) {
        const socialAuthPayload = {
          medium: "github",
          credential,
          clientId: envConfig.github_client_id,
        };
        const response = await authService.socialAuth(socialAuthPayload);

        if (response) handleSignInRedirection();
      } else throw Error("Cant find credentials");
    } catch (err: any) {
      setToastAlert({
        title: "Error signing in!",
        type: "error",
        message:
          err?.error ||
          "Something went wrong. Please try again later or contact the support team.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center text-gray-500 my-4">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-sm">or</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <div className="mx-auto space-y-4 overflow-hidden sm:w-96">
        {envConfig?.google_client_id && (
          <GoogleSignInButton
            clientId={envConfig?.google_client_id}
            handleSignIn={handleGoogleSignIn}
          />
        )}
        {envConfig?.github_client_id && (
          <GitHubSignInButton
            clientId={envConfig?.github_client_id}
            handleSignIn={handleGitHubSignIn}
          />
        )}
      </div>
    </>
  );
});
