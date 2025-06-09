import Link from "next/link";

export default function FooterTxt({ isFromLogin }: { isFromLogin: boolean }) {
  return (
    <div>
      <p className="mt-4 text-center text-sm text-muted-foreground font-[500]">
        {isFromLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={isFromLogin ? "/signup" : "/login"}
          prefetch={false}
          replace={true}
          className=" hover:underline text-black font-[800] dark:text-gray-200"
        >
          {isFromLogin ? "Sign Up" : "Sign In"}
        </Link>
      </p>

      {!isFromLogin && (
        <p className="text-muted-foreground text-xs text-center pt-3 italic ">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      )}
    </div>
  );
}
