'use client'

import { useState } from "react"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"


export const TodoList = () => {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Calendar */}
            <h1 className="text-lg font-medium mb-6">Todo List</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="w-full">
                        <CalendarIcon/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>

            {/* LIST */}
            {/* "max-h-[calc(100vh-10rem)] */}
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">

                <div className="flex flex-col gap-4">
                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                    {/* List Item */}
                    <Card className="p-4">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item1"/>
                            <label htmlFor="item1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>
                    </Card>

                </div>
              
            </ScrollArea>
        </div>
    )
}
