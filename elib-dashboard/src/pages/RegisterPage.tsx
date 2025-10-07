import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/http/api";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";


const RegisterPage = () => {

  const navigate = useNavigate();

  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const nameref = useRef<HTMLInputElement>(null);


  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      console.log('register successfully');
      navigate('/auth/login')
    },
  })


  const handleregisterSubmit = () => {
    const email = emailref.current?.value;
    const password = passwordref.current?.value;
    const name = nameref.current?.value;


    if (!name || !email || !password) {
      return alert("Pleae enter email and password");
    }

    mutation.mutate({ name, email, password });


  }

  return (
    <section className="flex justify-center items-center h-screen">

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
            <br />
            {mutation.isError && <span className="text-red-500 text-sm">Loading Please Wait...  </span>}
          </CardDescription>
        </CardHeader>
        <CardContent>


          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label htmlFor="name">First Name</Label>
              <Input ref={nameref} id="name" placeholder="John" required />


            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="Email" ref={emailref} type="email" placeholder="john@example.com" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" ref={passwordref} type="password" placeholder="password" required />
            </div>

            <Button onClick={handleregisterSubmit} type="submit" className="w-full" disabled={mutation.isPending}>
              {
                mutation.isPending && <LoaderCircle className="animate-spin" />
              }
              Create an account</Button>



            <div className="mt-4 text-center text-sm">
              Already have an account{' '}
              <Link to={'/auth/login'} className="underline">Sign in</Link>
            </div>
          </div>




        </CardContent>
      </Card>

    </section>
  )
}

export default RegisterPage;