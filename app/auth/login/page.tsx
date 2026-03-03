// Login page hosts both password and OTP authentication for existing users.
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
        <Card className="w-full border-border/70">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Login with password or phone OTP to continue shopping.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
