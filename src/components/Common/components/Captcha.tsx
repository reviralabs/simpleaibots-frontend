import { Dispatch, SetStateAction } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type CaptchaProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
};

const Captcha = ({ setToken }: CaptchaProps) => {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  return (
    <>
      <Turnstile siteKey={siteKey} onSuccess={setToken} />
    </>
  );
};

export default Captcha;
