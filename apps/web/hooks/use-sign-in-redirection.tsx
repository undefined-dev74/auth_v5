import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "hooks/store";
import { IUser, IUserSettings } from "@repo/types";


type UseSignInRedirectionProps = {
  error: any | null;
  isRedirecting: boolean;
  handleRedirection: () => Promise<void>;
};

const useSignInRedirection = (): UseSignInRedirectionProps => {
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [error, setError] = useState<any | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next_path");

  const { fetchCurrentUser, fetchCurrentUserSettings } = useUser();

  const isValidURL = (url: string): boolean => {
    const disallowedSchemes = /^(https?|ftp):\/\//i;
    return !disallowedSchemes.test(url);
  };

  const handleSignInRedirection = useCallback(
    async (user: IUser) => {
      try {
        if (!user.is_onboarded) {
          router.push("/onboarding");
          return;
        }

        if (nextPath) {
          if (isValidURL(nextPath)) {
            router.push(nextPath);
            return;
          } else {
            router.push("/");
            return;
          }
        }

        const userSettings: IUserSettings = await fetchCurrentUserSettings();

        const workspaceSlug =
          userSettings?.workspace?.last_workspace_slug || userSettings?.workspace?.fallback_workspace_slug;

        if (workspaceSlug) router.push(`/${workspaceSlug}`);
        else router.push("/profile");
      } catch (error) {
        console.error("Error in handleSignInRedirection:", error);
        setError(error);
      }
    },
    [fetchCurrentUserSettings, router, nextPath]
  );

  const updateUserInfo = useCallback(async () => {
    setIsRedirecting(true);

    try {
      const user = await fetchCurrentUser();
      await handleSignInRedirection(user);
    } catch (err) {
      setError(err);
    } finally {
      setIsRedirecting(false);
    }
  }, [fetchCurrentUser, handleSignInRedirection]);

  return {
    error,
    isRedirecting,
    handleRedirection: updateUserInfo,
  };
};

export default useSignInRedirection;
