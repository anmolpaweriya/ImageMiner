import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DownloadFormSchema } from '@/Schema/downloadForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { DownloadDialog } from './DownloadDialog'

export default function DownloadSection() {

    const defaultValues: z.infer<typeof DownloadFormSchema> = {
        name: "",
        link: "",
        start: "0",
        end: "0",
        increment: "1",
        compareAttributeName: "class",
        compareAttributeValue: "",
        downloadAttributeName: "src"
    }
    const [link, setLink] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<z.infer<typeof DownloadFormSchema>>(defaultValues)

    const form = useForm<z.infer<typeof DownloadFormSchema>>({
        resolver: zodResolver(DownloadFormSchema),
        defaultValues
    })


    async function onSubmit(values: z.infer<typeof DownloadFormSchema>) {
        values.link = link
        setData(values);
        setIsOpen(true);
    }
    return (<>

        <DownloadDialog open={isOpen} setIsOpen={setIsOpen} data={data} />
        <section id='download' className='my-20 space-y-10'>
            <h1 className='font-bold text-4xl ml-4'>Download</h1>

            <div className='sm:mx-auto w-full  box-border sm:w-[80%] '>

                <Form

                    {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[80%] mx-auto box-border">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Name"
                                            required

                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the name for pdf
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="https://example.com/page"
                                            type='url'
                                            onChange={val => setLink(val.target.value)}
                                            value={link}
                                            required

                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter web page link and replace chapter no with {"{}"} for multiple pages download
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {link.includes("{}") &&
                            <div
                                className='flex gap-2'
                            >
                                <FormField
                                    control={form.control}
                                    name="start"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    min={0}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="end"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    min={0}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="increment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Increment</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        }

                        <FormField
                            control={form.control}
                            name="compareAttributeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Compare Attribute Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="class"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter one unique Attribute name on img tag
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="compareAttributeValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Compare Attribute Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="lazy"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter one unique Attribute value on img tag
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="downloadAttributeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>download Attribute Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="src"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter attribute name to fetch image link
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Start</Button>
                    </form>
                </Form>
            </div>

        </section>
    </>
    )
}
