import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import {
    Card,

    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { createBook } from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";




const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),

    genre: z.string().min(2, {
        message: "Genre must be at least 2 characters.",
    }),

    description: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),

    coverImage: z.instanceof(FileList).refine((file) => {
        return file.length === 1;
    }, "coverImage is required"),

    file: z.instanceof(FileList).refine((file) => {
        return file.length === 1;
    }, "bookfile is required"),

})


const Createbook = () => {





    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            genre: "",
            description: "",
            // CoverImage: null,
            // file: null,
        },
    })

    const coverImageRef = form.register('coverImage');
    const bookfileRef = form.register('file');


    const queryclient = useQueryClient();

    const Navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey : ['books']})
            console.log("Book created successfully");
            Navigate('/dashboard/books');
        }
    });


    function onSubmit(values: z.infer<typeof formSchema>) {

        const Postformdata = new FormData();
        Postformdata.append("title", values.title);
        Postformdata.append("genre", values.genre);
        Postformdata.append("description", values.description);
        Postformdata.append("coverImage", values.coverImage[0]);
        Postformdata.append("file", values.file[0]);

        mutation.mutate(Postformdata)

        console.log(values);
    }

    return (
        <section>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <div className="flex items-center justify-between">

                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex gap-[12px]">
                            <Link to='/dashboard/books'>
                            <Button variant="outline"><span><Save /></span> Cancel</Button>
</Link>
                            {

                            }
                            <Button
                                type="submit"
                                disabled={mutation.isPending}>
                                {
                                    mutation.isPending && <LoaderCircle className="animate-spin" />
                                }
                                <span className="ml-2"><Save /></span>
                                Submit
                            </Button>
                        </div>

                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Create a new form</CardTitle>
                            <CardDescription>Fill out the form to create a new book</CardDescription>

                        </CardHeader>
                        <CardContent>
                            {/* <form action=""> */}
                            <div className="grid gap-6">

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    {...field}
                                                />

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />





                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    {...field}
                                                />

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />




                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>

                                                <Textarea

                                                    className="min-h-32"
                                                    {...field}
                                                />

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>

                                                <input type="file" className="w-full" {...coverImageRef} />

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Book PDF</FormLabel>
                                            <FormControl>

                                                {/* <input  type="file" className="w-full" {...field} /> */}

                                                <input type="file" className="w-full" {...bookfileRef} />

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />




                            </div>
                            {/* </form> */}
                        </CardContent>

                    </Card>

                </form>

            </Form>

        </section>
    )
}

export default Createbook;