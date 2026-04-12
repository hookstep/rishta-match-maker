import { SignUp } from "@clerk/clerk-react";
import { Heart } from "lucide-react";

const appearance = {
  variables: {
    colorPrimary: "hsl(25 80% 52%)",
    colorText: "hsl(20 20% 12%)",
    colorTextSecondary: "hsl(20 10% 45%)",
    colorBackground: "hsl(0 0% 100%)",
    colorInputBackground: "hsl(30 25% 97%)",
    colorInputText: "hsl(20 20% 12%)",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "shadow-[var(--shadow-elevated)] border border-border",
    rootBox: "w-full",
    headerTitle: "font-serif text-xl",
    socialButtonsBlockButton: "border-border",
  },
} as const;

const SignUpPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-serif text-3xl font-bold">Rishte Wale Sardarji</h1>
        <p className="text-muted-foreground">Matrimonial Profile Manager</p>
      </div>

      <SignUp
        appearance={appearance}
        routing="path"
        path="/sign-up"
        signInUrl="/auth"
        forceRedirectUrl="/dashboard"
      />
    </div>
  </div>
);

export default SignUpPage;
