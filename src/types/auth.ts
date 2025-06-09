// login form

export type loginFormData = {
  email: string;
  password: string;
};

// signup form

export type signUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// form status

export type formStatus = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
