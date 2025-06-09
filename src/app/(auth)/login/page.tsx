"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WithGoogleBtn from "@/components/form/WithGoogleBtn";

import { ChangeEvent, useState } from "react";
import { formStatus, loginFormData } from "@/types/auth";
import { toast } from "sonner";
import { delay } from "@/lib/delay";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

import InputField from "@/components/form/InputField";
import ORLine from "@/components/form/ORLine";
import FormHeader from "@/components/form/FormHeader";
import FooterTxt from "@/components/form/FooterTxt";

export default function LoginPage() {
  return (
    <div className={cn("mx-auto max-w-sm")}>
      <Card className="border-none shadow-sm">
        <FormHeader
          title="Welcome"
          subTitle="Enter your credentials to continue"
        />

        <CardContent>
          <MainForm />

          <ORLine />

          <WithGoogleBtn />
          <FooterTxt isFromLogin />
        </CardContent>
      </Card>
    </div>
  );
}

function MainForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<formStatus>("IDLE");

  const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const requestFormReset = () => {
    setFormData({
      email: "",
      password: "",
    });
    setStatus("IDLE");
  };

  const trimeData = (data: loginFormData): loginFormData => {
    return {
      email: data.email?.trim(),
      password: data.password?.trim(),
    };
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimedData = trimeData(formData);

    // try to login
    try {
      setStatus("LOADING");
      const [response] = await Promise.all([
        fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(trimedData),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        delay(500),
      ]);

      if (!response.ok) {
        setStatus("ERROR");
        const { message } = await response.json();
        toast.error(message);
        return;
      }

      const { message, userInfo } = await response.json();

      // update user info in the store
      dispatch(
        setUser({
          user: {
            name: userInfo.firstName + " " + userInfo.lastName,
            email: userInfo.email,
          },
          isAccountEnabled: userInfo.isAccountEnabled,
          isVerified: userInfo.isVerified,
        })
      );

      // login success
      setStatus("SUCCESS");
      toast.success(message || "Login successful!");
      requestFormReset();

      // redirect
      if (!userInfo.isAccountEnabled) return router.push("/enable-account");

      if (!userInfo.isVerified) return router.push("/verify-email");

      router.push("/dashboard");
    } catch (e) {
      setStatus("ERROR");
      toast.error("Something went wrong, please try again later.");
      console.log(e);
    }
  }
  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={(e) => updateForm(e)}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        className="pr-10"
        value={formData.password}
        onChange={(e) => updateForm(e)}
        isFromLogin
      />

      <Button
        className="w-full mt-3  "
        type="submit"
        disabled={status == "LOADING"}
      >
        <span className="font-[800]">
          {status == "LOADING" ? "Loading..." : "Sign In"}
        </span>
      </Button>
    </form>
  );
}
