import { Button } from "@/components/ui/button";


const Homepage = () => {
  return (
    <>
       <div className="flex item-center">
              <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>


            <div className="flex flex-1 item-center justify-center round-lg border border-dashed shadow-sm">

              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-light">
                  You have no Book
                </h3>

                <p className="text-sm text-muted-foreground">
                  You can add a Book from the sidebar
                </p>

                <Button className="mt-4">Add Book</Button>
              </div>

            </div>
    </>
  )
}


export default Homepage;