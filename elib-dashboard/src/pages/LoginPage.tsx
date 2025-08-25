

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
 
  const navigate = useNavigate();

  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);


  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('login successfully');
      navigate('/dashboard/home')
    },
  })


  const handleLoginSubmit = () => {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;
    console.log("data", { email, password });

    if (!email || !password) {
      return alert("Pleae enter email and password");
    }

    mutation.mutate({ email, password });


  }

  return (

    <section className="flex justify-center items-center h-screen">

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  ref={emailref}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  ref={passwordref}
                  id="password"
                  type="password"
                  placeholder="Enter your ********"
                  required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="button" onClick={handleLoginSubmit} className="w-full">
                  Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>


            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={'/auth/register'} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

    </section>
  )
}


export default Loginpage;