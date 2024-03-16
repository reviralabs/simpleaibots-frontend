import { Dispatch, SetStateAction } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type CaptchaProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
};

const Captcha = ({ setToken }: CaptchaProps) => {
  return (
    <>
      <Turnstile siteKey="0x4AAAAAAAUvOBniCEGNCxDU" onSuccess={setToken} />
    </>
  );
};

export default Captcha;
