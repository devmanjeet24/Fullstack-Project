import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react";
import type { Book } from "@/Types";



const Books = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 10000,
  })

  console.log(data, "data");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Books</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>Manage your books and view their sales Performance.</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>

        <hr />

        <CardContent>
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                {/* <TableHead className="hidden sm:table-cell">Price</TableHead> */}
                <TableHead className="hidden sm:table-cell">Author Name</TableHead>
                <TableHead className="hidden sm:table-cell">Created At</TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                data?.data.map((book : Book, id : string) => {
                  return (

                    <TableRow key={id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt={book.title}
                          className="aspect-square rounded-full object-cover"
                          height="64"
                          width="64"
                          src={book.coverImage}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline"> {book.genre} </Badge>
                      </TableCell>
                      {/* <TableCell className="hidden sm:table-cell">{book.}</TableCell> */}
                      <TableCell className="hidden sm:table-cell">{book.author.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{book.createdAt}</TableCell>
                      {/* <TableCell className="hidden sm:table-cell">$250.00</TableCell> */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              aria-haspopup="true"
                              size="icon">
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                  )
                })
              }



            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <div>
            showing <strong>1-10</strong> of <strong>1-10</strong> Products
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Books;