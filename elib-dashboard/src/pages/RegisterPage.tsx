import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";


const RegisterPage = () => {
  return (
    <section className="flex justify-center items-center h-screen">

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>


           <div className="grid gap-4">

              <div className="grid gap-2">
                 <Label htmlFor="name">First Name</Label>
                  <Input id="firstName" placeholder="John" required/>

                
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                  <Input id="Email" type="email" placeholder="john@example.com" required/>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Password">Password</Label>
                  <Input id="Password" type="password" placeholder="password" required/>
              </div>

             <Button type="submit" className="w-full">Create an account</Button>

    

             <div className="mt-4 text-center text-sm">
              Already have an account{' '}
              <Link to={'/auth/login'} className="underline">Sign in</Link>
             </div>
           </div>



          {/* <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">First Name</Label>
                <Input
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
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form> */}
        </CardContent>
      </Card>

    </section>
  )
}

export default RegisterPage;