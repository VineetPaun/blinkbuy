// Signup page creates new BlinkBuy customer accounts with secure credentials.
import { SignupForm } from "@/components/auth/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
        <Card className="w-full border-border/70">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Sign up to place orders and track your deliveries.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
