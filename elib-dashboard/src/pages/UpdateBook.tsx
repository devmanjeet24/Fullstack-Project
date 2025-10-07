"use client"
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "@/http/api";



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


const UpdateBook = () => {

     const { bookid } = useParams<{ bookid: string }>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "title",
            genre: "genre",
            description: "desc",
        },
    })

    const coverImageRef = form.register('coverImage');
    const bookfileRef = form.register('file');

    const queryclient = useQueryClient();

    const mutation = useMutation({
        mutationFn : updateBook,
        onSuccess : () => {
            console.log("Book updated successfully");
            queryclient.invalidateQueries({queryKey : ['books']})
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log("submit ho gya");
        
        const formData = new FormData();
        formData.append("title",  values.title);
        formData.append("genre",  values.genre);
        formData.append("description",  values.description);
        formData.append("coverImage",  values.coverImage[0]);
        formData.append("file",  values.file[0]);

        mutation.mutate({ bookid: bookid!, data: formData });
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
                                    <BreadcrumbPage>Update</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex gap-[12px]">
                            <Link to='/dashboard/books'>
                                <Button variant="outline"><span><Save /></span> Cancel</Button>
                            </Link>

                            <Button
                                type="submit">

                                <span className="ml-2"><Save /></span>
                                Submit
                            </Button>
                        </div>

                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Create a new form</CardTitle>
                            <CardDescription>Fill out the form to update a new book</CardDescription>

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
                                                    // defaultValue={bookid.title}
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

                                                <input type="file" className="w-full" {...coverImageRef}/>

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

                                                <input type="file" className="w-full" {...bookfileRef}/>

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

export default UpdateBook;