import { Button } from "@app/ui";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { LoginFormContext } from "./login-form";
import { Microsoft } from "./microsoft";

export function MicrosoftButton({ next }: { next?: string }) {
  const searchParams = useSearchParams();
  const finalNext = next ?? searchParams?.get("next");

  const { setClickedMethod, clickedMethod, setLastUsedAuthMethod } =
    useContext(LoginFormContext);

  return (
    <Button
      text="Continue with Microsoft"
      variant="secondary"
      onClick={() => {
        setClickedMethod("azure-ad");
        setLastUsedAuthMethod("azure-ad");
        signIn("azure-ad", {
          ...(finalNext && finalNext.length > 0
            ? { callbackUrl: finalNext }
            : {}),
        });
      }}
      loading={clickedMethod === "azure-ad"}
      disabled={clickedMethod && clickedMethod !== "azure-ad"}
      icon={<Microsoft className="size-4" />}
    />
  );
}
