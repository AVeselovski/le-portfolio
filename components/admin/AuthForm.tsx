import React, { useRef } from "react";

import styles from "./AuthForm.module.css";

import type { ITranslation } from "../../types";

interface ICredentials {
  username: string;
  password: string;
}

type Props = {
  isLogin: boolean;
  isSubmitting: boolean;
  submitAuth: (credentials: ICredentials) => void;
  toggleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  t: ITranslation;
};

function AuthForm({
  isLogin,
  isSubmitting,
  submitAuth,
  toggleLogin,
  t,
}: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const credentials = {
      username: usernameRef?.current?.value || "",
      password: passwordRef?.current?.value || "",
    };

    submitAuth(credentials);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="label" htmlFor="username">
          {t.adminUsername}
        </label>
        <input
          className="input big w-full"
          disabled={isSubmitting}
          id="username"
          name="username"
          ref={usernameRef}
          required
          type="text"
        />
      </div>
      <div className="input-group big">
        <label className="label" htmlFor="password">
          {t.adminPassword}
        </label>
        <input
          className="input big w-full"
          disabled={isSubmitting}
          id="password"
          name="password"
          ref={passwordRef}
          required
          type="password"
        />
      </div>

      <div className={styles.buttons}>
        <button className="submit-button" disabled={isSubmitting} type="submit">
          {isLogin ? t.adminLogin : t.adminSignup}
        </button>

        <button
          className="secondary-button"
          // disabled={true}
          disabled={isSubmitting}
          onClick={toggleLogin}
        >
          {isLogin ? t.adminSignupInstead : t.adminLoginInstead}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
