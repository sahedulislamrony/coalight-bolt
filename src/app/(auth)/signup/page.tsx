"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeEvent, useEffect, useState } from "react";
import { formStatus, type signUpFormData } from "@/types/auth";
import { toast } from "sonner";
import { delay } from "@/lib/delay";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import InputField from "@/components/form/InputField";
import ORLine from "@/components/form/ORLine";
import FooterTxt from "@/components/form/FooterTxt";
import WithGoogleBtn from "@/components/form/WithGoogleBtn";
import FormHeader from "@/components/form/FormHeader";
export default function SignupPage() {
  return (
    <div className={cn("mx-auto max-w-sm")}>
      <Card className="border-none shadow-sm">
        <FormHeader title="Join Us" subTitle="Enter your details to sign up" />

        <CardContent>
          <WithGoogleBtn />

          <ORLine />
          <MainForm />
          <FooterTxt isFromLogin={false} />
        </CardContent>
      </Card>
    </div>
  );
}

function MainForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<signUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setStatus("IDLE");
  };

  const trimeData = (data: signUpFormData): signUpFormData => {
    return {
      name: data.name?.trim(),
      email: data.email?.trim(),
      password: data.password?.trim(),
      confirmPassword: data.confirmPassword?.trim(),
    };
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimedData = trimeData(formData);

    // try to login
    try {
      setStatus("LOADING");
      const [response] = await Promise.all([
        fetch("/api/signup", {
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

      // signup success
      setStatus("SUCCESS");
      toast.success(message || "Account created successfully!");

      requestFormReset();

      // redirect
      router.push("/verify-email");
    } catch (e) {
      setStatus("ERROR");
      toast.error("Something went wrong, please try again later.");
      console.log(e);
    }
  }

  // prefetch verify email page to improve performance
  useEffect(() => {
    router.prefetch("/verify-email");
  }, [router]);

  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
      <InputField
        label="Name"
        type="text"
        name="name"
        placeholder="Jon Doe"
        value={formData.name}
        onChange={(e) => updateForm(e)}
      />
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
      />

      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        className="pr-10"
        value={formData.confirmPassword}
        onChange={(e) => updateForm(e)}
      />
      <Button
        className="w-full mt-3 "
        type="submit"
        disabled={status == "LOADING"}
      >
        <span className="font-[800]">
          {status == "LOADING" ? "Loading..." : "Sign up"}
        </span>
      </Button>
    </form>
  );
}
